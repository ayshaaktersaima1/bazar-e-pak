"use client";

import { Search, X } from "lucide-react";

const ProductFilters = ({
    search = "",
    onSearch,
    filters = {},
    onFilterChange,
    categories = [],
}) => {
    const hasFilters =
        search ||
        filters.status ||
        filters.categoryId;

    const clearFilters = () => {
        onSearch("");
        onFilterChange("status", "");
        onFilterChange("categoryId", "");
    };

    return (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                <div className="min-w-0 flex-1">
                    <label className="mb-1.5 block text-xs font-semibold text-[#344054]">
                        Search products
                    </label>

                    <div className="flex h-10 overflow-hidden rounded-lg border border-[#D0D5DD] transition focus-within:border-[#002B12] focus-within:ring-2 focus-within:ring-[#002B12]/10">
                        <input
                            type="search"
                            value={search}
                            onChange={(e) =>
                                onSearch(
                                    e.target.value,
                                )
                            }
                            placeholder="Search by product name..."
                            className="min-w-0 flex-1 px-3 text-sm text-[#001B08] outline-none placeholder:text-[#98A2B3]"
                        />

                        <div className="flex w-10 shrink-0 items-center justify-center bg-[#002B12] text-white">
                            <Search size={16} />
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-44">
                    <label className="mb-1.5 block text-xs font-semibold text-[#344054]">
                        Status
                    </label>

                    <select
                        value={
                            filters.status || ""
                        }
                        onChange={(e) =>
                            onFilterChange(
                                "status",
                                e.target.value,
                            )
                        }
                        className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#001B08] outline-none focus:border-[#002B12] focus:ring-2 focus:ring-[#002B12]/10"
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>
                    </select>
                </div>

                <div className="w-full lg:w-52">
                    <label className="mb-1.5 block text-xs font-semibold text-[#344054]">
                        Category
                    </label>

                    <select
                        value={
                            filters.categoryId ||
                            ""
                        }
                        onChange={(e) =>
                            onFilterChange(
                                "categoryId",
                                e.target.value,
                            )
                        }
                        className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#001B08] outline-none focus:border-[#002B12] focus:ring-2 focus:ring-[#002B12]/10"
                    >
                        <option value="">
                            All Categories
                        </option>

                        {categories.map(
                            (category) => (
                                <option
                                    key={
                                        category._id
                                    }
                                    value={
                                        category._id
                                    }
                                >
                                    {category.name}
                                </option>
                            ),
                        )}
                    </select>
                </div>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={
                            clearFilters
                        }
                        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] px-4 text-sm font-semibold text-[#344054] transition hover:border-[#002B12] hover:bg-[#002B12] hover:text-white"
                    >
                        <X size={15} />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductFilters;