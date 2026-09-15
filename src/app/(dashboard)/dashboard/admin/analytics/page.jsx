import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
import { serverApi } from "@/lib/server";

import AnalyticsOverview from "@/features/dashboard/admin/analytics/analytics-overview";

const AdminAnalyticsPage = async () => {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session?.user) {
        redirect("/login");
    }

    const { token } = await auth.api.getToken({
        headers: requestHeaders,
    });

    const users = await getData(
        "/api/users",
        token,
    );

    const currentUser = users.find(
        (user) =>
            String(user._id) ===
            String(session.user.id) ||
            user.email ===
            session.user.email,
    );

    const role = session.user.role;

    const permissions =
        currentUser?.permissions ?? [];

    const canViewAnalytics =
        role === "super_admin" ||
        permissions.includes(
            "analytics.view",
        );

    if (!canViewAnalytics) {
        redirect("/dashboard/admin");
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
                    dashboardResponse?.data ?? {}
                }
                rankings={
                    rankingsResponse?.data ?? []
                }
            />
        </div>
    );
};

export default AdminAnalyticsPage;