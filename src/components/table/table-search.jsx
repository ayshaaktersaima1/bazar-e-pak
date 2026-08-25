"use client";

import { FaSearch } from "react-icons/fa";

const TableSearch = ({
    value = "",
    onChange,
    placeholder = "Search...",
}) => {
    return (
        <div className="flex h-11 w-full items-center overflow-hidden rounded-lg border border-[#E5E7EB] bg-white transition focus-within:border-[#D9A928] focus-within:ring-2 focus-within:ring-[#D9A928]/15 sm:max-w-md">
            <div className="flex h-full w-11 shrink-0 items-center justify-center text-[#667085]">
                <FaSearch className="text-sm" />
            </div>

            <input
                type="search"
                value={value}
                onChange={(e) =>
                    onChange?.(
                        e.target.value,
                    )
                }
                placeholder={placeholder}
                className="h-full min-w-0 flex-1 bg-transparent pr-3 text-sm text-[#001B08] outline-none placeholder:text-[#98A2B3]"
            />
        </div>
    );
};

export default TableSearch;