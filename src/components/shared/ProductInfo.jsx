"use client";

import { useState } from "react";
import {
    FaMinus,
    FaPlus,
    FaShoppingCart,
} from "react-icons/fa";
import { useCart } from "../../hooks/use-cart";

const ProductInfo = ({ product, onAdded }) => {
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        onAdded?.();
    };

    return (
        <div>
            <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#001B08] md:text-4xl xl:text-5xl">
                {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
                {product.discountPrice ? (
                    <>
                        <del className="text-lg font-semibold text-gray-400">
                            PKR {product.price}
                        </del>

                        <p className="text-2xl font-bold text-[#001B08]">
                            PKR {product.discountPrice}
                        </p>

                        <span className="rounded-full bg-[#E8BB44] px-2.5 py-1 text-xs font-bold text-[#001B08]">
                            {Math.round(
                                ((product.price - product.discountPrice) /
                                    product.price) *
                                    100,
                            )}
                            % OFF
                        </span>
                    </>
                ) : (
                    <p className="text-2xl font-bold text-[#001B08]">
                        PKR {product.price}
                    </p>
                )}
            </div>

            <p className="mt-6 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                {product.description}
            </p>

            <div className="my-8 h-px bg-gray-300" />

            <div>
                <p className="mb-3 font-semibold text-[#001B08]">
                    Quantity
                </p>

                <div className="inline-flex items-center overflow-hidden rounded-md border border-gray-300 bg-white">
                    <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="flex h-11 w-11 items-center justify-center text-[#001B08] transition hover:bg-[#E8BB44]"
                        aria-label="Decrease quantity"
                    >
                        <FaMinus className="text-sm" />
                    </button>

                    <span className="flex h-11 w-12 items-center justify-center border-x border-gray-300 font-semibold text-[#001B08]">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={increaseQuantity}
                        className="flex h-11 w-11 items-center justify-center text-[#001B08] transition hover:bg-[#E8BB44]"
                        aria-label="Increase quantity"
                    >
                        <FaPlus className="text-sm" />
                    </button>
                </div>
            </div>

            <button
                type="button"
                onClick={handleAddToCart}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#001B08] px-16 py-3.5 text-base font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08] sm:w-auto"
            >
                <FaShoppingCart />
                Add to Cart
            </button>
        </div>
    );
};

export default ProductInfo;