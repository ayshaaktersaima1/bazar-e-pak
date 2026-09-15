import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";

import AllProductsTable from "@/features/dashboard/superadmin/products/all-products-table";

const SuperAdminProductsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== "super_admin") {
        redirect("/dashboard");
    }

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
        <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Developer Panel
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Product Management
                </h1>

                <p className="mt-2 text-sm text-[#667085]">
                    Review products across the platform, manage featured status,
                    and remove problematic products.
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
            />
        </div>
    );
};

export default SuperAdminProductsPage;