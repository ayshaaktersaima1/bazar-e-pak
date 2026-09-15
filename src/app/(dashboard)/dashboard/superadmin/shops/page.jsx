import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AllShopsTable from "@/features/dashboard/admin/shops/all-shops-table";

const SuperAdminShopsPage = async () => {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (session?.user?.role !== "super_admin") {
        redirect("/dashboard");
    }

    const { token } = await auth.api.getToken({
        headers: requestHeaders,
    });

    const shops = await getData(
        "/api/shops",
        token,
    );

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Shop Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    All Shops
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Manage seller-owned shops across the platform.
                </p>
            </div>

            <AllShopsTable
                shops={shops}
                currentRole="super_admin"
            />
        </div>
    );
};

export default SuperAdminShopsPage;