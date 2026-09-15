import Link from "next/link";

const SuperAdminDashboard = () => {
    const quickLinks = [
        {
            label: "Manage Admins",
            description:
                "Promote users to admin, assign permissions, suspend, activate, or change roles.",
            href: "/dashboard/superadmin/admins",
        },
        {
            label: "Seller Applications",
            description:
                "Review seller applications and approve eligible users as sellers.",
            href: "/dashboard/superadmin/seller-applications",
        },
    ];

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Developer Panel
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Super Admin Dashboard
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Manage PakBazaar platform operations, sellers, content,
                    analytics and system controls.
                </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
                {quickLinks.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <h2 className="text-lg font-bold text-[#001B08]">
                            {item.label}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#667085]">
                            {item.description}
                        </p>

                        <p className="mt-4 text-sm font-semibold text-[#006B35]">
                            Open
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SuperAdminDashboard;