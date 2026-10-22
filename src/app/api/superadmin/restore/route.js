import { LIVE_CONFIRM_TEXT, MAX_UPLOAD_BYTES, parseBackup, recordEvent, restoreBackup } from "@/lib/backup";
import { json, requireSuperAdmin } from "@/lib/superadmin-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// POST /api/superadmin/restore?mode=validate|verify|live   body: the .json.gz file (raw)
//   validate → integrity check only, nothing is written
//   verify   → restore into the separate database "pakBazar_restore_check"
//   live     → overwrite the collections in the live database (needs header x-confirm-text = "RESTORE pakBazar")
export const POST = async (request) => {
  const { error, session } = await requireSuperAdmin(request);

  if (error) return error;

  const mode = new URL(request.url).searchParams.get("mode") ?? "validate";

  if (!["validate", "verify", "live"].includes(mode)) return json({ success: false, message: "Invalid mode" }, 400);

  if (mode === "live" && request.headers.get("x-confirm-text") !== LIVE_CONFIRM_TEXT) {
    return json({ success: false, message: `Type "${LIVE_CONFIRM_TEXT}" to confirm a live restore` }, 400);
  }

  const declared = Number(request.headers.get("content-length") || 0);

  if (declared > MAX_UPLOAD_BYTES) return json({ success: false, message: "Backup file is too large for in-app restore" }, 413);

  try {
    const buffer = Buffer.from(await request.arrayBuffer());
    const { collections, manifest } = await parseBackup(buffer);

    if (mode === "validate") {
      await recordEvent({ action: "BACKUP_VALIDATED", actorId: session.user.id, actorEmail: session.user.email, details: { sha256: manifest.sha256 } });

      return json({ success: true, message: "Backup is valid", data: { mode, manifest } });
    }

    const result = await restoreBackup({ collections, target: mode });

    await recordEvent({
      action: mode === "live" ? "RESTORE_LIVE" : "RESTORE_VERIFY",
      actorId: session.user.id,
      actorEmail: session.user.email,
      details: { sha256: manifest.sha256, database: result.database, collections: result.restored.length },
    });

    return json({ success: true, message: mode === "live" ? "Live database restored" : "Restored into the verification database", data: { mode, manifest, ...result } });
  } catch (e) {
    await recordEvent({ action: "RESTORE_FAILED", actorId: session.user.id, actorEmail: session.user.email, details: { mode, message: String(e.message).slice(0, 200) } });

    return json({ success: false, message: e.message || "Restore failed" }, e.status || 500);
  }
};
