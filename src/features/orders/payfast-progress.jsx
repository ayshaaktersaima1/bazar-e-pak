"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";

import useApi from "@/hooks/use-api";
import { formatMinor } from "@/utils/payments";

const POLL_MS = 3000;
const POLL_MAX = 40; // ~2 minutes
const FINAL = ["paid", "partially_refunded", "refunded", "failed", "timed_out", "invalid", "cancelled"];

export const rememberPayment = (paymentId, data) => {
  try {
    sessionStorage.setItem(`pb_payment_${paymentId}`, JSON.stringify(data));
  } catch {
    // storage unavailable: the OTP field simply stays visible
  }
};

const recallPayment = (paymentId) => {
  try {
    return JSON.parse(sessionStorage.getItem(`pb_payment_${paymentId}`) || "{}");
  } catch {
    return {};
  }
};

// Confirms (OTP / after 3-D Secure) and then polls the server-verified status. The browser never
// decides that a payment succeeded — only `payment.status === "paid"` from the backend counts.
const PayfastProgress = ({ paymentId, orderHref, retryHref }) => {
  const { get, post } = useApi();
  const [payment, setPayment] = useState(null);
  const [note, setNote] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [polling, setPolling] = useState(false);

  const remembered = recallPayment(paymentId);
  const needsOtp = remembered.otpRequired !== false;

  const apply = useCallback((data) => {
    if (data?.payment) setPayment(data.payment);
    if (data?.message) setNote(data.message);

    return data;
  }, []);

  // initial status
  useEffect(() => {
    let alive = true;

    get(`/api/payments/payfast/${paymentId}/status`, {}, { showError: false }).then((result) => {
      if (!alive || !result.success) return;

      const data = apply(result.data);

      if (data?.payment?.status === "pending" && data.payment.stage === "charge_submitted") setPolling(true);
    });

    return () => {
      alive = false;
    };
  }, [paymentId, get, apply]);

  // polling until the SERVER says the payment is final (about 2 minutes max)
  useEffect(() => {
    if (!polling) return undefined;

    let count = 0;
    let stopped = false;

    const id = setInterval(async () => {
      count += 1;

      const result = await get(`/api/payments/payfast/${paymentId}/status`, {}, { showError: false });

      if (stopped) return;

      const data = result.success ? apply(result.data) : null;

      if (data?.finalized || FINAL.includes(data?.payment?.status)) {
        setPolling(false);
      } else if (count >= POLL_MAX) {
        setTimedOut(true);
        setPolling(false);
      }
    }, POLL_MS);

    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, [polling, paymentId, get, apply]);

  const confirm = async (event) => {
    event?.preventDefault();

    if (needsOtp && !/^\d{4,8}$/.test(otp)) {
      setNote("Enter the 4-8 digit OTP sent by your bank or wallet.");
      return;
    }

    setBusy(true);
    setNote("");

    const result = await post(
      `/api/payments/payfast/${paymentId}/confirm`,
      needsOtp ? { otp } : {},
    );

    setBusy(false);
    setOtp("");

    if (!result.success) return;

    const data = apply(result.data);

    if (!data?.finalized && data?.payment?.status === "pending") {
      setTimedOut(false);
      setPolling(true);
    }
  };

  const status = payment?.status;

  if (!payment) {
    return <p className="py-10 text-center text-sm text-gray-500">Loading payment…</p>;
  }

  if (status === "paid" || status === "partially_refunded" || status === "refunded") {
    return (
      <div className="text-center">
        <FaCheckCircle className="mx-auto text-5xl text-emerald-600" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-[#001B08]">Payment received</h2>
        <p className="mt-2 text-sm text-gray-600">
          {formatMinor(payment.amountMinor)} was confirmed by PayFast. Reference: {payment.basketId}
        </p>
        <Link href={orderHref} className="mt-6 inline-flex rounded-md bg-[#001B08] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E8BB44] hover:text-[#001B08]">
          View order
        </Link>
      </div>
    );
  }

  if (["failed", "timed_out", "invalid", "cancelled"].includes(status)) {
    return (
      <div className="text-center">
        <FaExclamationCircle className="mx-auto text-5xl text-red-500" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-[#001B08]">
          {status === "cancelled" ? "Payment cancelled" : "Payment was not completed"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {payment.failureMessage || "Your card or account was not charged for this attempt."}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={retryHref} className="inline-flex justify-center rounded-md bg-[#E8BB44] px-5 py-3 text-sm font-semibold text-[#001B08] hover:bg-[#001B08] hover:text-white">
            Try again
          </Link>
          <Link href={orderHref} className="inline-flex justify-center rounded-md border border-[#001B08] px-5 py-3 text-sm font-semibold text-[#001B08] hover:bg-[#001B08] hover:text-white">
            View order
          </Link>
        </div>
      </div>
    );
  }

  const submitted = payment.stage === "charge_submitted";

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#001B08]">
        {submitted ? "Confirming your payment" : "Confirm your payment"}
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Amount: <strong>{formatMinor(payment.amountMinor)}</strong>
      </p>

      {submitted ? (
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <FaSpinner className="animate-spin text-3xl text-[#E8BB44]" />
          <p className="text-sm text-gray-600">
            {timedOut
              ? "We are still confirming your payment with PayFast. Please do not pay again — check My Orders in a few minutes."
              : "Please wait while PayFast confirms your payment. Do not close this page."}
          </p>
          {timedOut && (
            <Link href={orderHref} className="text-sm font-semibold text-[#001B08] underline">
              Go to my order
            </Link>
          )}
        </div>
      ) : (
        <form onSubmit={confirm} className="mt-5 space-y-4">
          {needsOtp && (
            <label className="block text-sm font-medium text-[#001B08]">
              One-time password (OTP)
              <input
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 8))}
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Enter OTP"
                className="mt-1 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E8BB44] focus:ring-2 focus:ring-[#E8BB44]/20"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#E8BB44] px-4 font-semibold text-[#001B08] transition hover:bg-[#001B08] hover:text-white disabled:opacity-60"
          >
            {busy && <FaSpinner className="animate-spin" />}
            {busy ? "Processing…" : `Pay ${formatMinor(payment.amountMinor)}`}
          </button>
        </form>
      )}

      {note && <p className="mt-3 text-center text-sm text-amber-700">{note}</p>}
    </div>
  );
};

export default PayfastProgress;
