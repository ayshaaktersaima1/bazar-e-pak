"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Pagination from "@/components/shared/pagination";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import useApi from "@/hooks/use-api";
import { PAYMENT_METHOD_LABELS, formatMinor, formatPKT } from "@/utils/payments";

const CustomerOrdersList = () => {
  const { get } = useApi();
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);

      const result = await get(`/api/orders?page=${page}&limit=${limit}`);

      if (!alive) return;

      if (result.success) {
        setOrders(result.data);
        setMeta({ total: result.pagination?.total ?? result.data.length, totalPages: result.pagination?.totalPages ?? 1 });
      }

      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [get, page, limit]);

  if (loading) return <p className="py-16 text-center text-sm text-gray-500">Loading your orders…</p>;

  if (!orders.length) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <p className="font-semibold text-[#001B08]">You have not placed any orders yet.</p>
        <Link href="/products" className="mt-4 inline-block rounded-md bg-[#001B08] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E8BB44] hover:text-[#001B08]">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link key={order.id} href={`/orders/${order.id}`} className="block rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-[#001B08]">{order.orderNumber}</p>
              <p className="text-xs text-gray-500">{formatPKT(order.createdAt)} · {PAYMENT_METHOD_LABELS[order.paymentMethod] ?? "—"}</p>
            </div>
            <p className="text-lg font-bold text-[#001B08]">{formatMinor(order.totalMinor)}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="truncate text-sm text-gray-600">{order.items.map((item) => `${item.quantity}× ${item.productName}`).join(", ")}</p>
            <div className="flex gap-2">
              <StatusBadge status={order.status} />
              <StatusBadge status={order.paymentStatus} />
            </div>
          </div>
        </Link>
      ))}

      <Pagination page={page} limit={limit} total={meta.total} totalPages={meta.totalPages} onPageChange={setPage} onLimitChange={(value) => { setLimit(value); setPage(1); }} />
    </div>
  );
};

export default CustomerOrdersList;
