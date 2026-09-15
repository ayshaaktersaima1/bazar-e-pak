const StatsCard = ({
    label,
    value = 0,
}) => {
    return (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#667085]">
                {label}
            </p>

            <p className="mt-2 text-3xl font-bold text-[#001B08]">
                {value}
            </p>
        </div>
    );
};

export default StatsCard;