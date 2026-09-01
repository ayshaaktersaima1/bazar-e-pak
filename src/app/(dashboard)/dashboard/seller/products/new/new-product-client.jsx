"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useApi from "../../../../../../hooks/use-api";
import ProductForm from "../../../../../../features/dashboard/seller/product/product-form";


const NewProductClient = ({
    shopId,
    shopName,
    categories = [],
}) => {
    const router = useRouter();
    const api = useApi();

    const handleSubmit = async (
        values,
    ) => {
        const result = await api.post(
            "/api/products",
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
            "Product created successfully.",
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
                    Create Product
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Add a new product to{" "}
                    <span className="font-semibold text-[#002B12]">
                        {shopName}
                    </span>
                    .
                </p>
            </div>

            <ProductForm
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

export default NewProductClient;