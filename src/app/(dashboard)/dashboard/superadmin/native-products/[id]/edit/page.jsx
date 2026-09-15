import { notFound } from "next/navigation";

import NativeProductFormWrapper from "@/features/dashboard/superadmin/native-products/native-product-form-wrapper";
import { serverApi } from "@/lib/server";

const EditNativeProductPage = async ({
    params,
}) => {
    const { id } = await params;

    const productResponse =
        await serverApi.get(
            `/api/products/${id}`,
            {},
            {
                auth: true,
                includeMeta: true,
            },
        );

    const product =
        productResponse?.data ?? null;

    if (!product) {
        notFound();
    }

    const categoryResponse =
        await serverApi.get(
            "/api/categories?status=active&page=1&limit=100",
            {},
            {
                auth: false,
                includeMeta: true,
            },
        );

    const categories =
        Array.isArray(
            categoryResponse?.data,
        )
            ? categoryResponse.data
            : [];

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#001B08]">
                    Edit Native Product
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Update this PakBazaar product.
                </p>
            </div>

            <NativeProductFormWrapper
                product={product}
                categories={categories}
            />
        </div>
    );
};

export default EditNativeProductPage;