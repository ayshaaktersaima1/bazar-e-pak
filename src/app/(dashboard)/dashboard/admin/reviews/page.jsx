import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AllReviewsTable from "@/features/dashboard/admin/reviews/all-reviews-table";

const AdminReviewsPage = async () => {
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

    const canViewReviews =
        permissions.includes(
            "reviews.view",
        );

    if (!canViewReviews) {
        redirect(
            "/dashboard/admin",
        );
    }

    const canModerate =
        permissions.includes(
            "reviews.moderate",
        );

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Review Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Reviews
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    {canModerate
                        ? "View and moderate customer reviews across the platform."
                        : "View customer reviews across the platform."}
                </p>
            </div>

            <AllReviewsTable
                canModerate={
                    canModerate
                }
            />
        </div>
    );
};

export default AdminReviewsPage;