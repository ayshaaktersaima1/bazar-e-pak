import { NextResponse } from "next/server";

import { MAX_DOCS, EXCLUDED, createBackup, listCollections, listEvents, recordEvent } from "@/lib/backup";
import { json, requireSuperAdmin } from "@/lib/superadmin-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export const GET = async (request) => {
  const { error } = await requireSuperAdmin(request);

  if (error) return error;

  try {
    const [collections, events] = await Promise.all([listCollections(), listEvents()]);

    return json({ success: true, data: { database: "pakBazar", collections, events, limits: { maxDocs: MAX_DOCS }, excluded: [...EXCLUDED] } });
  } catch (e) {
    return json({ success: false, message: e.message || "Could not read the database" }, e.status || 500);
  }
};

export const POST = async (request) => {
  const { error, session } = await requireSuperAdmin(request);

  if (error) return error;

  try {
    const backup = await createBackup({ actor: session.user });

    await recordEvent({
      action: "BACKUP_CREATED",
      actorId: session.user.id,
      actorEmail: session.user.email,
      details: { sha256: backup.sha256, totalDocs: backup.totalDocs, bytes: backup.buffer.length },
    });

    const stamp = backup.createdAt.replace(/[:.]/g, "-");

    return new NextResponse(backup.buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/gzip",
        "Content-Disposition": `attachment; filename="pakBazar-backup-${stamp}.json.gz"`,
        "Content-Length": String(backup.buffer.length),
        "X-Backup-Sha256": backup.sha256,
        "X-Backup-Documents": String(backup.totalDocs),
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return json({ success: false, message: e.message || "Backup failed" }, e.status || 500);
  }
};
