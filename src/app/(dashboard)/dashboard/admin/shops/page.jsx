import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";

import AllShopsTable from "@/features/dashboard/admin/shops/all-shops-table";

const AllShops = async () => {
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
                session.user
                    .email,
        );

    const permissions =
        Array.isArray(
            currentUser?.permissions,
        )
            ? currentUser.permissions
            : [];

    if (
        !permissions.includes(
            "shops.view",
        )
    ) {
        redirect(
            "/dashboard/admin",
        );
    }

    const shopsResponse =
        await serverApi.get(
            "/api/shops?page=1&limit=20",
            {},
            {
                auth: true,
                includeMeta: true,
            },
        );

    const shops =
        Array.isArray(
            shopsResponse?.data,
        )
            ? shopsResponse.data
            : [];

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
                currentRole="admin"
            />
        </div>
    );
};

export default AllShops;