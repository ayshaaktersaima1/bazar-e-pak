"use client";

const TableFilter = ({
    filters = [],
    values = {},
    onChange,
}) => {
    if (!filters.length) {
        return null;
    }

    return (
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            {filters.map((filter) => (
                <div
                    key={filter.key}
                    className="relative w-full sm:w-44"
                >
                    <select
                        value={
                            values[filter.key] ||
                            ""
                        }
                        onChange={(e) =>
                            onChange?.(
                                filter.key,
                                e.target.value,
                            )
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-[#E5E7EB] bg-white px-3 pr-9 text-sm font-medium text-[#001B08] outline-none transition focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15"
                    >
                        <option value="">
                            {filter.label}
                        </option>

                        {filter.options?.map(
                            (option) => (
                                <option
                                    key={
                                        option.value
                                    }
                                    value={
                                        option.value
                                    }
                                >
                                    {
                                        option.label
                                    }
                                </option>
                            ),
                        )}
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#667085]">
                        ▼
                    </span>
                </div>
            ))}
        </div>
    );
};

export default TableFilter;