"use client";

import Link from "next/link";

import DataTable from "@/features/dashboard/common/table/data-table";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import usePaginated from "@/hooks/use-paginated";
import { formatMinor } from "@/utils/payments";

const filters = [
  { key: "status", label: "All statuses", options: ["active", "pending", "suspended", "inactive"].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })) },
];

const ShopsFinanceTable = ({ base }) => {
  const list = usePaginated("/api/finance/admin/shops");

  const columns = [
    {
      key: "name",
      label: "Shop",
      render: (row) => (
        <Link href={`${base}/finance/${row.id}`} className="font-semibold text-[#001B08] hover:text-[#B78A10]">
          {row.name}
        </Link>
      ),
    },
    { key: "source", label: "Type", render: (row) => (row.source === "pakbazaar" ? "PakBazaar native" : "External seller") },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "orders", label: "Orders", render: (row) => row.summary?.orders ?? 0 },
    { key: "gross", label: "Gross", render: (row) => formatMinor(row.summary?.grossMinor) },
    { key: "seller", label: "Seller share", render: (row) => formatMinor(row.summary?.sellerShareMinor) },
    { key: "platform", label: "PakBazaar share", render: (row) => formatMinor(row.summary?.platformShareMinor) },
    { key: "payable", label: "Online payable", render: (row) => <span className="font-semibold">{formatMinor(row.summary?.online?.sellerPayableMinor)}</span> },
  ];

  return (
    <DataTable
      columns={columns}
      data={list.rows}
      meta={list.meta}
      loading={list.loading}
      search
      searchValue={list.search}
      onSearch={list.onSearch}
      searchPlaceholder="Search shops..."
      filters={filters}
      filterValues={list.filters}
      onFilter={list.onFilter}
      page={list.page}
      limit={list.limit}
      onPageChange={list.onPageChange}
      onLimitChange={list.onLimitChange}
      emptyMessage="No shops found."
    />
  );
};

export default ShopsFinanceTable;
