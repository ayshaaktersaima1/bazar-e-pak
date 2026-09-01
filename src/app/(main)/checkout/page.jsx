"use client";

import Link from "next/link";
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa";

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-[88dvh] bg-[#F7F5EF] py-16 flex items-center justify-center">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-10 text-center shadow-sm">
          {/* Success Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#001B08] text-[#E8BB44] shadow-sm">
            <FaCheckCircle size={40} />
          </div>

          {/* Heading */}
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#E8BB44]">
            Order Placed Successfully
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#001B08]">
            Thank You For Your Order!
          </h1>
          <div className="mx-auto mt-3 h-0.5 w-16 bg-[#E8BB44]"></div>

          {/* Subtext */}
          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            We have received your order and are getting it ready for shipment.
            We will contact you shortly via phone or WhatsApp to confirm your
            details.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/products"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-[#001B08] px-4 py-3 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
            >
              <FaShoppingBag size={14} />
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-[#001B08] bg-transparent px-4 py-3 font-semibold text-[#001B08] transition duration-300 hover:bg-[#001B08] hover:text-white"
            >
              <FaHome size={14} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
