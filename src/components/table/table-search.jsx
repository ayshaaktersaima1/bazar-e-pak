"use client";

import { FaSearch } from "react-icons/fa";

const TableSearch = ({
    value = "",
    onChange,
    placeholder = "Search...",
}) => {
    return (
        <label className="input input-bordered flex w-full items-center gap-2 sm:max-w-md">
            <FaSearch className="text-base-content/50" />

            <input
                type="search"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder={placeholder}
                className="grow"
            />
        </label>
    );
};

export default TableSearch;