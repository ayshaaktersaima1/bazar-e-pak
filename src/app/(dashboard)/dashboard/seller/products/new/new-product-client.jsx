"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ProductForm from "@/components/dashboard/seller/product-form";
import useApi from "@/hooks/use-api";

const NewProductClient = ({
    shopId,
    shopName,
    categories = [],
}) => {
    const router = useRouter();
    const api = useApi();

    const handleSubmit = async (values) => {
        if (!shopId) {
            toast.error("Shop not found.");
            return;
        }

        try {
            const payload = {
                name: values.name.trim(),
                description:
                    values.description.trim(),
                price: Number(values.price),
                stock: Number(values.stock),
                discount: Number(
                    values.discount || 0,
                ),
                categoryId: String(
                    values.categoryId,
                ),
                shopId: String(shopId),
                status:
                    values.status || "active",
                images: (
                    values.images || []
                ).filter(Boolean),
            };

            await api.post(
                "/api/products",
                payload,
            );

            toast.success(
                "Product created successfully.",
            );

            router.push(
                "/dashboard/seller/products",
            );

            router.refresh();
        } catch (error) {
            console.error(
                "Create product error:",
                error,
            );

            toast.error(
                error?.message ||
                    "Failed to create product.",
            );
        }
    };

    return (
        <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-[#002B12]">
                    Create Product
                </h1>

                <p className="mt-1 text-sm text-[#6B7280]">
                    Add a new product to{" "}
                    <span className="font-semibold text-[#002B12]">
                        {shopName || "your shop"}
                    </span>
                    .
                </p>
            </div>

            <ProductForm
                mode="create"
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