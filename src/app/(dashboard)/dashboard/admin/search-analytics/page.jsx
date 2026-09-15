import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
import { serverApi } from "@/lib/server";

import SearchAnalyticsTable from "@/features/dashboard/admin/search-analytics/search-analytics-table";

const AdminSearchAnalyticsPage =
    async () => {
        const requestHeaders =
            await headers();

        const session =
            await auth.api.getSession({
                headers: requestHeaders,
            });

        if (!session?.user) {
            redirect("/login");
        }

        const { token } =
            await auth.api.getToken({
                headers: requestHeaders,
            });

        const users =
            await getData(
                "/api/users",
                token,
            );

        const currentUser =
            users.find(
                (user) =>
                    String(user._id) ===
                    String(
                        session.user.id,
                    ) ||
                    user.email ===
                    session.user.email,
            );

        const role =
            session.user.role;

        const permissions =
            currentUser?.permissions ??
            [];

        const canViewAnalytics =
            role === "super_admin" ||
            permissions.includes(
                "analytics.view",
            );

        if (!canViewAnalytics) {
            redirect(
                "/dashboard/admin",
            );
        }

        const response =
            await serverApi.get(
                "/api/search-analytics?page=1&limit=20",
                {},
                {
                    auth: true,
                    includeMeta: true,
                },
            );

        return (
            <div className="bg-[#F7F5EF] p-6">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Search Analytics
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                        Search Analytics
                    </h1>

                    <p className="mt-2 text-sm text-[#4B5563]">
                        See what users are
                        searching for and which
                        searches return no
                        results.
                    </p>
                </div>

                <SearchAnalyticsTable
                    initialRows={
                        response?.data ?? []
                    }
                    initialPagination={
                        response?.pagination ??
                        {}
                    }
                />
            </div>
        );
    };

export default AdminSearchAnalyticsPage;