"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ConfirmationModal from "@/components/shared/confirmation-modal";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import useApi from "@/hooks/use-api";
import { PAYMENT_METHOD_LABELS, formatPKT } from "@/utils/payments";

import OrderItems from "./order-items";
import PaymentProofs from "./payment-proofs";
import RefundRequest from "./refund-request";

const Section = ({ title, children }) => (
  <section className="rounded-xl bg-white p-6 shadow-sm">
    <h2 className="mb-4 font-serif text-lg font-bold text-[#001B08]">{title}</h2>
    {children}
  </section>
);

const CustomerOrderDetail = ({ orderId }) => {
  const { get, post, loading } = useApi();
  const [order, setOrder] = useState(null);
  const [missing, setMissing] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const [tick, setTick] = useState(0);
  const load = () => setTick((value) => value + 1);

  useEffect(() => {
    let alive = true;

    get(`/api/orders/${orderId}`, {}, { showError: false }).then((result) => {
      if (!alive) return;

      if (result.success) setOrder(result.data);
      else setMissing(true);
    });

    return () => {
      alive = false;
    };
  }, [get, orderId, tick]);

  if (missing) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">We could not find this order.</p>
        <Link href="/orders" className="mt-4 inline-block font-semibold text-[#001B08] underline">Back to my orders</Link>
      </div>
    );
  }

  if (!order) return <p className="py-20 text-center text-sm text-gray-500">Loading order…</p>;

  const canPay = order.paymentMethod === "payfast" && order.status === "pending" && ["unpaid", "failed"].includes(order.paymentStatus);
  const canCancel = ["pending", "confirmed"].includes(order.status) && ["unpaid", "failed", "cod_pending"].includes(order.paymentStatus);
  const canRefund = ["paid", "partially_refunded"].includes(order.paymentStatus);
  const address = order.shippingAddress || {};

  const cancel = async () => {
    const result = await post(`/api/orders/${order.id}/cancel`, {}, {}, { showSuccess: true, successMessage: "Order cancelled" });

    setConfirmCancel(false);

    if (result.success) load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8BB44]">Order</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#001B08]">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-gray-500">Placed {formatPKT(order.createdAt)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
        </div>
      </div>

      {canPay && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E8BB44]/40 bg-[#E8BB44]/10 p-4">
          <p className="text-sm text-[#001B08]">
            This order is waiting for payment.
            {order.expiresAt && ` Please pay before ${formatPKT(order.expiresAt)}.`}
          </p>
          <Link href={`/orders/${order.id}/pay`} className="rounded-md bg-[#001B08] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E8BB44] hover:text-[#001B08]">
            {order.paymentStatus === "failed" ? "Try payment again" : "Pay now"}
          </Link>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section title="Items">
            <OrderItems items={order.items} totalMinor={order.totalMinor} refundedMinor={order.refundedMinor} />
          </Section>

          <Section title="Payment proof">
            <PaymentProofs orderId={order.id} />
          </Section>

          {canRefund && (
            <Section title="Request a refund">
              <RefundRequest order={order} onDone={load} />
            </Section>
          )}
        </div>

        <div className="space-y-6">
          <Section title="Payment">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-3"><dt className="text-gray-500">Method</dt><dd className="font-medium">{PAYMENT_METHOD_LABELS[order.paymentMethod] ?? "—"}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-gray-500">Status</dt><dd><StatusBadge status={order.paymentStatus} /></dd></div>
            </dl>
            {order.paymentMethod === "cod" && order.paymentStatus === "cod_pending" && (
              <p className="mt-3 text-xs text-gray-500">Pay in cash when your order arrives. It is marked paid only after the cash is collected.</p>
            )}
          </Section>

          <Section title="Delivery address">
            <p className="text-sm leading-6 text-gray-700">
              <strong>{address.fullName}</strong><br />
              {address.addressLine}<br />
              {[address.city, address.province, address.postalCode].filter(Boolean).join(", ")}<br />
              {address.phone}
            </p>
          </Section>

          {canCancel && (
            <button type="button" onClick={() => setConfirmCancel(true)} className="w-full rounded-md border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
              Cancel order
            </button>
          )}
        </div>
      </div>

      <ConfirmationModal
        open={confirmCancel}
        title="Cancel this order?"
        message="Your items will be released back to the shop. This cannot be undone."
        confirmText="Cancel order"
        loading={loading}
        onConfirm={cancel}
        onCancel={() => setConfirmCancel(false)}
      />
    </div>
  );
};

export default CustomerOrderDetail;
