"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DataTable from "@/features/dashboard/common/table/data-table";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import useApi from "@/hooks/use-api";
import usePaginated from "@/hooks/use-paginated";
import { formatMinor, formatPKT, humanize } from "@/utils/payments";

import { Panel } from "./finance-ui";

const filters = [{ key: "status", label: "All statuses", options: ["pending", "processing", "paid", "failed"].map((value) => ({ value, label: humanize(value) })) }];

// Settlement TRACKING: marking a settlement "paid" records a bank transfer an administrator made
// manually. Nothing here moves money or calls PayFast.
const SettlementsPanel = ({ caps }) => {
  const { get, post, patch, loading } = useApi();
  const list = usePaginated("/api/finance/admin/settlements");
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState("");
  const [dialog, setDialog] = useState(null);
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (!caps.settle) return;

    get("/api/finance/admin/shops?limit=100", {}, { showError: false }).then((result) => {
      if (result.success) setShops(result.data.filter((shop) => shop.sellerId && shop.summary?.online?.sellerPayableMinor > 0));
    });
  }, [get, caps.settle, list.rows.length]);

  const create = async (event) => {
    event.preventDefault();

    if (!shopId) return toast.error("Choose a shop with a payable balance.");

    const result = await post("/api/finance/admin/settlements", { shopId }, {}, { showSuccess: true, successMessage: "Settlement created" });

    if (result.success) {
      setShopId("");
      list.refresh();
    }
  };

  const update = async () => {
    const { settlement, status } = dialog;

    if (status === "paid" && reference.trim().length < 3) return toast.error("Enter the bank transfer reference.");

    const result = await patch(`/api/finance/admin/settlements/${settlement.id}`, { status, ...(reference.trim() ? { reference: reference.trim() } : {}) }, {}, { showSuccess: true, successMessage: "Settlement updated" });

    if (result.success) {
      setDialog(null);
      setReference("");
      list.refresh();
    }
  };

  const columns = [
    { key: "createdAt", label: "Created", render: (r) => <span className="text-xs">{formatPKT(r.createdAt)}</span> },
    { key: "shopId", label: "Shop", render: (r) => <span className="font-mono text-xs">…{String(r.shopId).slice(-6)}</span> },
    { key: "grossMinor", label: "Gross", render: (r) => formatMinor(r.grossMinor) },
    { key: "netMinor", label: "Seller payout", render: (r) => <span className="font-semibold">{formatMinor(r.netMinor)}</span> },
    { key: "orderCount", label: "Orders", render: (r) => r.orderCount },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "reference", label: "Bank reference", render: (r) => r.reference || "—" },
    {
      key: "actions",
      label: "Actions",
      render: (r) =>
        caps.settle && ["pending", "processing"].includes(r.status) ? (
          <div className="flex gap-1.5">
            {r.status === "pending" && <button type="button" onClick={() => setDialog({ settlement: r, status: "processing" })} className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-semibold hover:bg-zinc-50">Processing</button>}
            <button type="button" onClick={() => setDialog({ settlement: r, status: "paid" })} className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700">Record paid</button>
            <button type="button" onClick={() => setDialog({ settlement: r, status: "failed" })} className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700">Failed</button>
          </div>
        ) : null,
    },
  ];

  return (
    <div className="space-y-6">
      {caps.settle && (
        <Panel title="Create settlement">
          <form onSubmit={create} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1 text-sm font-medium text-[#001B08]">
              Shop with payable balance
              <select value={shopId} onChange={(event) => setShopId(event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]">
                <option value="">Select a shop…</option>
                {shops.map((shop) => <option key={shop.id} value={shop.id}>{shop.name} — {formatMinor(shop.summary.online.sellerPayableMinor)}</option>)}
              </select>
            </label>
            <button type="submit" disabled={loading} className="h-10 rounded-md bg-[#002B12] px-5 text-sm font-semibold text-white hover:bg-[#00451E] disabled:opacity-60">Create</button>
          </form>
          <p className="mt-3 text-xs text-zinc-500">
            Only online (PayFast) earnings with a finalised gateway fee are included. Payouts are made by you outside this system; here you only record them.
          </p>
        </Panel>
      )}

      <DataTable columns={columns} data={list.rows} meta={list.meta} loading={list.loading} filters={filters} filterValues={list.filters} onFilter={list.onFilter} page={list.page} limit={list.limit} onPageChange={list.onPageChange} onLimitChange={list.onLimitChange} emptyMessage="No settlements yet." />

      {dialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => event.target === event.currentTarget && !loading && setDialog(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-[#001B08]">Mark settlement as {dialog.status}</h2>
            <p className="mt-2 text-sm text-zinc-600">
              {dialog.status === "paid" ? `Confirm you transferred ${formatMinor(dialog.settlement.netMinor)} to the seller outside PakBazaar.` : "The included earnings return to the unsettled balance if marked failed."}
            </p>
            {dialog.status === "paid" && (
              <label className="mt-4 block text-sm font-medium text-[#001B08]">
                Bank transfer reference
                <input value={reference} onChange={(event) => setReference(event.target.value)} maxLength={100} className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]" />
              </label>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" disabled={loading} onClick={() => setDialog(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100">Cancel</button>
              <button type="button" disabled={loading} onClick={update} className="rounded-lg bg-[#002B12] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00451E] disabled:opacity-60">{loading ? "Saving…" : "Confirm"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettlementsPanel;
