"use client";

import DiscountPrice from "../../utils/discount-price";

import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

import { useCart } from "@/hooks/use-cart";

const ProductCard = ({ product, variant = "product" }) => {
  const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  if (variant === "homepage") {
    return (
      <div className="flex h-[410px] w-full flex-col rounded-xl bg-white p-3 shadow-sm">
        {/* Product Image */}
        <div className="group relative h-[210px] shrink-0 overflow-hidden rounded-lg bg-[#FAFAFA]">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={350}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div
            
            className="absolute inset-0 flex items-center justify-center bg-[#001B08]/50 opacity-0 transition duration-300 group-hover:opacity-100"
          >
            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-md  bg-white px-4 py-2.5 font-semibold text-[#001B08] transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
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
            className="mt-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
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
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#FAFAFA]">
          <Image
            src={product.image}
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
            <DiscountPrice product={product} />
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-[#F7F5EF] p-1">
          <button
            type="button"
            onClick={() => decreaseQuantity(product.id)}
            className="flex h-7 w-7 items-center justify-center rounded bg-white text-[#001B08] shadow-sm transition hover:bg-[#E8BB44]"
          >
            <FaMinus size={10} />
          </button>

          <span className="w-6 text-center font-semibold text-[#001B08]">
            {product.quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(product.id)}
            className="flex h-7 w-7 items-center justify-center rounded bg-white text-[#001B08] shadow-sm transition hover:bg-[#E8BB44]"
          >
            <FaPlus size={10} />
          </button>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => removeFromCart(product.id)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <FaTrash size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-sm">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-[#FAFAFA]">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-contain p-3 transition duration-500 hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5 text-center">
        <h3 className="text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
          {product.name}
        </h3>

        <div className="flex min-h-[32px] items-center justify-center">
          <DiscountPrice product={product} />
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-5">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#001B08] px-4 py-2.5 font-semibold text-[#001B08] transition duration-300 hover:bg-[#001B08] hover:text-white"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
