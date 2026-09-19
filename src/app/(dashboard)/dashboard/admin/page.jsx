import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
    FaUsers,
    FaStore,
    FaBoxOpen,
    FaStar,
    FaChartBar,
    FaBell,
} from "react-icons/fa";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";

const accessItems = [
    {
        permission: "users.view",
        title: "Users",
        description: "View and manage platform users.",
        href: "/dashboard/admin/users",
        icon: FaUsers,
    },
    {
        permission: "shops.view",
        title: "Shops",
        description: "View seller shops on the platform.",
        href: "/dashboard/admin/shops",
        icon: FaStore,
    },
    {
        permission: "products.view",
        title: "Products",
        description: "View products listed on the platform.",
        href: "/dashboard/admin/products",
        icon: FaBoxOpen,
    },
    {
        permission: "reviews.view",
        title: "Reviews",
        description: "View customer product and shop reviews.",
        href: "/dashboard/admin/reviews",
        icon: FaStar,
    },
    {
        permission: "analytics.view",
        title: "Analytics",
        description: "View platform activity and performance.",
        href: "/dashboard/admin/analytics",
        icon: FaChartBar,
    },
];

const AdminDashboard = async () => {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== "admin") {
        redirect("/dashboard");
    }

    let permissions = [];

    try {
        const params = new URLSearchParams();

        params.set("search", session.user.email);
        params.set("role", "admin");
        params.set("limit", "10");

        const adminResponse = await serverApi.get(
            `/api/users?${params.toString()}`,
            {},
            {
                auth: true,
                includeMeta: true,
            },
        );

        const users = Array.isArray(adminResponse?.data)
            ? adminResponse.data
            : Array.isArray(adminResponse)
                ? adminResponse
                : [];

        const currentUser = users.find(
            (item) =>
                String(item._id) === String(session.user.id) ||
                item.email === session.user.email
        );

        permissions = Array.isArray(currentUser?.permissions)
            ? currentUser.permissions
            : [];
    } catch {
        permissions = [];
    }

    const allowedItems = accessItems.filter((item) =>
        permissions.includes(item.permission)
    );

    let analytics = null;

    if (permissions.includes("analytics.view")) {
        try {
            const analyticsResponse = await serverApi.get(
                "/api/analytics/dashboard",
                {},
                {
                    auth: true,
                    includeMeta: true,
                },
            );

            analytics = analyticsResponse?.data ?? null;
        } catch {
            analytics = null;
        }
    }

    const totals = analytics?.totals ?? {};

    return (
        <div className="min-h-full bg-[#F7F5EF] p-5 md:p-6">

            {/* Header */}
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Admin Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Welcome, {session.user.name || "Admin"}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                    Manage the areas of Bazar-e-Pak assigned to your admin account.
                </p>
            </div>

            {/* Analytics Overview */}
            {permissions.includes("analytics.view") && analytics && (
                <div className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-[#001B08]">
                        Platform Overview
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Users
                            </p>

                            <p className="mt-2 text-3xl font-bold text-[#001B08]">
                                {totals.users ?? 0}
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Shops
                            </p>

                            <p className="mt-2 text-3xl font-bold text-[#001B08]">
                                {totals.shops ?? 0}
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Products
                            </p>

                            <p className="mt-2 text-3xl font-bold text-[#001B08]">
                                {totals.products ?? 0}
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Published Reviews
                            </p>

                            <p className="mt-2 text-3xl font-bold text-[#001B08]">
                                {totals.reviews ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Permission Access */}
            <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-[#001B08]">
                            Your Access
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Sections available based on permissions assigned by the Super Admin.
                        </p>
                    </div>

                    <span className="rounded-full bg-[#001B08] px-4 py-2 text-sm font-semibold text-white">
                        {permissions.length} Permissions
                    </span>
                </div>

                {allowedItems.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {allowedItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.permission}
                                    href={item.href}
                                    className="group rounded-xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#001B08] text-[#E8BB44]">
                                        <Icon />
                                    </div>

                                    <h3 className="mt-4 text-lg font-bold text-[#001B08] transition group-hover:text-[#E8BB44]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {item.description}
                                    </p>

                                    <p className="mt-4 text-sm font-semibold text-[#001B08]">
                                        Open {item.title} →
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                        <h3 className="text-lg font-bold text-[#001B08]">
                            No management permissions assigned
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            A Super Admin can assign permissions to give this account access to management sections.
                        </p>
                    </div>
                )}
            </div>

            {/* Account */}
            <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold text-[#001B08]">
                    Account
                </h2>

                <Link
                    href="/dashboard/admin/notifications"
                    className="flex max-w-md items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#001B08] text-[#E8BB44]">
                        <FaBell />
                    </div>

                    <div>
                        <h3 className="font-bold text-[#001B08]">
                            Notifications
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            View notifications sent to your admin account.
                        </p>
                    </div>
                </Link>
            </div>

        </div>
    );
};

export default AdminDashboard;