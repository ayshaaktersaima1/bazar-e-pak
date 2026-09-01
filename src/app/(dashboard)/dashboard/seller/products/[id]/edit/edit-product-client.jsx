"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ProductForm from "@/components/dashboard/seller/product/product-form";
import useApi from "@/hooks/use-api";

const EditProductClient = ({
    product,
    categories = [],
    shopId,
}) => {
    const router = useRouter();
    const api = useApi();

    const handleSubmit = async (
        values,
    ) => {
        const result = await api.put(
            `/api/products/${product._id}`,
            {
                name: values.name.trim(),
                description:
                    values.description.trim(),
                price: Number(
                    values.price,
                ),
                stock: Number(
                    values.stock,
                ),
                discount: Number(
                    values.discount || 0,
                ),
                categoryId:
                    values.categoryId,
                shopId,
                status:
                    values.status ||
                    "active",
                images: (
                    values.images || []
                ).filter(Boolean),
            },
        );

        if (result.error) return;

        toast.success(
            "Product updated successfully.",
        );

        router.push(
            "/dashboard/seller/products",
        );

        router.refresh();
    };

    return (
        <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-[#002B12]">
                    Edit Product
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Update your product
                    information.
                </p>
            </div>

            <ProductForm
                product={product}
                shopId={shopId}
                categories={categories}
                loading={api.loading}
                onSubmit={handleSubmit}
                onCancel={() =>
                    router.push(
                        "/dashboard/seller/products",
                    )
                }
            />
        </div>
    );
};

export default EditProductClient;