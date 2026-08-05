"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaChevronLeft,
    FaChevronRight,
    FaShoppingCart,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const products = [
    {
        id: 1,
        name: "Berry Honey (500g)",
        price: "PKR 1,200",
        image: "/images/b1.webp",
    },
    {
        id: 2,
        name: "Acacia Honey (500g)",
        price: "PKR 1,350",
        image: "/images/b1.webp",
    },
    {
        id: 3,
        name: "Mehak Perfume",
        price: "PKR 950",
        image: "/images/b1.webp",
    },
    {
        id: 4,
        name: "Air Pods Pro",
        price: "PKR 2,850",
        image: "/images/b1.webp",
    },
    {
        id: 5,
        name: "Power Bank 10000mAh",
        price: "PKR 2,200",
        image: "/images/b1.webp",
    },
    {
        id: 6,
        name: "Office Chair",
        price: "PKR 8,500",
        image: "/images/b1.webp",
    },
    {
        id: 7,
        name: "Body Spray",
        price: "PKR 1,150",
        image: "/images/b1.webp",
    },
    {
        id: 8,
        name: "Wireless Headphones",
        price: "PKR 3,200",
        image: "/images/b1.webp",
    },
    {
        id: 9,
        name: "Mobile Charger",
        price: "PKR 1,000",
        image: "/images/b1.webp",
    },
];

const BestSellers = () => {
    return (
        <section className="bg-[#F7F5EF] py-16">
            {/* Heading */}
            <div className="mx-auto w-[90%] text-center">
                <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Best Selling Products
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                    Our Best Sellers
                </h2>

                <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="h-px w-14 bg-[#001B08]" />
                    <span className="text-[#001B08]">★</span>
                    <span className="h-px w-14 bg-[#001B08]" />
                </div>
            </div>

            {/* Slider */}
            <div className="relative mt-10">
                {/* Left Arrow */}
                <button
                    type="button"
                    aria-label="Previous products"
                    className="best-sellers-prev absolute left-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08] shadow-md transition duration-300 hover:bg-[#001B08] hover:text-white md:left-4 lg:left-3 lg:h-10 lg:w-10 xl:left-5"
                >
                    <FaChevronLeft />
                </button>

                {/* Product Cards */}
                <div className="mx-auto w-[90%]">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".best-sellers-prev",
                            nextEl: ".best-sellers-next",
                        }}
                        loop={true}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1280: {
                                slidesPerView: 5,
                            },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide
                                key={product.id}
                                className="h-auto"
                            >
                                <div className="flex h-full flex-col rounded-xl bg-white p-3 shadow-sm">
                                    {/* Product Image */}
                                    <div className="overflow-hidden rounded-lg bg-[#FAFAFA]">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={400}
                                            height={350}
                                            className="h-56 w-full object-contain transition duration-500 hover:scale-105 lg:h-44 xl:h-52"
                                        />
                                    </div>

                                    {/* Product Information */}
                                    <div className="flex flex-1 flex-col px-2 pb-2 pt-4 text-center">
                                        <h3 className="font-bold text-[#001B08] lg:text-sm xl:text-base">
                                            {product.name}
                                        </h3>

                                        <p className="mt-2 text-lg font-bold text-[#001B08] lg:text-base xl:text-lg">
                                            {product.price}
                                        </p>

                                        <button
                                            type="button"
                                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
                                        >
                                            <FaShoppingCart />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Arrow */}
                <button
                    type="button"
                    aria-label="Next products"
                    className="best-sellers-next absolute right-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08] shadow-md transition duration-300 hover:bg-[#001B08] hover:text-white md:right-4 lg:right-3 lg:h-10 lg:w-10 xl:right-5"
                >
                    <FaChevronRight />
                </button>
            </div>
        </section>
    );
};

export default BestSellers;