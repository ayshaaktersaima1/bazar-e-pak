"use client";

import { useEffect, useState } from "react";

import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import OrderItems from "@/features/orders/order-items";
import useApi from "@/hooks/use-api";
import { PAYMENT_METHOD_LABELS, formatPKT } from "@/utils/payments";

import { KeyValue, Panel } from "./finance-ui";

// Sellers only ever receive the items that belong to their own shop (the API filters server-side).
const SellerOrderDetail = ({ orderId }) => {
  const { get } = useApi();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    get(`/api/orders/${orderId}`).then((result) => result.success && setOrder(result.data));
  }, [get, orderId]);

  if (!order) return <p className="py-16 text-center text-sm text-zinc-500">Loading order…</p>;

  const address = order.shippingAddress || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#001B08]">{order.orderNumber}</h2>
          <p className="text-sm text-zinc-500">Placed {formatPKT(order.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Your items in this order" className="lg:col-span-2">
          <OrderItems items={order.items} totalMinor={order.totalMinor} />
          <p className="mt-3 text-xs text-zinc-500">Orders can contain items from several shops; you only see your own.</p>
        </Panel>

        <div className="space-y-6">
          <Panel title="Payment">
            <KeyValue items={[["Method", PAYMENT_METHOD_LABELS[order.paymentMethod] ?? "—"], ["Status", <StatusBadge key="s" status={order.paymentStatus} />]]} />
            {order.paymentMethod === "cod" && order.paymentStatus === "cod_pending" && (
              <p className="mt-3 text-xs text-zinc-500">Cash on delivery — payment is recorded by PakBazaar once the cash has been collected.</p>
            )}
          </Panel>

          <Panel title="Deliver to">
            <p className="text-sm leading-6 text-zinc-700">
              <strong>{address.fullName}</strong><br />
              {address.phone}<br />
              {address.addressLine}<br />
              {[address.city, address.province, address.postalCode].filter(Boolean).join(", ")}
              {address.notes && <><br /><em>{address.notes}</em></>}
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetail;
