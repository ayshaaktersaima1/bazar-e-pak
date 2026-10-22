"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import useApi from "@/hooks/use-api";
import { formatMinor, formatPKT, humanize, isValidPkrInput } from "@/utils/payments";

import { KeyValue, Panel } from "./finance-ui";

const PaymentDetail = ({ paymentId, base, caps }) => {
  const { get, post, loading } = useApi();
  const [data, setData] = useState(null);
  const [fee, setFee] = useState("");
  const [feeRef, setFeeRef] = useState("");

  const [tick, setTick] = useState(0);
  const load = () => setTick((value) => value + 1);

  useEffect(() => {
    let alive = true;

    get(`/api/finance/admin/payments/${paymentId}`).then((result) => {
      if (alive && result.success) setData(result.data);
    });

    return () => {
      alive = false;
    };
  }, [get, paymentId, tick]);

  if (!data) return <p className="py-16 text-center text-sm text-zinc-500">Loading payment…</p>;

  const { payment, allocations } = data;
  const online = payment.provider === "payfast";

  const verify = async () => {
    const result = await post(`/api/finance/admin/payments/${paymentId}/verify`, {}, {}, { showSuccess: true, successMessage: "Gateway status re-checked" });

    if (result.success) load();
  };

  const saveFee = async (event) => {
    event.preventDefault();

    if (!isValidPkrInput(fee)) return toast.error("Enter the actual gateway fee in PKR (max 2 decimals).");

    const result = await post(
      `/api/finance/admin/payments/${paymentId}/gateway-fee`,
      { gatewayFee: fee.trim(), ...(feeRef.trim() ? { reference: feeRef.trim() } : {}) },
      {},
      { showSuccess: true, successMessage: "Gateway fee recorded — allocations are now final" },
    );

    if (result.success) {
      setFee("");
      load();
    }
  };

  return (
    <div className="space-y-6">
      <Panel
        title="Payment"
        action={
          <div className="flex gap-2">
            <StatusBadge status={payment.status} />
            <Link href={`${base}/orders/${payment.orderId}`} className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-semibold hover:bg-zinc-50">Open order</Link>
          </div>
        }
      >
        <KeyValue
          items={[
            ["Basket ID", payment.basketId],
            ["Gateway transaction", payment.providerReference],
            ["Provider", humanize(payment.provider)],
            ["Type", payment.method?.toUpperCase()],
            ["Amount", formatMinor(payment.amountMinor)],
            ["Refunded", formatMinor(payment.refundedMinor)],
            ["Gateway code", payment.gatewayStatusCode],
            ["Amount verification", payment.amountVerification ? humanize(payment.amountVerification) : "—"],
            ["Paid at", formatPKT(payment.paidAt)],
            ["Verified at", formatPKT(payment.verifiedAt)],
            ["Failure", payment.failureMessage],
            ["Flags", payment.flags?.join(", ") || "—"],
          ]}
        />

        {payment.amountVerification === "request_only" && (
          <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            The PayFast status response did not include an amount, so the paid amount is verified only against the amount the server sent.
          </p>
        )}

        {online && caps.manage && !["paid", "partially_refunded", "refunded"].includes(payment.status) && (
          <button type="button" onClick={verify} disabled={loading} className="mt-4 rounded-md bg-[#002B12] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00451E] disabled:opacity-60">
            Re-check with PayFast
          </button>
        )}
      </Panel>

      <Panel title="Accounting (60% seller / 40% PakBazaar)">
        {allocations.length === 0 ? (
          <p className="text-sm text-zinc-500">No allocation yet — it is created when the payment is confirmed.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-[11px] uppercase tracking-wide text-zinc-500">
                  <th className="py-2 pr-3">Shop</th><th className="pr-3">Gross</th><th className="pr-3">Fee</th><th className="pr-3">Distributable</th><th className="pr-3">Seller</th><th className="pr-3">PakBazaar</th><th className="pr-3">State</th><th>Settlement</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((a) => (
                  <tr key={a.id} className="border-b border-zinc-100">
                    <td className="py-2 pr-3"><Link href={`${base}/finance/${a.shopId}`} className="font-mono text-xs text-[#006B35] underline">{a.shopId.slice(-6)}</Link></td>
                    <td className="pr-3">{formatMinor(a.grossMinor)}</td>
                    <td className="pr-3">{formatMinor(a.gatewayFeeMinor)}</td>
                    <td className="pr-3">{formatMinor(a.distributableMinor)}</td>
                    <td className="pr-3">{formatMinor(a.sellerShareMinor - a.sellerRefundedMinor)}</td>
                    <td className="pr-3">{formatMinor(a.platformShareMinor - a.platformRefundedMinor)}</td>
                    <td className="pr-3"><StatusBadge status={a.accountingState} /></td>
                    <td><StatusBadge status={a.settlementStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {online && caps.manage && ["paid"].includes(payment.status) && allocations.every((a) => a.refundedGrossMinor === 0 && a.settlementStatus === "unsettled") && (
          <form onSubmit={saveFee} className="mt-5 grid gap-3 border-t border-zinc-100 pt-5 sm:grid-cols-3">
            <label className="text-sm font-medium text-[#001B08]">
              Actual gateway fee (PKR)
              <input value={fee} onChange={(event) => setFee(event.target.value)} inputMode="decimal" placeholder="e.g. 45.00" className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]" />
            </label>
            <label className="text-sm font-medium text-[#001B08]">
              Statement reference (optional)
              <input value={feeRef} onChange={(event) => setFeeRef(event.target.value)} maxLength={100} className="mt-1 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#D9A928]" />
            </label>
            <div className="flex items-end">
              <button type="submit" disabled={loading} className="h-10 rounded-md bg-[#D9A928] px-5 text-sm font-semibold text-[#002B12] hover:bg-[#F0B92E] disabled:opacity-60">
                Record actual fee
              </button>
            </div>
            <p className="text-xs text-zinc-500 sm:col-span-3">
              PayFast does not expose the fee through its API. Enter it from your PayFast statement; allocations then become final and eligible for settlement.
            </p>
          </form>
        )}
      </Panel>
    </div>
  );
};

export default PaymentDetail;
