"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DataTable from "@/features/dashboard/common/table/data-table";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import useApi from "@/hooks/use-api";
import usePaginated from "@/hooks/use-paginated";
import { PAYMENT_METHOD_LABELS, formatMinor, formatPKT, humanize } from "@/utils/payments";

import { KeyValue, Panel, SummaryCards } from "./finance-ui";

const TABS = [
  { key: "allocations", label: "Earnings" },
  { key: "transactions", label: "Transactions" },
  { key: "orders", label: "Orders" },
  { key: "refunds", label: "Refunds" },
  { key: "settlements", label: "Settlements" },
];

const columnsFor = (tab, base) => {
  switch (tab) {
    case "allocations":
      return [
        { key: "createdAt", label: "Date", render: (r) => <span className="text-xs">{formatPKT(r.createdAt)}</span> },
        { key: "orderId", label: "Order", render: (r) => (base ? <Link href={`${base}/orders/${r.orderId}`} className="text-xs text-[#006B35] underline">Open</Link> : <span className="font-mono text-xs">…{r.orderId.slice(-6)}</span>) },
        { key: "paymentMethod", label: "Method", render: (r) => PAYMENT_METHOD_LABELS[r.paymentMethod] ?? "—" },
        { key: "grossMinor", label: "Gross", render: (r) => formatMinor(r.grossMinor) },
        { key: "gatewayFeeMinor", label: "Gateway fee", render: (r) => formatMinor(r.gatewayFeeMinor) },
        { key: "sellerShareMinor", label: "Seller share", render: (r) => <span className="font-semibold">{formatMinor(r.sellerShareMinor - r.sellerRefundedMinor)}</span> },
        { key: "platformShareMinor", label: "PakBazaar share", render: (r) => formatMinor(r.platformShareMinor - r.platformRefundedMinor) },
        { key: "accountingState", label: "Accounting", render: (r) => <StatusBadge status={r.accountingState} /> },
        { key: "settlementStatus", label: "Settlement", render: (r) => <StatusBadge status={r.settlementStatus} /> },
      ];
    case "transactions":
      return [
        { key: "createdAt", label: "Date", render: (r) => <span className="text-xs">{formatPKT(r.createdAt)}</span> },
        { key: "type", label: "Type", render: (r) => humanize(r.type) },
        { key: "account", label: "Account", render: (r) => humanize(r.account) },
        { key: "amountMinor", label: "Amount", render: (r) => <span className={`font-semibold ${r.direction === "credit" ? "text-emerald-700" : "text-red-600"}`}>{r.direction === "credit" ? "+" : "−"} {formatMinor(r.amountMinor)}</span> },
        { key: "state", label: "State", render: (r) => <StatusBadge status={r.state} /> },
        { key: "reference", label: "Reference", render: (r) => r.reference || "—" },
      ];
    case "orders":
      return [
        { key: "orderNumber", label: "Order", render: (r) => (base ? <Link href={`${base}/orders/${r.id}`} className="font-semibold text-[#001B08] hover:text-[#B78A10]">{r.orderNumber}</Link> : r.orderNumber) },
        { key: "createdAt", label: "Placed", render: (r) => <span className="text-xs">{formatPKT(r.createdAt)}</span> },
        { key: "totalMinor", label: "Total", render: (r) => formatMinor(r.totalMinor) },
        { key: "paymentStatus", label: "Payment", render: (r) => <StatusBadge status={r.paymentStatus} /> },
        { key: "status", label: "Order", render: (r) => <StatusBadge status={r.status} /> },
      ];
    case "refunds":
      return [
        { key: "createdAt", label: "Date", render: (r) => <span className="text-xs">{formatPKT(r.createdAt)}</span> },
        { key: "amountMinor", label: "Amount", render: (r) => formatMinor(r.amountMinor) },
        { key: "reason", label: "Reason", render: (r) => <span className="block max-w-[240px] truncate">{r.reason || "—"}</span> },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ];
    default:
      return [
        { key: "createdAt", label: "Created", render: (r) => <span className="text-xs">{formatPKT(r.createdAt)}</span> },
        { key: "netMinor", label: "Payout", render: (r) => <span className="font-semibold">{formatMinor(r.netMinor)}</span> },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        { key: "reference", label: "Bank reference", render: (r) => r.reference || "—" },
        { key: "paidAt", label: "Paid", render: (r) => formatPKT(r.paidAt) },
      ];
  }
};

const TabTable = ({ endpoint, tab, base }) => {
  const list = usePaginated(endpoint);

  return (
    <DataTable
      columns={columnsFor(tab, base)}
      data={list.rows}
      meta={list.meta}
      loading={list.loading}
      page={list.page}
      limit={list.limit}
      onPageChange={list.onPageChange}
      onLimitChange={list.onLimitChange}
      emptyMessage="Nothing to show yet."
    />
  );
};

// mode "seller": own shop (server-derived). mode "staff": any shop by id (permission enforced by the API).
const ShopFinance = ({ mode = "seller", shopId, base }) => {
  const { get } = useApi();
  const [tab, setTab] = useState("allocations");
  const [header, setHeader] = useState(null);
  const prefix = mode === "seller" ? "/api/finance/seller" : `/api/finance/admin/shops/${shopId}`;

  useEffect(() => {
    let alive = true;

    get(mode === "seller" ? "/api/finance/seller/summary" : `/api/finance/admin/shops/${shopId}`).then((result) => {
      if (!alive || !result.success) return;

      setHeader(mode === "seller" ? { shop: result.data.shop, summary: result.data } : result.data);
    });

    return () => {
      alive = false;
    };
  }, [get, mode, shopId]);

  return (
    <div className="space-y-6">
      {header?.shop && (
        <Panel title={header.shop.name}>
          {mode === "staff" && (
            <KeyValue
              items={[
                ["Status", <StatusBadge key="s" status={header.shop.status} />],
                ["Type", header.shop.source === "pakbazaar" ? "PakBazaar native" : "External seller"],
                ["City", header.shop.city],
                ["Phone", header.shop.phone],
                ["Email", header.shop.email],
                ["Registered", formatPKT(header.shop.createdAt)],
              ]}
            />
          )}
          {mode === "seller" && <p className="text-sm text-zinc-500">Earnings are your 60% share of each paid order. Online payouts are recorded by PakBazaar after the PayFast fee is finalised.</p>}
        </Panel>
      )}

      <SummaryCards summary={header?.summary} />

      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-3">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${tab === item.key ? "bg-[#002B12] text-[#F0B92E]" : "bg-white text-zinc-600 hover:bg-[#002B12]/5"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <TabTable key={tab} endpoint={`${prefix}/${tab}`} tab={tab} base={base} />
    </div>
  );
};

export default ShopFinance;
