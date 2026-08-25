"use client";

const Select = ({
    value = "",
    onChange,
    options = [],
    placeholder = "Select...",
    className = "",
}) => {
    return (
        <select
            value={value}
            onChange={(e) =>
                onChange(
                    e.target.value,
                )
            }
            className={`h-10 rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#001B08] outline-none transition focus:border-[#002B12] focus:ring-2 focus:ring-[#002B12]/10 ${className}`}
        >
            <option value="">
                {placeholder}
            </option>

            {options.map(
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
    );
};

export default Select;