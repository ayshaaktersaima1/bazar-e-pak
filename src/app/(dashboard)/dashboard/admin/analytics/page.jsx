import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";

import AnalyticsOverview from "@/features/dashboard/admin/analytics/analytics-overview";

const AdminAnalyticsPage = async () => {
    const requestHeaders =
        await headers();

    const session =
        await auth.api.getSession({
            headers: requestHeaders,
        });

    if (!session?.user) {
        redirect("/login");
    }

    if (
        session.user.role !==
        "admin"
    ) {
        redirect("/dashboard");
    }

    const params =
        new URLSearchParams();

    params.set(
        "search",
        session.user.email,
    );

    params.set(
        "role",
        "admin",
    );

    params.set(
        "limit",
        "10",
    );

    const adminResponse =
        await serverApi.get(
            `/api/users?${params.toString()}`,
            {},
            {
                auth: true,
                includeMeta: true,
            },
        );

    const adminUsers =
        Array.isArray(
            adminResponse?.data,
        )
            ? adminResponse.data
            : Array.isArray(
                adminResponse,
            )
                ? adminResponse
                : [];

    const currentUser =
        adminUsers.find(
            (user) =>
                String(user._id) ===
                String(
                    session.user.id,
                ) ||
                user.email ===
                session.user.email,
        );

    const permissions =
        Array.isArray(
            currentUser?.permissions,
        )
            ? currentUser.permissions
            : [];

    const canViewAnalytics =
        permissions.includes(
            "analytics.view",
        );

    if (!canViewAnalytics) {
        redirect(
            "/dashboard/admin",
        );
    }

    const [
        dashboardResponse,
        rankingsResponse,
    ] = await Promise.all([
        serverApi.get(
            "/api/analytics/dashboard",
            {},
            {
                auth: true,
                includeMeta: true,
            },
        ),

        serverApi.get(
            "/api/analytics/rankings/products",
            {},
            {
                auth: true,
                includeMeta: true,
            },
        ),
    ]);

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Platform Analytics
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Analytics
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Overview of platform activity,
                    content, and product performance.
                </p>
            </div>

            <AnalyticsOverview
                analytics={
                    dashboardResponse?.data ??
                    {}
                }
                rankings={
                    rankingsResponse?.data ??
                    []
                }
            />
        </div>
    );
};

export default AdminAnalyticsPage;