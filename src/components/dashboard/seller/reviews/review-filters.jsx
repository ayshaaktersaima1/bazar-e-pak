"use client";

import TableFilter from "@/components/table/table-filter";
import TableSearch from "@/components/table/table-search";

const ReviewFilters = ({
    searchValue = "",
    onSearch,
    filters = [],
    filterValues = {},
    onFilter,
}) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-[#D9A928]/15 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <TableSearch
                value={searchValue}
                onChange={onSearch}
                placeholder="Search reviews..."
            />

            {filters.length > 0 && (
                <TableFilter
                    filters={filters}
                    values={filterValues}
                    onChange={onFilter}
                />
            )}
        </div>
    );
};

export default ReviewFilters;