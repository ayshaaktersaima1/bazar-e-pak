"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useProduct } from "@/hooks/use-product";
import ProductCard from "../shared/ProductCard";

const BestSellers = () => {
  const { products } = useProduct();
  return (
    <section className="bg-[#F7F5EF] py-16">
      {/* Heading */}
      <div className="mx-auto w-[90%] text-center">
        <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
          Featured Products
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
          Explore Our Best Selling Products
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
                slidesPerView: 4,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id} className="h-auto">
                <ProductCard product={product} variant="product" />
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
