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
                onChange(e.target.value)
            }
            className={`select select-bordered ${className}`}
        >
            <option value="">
                {placeholder}
            </option>

            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;