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
    if (
        typeof discount !== "number" ||
        discount <= 0
    ) {
        return null;
    }

    return (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[#E8BB44] px-2.5 py-1 text-xs font-bold text-[#001B08] shadow-sm">
            -{discount}%
        </span>
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

    if (variant === "homepage") {
        return (
            <div className="flex h-[410px] w-full flex-col rounded-xl bg-white p-3 shadow-sm">
                <div className="group relative h-[210px] shrink-0 overflow-hidden rounded-lg bg-[#FAFAFA]">
                    <Image
                        src={
                            product.images?.[0] ||
                            "/images/placeholder.webp"
                        }
                        alt={
                            product.name ||
                            "Product"
                        }
                        width={400}
                        height={350}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />

                    <DiscountBadge
                        discount={
                            product.discount
                        }
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-[#001B08]/50 opacity-0 transition duration-300 group-hover:opacity-100">
                        <Link
                            href={`/products/${product._id}`}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 font-semibold text-[#001B08] transition duration-300 hover:bg-[#E8BB44]"
                        >
                            View Details
                        </Link>
                    </div>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-4 text-center">
                    <h3 className="text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
                        {product.name}
                    </h3>

                    <DiscountPrice
                        product={product}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            addToCart(
                                product
                            )
                        }
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
        const cartProduct =
            product.product;

        const productId =
            cartProduct?._id;

        const productName =
            product.productName ||
            cartProduct?.name ||
            "Product";

        const productImage =
            product.productImage ||
            cartProduct?.images?.[0] ||
            "/images/placeholder.webp";

        const productPrice =
            Number(product.price || 0);

        const quantity =
            Number(product.quantity || 0);

        return (
            <div className="flex w-full items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#FAFAFA]">
                    <Image
                        src={productImage}
                        alt={productName}
                        width={100}
                        height={100}
                        className="h-full w-full object-contain p-2"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                        href={`/products/${productId}`}
                        className="font-serif text-lg font-bold text-[#001B08] transition hover:text-[#B58A16]"
                    >
                        {productName}
                    </Link>

                    <div className="mt-1">
                        <span className="text-sm font-semibold text-[#001B08]">
                            ৳
                            {productPrice.toLocaleString(
                                "en-BD"
                            )}
                        </span>
                    </div>

                    {product.shop?.name && (
                        <span className="mt-1 text-xs text-gray-500">
                            {product.shop.name}
                        </span>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-md border border-gray-200 bg-[#F7F5EF] p-1">
                    <button
                        type="button"
                        disabled={!productId}
                        onClick={() =>
                            decreaseQuantity(
                                productId
                            )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-[#001B08] shadow-sm transition hover:bg-[#E8BB44] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FaMinus
                            size={10}
                        />
                    </button>

                    <span className="w-6 text-center font-semibold text-[#001B08]">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        disabled={!productId}
                        onClick={() =>
                            increaseQuantity(
                                productId
                            )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-[#001B08] shadow-sm transition hover:bg-[#E8BB44] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FaPlus
                            size={10}
                        />
                    </button>
                </div>

                <div className="hidden w-24 text-right sm:block">
                    <span className="text-sm font-bold text-[#001B08]">
                        ৳
                        {(
                            productPrice *
                            quantity
                        ).toLocaleString(
                            "en-BD"
                        )}
                    </span>
                </div>

                <button
                    type="button"
                    disabled={!productId}
                    onClick={() =>
                        removeFromCart(
                            productId
                        )
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <FaTrash
                        size={14}
                    />
                </button>
            </div>
        );
    }

    return (
        <Link
            href={`/products/${product._id}`}
            className="group flex h-full flex-col rounded-xl bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
        >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-[#FAFAFA]">
                <Image
                    src={
                        product.images?.[0] ||
                        "/images/placeholder.webp"
                    }
                    alt={
                        product.name ||
                        "Product"
                    }
                    width={500}
                    height={500}
                    className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                />

                <DiscountBadge
                    discount={
                        product.discount
                    }
                />
            </div>

            <div className="flex flex-1 flex-col px-2 pb-2 pt-5 text-center">
                <h3 className="text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
                    {product.name}
                </h3>

                <div className="mb-2 flex min-h-[32px] items-center justify-center">
                    <DiscountPrice
                        product={product}
                    />
                </div>

                <button
                    type="button"
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        addToCart(
                            product
                        );
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