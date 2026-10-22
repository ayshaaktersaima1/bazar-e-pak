"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import ConfirmationModal from "@/components/shared/confirmation-modal";
import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import OrderItems from "@/features/orders/order-items";
import { ProofList } from "@/features/orders/payment-proofs";
import useApi from "@/hooks/use-api";
import { PAYMENT_METHOD_LABELS, formatMinor, formatPKT, isValidPkrInput, minorToInput } from "@/utils/payments";

import { KeyValue, Panel } from "./finance-ui";

const newKey = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `r${Date.now()}${Math.random().toString(36).slice(2)}`);

const RefundForm = ({ order, caps, onDone }) => {
  const { post, loading } = useApi();
  const remaining = Math.max(0, order.totalMinor - (order.refundedMinor ?? 0));
  const [amount, setAmount] = useState(minorToInput(remaining));
  const [reason, setReason] = useState("");
  const [shopId, setShopId] = useState("");
  const [manualReference, setManualReference] = useState("");
  const requestId = useRef(newKey());
  const shops = [...new Set(order.items.map((item) => item.shopId))];
  const isCod = order.paymentMethod === "cod";

  const submit = async (event) => {
    event.preventDefault();

    if (!isValidPkrInput(amount) || Number(amount) <= 0) return toast.error("Enter a valid refund amount in PKR.");
    if (Math.round(Number(amount) * 100) > remaining) return toast.error(`At most ${formatMinor(remaining)} can still be refunded.`);
    if (reason.trim().length < 3) return toast.error("A refund reason is required.");
    if (isCod && manualReference.trim().length < 3) return toast.error("COD refunds are recorded manually — enter the bank transfer / receipt reference.");

    const result = await post(`/api/finance/admin/orders/${order.id}/refunds`, {
      amount: amount.trim(),
      reason: reason.trim(),
      requestId: requestId.current,
      ...(shopId ? { shopId } : {}),
      ...(isCod ? { manualReference: manualReference.trim() } : {}),
    });

    if (!result.success) return;

    requestId.current = newKey();

    const outcome = result.data?.outcome;

    if (outcome === "processed") toast.success("Refund processed");
    else if (outcome === "failed") toast.error("PayFast rejected the refund. Nothing was refunded.");
    else toast("The gateway outcome is unknown. Check the PayFast portal, then reconcile it from the Refunds page.", { icon: "⚠️", duration: 8000 });

    setReason("");
    onDone?.();
  };

  if (!caps.refund) return null;

  return (
    <Panel title="Issue a refund">
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#001B08]">
          Amount (PKR) — max {formatMinor(remaining)}
          <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]" />
        </label>
        <label className="text-sm font-medium text-[#001B08]">
          Limit to one shop (optional)
          <select value={shopId} onChange={(event) => setShopId(event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]">
            <option value="">All shops in the order</option>
            {shops.map((id) => <option key={id} value={id}>Shop …{id.slice(-6)}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-[#001B08] sm:col-span-2">
          Reason
          <input value={reason} onChange={(event) => setReason(event.target.value)} maxLength={500} className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]" />
        </label>
        {isCod && (
          <label className="text-sm font-medium text-[#001B08] sm:col-span-2">
            Manual refund reference (required for COD)
            <input value={manualReference} onChange={(event) => setManualReference(event.target.value)} maxLength={100} className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]" />
          </label>
        )}
        <div className="sm:col-span-2">
          <button type="submit" disabled={loading} className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60">
            {loading ? "Processing…" : isCod ? "Record manual refund" : "Refund via PayFast"}
          </button>
          <p className="mt-2 text-xs text-zinc-500">Each submission is protected against double clicks. {isCod ? "COD refunds are not sent to PayFast." : "The refund is sent to PayFast and recorded in the ledger."}</p>
        </div>
      </form>
    </Panel>
  );
};

const StaffOrderDetail = ({ orderId, base, caps }) => {
  const { get, post, loading } = useApi();
  const [order, setOrder] = useState(null);
  const [payments, setPayments] = useState([]);
  const [confirmCod, setConfirmCod] = useState(false);

  const [tick, setTick] = useState(0);
  const load = () => setTick((value) => value + 1);

  useEffect(() => {
    let alive = true;

    Promise.all([
      get(`/api/orders/${orderId}`),
      caps.view ? get(`/api/finance/admin/payments?orderId=${orderId}&limit=20`, {}, { showError: false }) : Promise.resolve({ success: false }),
    ]).then(([orderResult, paymentsResult]) => {
      if (!alive) return;

      if (orderResult.success) setOrder(orderResult.data);

      setPayments(paymentsResult.success ? paymentsResult.data : []);
    });

    return () => {
      alive = false;
    };
  }, [get, orderId, caps.view, tick]);

  if (!order) return <p className="py-16 text-center text-sm text-zinc-500">Loading order…</p>;

  const address = order.shippingAddress || {};
  const canCollect = caps.manage && order.paymentMethod === "cod" && order.paymentStatus === "cod_pending" && order.status !== "cancelled";
  const canRefund = ["paid", "partially_refunded"].includes(order.paymentStatus);

  const collect = async () => {
    const result = await post(`/api/finance/admin/orders/${order.id}/cod-collected`, {}, {}, { showSuccess: true, successMessage: "COD collection recorded" });

    setConfirmCod(false);

    if (result.success) load();
  };

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
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Items"><OrderItems items={order.items} totalMinor={order.totalMinor} refundedMinor={order.refundedMinor} /></Panel>

          <Panel title="Payment proofs"><ProofList orderId={order.id} canReview={caps.manage} /></Panel>

          {canRefund && <RefundForm order={order} caps={caps} onDone={load} />}
        </div>

        <div className="space-y-6">
          <Panel title="Payment">
            <KeyValue items={[["Method", PAYMENT_METHOD_LABELS[order.paymentMethod] ?? "—"], ["Status", <StatusBadge key="s" status={order.paymentStatus} />], ["Refunded", formatMinor(order.refundedMinor)]]} />
            {payments.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm">
                {payments.map((payment) => (
                  <li key={payment.id} className="flex items-center justify-between gap-2">
                    <Link href={`${base}/payments/${payment.id}`} className="truncate font-mono text-xs text-[#006B35] underline">{payment.basketId}</Link>
                    <StatusBadge status={payment.status} />
                  </li>
                ))}
              </ul>
            )}
            {canCollect && (
              <button type="button" onClick={() => setConfirmCod(true)} className="mt-4 w-full rounded-md bg-[#002B12] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00451E]">
                Mark COD cash collected
              </button>
            )}
          </Panel>

          <Panel title="Customer & delivery">
            <p className="text-sm leading-6 text-zinc-700">
              <strong>{address.fullName}</strong><br />
              {address.phone}<br />
              {address.addressLine}<br />
              {[address.city, address.province, address.postalCode].filter(Boolean).join(", ")}
              {address.notes && <><br /><em>{address.notes}</em></>}
            </p>
            <p className="mt-2 font-mono text-xs text-zinc-400">Customer ID {order.customerId}</p>
          </Panel>
        </div>
      </div>

      <ConfirmationModal
        open={confirmCod}
        variant="warning"
        title="Record COD cash collection?"
        message="This marks the order as paid and creates the 60/40 accounting entries. Only confirm after the cash was actually collected."
        confirmText="Mark collected"
        loading={loading}
        onConfirm={collect}
        onCancel={() => setConfirmCod(false)}
      />
    </div>
  );
};

export default StaffOrderDetail;
