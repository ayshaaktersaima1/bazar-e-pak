import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";

import EditProductClient from "./edit-product-client";

const EditProductPage = async ({
    params,
}) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    const { id } = await params;

    const [
        productResponse,
        categoryResponse,
    ] = await Promise.all([
        serverApi.get(
            `/api/products/${id}`,
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

    const product =
        productResponse?.data ?? null;

    if (!product?._id) {
        redirect(
            "/dashboard/seller/products",
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl">
            <EditProductClient
                product={product}
                categories={
                    categoryResponse?.data ??
                    []
                }
                shopId={String(
                    product.shopId?._id ??
                        product.shopId ??
                        "",
                )}
            />
        </div>
    );
};

export default EditProductPage;