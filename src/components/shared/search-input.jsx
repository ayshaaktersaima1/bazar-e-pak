"use client";

import { FaSearch } from "react-icons/fa";

const SearchInput = ({
    value = "",
    onChange,
    placeholder = "Search...",
}) => {
    return (
        <label className="flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 transition focus-within:border-[#002B12] focus-within:ring-2 focus-within:ring-[#002B12]/10">
            <FaSearch className="shrink-0 text-sm text-[#98A2B3]" />

            <input
                type="search"
                value={value}
                onChange={(e) =>
                    onChange(
                        e.target.value,
                    )
                }
                placeholder={
                    placeholder
                }
                className="min-w-0 flex-1 bg-transparent text-sm text-[#001B08] outline-none placeholder:text-[#98A2B3]"
            />
        </label>
    );
};

export default SearchInput;