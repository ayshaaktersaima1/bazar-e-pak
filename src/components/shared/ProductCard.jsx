"use client";

import DiscountPrice from "../../utils/discount-price";

import Image from "next/image";
import Link from "next/link";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaEye,
} from "react-icons/fa";

import { useCart } from "@/hooks/use-cart";

const DiscountBadge = ({ discount }) => {
  if (typeof discount !== "number" || discount <= 0) {
    return null;
  }

  return (
    <span className="absolute right-3 top-3 z-10 rounded-full bg-[#E8BB44] px-2.5 py-1 text-xs font-bold text-[#001B08] shadow-sm">
      -{discount}%
    </span>
  );
};

const ProductCard = ({ product, variant = "product" }) => {
  const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  if (variant === "homepage") {
    return (
      <div className="flex h-[410px] w-full flex-col rounded-xl bg-white p-3 shadow-sm">
        {/* Product Image */}
        <div className="group relative h-[210px] shrink-0 overflow-hidden rounded-lg bg-[#FAFAFA]">
          <Image
            src={product.images?.[0] || "/images/placeholder.webp"}
            alt={product.name}
            width={400}
            height={350}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />

          <DiscountBadge discount={product.discount} />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#001B08]/50 opacity-0 transition duration-300 group-hover:opacity-100">
            <Link
              href={`/products/${product._id}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 font-semibold text-[#001B08] transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-1 flex-col px-2 pb-2 pt-4 text-center">
          <h3 className="text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
            {product.name}
          </h3>

          <DiscountPrice product={product} />

          <button
            type="button"
            onClick={() => addToCart(product)}
            className=" mt-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  if (variant === "cart") {
    return (
      <div className="flex w-full items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
        {/* Product Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#FAFAFA]">
          <Image
            src={product.images?.[0] || "/images/placeholder.webp"}
            alt={product.name}
            width={100}
            height={100}
            className="h-full w-full object-contain p-2"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-1 flex-col">
          <h3 className="font-serif text-lg font-bold text-[#001B08]">
            {product.name}
          </h3>

          <div className="mt-1">
            <div className="flex gap-2">
              <DiscountPrice product={product} variant="cart" />
              {product.discount && <span className="rounded-full bg-[#E8BB44] px-2.5 py-1 text-xs font-bold text-[#001B08] shadow-sm w-fit">
                -{product.discount}%
              </span>}
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-[#F7F5EF] p-1">
          <button
            type="button"
            onClick={() => decreaseQuantity(product._id)}
            className="flex h-7 w-7 items-center justify-center rounded bg-white text-[#001B08] shadow-sm transition hover:bg-[#E8BB44]"
          >
            <FaMinus size={10} />
          </button>

          <span className="w-6 text-center font-semibold text-[#001B08]">
            {product.quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(product._id)}
            className="flex h-7 w-7 items-center justify-center rounded bg-white text-[#001B08] shadow-sm transition hover:bg-[#E8BB44]"
          >
            <FaPlus size={10} />
          </button>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => removeFromCart(product._id)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <FaTrash size={14} />
        </button>
      </div>
    );
  }

  return (
    <Link
      href={`/products/${product._id}`}
      className="group flex h-full flex-col rounded-xl bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#FAFAFA]">
        <Image
          src={product.images?.[0] || "/images/placeholder.webp"}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
        />

        <DiscountBadge discount={product.discount} />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5 text-center">
        <h3 className="text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
          {product.name}
        </h3>

        <div className="flex min-h-[32px] mb-2 items-center justify-center ">
          <DiscountPrice product={product} />
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            addToCart(product);
          }}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
