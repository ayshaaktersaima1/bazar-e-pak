import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";
import AnalyticsOverview from "@/features/dashboard/admin/analytics/analytics-overview";


const SuperAdminAnalyticsPage = async () => {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== "super_admin") {
        redirect("/dashboard");
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
                    Developer Analytics
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Platform Analytics
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    View platform activity and product performance.
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

export default SuperAdminAnalyticsPage;