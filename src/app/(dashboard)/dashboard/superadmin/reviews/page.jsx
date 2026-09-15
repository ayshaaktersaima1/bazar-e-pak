import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AllReviewsTable from "@/features/dashboard/admin/reviews/all-reviews-table";

const SuperAdminReviewsPage = async () => {
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
                    View, moderate, and remove reviews across the platform.
                </p>
            </div>

            <AllReviewsTable
                canModerate={true}
                canDelete={true}
            />
        </div>
    );
};

export default SuperAdminReviewsPage;