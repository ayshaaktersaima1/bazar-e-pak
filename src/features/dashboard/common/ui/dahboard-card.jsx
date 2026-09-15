const DashboardCard = ({
    title,
    children,
    action = null,
}) => {
    return (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            {(title || action) && (
                <div className="mb-5 flex items-center justify-between gap-3">
                    {title && (
                        <h2 className="text-xl font-bold text-[#001B08]">
                            {title}
                        </h2>
                    )}

                    {action}
                </div>
            )}

            {children}
        </div>
    );
};

export default DashboardCard;