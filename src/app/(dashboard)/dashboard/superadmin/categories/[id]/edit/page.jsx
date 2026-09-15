"use client";

import {
    useEffect,
    useState,
} from "react";
import {
    useParams,
    useRouter,
} from "next/navigation";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import CategoryForm from "@/features/dashboard/superadmin/categories/category-form";

export default function EditCategoryPage() {
    const params = useParams();
    const router = useRouter();

    const {
        get,
        patch,
    } = useApi();

    const categoryId =
        params?.id;

    const [
        category,
        setCategory,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        saving,
        setSaving,
    ] = useState(false);

    useEffect(() => {
        if (!categoryId) {
            return;
        }

        let cancelled = false;

        get(
            `/api/categories/${categoryId}`,
            {},
            {
                auth: true,
                showError: false,
            },
        )
            .then((result) => {
                if (cancelled) {
                    return;
                }

                if (
                    result?.success ===
                    false
                ) {
                    throw new Error(
                        result?.message ||
                        "Failed to load category.",
                    );
                }

                const categoryData =
                    result?.data ||
                    result;

                setCategory(
                    categoryData ||
                    null,
                );
            })
            .catch((error) => {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Fetch category error:",
                    error,
                );

                toast.error(
                    error?.message ||
                    "Failed to load category.",
                );

                setCategory(null);
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [categoryId, get]);

    const handleUpdate =
        async (
            categoryData,
        ) => {
            try {
                setSaving(true);

                const result =
                    await patch(
                        `/api/categories/${categoryId}`,
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
                        "Category could not be updated.",
                    );
                }

                const updatedCategory =
                    result?.data ||
                    result;

                if (
                    !updatedCategory?._id
                ) {
                    throw new Error(
                        "Category could not be updated.",
                    );
                }

                toast.success(
                    "Category updated successfully.",
                );

                router.push(
                    "/dashboard/superadmin/categories",
                );

                router.refresh();
            } catch (error) {
                console.error(
                    "Update category error:",
                    error,
                );

                toast.error(
                    error?.message ||
                    "Failed to update category.",
                );
            } finally {
                setSaving(false);
            }
        };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-[#002B12]" />
            </div>
        );
    }

    if (!category) {
        return (
            <div className="mx-auto max-w-4xl">
                <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center">
                    <h1 className="text-lg font-semibold text-zinc-900">
                        Category Not Found
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        This category
                        does not exist
                        or has been
                        deleted.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">
                    Edit Category
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Update category
                    details.
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
                <CategoryForm
                    initialData={
                        category
                    }
                    onSubmit={
                        handleUpdate
                    }
                    loading={
                        saving
                    }
                    submitLabel="Update Category"
                />
            </div>
        </div>
    );
}