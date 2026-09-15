import { getData } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AllShopsTable from "../../../../../features/dashboard/admin/shops/all-shops-table";

const AllShops = async () => {
    const requestHeaders =
        await headers();

    const session =
        await auth.api.getSession({
            headers: requestHeaders,
        });

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
                    session?.user?.id,
                ) ||
                user.email ===
                session?.user?.email,
        );

    const role =
        session?.user?.role;

    const hasShopsPermission =
        role === "super_admin" ||
        currentUser?.permissions?.includes(
            "shops.view",
        );

    if (!hasShopsPermission) {
        redirect(
            "/dashboard/admin",
        );
    }

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
                    View and manage all registered shops.
                </p>
            </div>

            <AllShopsTable
                shops={shops}
                currentRole={role}
            />
        </div>
    );
};

export default AllShops;