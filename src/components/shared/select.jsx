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
            onChange={(e) => onChange(e.target.value)}
            className={`h-10 rounded-lg border border-[#E5E2D8] bg-white px-3 text-sm text-[#002B12] outline-none transition hover:border-[#D9A928] focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/20 ${className}`}
        >
            <option
                value=""
                className="text-[#6B7280]"
            >
                {placeholder}
            </option>

            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    className="text-[#002B12]"
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;