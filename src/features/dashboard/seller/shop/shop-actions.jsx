"use client";

import { Pencil, RefreshCw, Trash2 } from "lucide-react";

export default function ShopActions({
  onEdit,
  onDelete,
  onRefresh,
  loading = false,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50"
      >
        <RefreshCw
          className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
        />
        Refresh
      </button>

      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-2 rounded-lg border border-[#002B12]/15 bg-white px-3 py-2 text-sm font-medium text-[#002B12] transition hover:bg-[#002B12]/5"
      >
        <Pencil className="h-4 w-4" />
        Edit Shop
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
    </div>
  );
}