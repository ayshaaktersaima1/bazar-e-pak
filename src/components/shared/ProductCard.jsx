"use client";

import DiscountPrice from "../../utils/discount-price";

import Image from "next/image";
import Link from "next/link";

import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
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

const ProductImage = ({
  src,
  alt,
  className = "",
  sizes,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-[#FAFAFA] ${className}`}
    >
      <Image
        src={src || "/images/placeholder.webp"}
        alt={alt || "Product"}
        fill
        sizes={sizes || "100vw"}
        className="object-cover"
      />
    </div>
  );
};

const ProductCard = ({
  product,
  variant = "product",
}) => {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const image =
    product?.productImage ||
    product?.images?.[0] ||
    "/images/placeholder.webp";

  const productId =
    product?.product?._id ||
    product?.product ||
    product?._id;

  const productName =
    product?.productName ||
    product?.product?.name ||
    product?.name ||
    "Product";

  if (variant === "homepage") {
    return (
      <div className="flex h-[410px] w-full flex-col rounded-xl bg-white p-3 shadow-sm">
        <div className="group relative h-[210px] shrink-0 overflow-hidden rounded-lg bg-[#FAFAFA]">
          <Image
            src={image}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <DiscountBadge discount={product.discount} />

          <div className="absolute inset-0 flex items-center justify-center bg-[#001B08]/50 opacity-0 transition duration-300 group-hover:opacity-100">
            <Link
              href={`/products/${productId}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 font-semibold text-[#001B08] transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
            >
              View Details
            </Link>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-2 pb-2 pt-4 text-center">
          <h3 className="text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
            {productName}
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
        <ProductImage
          src={image}
          alt={productName}
          className="h-20 w-20 shrink-0"
          sizes="80px"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="truncate font-serif text-lg font-bold text-[#001B08]">
            {productName}
          </h3>

          <div className="mt-1">
            <DiscountPrice product={product} variant="cart" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-md border border-gray-200 bg-[#F7F5EF] p-1">
          <button
            type="button"
            onClick={() => decreaseQuantity(productId)}
            className="flex h-7 w-7 items-center justify-center rounded bg-white text-[#001B08] shadow-sm transition hover:bg-[#E8BB44]"
          >
            <FaMinus size={10} />
          </button>

          <span className="w-6 text-center font-semibold text-[#001B08]">
            {product.quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(productId)}
            className="flex h-7 w-7 items-center justify-center rounded bg-white text-[#001B08] shadow-sm transition hover:bg-[#E8BB44]"
          >
            <FaPlus size={10} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeFromCart(productId)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <FaTrash size={14} />
        </button>
      </div>
    );
  }

  return (
    <Link
      href={`/products/${productId}`}
      className="group flex h-full flex-col rounded-xl bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FAFAFA]">
        <Image
          src={image}
          alt={productName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover p-0 transition duration-500 group-hover:scale-105"
        />

        <DiscountBadge discount={product.discount} />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5 text-center">
        <h3 className="text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
          {productName}
        </h3>

        <div className="mb-2 flex min-h-[32px] items-center justify-center">
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