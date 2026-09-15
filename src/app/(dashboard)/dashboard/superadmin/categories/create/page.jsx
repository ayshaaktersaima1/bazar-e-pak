"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import CategoryForm from "@/features/dashboard/superadmin/categories/category-form";

export default function CreateCategoryPage() {
    const api = useApi();
    const router = useRouter();

    const [
        loading,
        setLoading,
    ] = useState(false);

    const handleCreate =
        async (categoryData) => {
            try {
                setLoading(true);

                const result =
                    await api.post(
                        "/api/categories",
                        categoryData,
                        {},
                        {
                            auth: true,
                            showSuccess:
                                false,
                            showError:
                                false,
                        },
                    );

                if (
                    result?.success ===
                    false
                ) {
                    throw new Error(
                        result?.message ||
                        "Category could not be created.",
                    );
                }

                const category =
                    result?.data;

                if (!category?._id) {
                    throw new Error(
                        "Category could not be created.",
                    );
                }

                toast.success(
                    "Category created successfully.",
                );

                router.push(
                    "/dashboard/superadmin/categories",
                );
            } catch (error) {
                console.error(
                    "Create category error:",
                    error,
                );

                toast.error(
                    error?.message ||
                    "Failed to create category.",
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">
                    Add Category
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Create a new product
                    category for PakBazaar.
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
                <CategoryForm
                    onSubmit={
                        handleCreate
                    }
                    loading={loading}
                    submitLabel="Create Category"
                />
            </div>
        </div>
    );
}