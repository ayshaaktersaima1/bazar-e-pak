"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

import products from "@/data/products";

const ProductDetailsPage = () => {
    const { slug } = useParams();
    const [quantity, setQuantity] = useState(1);

    const product = products.find((item) => item.slug === slug);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!product) {
        return (
            <main className="bg-[#F7F5EF] py-20">
                <div className="mx-auto w-[90%] text-center">
                    <h1 className="text-3xl font-bold text-[#001B08]">
                        Product Not Found
                    </h1>

                    <p className="mt-3 text-gray-600">
                        The product you are looking for does not exist.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#F7F5EF] py-12 md:py-16">
            <section className="mx-auto grid w-[90%] items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden rounded-xl bg-white p-5 shadow-sm">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={700}
                        height={700}
                        className="h-full w-full object-contain"
                        priority
                    />
                </div>

                {/* Product Information */}
                <div>
                    <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                        {product?.category}
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-[#001B08] md:text-4xl xl:text-5xl">
                        {product?.name}
                    </h1>

                    <p className="mt-4 text-2xl font-bold text-[#001B08]">
                        {product?.price}
                    </p>

                    <p className="mt-6 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                        {product?.description}
                    </p>

                    <div className="my-8 h-px bg-gray-300" />

                    {/* Quantity */}
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

                    {/* Add to Cart */}
                    <button
                        type="button"
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#001B08] px-16 py-3.5 text-base font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08] sm:w-auto"
                    >
                        <FaShoppingCart />
                        Add to Cart
                    </button>
                </div>
            </section>
        </main>
    );
};

export default ProductDetailsPage;