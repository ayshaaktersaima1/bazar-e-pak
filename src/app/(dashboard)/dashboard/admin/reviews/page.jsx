import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
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

    const { token } =
        await auth.api.getToken({
            headers: requestHeaders,
        });

    const users = await getData(
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

    const canViewReviews =
        role === "super_admin" ||
        permissions.includes(
            "reviews.view",
        );

    if (!canViewReviews) {
        redirect(
            "/dashboard/admin",
        );
    }

    const canModerate =
        role === "super_admin" ||
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
                    View and moderate customer reviews across the platform.
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