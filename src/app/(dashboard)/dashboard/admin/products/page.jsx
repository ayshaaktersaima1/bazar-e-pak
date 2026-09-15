import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
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

    const productResponse =
        await serverApi.get(
            "/api/products?page=1&limit=20",
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
                    productResponse?.data ??
                    []
                }
                initialPagination={
                    productResponse?.pagination ??
                    {}
                }
                canDelete={
                    canDeleteProducts
                }
            />
        </div>
    );
};

export default AdminProductsPage;