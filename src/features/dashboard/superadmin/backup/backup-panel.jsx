"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Panel } from "@/features/dashboard/finance/finance-ui";
import { formatPKT, humanize } from "@/utils/payments";

const LIVE_TEXT = "RESTORE pakBazar";
const MAX_UPLOAD = 25 * 1024 * 1024;

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const BackupPanel = () => {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState("");
  const [lastBackup, setLastBackup] = useState(null);
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("validate");
  const [confirmText, setConfirmText] = useState("");
  const [freshBackup, setFreshBackup] = useState(false);
  const [result, setResult] = useState(null);

  const [tick, setTick] = useState(0);
  const load = () => setTick((value) => value + 1);

  useEffect(() => {
    let alive = true;

    fetch("/api/superadmin/backup", { cache: "no-store" })
      .then(async (response) => ({ response, body: await readJson(response) }))
      .then(({ response, body }) => {
        if (!alive) return;

        if (response.ok && body?.success) setStatus(body.data);
        else toast.error(body?.message || "Could not load backup status");
      })
      .catch(() => alive && toast.error("Could not load backup status"));

    return () => {
      alive = false;
    };
  }, [tick]);

  const createBackup = async () => {
    setBusy("backup");

    try {
      const response = await fetch("/api/superadmin/backup", { method: "POST" });

      if (!response.ok) {
        toast.error((await readJson(response))?.message || "Backup failed");
        return;
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition") || "";
      const name = /filename="([^"]+)"/.exec(disposition)?.[1] || "pakBazar-backup.json.gz";
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);

      setLastBackup({
        name,
        sha256: response.headers.get("X-Backup-Sha256"),
        documents: response.headers.get("X-Backup-Documents"),
        size: blob.size,
      });
      toast.success("Backup created and downloaded");
      load();
    } catch {
      toast.error("Backup failed");
    } finally {
      setBusy("");
    }
  };

  const runRestore = async (event) => {
    event.preventDefault();

    if (!file) return toast.error("Choose a backup file first.");
    if (file.size > MAX_UPLOAD) return toast.error("This file is too large for in-app restore. Use the mongodump scripts.");

    if (mode === "live") {
      if (confirmText !== LIVE_TEXT) return toast.error(`Type "${LIVE_TEXT}" exactly to confirm.`);
      if (!freshBackup) return toast.error("Confirm that you downloaded a fresh backup first.");
    }

    setBusy("restore");
    setResult(null);

    try {
      const response = await fetch(`/api/superadmin/restore?mode=${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/gzip", ...(mode === "live" ? { "x-confirm-text": confirmText } : {}) },
        body: file,
      });
      const body = await readJson(response);

      if (!response.ok || !body?.success) {
        toast.error(body?.message || "Restore failed");
        return;
      }

      setResult(body.data);
      toast.success(body.message);
      setConfirmText("");
      setFreshBackup(false);
      load();
    } catch {
      toast.error("Restore failed");
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="space-y-6">
      <Panel title="What is backed up">
        {!status ? (
          <p className="text-sm text-zinc-500">Loading database status…</p>
        ) : (
          <>
            <p className="mb-3 text-sm text-zinc-600">
              Database <strong>{status.database}</strong>. Excluded for security: {status.excluded.join(", ")}. In-app limit: {status.limits.maxDocs.toLocaleString()} documents.
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {status.collections.map((collection) => (
                <div key={collection.name} className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${collection.included ? "border-zinc-200" : "border-dashed border-zinc-200 text-zinc-400"}`}>
                  <span className="truncate">{collection.name}</span>
                  <span className="font-semibold">{collection.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </Panel>

      <Panel title="Create a backup">
        <p className="text-sm text-zinc-600">
          Downloads one compressed file with an integrity checksum. Store it somewhere safe and private: it contains customer data and password hashes.
        </p>
        <button type="button" onClick={createBackup} disabled={busy !== ""} className="mt-4 rounded-md bg-[#002B12] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00451E] disabled:opacity-60">
          {busy === "backup" ? "Creating backup…" : "Create & download backup"}
        </button>

        {lastBackup && (
          <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
            <p><strong>{lastBackup.name}</strong> — {lastBackup.documents} documents, {(lastBackup.size / 1024).toFixed(0)} KB</p>
            <p className="mt-1 break-all font-mono">SHA-256 (data): {lastBackup.sha256}</p>
          </div>
        )}
      </Panel>

      <Panel title="Verify or restore a backup">
        <form onSubmit={runRestore} className="space-y-4">
          <label className="block text-sm font-medium text-[#001B08]">
            Backup file (.json.gz)
            <input type="file" accept=".gz,.json.gz,application/gzip" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mt-1 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#001B08] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white" />
          </label>

          <fieldset className="space-y-2 text-sm">
            {[
              ["validate", "Validate only", "Checks the file and checksum. Nothing is written."],
              ["verify", "Restore into a verification database", "Writes to “pakBazar_restore_check” so you can inspect it. The live site is not touched."],
              ["live", "Restore into the LIVE database", "Replaces the contents of every collection that is in the backup. Cannot be undone."],
            ].map(([value, label, hint]) => (
              <label key={value} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${mode === value ? (value === "live" ? "border-red-400 bg-red-50" : "border-[#D9A928] bg-[#D9A928]/10") : "border-zinc-200"}`}>
                <input type="radio" name="mode" value={value} checked={mode === value} onChange={() => setMode(value)} className="mt-1 accent-[#002B12]" />
                <span><span className="block font-semibold text-[#001B08]">{label}</span><span className="text-xs text-zinc-500">{hint}</span></span>
              </label>
            ))}
          </fieldset>

          {mode === "live" && (
            <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm">
              <p className="text-red-800">
                Restoring replaces users, orders, payments and the ledger with the backup’s data. Sessions are not part of a backup, so everyone must sign in again, and any change made after the backup was taken is lost.
              </p>
              <label className="flex items-start gap-2 text-red-900">
                <input type="checkbox" checked={freshBackup} onChange={(event) => setFreshBackup(event.target.checked)} className="mt-1" />
                I have just downloaded a fresh backup of the current database.
              </label>
              <label className="block font-medium text-red-900">
                Type <code className="rounded bg-white px-1">{LIVE_TEXT}</code> to confirm
                <input value={confirmText} onChange={(event) => setConfirmText(event.target.value)} autoComplete="off" className="mt-1 h-10 w-full rounded-lg border border-red-300 bg-white px-3 text-sm outline-none" />
              </label>
            </div>
          )}

          <button type="submit" disabled={busy !== ""} className={`rounded-md px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${mode === "live" ? "bg-red-600 hover:bg-red-700" : "bg-[#002B12] hover:bg-[#00451E]"}`}>
            {busy === "restore" ? "Working…" : mode === "validate" ? "Validate backup" : mode === "verify" ? "Restore to verification database" : "Restore LIVE database"}
          </button>
        </form>

        {result && (
          <div className="mt-5 rounded-lg bg-zinc-50 p-4 text-sm">
            <p className="font-semibold text-[#001B08]">Backup created {formatPKT(result.manifest?.createdAt)} by {result.manifest?.createdBy ?? "unknown"}</p>
            {result.restored && (
              <>
                <p className="mt-1 text-zinc-600">Restored into <strong>{result.database}</strong>:</p>
                <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                  {result.restored.map((item) => <li key={item.name} className="flex justify-between border-b border-zinc-200 py-1"><span>{item.name}</span><span className="font-semibold">{item.count}</span></li>)}
                </ul>
              </>
            )}
            {!result.restored && <p className="mt-1 text-zinc-600">Integrity check passed. {Object.keys(result.manifest?.counts ?? {}).length} collections found.</p>}
          </div>
        )}
      </Panel>

      <Panel title="Recent backup activity">
        {!status?.events?.length ? (
          <p className="text-sm text-zinc-500">No activity recorded yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-100 text-sm">
            {status.events.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                <span className="font-semibold text-[#001B08]">{humanize(item.action)}</span>
                <span className="text-xs text-zinc-500">{item.actor} · {formatPKT(item.at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <p className="text-xs text-zinc-500">
        For databases above the in-app limit, or for scheduled backups, use the mongodump scripts shipped with the backend (scripts/backup). Configure Atlas Cloud Backup as the primary safety net.
      </p>
    </div>
  );
};

export default BackupPanel;
