"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck, FaWhatsapp } from "react-icons/fa";

const products = [
    {
        id: 1,
        name: "Berry and Acacia Honey",
        image: "/images/b1.webp",
    },
    {
        id: 2,
        name: "Mobile Accessories",
        image: "/images/b2.webp",
    },
    {
        id: 3,
        name: "Mehak Collection",
        image: "/images/b3.webp",
    },
];

const Banner = () => {
    const [currentProduct, setCurrentProduct] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProduct((previousProduct) =>
                previousProduct === products.length - 1
                    ? 0
                    : previousProduct + 1
            );
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="overflow-hidden bg-[url('/images/banner-bg.png')] bg-cover bg-center bg-no-repeat">
            <div className="mx-auto grid w-[90%] items-center gap-10 py-16 lg:grid-cols-2 lg:gap-6 lg:py-16 xl:gap-10 xl:py-24">
                {/* Left Content */}
                <div className="text-white">
                    <p className="mb-3 text-base font-medium uppercase tracking-widest text-[#E8BB44] md:text-lg lg:text-base xl:text-lg">
                        Trusted Digital Marketplace
                    </p>

                    <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-4xl xl:text-5xl">
                        Your Trusted{" "}
                        <span className="text-[#E8BB44]">
                            Marketplace
                        </span>{" "}
                        For Every Need
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 md:text-lg md:leading-8 lg:mt-4 lg:text-base lg:leading-7 xl:mt-6 xl:text-lg xl:leading-8">
                        From premium honey and fragrances to mobile accessories
                        and office furniture, Bazaar E Pak brings trusted
                        products together in one place.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 lg:mt-6 xl:mt-8">
                        <Link
                            href="/products"
                            className="rounded-md bg-[#E8BB44] px-6 py-3 font-semibold text-[#001B08] transition duration-300 hover:bg-white lg:px-5 lg:py-2.5 lg:text-sm xl:px-6 xl:py-3 xl:text-base"
                        >
                            Explore Products
                        </Link>

                        <Link
                            href="https://wa.me/923260882255"
                            target="_blank"
                            className="flex items-center gap-2 rounded-md border border-[#E8BB44] px-6 py-3 font-semibold text-[#E8BB44] transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08] lg:px-5 lg:py-2.5 lg:text-sm xl:px-6 xl:py-3 xl:text-base"
                        >
                            <FaWhatsapp className="text-xl" />
                            Contact Us
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-6 text-sm md:text-base lg:mt-6 lg:gap-4 lg:text-sm xl:mt-8 xl:gap-6 xl:text-base">
                        <div className="flex items-center gap-2">
                            <FaCheck className="text-[#E8BB44]" />
                            <span>Premium Quality</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCheck className="text-[#E8BB44]" />
                            <span>Fast Delivery</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCheck className="text-[#E8BB44]" />
                            <span>Trusted Sellers</span>
                        </div>
                    </div>
                </div>

                {/* Changing Product Image */}
                <div className="relative h-80 translate-y-6 md:h-96 lg:h-80 lg:translate-x-9 lg:translate-y-10 xl:h-96 xl:translate-x-14 xl:translate-y-20">
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ease-in-out ${currentProduct === index
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                                }`}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={700}
                                height={600}
                                className="h-full w-full scale-110 object-contain md:scale-125 lg:scale-105 xl:scale-125"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;