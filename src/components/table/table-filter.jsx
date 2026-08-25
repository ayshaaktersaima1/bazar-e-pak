"use client";

const TableFilter = ({
    filters = [],
    values = {},
    onChange,
}) => {
    if (!filters.length) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
                <select
                    key={filter.key}
                    value={values[filter.key] || ""}
                    onChange={(e) =>
                        onChange(
                            filter.key,
                            e.target.value,
                        )
                    }
                    className="select select-bordered"
                >
                    <option value="">
                        {filter.label}
                    </option>

                    {filter.options?.map(
                        (option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ),
                    )}
                </select>
            ))}
        </div>
    );
};

export default TableFilter;