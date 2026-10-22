"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import DataTable from "@/features/dashboard/common/table/data-table";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import useApi from "@/hooks/use-api";
import usePaginated from "@/hooks/use-paginated";
import { formatMinor, formatPKT, humanize } from "@/utils/payments";

const filters = [
  { key: "status", label: "All statuses", options: ["requested", "approved", "processing", "processed", "failed", "rejected"].map((value) => ({ value, label: humanize(value) })) },
];

const RefundsTable = ({ base, caps }) => {
  const { post, loading } = useApi();
  const list = usePaginated("/api/finance/admin/refunds");
  const [action, setAction] = useState(null); // {type, refund}
  const [reference, setReference] = useState("");

  const run = async () => {
    const { type, refund } = action;
    let result;

    if (type === "process") {
      result = await post(`/api/finance/admin/refunds/${refund.id}/process`, refund.method === "manual" ? { manualReference: reference.trim() } : {});
    } else if (type === "reject") {
      result = await post(`/api/finance/admin/refunds/${refund.id}/reject`, {});
    } else if (type === "reconcile-ok") {
      if (reference.trim().length < 3) return toast.error("Enter the PayFast reference from the merchant portal.");
      result = await post(`/api/finance/admin/refunds/${refund.id}/reconcile`, { outcome: "processed", gatewayReference: reference.trim() });
    } else {
      result = await post(`/api/finance/admin/refunds/${refund.id}/reconcile`, { outcome: "failed" });
    }

    if (result.success) {
      toast.success("Refund updated");
      setAction(null);
      setReference("");
      list.refresh();
    }
  };

  const columns = [
    { key: "createdAt", label: "Created", render: (row) => <span className="text-xs">{formatPKT(row.createdAt)}</span> },
    { key: "orderId", label: "Order", render: (row) => <Link href={`${base}/orders/${row.orderId}`} className="text-xs text-[#006B35] underline">Open order</Link> },
    { key: "amountMinor", label: "Amount", render: (row) => <span className="font-semibold">{formatMinor(row.amountMinor)}</span> },
    { key: "reason", label: "Reason", render: (row) => <span className="block max-w-[220px] truncate" title={row.reason}>{row.reason || "—"}</span> },
    { key: "method", label: "Method", render: (row) => (row.method ? humanize(row.method) : "—") },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="flex flex-col gap-1">
          <StatusBadge status={row.status} />
          {row.needsReconciliation && <span className="text-[11px] font-semibold text-red-600">Needs reconciliation</span>}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) =>
        !caps.refund ? null : (
          <div className="flex flex-wrap gap-1.5">
            {row.status === "requested" && (
              <>
                <button type="button" onClick={() => setAction({ type: "process", refund: row })} className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700">Approve & pay</button>
                <button type="button" onClick={() => setAction({ type: "reject", refund: row })} className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700">Reject</button>
              </>
            )}
            {row.status === "processing" && row.needsReconciliation && (
              <>
                <button type="button" onClick={() => setAction({ type: "reconcile-ok", refund: row })} className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700">Mark paid</button>
                <button type="button" onClick={() => setAction({ type: "reconcile-fail", refund: row })} className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700">Mark failed</button>
              </>
            )}
          </div>
        ),
    },
  ];

  const needsRef = action && (action.type === "reconcile-ok" || (action.type === "process" && action.refund.method === "manual"));
  const messages = {
    process: "The refund will be sent to PayFast (online orders) and recorded in the ledger.",
    reject: "The customer's refund request will be rejected.",
    "reconcile-ok": "Confirm that the refund was completed in the PayFast merchant portal and enter its reference.",
    "reconcile-fail": "Confirm that the refund did NOT happen at PayFast. The reserved amount will be released.",
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={list.rows}
        meta={list.meta}
        loading={list.loading}
        filters={filters}
        filterValues={list.filters}
        onFilter={list.onFilter}
        page={list.page}
        limit={list.limit}
        onPageChange={list.onPageChange}
        onLimitChange={list.onLimitChange}
        emptyMessage="No refunds found."
      />

      {action && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => event.target === event.currentTarget && !loading && setAction(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-[#001B08]">{humanize(action.type.replace("-", " "))}</h2>
            <p className="mt-2 text-sm text-zinc-600">{messages[action.type]} Amount: <strong>{formatMinor(action.refund.amountMinor)}</strong>.</p>
            {needsRef && (
              <label className="mt-4 block text-sm font-medium text-[#001B08]">
                {action.type === "process" ? "Manual refund reference" : "PayFast reference"}
                <input value={reference} onChange={(event) => setReference(event.target.value)} maxLength={100} className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]" />
              </label>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" disabled={loading} onClick={() => setAction(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100">Cancel</button>
              <button type="button" disabled={loading} onClick={run} className="rounded-lg bg-[#002B12] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00451E] disabled:opacity-60">{loading ? "Working…" : "Confirm"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RefundsTable;
