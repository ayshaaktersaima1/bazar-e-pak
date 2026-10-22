"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import { formatMinor, isValidPkrInput, minorToInput } from "@/utils/payments";

const RefundRequest = ({ order, onDone }) => {
  const { post, loading } = useApi();
  const remaining = Math.max(0, (order.totalMinor ?? 0) - (order.refundedMinor ?? 0));
  const [amount, setAmount] = useState(minorToInput(remaining));
  const [reason, setReason] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    if (!isValidPkrInput(amount) || Number(amount) <= 0) return toast.error("Enter a valid refund amount in PKR.");
    if (Math.round(Number(amount) * 100) > remaining) return toast.error(`You can request at most ${formatMinor(remaining)}.`);
    if (reason.trim().length < 3) return toast.error("Please tell us why you want a refund.");

    const result = await post(
      `/api/orders/${order.id}/refund-requests`,
      { amount: amount.trim(), reason: reason.trim() },
      {},
      { showSuccess: true, successMessage: "Refund request sent" },
    );

    if (result.success) {
      setReason("");
      onDone?.();
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium text-[#001B08]">
          Amount (PKR)
          <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E8BB44]" />
        </label>
        <label className="text-sm font-medium text-[#001B08] sm:col-span-2">
          Reason
          <input value={reason} onChange={(event) => setReason(event.target.value)} maxLength={500} placeholder="Damaged item, wrong product…" className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E8BB44]" />
        </label>
      </div>
      <button type="submit" disabled={loading} className="rounded-md border border-[#001B08] px-5 py-2.5 text-sm font-semibold text-[#001B08] hover:bg-[#001B08] hover:text-white disabled:opacity-60">
        {loading ? "Sending…" : "Request refund"}
      </button>
    </form>
  );
};

export default RefundRequest;
