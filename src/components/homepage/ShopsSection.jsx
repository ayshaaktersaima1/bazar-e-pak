"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ShopCard from "../shared/ShopCard";

const ShopsSection = () => {
  const [shops, setShops] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/shops`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          setShops(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch shops:", error);
      }
    };

    fetchShops();
  }, [baseUrl]);

  return (
    <section className="bg-[#F7F5EF] py-16">
      {/* Heading */}
      <div className="mx-auto w-[90%] text-center">
        <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
          Discover Our Shops
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
          Explore Trusted Shops
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
          aria-label="Previous shops"
          className="shops-prev absolute left-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08] shadow-md transition duration-300 hover:bg-[#001B08] hover:text-white md:left-4 lg:left-3 lg:h-10 lg:w-10 xl:left-5"
        >
          <FaChevronLeft />
        </button>

        {/* Shop Cards */}
        <div className="mx-auto w-[90%]">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".shops-prev",
              nextEl: ".shops-next",
            }}
            loop={shops.length > 4}
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
            {shops.map((shop) => (
              <SwiperSlide key={shop._id} className="h-auto">
                <ShopCard
                  shop={shop}
                  variant="homepage"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          aria-label="Next shops"
          className="shops-next absolute right-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08] shadow-md transition duration-300 hover:bg-[#001B08] hover:text-white md:right-4 lg:right-3 lg:h-10 lg:w-10 xl:right-5"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* View All Shops */}
      <div className="mt-10 text-center">
        <Link
          href="/shops"
          className="inline-flex items-center justify-center rounded-md bg-[#001B08] px-5 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
        >
          Explore All Shops
        </Link>
      </div>
    </section>
  );
};

export default ShopsSection;