"use client";

import { useMemo, useState } from "react";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/shared/ProductCard";
import SearchFilter from "@/components/shared/SearchFilter";
import { useProduct } from "@/hooks/use-product";
import categories from "@/data/categories";

const categoryIds = {
    honey: "68a200000000000000000001",
    mehak: "68a200000000000000000002",
    mobile: "68a200000000000000000003",
    furniture: "68a200000000000000000004",
};

const AllProductsPage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");

    const { products } = useProduct();

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
                    value: categoryIds[item.category],
                    label: item.title,
                })),
            ],
        },
        {
            name: "sort",
            label: "Sort By",
            value: sort,
            onChange: setSort,
            options: [
                {
                    value: "default",
                    label: "Default",
                },
                {
                    value: "low-high",
                    label: "Price: Low to High",
                },
                {
                    value: "high-low",
                    label: "Price: High to Low",
                },
            ],
        },
    ];

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "all" ||
                product.categoryId === category;

            return matchesSearch && matchesCategory;
        });

        if (sort === "low-high") {
            result = [...result].sort((a, b) => {
                const priceA = a.discountPrice ?? a.price;
                const priceB = b.discountPrice ?? b.price;

                return priceA - priceB;
            });
        }

        if (sort === "high-low") {
            result = [...result].sort((a, b) => {
                const priceA = a.discountPrice ?? a.price;
                const priceB = b.discountPrice ?? b.price;

                return priceB - priceA;
            });
        }

        return result;
    }, [products, search, category, sort]);

    const handleClear = () => {
        setSearch("");
        setCategory("all");
        setSort("default");
    };

    return (
        <main>
            <PageBanner
                title="All Products"
                description="Explore honey, fragrances, mobile accessories and furniture products available at Bazaar E Pak."
                imageClass="bg-[url('/images/all.webp')]"
            />

            <section className="bg-[#F7F5EF] py-16">
                <div className="mx-auto w-[90%]">
                    {/* Section Heading */}
                    <div className="text-center">
                        <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                            Explore Our Collection
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                            All Products
                        </h2>

                        <div className="mt-4 flex justify-center">
                            <span className="h-px w-24 bg-[#001B08]" />
                        </div>
                    </div>

                    {/* Search & Filters */}
                    <div className="mt-10">
                        <SearchFilter
                            searchValue={search}
                            onSearchChange={setSearch}
                            searchPlaceholder="Search products..."
                            filters={filters}
                            onClear={handleClear}
                        />
                    </div>

                    {/* Product Cards */}
                    {filteredProducts.length > 0 ? (
                        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 rounded-xl bg-white px-5 py-16 text-center shadow-sm">
                            <h3 className="text-2xl font-bold text-[#001B08]">
                                No Products Found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Try changing your search or filter options.
                            </p>

                            <button
                                type="button"
                                onClick={handleClear}
                                className="mt-6 rounded-md bg-[#001B08] px-5 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default AllProductsPage;