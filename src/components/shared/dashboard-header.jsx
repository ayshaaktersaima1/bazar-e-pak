"use client";

const DashboardHeader = ({
    eyebrow,
    title,
    description,
    action,
    className = "",
}) => {
    return (
        <div
            className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}
        >
            <div>
                {eyebrow && (
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                        {eyebrow}
                    </p>
                )}

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 text-sm text-[#4B5563]">
                        {description}
                    </p>
                )}
            </div>

            {action && <div>{action}</div>}
        </div>
    );
};

export default DashboardHeader;