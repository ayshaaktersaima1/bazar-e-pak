"use client";

import { useProduct } from "@/hooks/use-product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ProductSearch = () => {
  const { products } = useProduct();
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const searchResults =
    search.trim().length > 0
      ? products
        .filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase().trim()),
        )
        .slice(0, 5)
      : [];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleProductClick = () => {
    setSearch("");
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="flex w-full">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setShowResults(true);
          }}
          onFocus={() => {
            if (search.trim()) {
              setShowResults(true);
            }
          }}
          placeholder="Search products..."
          className="h-10 min-w-0 flex-1 rounded-l-md border border-r-0 border-[#E8BB44] bg-white px-3 text-sm text-[#001B08] outline-none"
        />

        <button
          type="button"
          aria-label="Search products"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-r-md bg-[#E8BB44] text-[#001B08] transition hover:bg-white"
        >
          <FaSearch className="text-sm" />
        </button>
      </div>

      {showResults && search.trim() && (
        <div className="absolute left-0 right-0 top-12 z-[100] overflow-hidden rounded-md bg-white shadow-xl">
          {searchResults.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {searchResults.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={handleProductClick}
                  className="flex items-center gap-3 border-b border-gray-100 p-3 transition last:border-b-0 hover:bg-[#F7F5EF]"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#FAFAFA]">
                    <Image
                      src={
                        product.images?.[0] ||
                        "/images/placeholder.webp"
                      }
                      alt={product.name}
                      width={60}
                      height={60}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#001B08]">
                      {product.name}
                    </p>
                  </div>

                  <div className="shrink-0 text-sm font-bold text-[#001B08]">
                    PKR {product.price}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-5 text-center">
              <p className="text-sm font-semibold text-[#001B08]">
                No Products Found
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Try searching with a different product name.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;