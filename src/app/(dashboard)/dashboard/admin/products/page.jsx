import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AllProductsTable from "@/features/dashboard/admin/products/all-products-table";

const AdminProductsPage = async () => {
    const requestHeaders =
        await headers();

    const session =
        await auth.api.getSession({
            headers: requestHeaders,
        });

    if (!session?.user) {
        redirect("/login");
    }

    const params = new URLSearchParams();

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

    const role =
        session.user.role;

    const permissions =
        currentUser?.permissions ?? [];

    const canViewProducts =
        role === "super_admin" ||
        permissions.includes(
            "products.view",
        );

    if (!canViewProducts) {
        redirect(
            "/dashboard/admin",
        );
    }

    const canDeleteProducts =
        role === "super_admin" ||
        permissions.includes(
            "products.delete",
        );

    const [
        productResponse,
        categoryResponse,
    ] = await Promise.all([
        serverApi.get(
            "/api/products?page=1&limit=20",
            {},
            {
                auth: true,
                includeMeta: true,
            },
        ),

        serverApi.get(
            "/api/categories?status=active&page=1&limit=100",
            {},
            {
                auth: false,
                includeMeta: true,
            },
        ),
    ]);

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Product Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    All Products
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    View products across the platform.
                </p>
            </div>

            <AllProductsTable
                initialProducts={
                    productResponse?.data ?? []
                }
                initialPagination={
                    productResponse?.pagination ?? {}
                }
                categories={
                    categoryResponse?.data ?? []
                }
                canDelete={
                    canDeleteProducts
                }
            />
        </div>
    );
};

export default AdminProductsPage;