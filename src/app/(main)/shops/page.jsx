"use client";

import { useEffect, useState } from "react";

import { useShop } from "@/hooks/use-shop";
import ShopCard from "@/components/shared/ShopCard";
import SearchFilter from "@/components/shared/SearchFilter";

const ShopsPage = () => {
  const { shops, fetchShops, loading } = useShop();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchShops({
      page: 1,
      limit: 50,
    });
  }, []);

  const searchValue = search.toLowerCase().trim();

  const filteredShops = shops.filter((shop) => {
    if (!searchValue) {
      return true;
    }

    return (
      shop.name?.toLowerCase().includes(searchValue) ||
      shop.description?.toLowerCase().includes(searchValue) ||
      shop.address?.toLowerCase().includes(searchValue)
    );
  });

  const handleClear = () => {
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-[#F7F5EF] py-16">
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

      <section className="mx-auto mt-10 w-[90%]">
        <SearchFilter
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search shops..."
          filters={[]}
          onClear={handleClear}
        />
      </section>

      <section className="mx-auto mt-10 w-[90%]">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-[#002B12]" />
          </div>
        ) : filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredShops.map((shop) => (
              <ShopCard key={shop._id} shop={shop} variant="homepage" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white px-6 py-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-[#001B08]">No Shops Found</h3>

            <p className="mt-2 text-sm text-gray-500">
              Try searching with a different shop name.
            </p>

            <button
              type="button"
              onClick={handleClear}
              className="mt-5 rounded-md bg-[#001B08] px-5 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ShopsPage;
