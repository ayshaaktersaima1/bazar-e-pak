"use client";

import { useMemo, useState } from "react";
import shops from "@/data/shops";
import ShopCard from "@/components/shared/ShopCard";
import SearchFilter from "@/components/shared/SearchFilter";

const ShopsPage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const categories = useMemo(
        () => [...new Set(shops.map((shop) => shop.category))],
        [],
    );

    const filters = [
        {
            name: "category",
            label: "Category",
            value: category,
            onChange: setCategory,
            options: [
                {
                    value: "all",
                    label: "All Categories",
                },
                ...categories.map((item) => ({
                    value: item,
                    label: item,
                })),
            ],
        },
    ];

    const filteredShops = shops.filter((shop) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
            !searchValue ||
            shop.name.toLowerCase().includes(searchValue) ||
            shop.owner.toLowerCase().includes(searchValue) ||
            shop.category.toLowerCase().includes(searchValue);

        const matchesCategory =
            category === "all" || shop.category === category;

        return matchesSearch && matchesCategory;
    });

    const handleClear = () => {
        setSearch("");
        setCategory("all");
    };

    return (
        <main className="min-h-screen bg-[#F7F5EF] py-16">
            {/* Heading */}
            <section className="mx-auto w-[90%] text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44] md:text-base">
                    Discover Local Stores
                </p>

                <h1 className="mt-2 text-4xl font-bold text-[#001B08] md:text-5xl">
                    Explore Our Shops
                </h1>

                <div className="mt-5 flex items-center justify-center gap-3">
                    <span className="h-px w-14 bg-[#001B08]" />
                    <span className="text-[#E8BB44]">★</span>
                    <span className="h-px w-14 bg-[#001B08]" />
                </div>
            </section>

            {/* Search & Filter */}
            <section className="mx-auto mt-10 w-[90%]">
                <SearchFilter
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search shops..."
                    filters={filters}
                    onClear={handleClear}
                />
            </section>

            {/* Shops */}
            <section className="mx-auto mt-10 w-[90%]">
                {filteredShops.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredShops.map((shop) => (
                            <ShopCard
                                key={shop.id}
                                shop={shop}
                                variant="homepage"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl bg-white px-6 py-12 text-center shadow-sm">
                        <h3 className="text-xl font-bold text-[#001B08]">
                            No Shops Found
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Try searching with a different shop name or category.
                        </p>

                        <button
                            type="button"
                            onClick={handleClear}
                            className="mt-5 rounded-md bg-[#001B08] px-5 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default ShopsPage;