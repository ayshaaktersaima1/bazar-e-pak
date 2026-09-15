"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";

const CategoryForm = ({
    initialData = null,
    onSubmit,
    loading = false,
    submitLabel = "Save Category",
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            image: "",
            status: "active",
            order: 0,
        },
    });

    useEffect(() => {
        reset({
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            description:
                initialData?.description || "",
            image: initialData?.image || "",
            status:
                initialData?.status ||
                "active",
            order:
                initialData?.order ?? 0,
        });
    }, [initialData, reset]);

    const handleFormSubmit = async (
        data,
    ) => {
        const payload = {
            name: data.name.trim(),
            description:
                data.description.trim(),
            status: data.status,
            order: Number(data.order),
        };

        if (data.slug.trim()) {
            payload.slug =
                data.slug
                    .trim()
                    .toLowerCase();
        }

        if (data.image.trim()) {
            payload.image =
                data.image.trim();
        }

        if (!payload.description) {
            delete payload.description;
        }

        await onSubmit(payload);
    };

    const inputClass =
        "mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#002B12] focus:ring-1 focus:ring-[#002B12] disabled:cursor-not-allowed disabled:bg-zinc-50";

    const labelClass =
        "text-sm font-medium text-zinc-700";

    const errorClass =
        "mt-1 text-xs text-red-500";

    return (
        <form
            onSubmit={handleSubmit(
                handleFormSubmit,
            )}
            className="space-y-6"
        >
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="name"
                        className={
                            labelClass
                        }
                    >
                        Category Name
                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    </label>

                    <input
                        id="name"
                        type="text"
                        disabled={loading}
                        placeholder="e.g. Electronics"
                        {...register(
                            "name",
                            {
                                required:
                                    "Category name is required",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Category name must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 100,
                                    message:
                                        "Category name cannot exceed 100 characters",
                                },
                            },
                        )}
                        className={
                            inputClass
                        }
                    />

                    {errors.name && (
                        <p
                            className={
                                errorClass
                            }
                        >
                            {
                                errors
                                    .name
                                    .message
                            }
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="slug"
                        className={
                            labelClass
                        }
                    >
                        Slug
                    </label>

                    <input
                        id="slug"
                        type="text"
                        disabled={loading}
                        placeholder="electronics"
                        {...register(
                            "slug",
                            {
                                minLength: {
                                    value: 2,
                                    message:
                                        "Slug must be at least 2 characters",
                                },

                                maxLength: {
                                    value: 120,
                                    message:
                                        "Slug cannot exceed 120 characters",
                                },

                                pattern: {
                                    value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                                    message:
                                        "Use lowercase letters, numbers and hyphens only",
                                },
                            },
                        )}
                        className={
                            inputClass
                        }
                    />

                    {errors.slug && (
                        <p
                            className={
                                errorClass
                            }
                        >
                            {
                                errors
                                    .slug
                                    .message
                            }
                        </p>
                    )}

                    <p className="mt-1 text-xs text-zinc-400">
                        Optional. Leave
                        blank to generate it
                        automatically.
                    </p>
                </div>
            </div>

            <div>
                <label
                    htmlFor="description"
                    className={labelClass}
                >
                    Description
                </label>

                <textarea
                    id="description"
                    rows={4}
                    disabled={loading}
                    placeholder="Write a short category description..."
                    {...register(
                        "description",
                        {
                            maxLength: {
                                value: 1000,
                                message:
                                    "Description cannot exceed 1000 characters",
                            },
                        },
                    )}
                    className={`${inputClass} resize-none`}
                />

                {errors.description && (
                    <p
                        className={
                            errorClass
                        }
                    >
                        {
                            errors
                                .description
                                .message
                        }
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="image"
                    className={labelClass}
                >
                    Category Image URL
                </label>

                <input
                    id="image"
                    type="url"
                    disabled={loading}
                    placeholder="https://example.com/category.jpg"
                    {...register(
                        "image",
                        {
                            pattern: {
                                value: /^https?:\/\/.+/i,
                                message:
                                    "Enter a valid image URL",
                            },
                        },
                    )}
                    className={
                        inputClass
                    }
                />

                {errors.image && (
                    <p
                        className={
                            errorClass
                        }
                    >
                        {
                            errors.image
                                .message
                        }
                    </p>
                )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="status"
                        className={
                            labelClass
                        }
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        disabled={loading}
                        {...register(
                            "status",
                            {
                                required:
                                    true,
                            },
                        )}
                        className={
                            inputClass
                        }
                    >
                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="order"
                        className={
                            labelClass
                        }
                    >
                        Display Order
                    </label>

                    <input
                        id="order"
                        type="number"
                        min="0"
                        step="1"
                        disabled={loading}
                        {...register(
                            "order",
                            {
                                required:
                                    "Display order is required",
                                min: {
                                    value: 0,
                                    message:
                                        "Order cannot be negative",
                                },
                                validate: (
                                    value,
                                ) =>
                                    Number.isInteger(
                                        Number(
                                            value,
                                        ),
                                    ) ||
                                    "Order must be a whole number",
                            },
                        )}
                        className={
                            inputClass
                        }
                    />

                    {errors.order && (
                        <p
                            className={
                                errorClass
                            }
                        >
                            {
                                errors
                                    .order
                                    .message
                            }
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end border-t border-zinc-100 pt-5">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-lg bg-[#002B12] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00451E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />

                            {submitLabel}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;