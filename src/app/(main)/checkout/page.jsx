"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMoneyBillWave, FaCreditCard, FaSpinner } from "react-icons/fa";

import RequireCustomer from "@/features/orders/require-customer";
import useApi from "@/hooks/use-api";
import { useCart } from "@/hooks/use-cart";

const input =
  "mt-1 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#E8BB44] focus:ring-2 focus:ring-[#E8BB44]/20";
const err = "mt-1 text-xs text-red-600";

const formatPKR = (amount) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", minimumFractionDigits: 2 })
    .format(Number(amount) || 0)
    .replace("PKR", "Rs.");

const newKey = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `k${Date.now()}${Math.random().toString(36).slice(2)}`);

const CheckoutForm = () => {
  const router = useRouter();
  const { get, post, loading } = useApi();
  const { cartItems, cartTotal, loading: cartLoading, refreshCart } = useCart();
  const [methods, setMethods] = useState(null);
  const [method, setMethod] = useState("");
  const checkoutKey = useRef(newKey());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let alive = true;

    get("/api/payments/methods", {}, { auth: false, showError: false }).then((result) => {
      if (!alive) return;

      const data = result.success ? result.data : {};
      const available = {
        cod: Boolean(data?.cod?.enabled),
        payfast: Boolean(data?.payfast?.enabled),
      };

      setMethods(available);
      setMethod(available.payfast ? "payfast" : available.cod ? "cod" : "");
    });

    return () => {
      alive = false;
    };
  }, [get]);

  // a different cart must never reuse an earlier checkout key (the server returns the old order for a reused key)
  const cartSignature = cartItems.map((item) => `${item._id}:${item.quantity}`).join("|");

  useEffect(() => {
    checkoutKey.current = newKey();
  }, [cartSignature]);

  const onSubmit = async (values) => {
    const result = await post("/api/orders/checkout", {
      paymentMethod: method,
      checkoutKey: checkoutKey.current,
      shippingAddress: {
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        addressLine: values.addressLine.trim(),
        city: values.city.trim(),
        ...(values.province?.trim() ? { province: values.province.trim() } : {}),
        ...(values.postalCode?.trim() ? { postalCode: values.postalCode.trim() } : {}),
        ...(values.notes?.trim() ? { notes: values.notes.trim() } : {}),
      },
    });

    if (!result.success) {
      // keep the key only when the outcome is unknown (network failure); otherwise a retry needs a fresh order
      if (!/failed to fetch|network/i.test(result.error?.message || "")) checkoutKey.current = newKey();

      return;
    }

    const order = result.data;

    await refreshCart();

    router.push(order.paymentMethod === "payfast" ? `/orders/${order.id}/pay` : `/checkout/success?order=${order.id}`);
  };

  if (cartLoading || methods === null) {
    return <p className="py-20 text-center text-sm text-gray-500">Loading checkout…</p>;
  }

  if (!cartItems.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link href="/products" className="mt-4 inline-block rounded-md bg-[#001B08] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E8BB44] hover:text-[#001B08]">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={(event) => handleSubmit(onSubmit)(event)} noValidate className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#001B08]">Delivery details</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#001B08]">
              Full name
              <input {...register("fullName", { required: "Name is required", minLength: { value: 2, message: "Too short" } })} autoComplete="name" className={input} />
              {errors.fullName && <p className={err}>{errors.fullName.message}</p>}
            </label>
            <label className="text-sm font-medium text-[#001B08]">
              Mobile number
              <input {...register("phone", { required: "Mobile number is required", pattern: { value: /^03\d{9}$/, message: "Use the format 03XXXXXXXXX" } })} inputMode="tel" autoComplete="tel" placeholder="03XXXXXXXXX" className={input} />
              {errors.phone && <p className={err}>{errors.phone.message}</p>}
            </label>
            <label className="text-sm font-medium text-[#001B08] sm:col-span-2">
              Address
              <input {...register("addressLine", { required: "Address is required", minLength: { value: 5, message: "Please enter a complete address" } })} autoComplete="street-address" className={input} />
              {errors.addressLine && <p className={err}>{errors.addressLine.message}</p>}
            </label>
            <label className="text-sm font-medium text-[#001B08]">
              City
              <input {...register("city", { required: "City is required", minLength: { value: 2, message: "Too short" } })} autoComplete="address-level2" className={input} />
              {errors.city && <p className={err}>{errors.city.message}</p>}
            </label>
            <label className="text-sm font-medium text-[#001B08]">
              Province (optional)
              <input {...register("province")} autoComplete="address-level1" className={input} />
            </label>
            <label className="text-sm font-medium text-[#001B08]">
              Postal code (optional)
              <input {...register("postalCode", { maxLength: { value: 10, message: "Too long" } })} autoComplete="postal-code" className={input} />
            </label>
            <label className="text-sm font-medium text-[#001B08] sm:col-span-2">
              Delivery notes (optional)
              <input {...register("notes", { maxLength: { value: 300, message: "Max 300 characters" } })} className={input} />
            </label>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#001B08]">Payment method</h2>

          {!methods.cod && !methods.payfast ? (
            <p className="mt-3 text-sm text-red-600">No payment method is available right now. Please try again later.</p>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {methods.payfast && (
                <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${method === "payfast" ? "border-[#E8BB44] bg-[#E8BB44]/10" : "border-gray-200 hover:bg-[#F7F5EF]"}`}>
                  <input type="radio" name="method" value="payfast" checked={method === "payfast"} onChange={() => setMethod("payfast")} className="mt-1 accent-[#001B08]" />
                  <span>
                    <span className="flex items-center gap-2 font-semibold text-[#001B08]"><FaCreditCard /> Pay online</span>
                    <span className="mt-1 block text-xs text-gray-500">Card, bank account or mobile wallet via PayFast.</span>
                  </span>
                </label>
              )}
              {methods.cod && (
                <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${method === "cod" ? "border-[#E8BB44] bg-[#E8BB44]/10" : "border-gray-200 hover:bg-[#F7F5EF]"}`}>
                  <input type="radio" name="method" value="cod" checked={method === "cod"} onChange={() => setMethod("cod")} className="mt-1 accent-[#001B08]" />
                  <span>
                    <span className="flex items-center gap-2 font-semibold text-[#001B08]"><FaMoneyBillWave /> Cash on delivery</span>
                    <span className="mt-1 block text-xs text-gray-500">Pay in cash when your order arrives.</span>
                  </span>
                </label>
              )}
            </div>
          )}
        </section>
      </div>

      <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-[#001B08]">Order summary</h3>

        <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
          {cartItems.map((item) => (
            <li key={item._id} className="flex justify-between gap-3 text-gray-600">
              <span className="truncate">{item.quantity} × {item.productName}</span>
              <span className="shrink-0 font-medium text-[#001B08]">{formatPKR(Number(item.price) * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-base font-bold text-[#001B08]">
          <span>Total</span>
          <span>{formatPKR(cartTotal)}</span>
        </div>

        <p className="mt-2 text-xs text-gray-400">
          The final amount is calculated by the server from current shop prices when you place the order. Delivery charges, if any, are confirmed by the seller.
        </p>

        <button
          type="submit"
          disabled={loading || !method}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#E8BB44] px-4 font-semibold text-[#001B08] transition hover:bg-[#001B08] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? "Placing order…" : method === "payfast" ? "Continue to payment" : "Place order"}
        </button>

        <Link href="/cart" className="mt-3 block text-center text-sm text-gray-500 hover:text-[#001B08]">
          ← Back to cart
        </Link>
      </aside>
    </form>
  );
};

const CheckoutPage = () => (
  <div className="min-h-screen bg-[#F7F5EF] py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8BB44]">Almost there</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#001B08] sm:text-4xl">Checkout</h1>
        <div className="mx-auto mt-3 h-0.5 w-16 bg-[#E8BB44]" />
      </div>

      <RequireCustomer>
        <CheckoutForm />
      </RequireCustomer>
    </div>
  </div>
);

export default CheckoutPage;
