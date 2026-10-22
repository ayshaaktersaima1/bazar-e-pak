"use client";

import Link from "next/link";

import DataTable from "@/features/dashboard/common/table/data-table";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import usePaginated from "@/hooks/use-paginated";
import { formatMinor, formatPKT, humanize } from "@/utils/payments";

const filters = [
  { key: "status", label: "All statuses", options: ["pending", "paid", "failed", "cancelled", "timed_out", "invalid", "partially_refunded", "refunded"].map((value) => ({ value, label: humanize(value) })) },
  { key: "provider", label: "All providers", options: [{ value: "payfast", label: "PayFast" }, { value: "cod", label: "Cash on Delivery" }] },
];

const PaymentsTable = ({ base }) => {
  const list = usePaginated("/api/finance/admin/payments");

  const columns = [
    { key: "basketId", label: "Basket / Reference", render: (row) => <Link href={`${base}/payments/${row.id}`} className="font-mono text-xs font-semibold text-[#001B08] hover:text-[#B78A10]">{row.basketId}</Link> },
    { key: "createdAt", label: "Created", render: (row) => <span className="text-xs">{formatPKT(row.createdAt)}</span> },
    { key: "provider", label: "Provider", render: (row) => humanize(row.provider) },
    { key: "method", label: "Type", render: (row) => (row.method ? row.method.toUpperCase() : "—") },
    { key: "amountMinor", label: "Amount", render: (row) => <span className="font-semibold">{formatMinor(row.amountMinor)}</span> },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "flags", label: "Flags", render: (row) => (row.flags?.length ? <span className="text-xs font-semibold text-red-600">{row.flags.join(", ")}</span> : "—") },
    { key: "order", label: "Order", render: (row) => <Link href={`${base}/orders/${row.orderId}`} className="text-xs text-[#006B35] underline">Open</Link> },
  ];

  return (
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
      emptyMessage="No payments found."
    />
  );
};

export default PaymentsTable;
