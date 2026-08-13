"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaArrowRight,
    FaMapMarkerAlt,
    FaStar,
    FaStore,
} from "react-icons/fa";

const ShopInfo = ({ shop, productCount }) => {
    if (!shop) return null;

    return (
        <div className="relative mb-10 overflow-hidden rounded-2xl bg-[#001B08] shadow-sm">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E8BB44]/10" />

            <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-[#E8BB44]/5" />

            <div className="relative flex flex-col gap-6 p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:p-7 lg:p-8">
                {/* Shop Identity */}
                <div className="flex min-w-0 items-center gap-4 md:gap-5">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#E8BB44] bg-[#F7F5EF] p-1.5 sm:h-24 sm:w-24">
                        <Image
                            src={shop.image}
                            alt={shop.name}
                            width={120}
                            height={120}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>

                    <div className="min-w-0">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8BB44]">
                            <FaStore className="text-[11px]" />
                            Sold By
                        </p>

                        <h2 className="mt-1 truncate text-2xl font-bold text-white md:text-3xl">
                            {shop.name}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300">
                            <span className="flex items-center gap-1.5">
                                <FaStar className="text-[#E8BB44]" />

                                <span className="font-semibold text-white">
                                    {shop.rating}
                                </span>

                                <span>({shop.totalReviews})</span>
                            </span>

                            <span className="h-1 w-1 rounded-full bg-gray-500" />

                            <span>{productCount} Products</span>

                            {shop.address && (
                                <>
                                    <span className="hidden h-1 w-1 rounded-full bg-gray-500 sm:block" />

                                    <span className="flex items-center gap-1.5">
                                        <FaMapMarkerAlt className="text-[#E8BB44]" />
                                        {shop.address}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Visit Shop */}
                <Link
                    href={`/shops/${shop.id}`}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#E8BB44] px-5 py-3 text-sm font-bold text-[#001B08] transition duration-300 hover:bg-white"
                >
                    Visit Shop

                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

export default ShopInfo;