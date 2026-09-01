"use client";

import { FaSearch, FaTimes } from "react-icons/fa";

const SearchFilter = ({
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    filters = [],
    onClear,
    showClearButton = true,
}) => {
    const hasActiveFilters =
        searchValue ||
        filters.some((filter) => filter.value && filter.value !== "all");

    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                {/* Search */}
                <div className="flex-1">
                    <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                        Search
                    </label>

                    <div className="flex h-11 overflow-hidden rounded-md border border-gray-300 focus-within:border-[#E8BB44]">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(event) =>
                                onSearchChange?.(event.target.value)
                            }
                            placeholder={searchPlaceholder}
                            className="min-w-0 flex-1 px-3 text-sm text-[#001B08] outline-none"
                        />

                        <div className="flex w-11 shrink-0 items-center justify-center bg-[#E8BB44] text-[#001B08]">
                            <FaSearch className="text-sm" />
                        </div>
                    </div>
                </div>

                {/* Dynamic Filters */}
                {filters.map((filter) => (
                    <div
                        key={filter.name}
                        className="w-full lg:w-48"
                    >
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            {filter.label}
                        </label>

                        <select
                            value={filter.value ?? "all"}
                            onChange={(event) =>
                                filter.onChange?.(event.target.value)
                            }
                            className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-[#001B08] outline-none transition focus:border-[#E8BB44]"
                        >
                            {filter.options?.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                {/* Clear */}
                {showClearButton && hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-[#001B08] px-4 text-sm font-semibold text-[#001B08] transition duration-300 hover:bg-[#001B08] hover:text-white"
                    >
                        <FaTimes />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchFilter;