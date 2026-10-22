"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatusBadge from "@/features/dashboard/common/ui/status-badge";
import useApi from "@/hooks/use-api";
import { formatMinor, formatPKT, isValidPkrInput } from "@/utils/payments";

const MAX_BYTES = 3 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];
const input =
  "mt-1 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#E8BB44] focus:ring-2 focus:ring-[#E8BB44]/20";

// Shared by customers (upload + view own) and staff (view + review).
// A screenshot is supporting evidence only; it never changes the payment status.
export const ProofList = ({ orderId, canReview = false, refreshKey = 0 }) => {
  const { get, blob, patch } = useApi();
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;

    get(`/api/orders/${orderId}/payment-proofs?limit=20`, {}, { showError: false }).then((result) => {
      if (!alive) return;

      setProofs(result.success ? result.data : []);
      setLoading(false);
    });

    return () => {
      alive = false;
    };
  }, [get, orderId, refreshKey, tick]);

  const view = async (proofId) => {
    const result = await blob(`/api/payments/proofs/${proofId}/file`);

    if (!result.success) return;

    const url = URL.createObjectURL(result.data);

    window.open(url, "_blank", "noopener");
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  };

  const review = async (proofId, status) => {
    const result = await patch(`/api/finance/admin/payment-proofs/${proofId}`, { status }, {}, { showSuccess: true, successMessage: `Proof ${status}` });

    if (result.success) setTick((value) => value + 1);
  };

  if (loading) return <p className="text-sm text-gray-500">Loading proofs…</p>;

  if (!proofs.length) return <p className="text-sm text-gray-500">No payment proof submitted yet.</p>;

  return (
    <ul className="space-y-2">
      {proofs.map((proof) => (
        <li key={proof.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-100 p-3 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-[#001B08]">{proof.originalName || "Screenshot"}</p>
            <p className="text-xs text-gray-500">
              {formatPKT(proof.createdAt)}
              {proof.declaredAmountMinor != null && ` · ${formatMinor(proof.declaredAmountMinor)}`}
              {proof.transactionReference && ` · Ref ${proof.transactionReference}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={proof.status} />
            <button type="button" onClick={() => view(proof.id)} className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50">
              View
            </button>
            {canReview && proof.status === "submitted" && (
              <>
                <button type="button" onClick={() => review(proof.id, "accepted")} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">
                  Accept
                </button>
                <button type="button" onClick={() => review(proof.id, "rejected")} className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700">
                  Reject
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

const PaymentProofs = ({ orderId }) => {
  const { upload, loading } = useApi();
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const submit = async (event) => {
    event.preventDefault();

    if (!file) return toast.error("Choose a screenshot first.");
    if (!TYPES.includes(file.type)) return toast.error("Only JPG, PNG or WebP images are allowed.");
    if (file.size > MAX_BYTES) return toast.error("The image must be smaller than 3 MB.");
    if (amount && !isValidPkrInput(amount)) return toast.error("Enter the amount in PKR (max 2 decimals).");

    const result = await upload(
      `/api/orders/${orderId}/payment-proofs`,
      file,
      { amount, reference, paymentDate, filename: file.name },
      { showSuccess: true, successMessage: "Payment proof submitted" },
    );

    if (!result.success) return;

    setFile(null);
    setAmount("");
    setReference("");
    setPaymentDate("");
    event.target.reset();
    setRefreshKey((value) => value + 1);
  };

  return (
    <div className="space-y-5">
      <p className="rounded-lg bg-[#F7F5EF] p-3 text-xs leading-5 text-gray-600">
        Upload a screenshot only if you paid outside the website (for example a bank transfer) or if support asked for it.
        A screenshot is reviewed by our team and <strong>does not confirm a PayFast payment</strong> by itself.
      </p>

      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#001B08] sm:col-span-2">
          Screenshot (JPG, PNG, WebP — max 3 MB)
          <input type="file" accept={TYPES.join(",")} onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mt-1 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#001B08] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white" />
        </label>
        <label className="text-sm font-medium text-[#001B08]">
          Amount paid (PKR, optional)
          <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" placeholder="1500.00" className={input} />
        </label>
        <label className="text-sm font-medium text-[#001B08]">
          Transaction reference (optional)
          <input value={reference} onChange={(event) => setReference(event.target.value)} maxLength={100} className={input} />
        </label>
        <label className="text-sm font-medium text-[#001B08]">
          Payment date (optional)
          <input type="date" value={paymentDate} onChange={(event) => setPaymentDate(event.target.value)} max={new Date().toISOString().slice(0, 10)} className={input} />
        </label>
        <div className="flex items-end">
          <button type="submit" disabled={loading} className="h-10 rounded-md bg-[#001B08] px-5 text-sm font-semibold text-white hover:bg-[#E8BB44] hover:text-[#001B08] disabled:opacity-60">
            {loading ? "Uploading…" : "Submit proof"}
          </button>
        </div>
      </form>

      <ProofList orderId={orderId} refreshKey={refreshKey} />
    </div>
  );
};

export default PaymentProofs;
