// Super-admin-only logical backup / restore of the PakBazaar MongoDB database (server-side).
// Works with the same MONGODB_URL / database ("pakBazar") used by Better Auth and the API.
//
// Design notes
//  * Backup = one gzip JSON bundle (EJSON, type-preserving) + SHA-256 integrity checksum.
//  * `session`, `verification`, `jwks` and `rateLimit` are never exported (live sessions, one-time tokens and
//    JWT signing keys must not leave the database). Better Auth rotates keys / users sign in again after a restore.
//  * Restore replaces ONLY the collections contained in the bundle. Default targets are safe
//    (validate-only, or a separate "<db>_restore_check" database); overwriting the live database needs an
//    explicit typed confirmation.
//  * This is an in-process tool for modest databases (size caps below). For very large databases use the
//    mongodump scripts in the backend repository (scripts/backup/*) from a secure host.
import crypto from "node:crypto";
import zlib from "node:zlib";
import { promisify } from "node:util";

import { BSON, MongoClient } from "mongodb";

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

export const DB_NAME = "pakBazar";
export const FORMAT = "pakbazaar-backup/1";
export const LIVE_CONFIRM_TEXT = `RESTORE ${DB_NAME}`;
export const EXCLUDED = new Set(["session", "verification", "jwks", "rateLimit", "backup_events"]);
export const MAX_DOCS = Number(process.env.BACKUP_MAX_DOCS) || 200000;
export const MAX_BUNDLE_BYTES = 40 * 1024 * 1024; // uncompressed JSON
export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // gzip upload

const NAME_RE = /^[A-Za-z0-9_.-]{1,80}$/;

let clientPromise;

const getClient = () => {
  if (!process.env.MONGODB_URL) throw Object.assign(new Error("MONGODB_URL is not configured"), { status: 500 });

  clientPromise ??= new MongoClient(process.env.MONGODB_URL).connect();

  return clientPromise;
};

const getDb = async (name = DB_NAME) => (await getClient()).db(name);

const isBackupable = (name) => !name.startsWith("system.") && !EXCLUDED.has(name) && NAME_RE.test(name);

export const listCollections = async () => {
  const db = await getDb();
  const all = await db.listCollections({}, { nameOnly: true }).toArray();
  const rows = [];

  for (const { name } of all.sort((a, b) => a.name.localeCompare(b.name))) {
    if (name.startsWith("system.")) continue;

    rows.push({
      name,
      count: await db.collection(name).estimatedDocumentCount(),
      included: isBackupable(name),
    });
  }

  return rows;
};

export const createBackup = async ({ actor }) => {
  const db = await getDb();
  const collections = (await listCollections()).filter((collection) => collection.included);
  const totalDocs = collections.reduce((sum, collection) => sum + collection.count, 0);

  if (totalDocs > MAX_DOCS) {
    throw Object.assign(
      new Error(`The database has ${totalDocs} documents, above the in-app limit of ${MAX_DOCS}. Use the mongodump scripts instead.`),
      { status: 413 },
    );
  }

  const data = {};
  const counts = {};

  for (const { name } of collections) {
    data[name] = await db.collection(name).find({}).toArray();
    counts[name] = data[name].length;
  }

  const dataJson = BSON.EJSON.stringify(data, { relaxed: false });

  if (Buffer.byteLength(dataJson) > MAX_BUNDLE_BYTES) {
    throw Object.assign(new Error("The backup is larger than the in-app limit. Use the mongodump scripts instead."), { status: 413 });
  }

  const sha256 = crypto.createHash("sha256").update(dataJson).digest("hex");
  const bundle = {
    format: FORMAT,
    createdAt: new Date().toISOString(),
    database: DB_NAME,
    createdBy: actor?.email ?? null,
    excluded: [...EXCLUDED],
    counts,
    sha256,
    data: dataJson,
  };

  const buffer = await gzip(Buffer.from(JSON.stringify(bundle)), { level: 9 });

  return { buffer, sha256, counts, totalDocs, createdAt: bundle.createdAt };
};

// Throws on any structural / integrity problem. Returns the decoded collections.
export const parseBackup = async (buffer) => {
  if (!buffer?.length) throw Object.assign(new Error("Empty file"), { status: 400 });
  if (buffer.length > MAX_UPLOAD_BYTES) throw Object.assign(new Error("Backup file is too large for in-app restore"), { status: 413 });

  let bundle;

  try {
    bundle = JSON.parse((await gunzip(buffer, { maxOutputLength: MAX_BUNDLE_BYTES + 1024 * 1024 })).toString("utf8"));
  } catch {
    throw Object.assign(new Error("This is not a valid PakBazaar backup file"), { status: 400 });
  }

  if (bundle?.format !== FORMAT || typeof bundle.data !== "string" || bundle.database !== DB_NAME) {
    throw Object.assign(new Error("Unsupported backup format or a different database"), { status: 400 });
  }

  const actual = crypto.createHash("sha256").update(bundle.data).digest("hex");

  if (actual !== bundle.sha256) {
    throw Object.assign(new Error("Integrity check failed: the file was modified or is corrupted"), { status: 400 });
  }

  const collections = BSON.EJSON.parse(bundle.data, { relaxed: false });

  for (const [name, docs] of Object.entries(collections)) {
    if (!isBackupable(name) || !Array.isArray(docs)) {
      throw Object.assign(new Error(`The backup contains a collection that cannot be restored: ${name}`), { status: 400 });
    }
  }

  return { collections, manifest: { createdAt: bundle.createdAt, createdBy: bundle.createdBy, counts: bundle.counts, sha256: bundle.sha256 } };
};

export const restoreBackup = async ({ collections, target }) => {
  const targetName = target === "live" ? DB_NAME : `${DB_NAME}_restore_check`;
  const db = await getDb(targetName);
  const restored = [];

  for (const [name, docs] of Object.entries(collections)) {
    const collection = db.collection(name);

    await collection.deleteMany({});

    for (let i = 0; i < docs.length; i += 1000) {
      await collection.insertMany(docs.slice(i, i + 1000), { ordered: false });
    }

    restored.push({ name, count: docs.length });
  }

  return { database: targetName, restored };
};

export const recordEvent = async (event) => {
  try {
    const db = await getDb();

    await db.collection("backup_events").insertOne({ ...event, at: new Date() });
  } catch {
    // auditing must never break the operation itself
  }
};

export const listEvents = async (limit = 20) => {
  try {
    const db = await getDb();
    const rows = await db.collection("backup_events").find({}).sort({ at: -1 }).limit(limit).toArray();

    return rows.map((row) => ({
      id: String(row._id),
      action: row.action,
      actor: row.actorEmail ?? row.actorId ?? null,
      at: row.at?.toISOString?.() ?? null,
      details: row.details ?? null,
    }));
  } catch {
    return [];
  }
};
