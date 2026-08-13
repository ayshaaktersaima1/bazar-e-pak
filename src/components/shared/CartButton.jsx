"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/hooks/use-cart";

const CartButton = () => {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="btn btn-circle btn-ghost relative h-10 min-h-10 w-10 px-0 text-[#E8BB44] sm:h-11 sm:min-h-11 sm:w-11"
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <FaShoppingCart className="text-xl sm:text-2xl xl:text-3xl" />

      {cartCount > 0 && (
        <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E8BB44] px-1 text-[10px] font-bold leading-none text-[#001B08] ring-2 ring-[#001B08] sm:right-0.5 sm:top-0.5 sm:h-5 sm:min-w-5">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
