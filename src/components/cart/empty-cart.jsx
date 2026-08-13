"use client";

import Link from "next/link";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-12 text-center shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F5EF] text-[#E8BB44]">
        <FaShoppingBag size={36} />
      </div>
      <h2 className="mt-6 font-serif text-2xl font-bold text-[#001B08]">
        Your cart is empty
      </h2>
      <p className="mt-2 text-gray-500">
        Explore our pure and natural collection to add items to your cart.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#001B08] px-6 py-3 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
      >
        <FaArrowLeft size={14} />
        Explore Products
      </Link>
    </div>
  );
};