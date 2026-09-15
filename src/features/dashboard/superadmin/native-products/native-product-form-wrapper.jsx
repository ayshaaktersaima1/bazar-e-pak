"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ProductForm from "@/features/dashboard/seller/product/product-form";
import useApi from "@/hooks/use-api";

const NativeProductFormWrapper = ({
    categories = [],
    product = null,
}) => {
    const router = useRouter();
    const api = useApi();

    const isEdit = Boolean(product?._id);

    const handleSubmit = async (values) => {
        const payload = {
            name: values.name.trim(),
            description: values.description.trim(),
            price: Number(values.price),
            stock: Number(values.stock),
            discount: Number(values.discount || 0),
            categoryId: values.categoryId,
            status: values.status || "active",
            images: (values.images || []).filter(Boolean),
        };

        let result;

        if (isEdit) {
            result = await api.patch(
                `/api/native-products/${product._id}`,
                payload,
                {},
                {
                    showSuccess: false,
                },
            );
        } else {
            result = await api.post(
                "/api/native-products",
                payload,
                {},
                {
                    showSuccess: false,
                },
            );
        }

        if (!result.success) return;

        toast.success(
            isEdit
                ? "Native product updated successfully."
                : "Native product created successfully.",
        );

        router.push(
            "/dashboard/superadmin/native-products",
        );

        router.refresh();
    };

    return (
        <ProductForm
            product={product}
            categories={categories}
            loading={api.loading}
            onSubmit={handleSubmit}
            onCancel={() =>
                router.push(
                    "/dashboard/superadmin/native-products",
                )
            }
        />
    );
};

export default NativeProductFormWrapper;