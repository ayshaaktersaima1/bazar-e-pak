"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaStore } from "react-icons/fa";
import { Package } from "lucide-react";

import useApi from "@/hooks/use-api";

const ProductSearch = () => {
  const api = useApi();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(null);

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

  useEffect(() => {
    const query = search.trim();

    if (query.length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      const result = await api.get(
        `/api/search/suggestions?q=${encodeURIComponent(query)}`,
        {},
        {
          auth: false,
          showError: false,
        },
      );

      setLoading(false);

      if (!result?.success) {
        setSuggestions([]);
        return;
      }

      setSuggestions(
        Array.isArray(result.data)
          ? result.data
          : [],
      );

      setShowResults(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleResultClick = () => {
    setSearch("");
    setSuggestions([]);
    setShowResults(false);
  };

  const handleSearch = () => {
    const query = search.trim();

    if (!query) {
      return;
    }

    setShowResults(false);

    router.push(
      `/search?q=${encodeURIComponent(query)}`,
    );
  };

  const getHref = (item) => {
    if (item.type === "shop") {
      return `/shops/${item.id}`;
    }

    return `/products/${item.id}`;
  };

  return (
    <div
      ref={searchRef}
      className="relative w-full"
    >
      <div className="flex w-full">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            const value = event.target.value;

            setSearch(value);

            if (value.trim().length >= 2) {
              setShowResults(true);
            } else {
              setSuggestions([]);
              setShowResults(false);
            }
          }}
          onFocus={() => {
            if (search.trim().length >= 2) {
              setShowResults(true);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search products or shops..."
          className="h-10 min-w-0 flex-1 rounded-l-md border border-r-0 border-[#E8BB44] bg-white px-3 text-sm text-[#001B08] outline-none"
        />

        <button
          type="button"
          aria-label="Search"
          onClick={handleSearch}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-r-md bg-[#E8BB44] text-[#001B08] transition hover:bg-white"
        >
          <FaSearch className="text-sm" />
        </button>
      </div>

      {showResults &&
        search.trim().length >= 2 && (
          <div className="absolute left-0 right-0 top-12 z-[100] overflow-hidden rounded-md bg-white shadow-xl">
            {loading ? (
              <div className="px-4 py-5 text-center">
                <p className="text-sm text-gray-500">
                  Searching...
                </p>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {suggestions.map((item) => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={getHref(item)}
                    onClick={handleResultClick}
                    className="flex items-center gap-3 border-b border-gray-100 p-3 transition last:border-b-0 hover:bg-[#F7F5EF]"
                  >
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F7F5EF] text-[#001B08]">
                      {item.type === "product" &&
                        item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : item.type === "shop" ? (
                        <FaStore size={16} />
                      ) : (
                        <Package size={17} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#001B08]">
                        {item.name}
                      </p>

                      <p className="mt-0.5 text-xs capitalize text-gray-500">
                        {item.type}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-4 py-5 text-center">
                <p className="text-sm font-semibold text-[#001B08]">
                  No Results Found
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Try another product or shop name.
                </p>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default ProductSearch;