"use client";

import Link from "next/link";

import DataTable from "@/features/dashboard/common/table/data-table";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import usePaginated from "@/hooks/use-paginated";
import { PAYMENT_METHOD_LABELS, formatMinor, formatPKT } from "@/utils/payments";

const filters = [
  { key: "status", label: "All order statuses", options: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })) },
  { key: "paymentStatus", label: "All payment statuses", options: ["unpaid", "pending", "paid", "failed", "cod_pending", "partially_refunded", "refunded", "cancelled"].map((value) => ({ value, label: value.replace(/_/g, " ") })) },
  { key: "paymentMethod", label: "All methods", options: [{ value: "cod", label: "Cash on Delivery" }, { value: "payfast", label: "PayFast" }] },
];

// mode "seller": the seller's own shop (derived by the server from the login).
// mode "staff": all orders (admin with orders.view / super admin).
const OrdersTable = ({ mode = "staff", base, lockedStatus, defaultFilters = {} }) => {
  const endpoint = mode === "seller" ? "/api/finance/seller/orders" : "/api/orders";
  const list = usePaginated(endpoint, { extra: lockedStatus ? { status: lockedStatus } : {}, initialFilters: defaultFilters });

  const columns = [
    {
      key: "orderNumber",
      label: "Order",
      render: (row) => (
        <Link href={`${base}/orders/${row.id}`} className="font-semibold text-[#001B08] hover:text-[#B78A10]">
          {row.orderNumber}
        </Link>
      ),
    },
    { key: "createdAt", label: "Placed", render: (row) => <span className="text-xs">{formatPKT(row.createdAt)}</span> },
    { key: "items", label: "Items", render: (row) => row.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0 },
    { key: "totalMinor", label: mode === "seller" ? "Your total" : "Total", render: (row) => <span className="font-semibold">{formatMinor(row.totalMinor)}</span> },
    { key: "paymentMethod", label: "Method", render: (row) => PAYMENT_METHOD_LABELS[row.paymentMethod] ?? "—" },
    { key: "paymentStatus", label: "Payment", render: (row) => <StatusBadge status={row.paymentStatus} /> },
    { key: "status", label: "Order", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <DataTable
      columns={columns}
      data={list.rows}
      meta={list.meta}
      loading={list.loading}
      filters={lockedStatus ? filters.filter((filter) => filter.key !== "status") : filters}
      filterValues={list.filters}
      onFilter={list.onFilter}
      page={list.page}
      limit={list.limit}
      onPageChange={list.onPageChange}
      onLimitChange={list.onLimitChange}
      emptyMessage="No orders found."
    />
  );
};

export default OrdersTable;
