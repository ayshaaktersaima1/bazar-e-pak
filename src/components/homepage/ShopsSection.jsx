"use client";

import Link from "next/link";

import shops from "@/data/shops";
import ShopCard from "../shared/ShopCard";

const ShopsSection = () => {
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

      {/* Shop Cards */}
      <div className="mx-auto mt-10 grid w-[90%] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} variant="homepage" />
        ))}
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
