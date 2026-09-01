"use client";

import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";

export const CartSummary = ({ cartTotal, clearCart }) => {
  const shippingFee = cartTotal > 0 ? 250 : 0;
  const grandTotal = cartTotal + (cartTotal > 0 ? shippingFee : 0);

  const formatPKR = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount).replace("PKR", "Rs.");
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="font-serif text-xl font-bold text-[#001B08]">
        Order Summary
      </h3>
      <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-[#001B08]">
            {formatPKR(cartTotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="font-semibold text-[#001B08]">
            {shippingFee === 0 ? "Free" : formatPKR(shippingFee)}
          </span>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-[#001B08]">
          <span>Total</span>
          <span className="text-lg text-[#001B08]">
            {formatPKR(grandTotal)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#E8BB44] px-4 py-3 font-semibold text-[#001B08] transition duration-300 hover:bg-[#001B08] hover:text-white"
        >
          Proceed to Checkout
        </Link>
        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-transparent px-4 py-2.5 font-semibold text-gray-500 transition duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          <FaTrashAlt size={12} />
          Clear Cart
        </button>
      </div>
    </div>
  );
};