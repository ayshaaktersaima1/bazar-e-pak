"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaStore,
  FaStar,
} from "react-icons/fa";

const ShopCard = ({
  shop,
  variant = "default",
}) => {
  if (variant === "homepage") {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
        {/* Shop Image */}
        <div className="relative h-48 overflow-hidden bg-[#FAFAFA]">
          <Image
            src={
              shop.logo ||
              "/images/placeholder.webp"
            }
            alt={shop.name}
            width={600}
            height={400}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />

          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#E8BB44] px-2.5 py-1 text-xs font-bold text-[#001B08]">
            <FaStar />
            {shop.rating || 0}
          </div>
        </div>

        {/* Shop Information */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-[#E8BB44]">
            <FaStore />

            <span className="capitalize">
              {shop.status}
            </span>
          </div>

          <h3 className="mt-2 text-xl font-bold text-[#001B08]">
            {shop.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {shop.description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500">
            <span>
              {shop.totalReviews || 0} Reviews
            </span>
          </div>

          <Link
            href={`/shops/${shop._id}`}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
          >
            Visit Shop
            <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-4 shadow-sm">
      {/* Shop Image */}
      <div className="relative h-56 overflow-hidden rounded-lg bg-[#FAFAFA]">
        <Image
          src={
            shop.logo ||
            "/images/placeholder.webp"
          }
          alt={shop.name}
          width={600}
          height={400}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#E8BB44] px-2.5 py-1 text-xs font-bold text-[#001B08]">
          <FaStar />
          {shop.rating || 0}
        </div>
      </div>

      {/* Shop Information */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-center gap-2 text-sm font-medium capitalize text-[#E8BB44]">
          <FaStore />
          {shop.status}
        </div>

        <h3 className="mt-2 text-2xl font-bold text-[#001B08]">
          {shop.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {shop.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <p>{shop.address}</p>
          <p>{shop.phone}</p>
          <p>{shop.email}</p>
        </div>

        <div className="mt-auto border-t border-gray-100 pt-4">
          <span className="text-sm text-gray-500">
            {shop.totalReviews || 0} Reviews
          </span>
        </div>

        <Link
          href={`/shops/${shop._id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-[#001B08] px-4 py-2.5 font-semibold text-[#001B08] transition duration-300 hover:bg-[#001B08] hover:text-white"
        >
          View Shop
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ShopCard;