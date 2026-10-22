import Link from "next/link";

import FinanceOverview from "@/features/dashboard/finance/finance-overview";
import { getFinanceCaps, requireRole } from "@/lib/dashboard-access";
import { serverApi } from "@/lib/server";

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
    {
        label: "Orders",
        description:
            "All marketplace orders, COD collection, refunds and payment proofs.",
        href: "/dashboard/superadmin/orders",
    },
    {
        label: "Payments",
        description:
            "PayFast transactions, gateway verification and fee finalisation.",
        href: "/dashboard/superadmin/payments",
    },
    {
        label: "Shop Finance",
        description:
            "Open any shop to see its 60/40 earnings, ledger and settlement history.",
        href: "/dashboard/superadmin/finance",
    },
    {
        label: "Settlements",
        description:
            "Track and record seller payouts made outside the payment gateway.",
        href: "/dashboard/superadmin/settlements",
    },
    {
        label: "Backup & Restore",
        description:
            "Create verified database backups and restore them safely. Super Admin only.",
        href: "/dashboard/superadmin/backup",
    },
];

const SuperAdminDashboard = async () => {
    await requireRole("super_admin");

    let totals = {};

    try {
        const analytics = await serverApi.get("/api/analytics/dashboard");

        totals = analytics?.totals ?? {};
    } catch {
        totals = {};
    }

    const stats = [
        ["Total Users", totals.users],
        ["Total Shops", totals.shops],
        ["Total Products", totals.products],
        ["Published Reviews", totals.reviews],
    ].filter(([, value]) => value !== undefined);

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
                    payments, analytics and system controls.
                </p>
            </div>

            {stats.length > 0 && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map(([label, value]) => (
                        <div key={label} className="rounded-xl bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">{label}</p>
                            <p className="mt-2 text-3xl font-bold text-[#001B08]">{value}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8">
                <FinanceOverview base="/dashboard/superadmin" caps={getFinanceCaps(true)} />
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
