"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaLock, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import { formatMinor } from "@/utils/payments";

import PayfastProgress, { rememberPayment } from "./payfast-progress";

const input =
  "mt-1 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#E8BB44] focus:ring-2 focus:ring-[#E8BB44]/20";
const err = "mt-1 text-xs text-red-600";

const TYPE_LABELS = { CARD: "Debit / Credit Card", ACCOUNT: "Bank Account", WALLET: "Mobile Wallet" };

// Collects instrument details and sends them ONLY to POST /api/payments/payfast/initiate.
// Nothing is stored in state beyond the form, logged, or persisted; fields are cleared after submit.
const PayfastPayment = ({ order }) => {
  const { get, post } = useApi();
  const [types, setTypes] = useState(null);
  const [paymentId, setPaymentId] = useState(order.paymentStatus === "pending" ? order.paymentId : null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { accountType: "CARD" } });

  const accountType = useWatch({ control, name: "accountType" });
  const orderHref = `/orders/${order.id}`;

  useEffect(() => {
    let alive = true;

    get("/api/payments/methods", {}, { auth: false, showError: false }).then((result) => {
      if (alive) setTypes(result.success && result.data?.payfast?.enabled ? result.data.payfast.accountTypes : []);
    });

    return () => {
      alive = false;
    };
  }, [get]);

  const onSubmit = async (values) => {
    setSubmitting(true);

    const instrument =
      values.accountType === "CARD"
        ? {
            card_number: values.cardNumber.replace(/\s+/g, ""),
            expiry_month: values.expiryMonth,
            expiry_year: values.expiryYear,
            cvv: values.cvv,
          }
        : {
            account_number: values.accountNumber.trim(),
            ...(values.cnic ? { cnic_number: values.cnic.replace(/\D/g, "") } : {}),
          };

    const result = await post("/api/payments/payfast/initiate", {
      orderId: order.id,
      accountType: values.accountType,
      mobileNumber: values.mobile.trim(),
      instrument,
    });

    reset({ accountType: values.accountType, mobile: values.mobile }); // wipe sensitive fields
    setSubmitting(false);

    if (!result.success) return;

    const data = result.data;

    rememberPayment(data.paymentId, { otpRequired: data.otpRequired, orderId: order.id });

    if (data.threeDS?.required) {
      if (!data.threeDS.html) {
        toast.error("This card needs a 3-D Secure method that is not supported yet. Please use another card or Cash on Delivery.");
        return;
      }

      // The bank page must run top-level; it returns through the API to /checkout/payment-result.
      document.open();
      document.write(data.threeDS.html);
      document.close();
      return;
    }

    setPaymentId(data.paymentId);
  };

  if (paymentId) {
    return <PayfastProgress paymentId={paymentId} orderHref={orderHref} retryHref={`/orders/${order.id}/pay`} />;
  }

  if (types === null) return <p className="py-10 text-center text-sm text-gray-500">Loading payment options…</p>;

  if (!types.length) {
    return (
      <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        Online payment is not available right now. Please contact support or place a Cash on Delivery order.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off" noValidate>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-[#001B08]">Pay with PayFast</h2>
        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
          <FaLock /> Secure payment
        </span>
      </div>

      <p className="text-sm text-gray-600">
        Amount to pay: <strong>{formatMinor(order.totalMinor)}</strong>
      </p>

      <label className="block text-sm font-medium text-[#001B08]">
        Payment type
        <select {...register("accountType")} className={input}>
          {types.map((type) => (
            <option key={type} value={type}>
              {TYPE_LABELS[type] ?? type}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium text-[#001B08]">
        Mobile number (registered with your bank/wallet)
        <input
          {...register("mobile", { required: "Mobile number is required", pattern: { value: /^03\d{9}$/, message: "Use the format 03XXXXXXXXX" } })}
          inputMode="tel"
          autoComplete="tel"
          placeholder="03XXXXXXXXX"
          className={input}
        />
        {errors.mobile && <p className={err}>{errors.mobile.message}</p>}
      </label>

      {accountType === "CARD" ? (
        <>
          <label className="block text-sm font-medium text-[#001B08]">
            Card number
            <input
              {...register("cardNumber", { required: "Card number is required", validate: (value) => /^\d{12,19}$/.test(value.replace(/\s+/g, "")) || "Enter a valid card number" })}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              className={input}
            />
            {errors.cardNumber && <p className={err}>{errors.cardNumber.message}</p>}
          </label>

          <div className="grid grid-cols-3 gap-3">
            <label className="block text-sm font-medium text-[#001B08]">
              Month
              <input {...register("expiryMonth", { required: "Required", pattern: { value: /^(0[1-9]|1[0-2])$/, message: "MM" } })} inputMode="numeric" autoComplete="cc-exp-month" placeholder="MM" maxLength={2} className={input} />
              {errors.expiryMonth && <p className={err}>{errors.expiryMonth.message}</p>}
            </label>
            <label className="block text-sm font-medium text-[#001B08]">
              Year
              <input {...register("expiryYear", { required: "Required", pattern: { value: /^\d{2}(\d{2})?$/, message: "YY" } })} inputMode="numeric" autoComplete="cc-exp-year" placeholder="YY" maxLength={4} className={input} />
              {errors.expiryYear && <p className={err}>{errors.expiryYear.message}</p>}
            </label>
            <label className="block text-sm font-medium text-[#001B08]">
              CVV
              <input {...register("cvv", { required: "Required", pattern: { value: /^\d{3,4}$/, message: "3-4 digits" } })} type="password" inputMode="numeric" autoComplete="cc-csc" placeholder="•••" maxLength={4} className={input} />
              {errors.cvv && <p className={err}>{errors.cvv.message}</p>}
            </label>
          </div>
        </>
      ) : (
        <>
          <label className="block text-sm font-medium text-[#001B08]">
            {accountType === "WALLET" ? "Wallet account number" : "Account number / IBAN"}
            <input {...register("accountNumber", { required: "Account number is required", minLength: { value: 5, message: "Too short" } })} autoComplete="off" className={input} />
            {errors.accountNumber && <p className={err}>{errors.accountNumber.message}</p>}
          </label>
          <label className="block text-sm font-medium text-[#001B08]">
            CNIC (optional, 13 digits)
            <input {...register("cnic", { validate: (value) => !value || /^\d{13}$/.test(value.replace(/\D/g, "")) || "CNIC must be 13 digits" })} inputMode="numeric" autoComplete="off" className={input} />
            {errors.cnic && <p className={err}>{errors.cnic.message}</p>}
          </label>
        </>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#E8BB44] px-4 font-semibold text-[#001B08] transition hover:bg-[#001B08] hover:text-white disabled:opacity-60"
      >
        {submitting && <FaSpinner className="animate-spin" />}
        {submitting ? "Starting payment…" : "Continue"}
      </button>

      <p className="text-center text-xs text-gray-400">
        Your payment details are sent securely to PayFast and are never stored by PakBazaar.
      </p>
    </form>
  );
};

export default PayfastPayment;
