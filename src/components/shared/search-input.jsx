"use client";

import { FaSearch } from "react-icons/fa";

const SearchInput = ({
    value = "",
    onChange,
    placeholder = "Search...",
}) => {
    return (
        <label className="input input-bordered flex items-center gap-2">
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

export default SearchInput;