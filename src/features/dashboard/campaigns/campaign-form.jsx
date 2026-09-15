"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
    name: "",
    description: "",
    banner: "",
    startDate: "",
    endDate: "",
    status: "draft",
    discountPercent: "",
    eligibleProducts: [],
    eligibleCategories: [],
    eligibleShops: [],
};

const toDateTimeLocal = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const offset = date.getTimezoneOffset();

    const localDate = new Date(
        date.getTime() - offset * 60 * 1000,
    );

    return localDate.toISOString().slice(0, 16);
};

const CampaignForm = ({
    campaign = null,
    products = [],
    categories = [],
    shops = [],
    loading = false,
    onSubmit,
    onCancel,
}) => {
    const isEdit = Boolean(campaign);

    const initialValues = useMemo(() => {
        if (!campaign) {
            return {
                ...defaultValues,
            };
        }

        return {
            name: campaign.name ?? "",
            description: campaign.description ?? "",
            banner: campaign.banner ?? "",

            startDate: toDateTimeLocal(
                campaign.startDate,
            ),

            endDate: toDateTimeLocal(
                campaign.endDate,
            ),

            status: campaign.status ?? "draft",

            discountPercent:
                campaign.discountPercent ?? "",

            eligibleProducts:
                campaign.eligibleProducts?.map(
                    (item) => item?._id ?? item,
                ) ?? [],

            eligibleCategories:
                campaign.eligibleCategories?.map(
                    (item) => item?._id ?? item,
                ) ?? [],

            eligibleShops:
                campaign.eligibleShops?.map(
                    (item) => item?._id ?? item,
                ) ?? [],
        };
    }, [campaign]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        mode: "onBlur",
    });

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    const startDate = watch("startDate");

    const submit = (values) => {
        const payload = {
            name: values.name.trim(),

            description:
                values.description?.trim() || "",

            banner:
                values.banner?.trim() || "",

            startDate: new Date(
                values.startDate,
            ).toISOString(),

            endDate: new Date(
                values.endDate,
            ).toISOString(),

            status: values.status,

            eligibleProducts:
                values.eligibleProducts || [],

            eligibleCategories:
                values.eligibleCategories || [],

            eligibleShops:
                values.eligibleShops || [],

            discountPercent:
                values.discountPercent === ""
                    ? null
                    : Number(
                        values.discountPercent,
                    ),
        };

        onSubmit?.(payload);
    };

    const input =
        "w-full rounded-lg border border-[#E5E2D8] bg-white px-3 py-2.5 text-sm text-[#001B08] outline-none focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/20";

    const label =
        "mb-2 block text-sm font-semibold text-[#001B08]";

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-6"
        >
            {/* Basic Information */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Campaign Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add the main campaign details.
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className={label}>
                            Campaign Name
                        </label>

                        <input
                            {...register("name", {
                                required:
                                    "Campaign name is required",

                                maxLength: {
                                    value: 150,
                                    message:
                                        "Maximum 150 characters",
                                },
                            })}
                            placeholder="Enter campaign name"
                            className={`${input} ${errors.name
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />

                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={label}>
                            Description
                        </label>

                        <textarea
                            {...register(
                                "description",
                                {
                                    maxLength: {
                                        value: 2000,
                                        message:
                                            "Maximum 2000 characters",
                                    },
                                },
                            )}
                            rows={5}
                            placeholder="Describe the campaign..."
                            className={`${input} resize-none ${errors.description
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />

                        {errors.description && (
                            <p className="mt-1 text-xs text-red-600">
                                {
                                    errors.description
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={label}>
                            Banner URL
                        </label>

                        <input
                            {...register("banner")}
                            type="url"
                            placeholder="https://example.com/banner.jpg"
                            className={input}
                        />
                    </div>
                </div>
            </div>

            {/* Schedule */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Campaign Schedule
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Set the campaign start and end
                        time.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className={label}>
                            Start Date
                        </label>

                        <input
                            {...register(
                                "startDate",
                                {
                                    required:
                                        "Start date is required",
                                },
                            )}
                            type="datetime-local"
                            className={`${input} ${errors.startDate
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />

                        {errors.startDate && (
                            <p className="mt-1 text-xs text-red-600">
                                {
                                    errors.startDate
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={label}>
                            End Date
                        </label>

                        <input
                            {...register(
                                "endDate",
                                {
                                    required:
                                        "End date is required",

                                    validate: (
                                        value,
                                    ) => {
                                        if (
                                            !startDate ||
                                            !value
                                        ) {
                                            return true;
                                        }

                                        return (
                                            new Date(value) >
                                            new Date(
                                                startDate,
                                            ) ||
                                            "End date must be after start date"
                                        );
                                    },
                                },
                            )}
                            type="datetime-local"
                            className={`${input} ${errors.endDate
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />

                        {errors.endDate && (
                            <p className="mt-1 text-xs text-red-600">
                                {
                                    errors.endDate
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Campaign Settings */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Campaign Settings
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className={label}>
                            Status
                        </label>

                        <select
                            {...register("status")}
                            className={input}
                        >
                            <option value="draft">
                                Draft
                            </option>

                            <option value="scheduled">
                                Scheduled
                            </option>

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                            <option value="expired">
                                Expired
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className={label}>
                            Discount (%)
                        </label>

                        <input
                            {...register(
                                "discountPercent",
                                {
                                    min: {
                                        value: 0,
                                        message:
                                            "Minimum discount is 0%",
                                    },

                                    max: {
                                        value: 100,
                                        message:
                                            "Maximum discount is 100%",
                                    },
                                },
                            )}
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            placeholder="Optional"
                            className={`${input} ${errors.discountPercent
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />

                        {errors.discountPercent && (
                            <p className="mt-1 text-xs text-red-600">
                                {
                                    errors
                                        .discountPercent
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Eligibility */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Campaign Eligibility
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Choose which products,
                        categories or shops are included.
                        Leave them empty if the campaign
                        should not be restricted by that
                        field.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Products */}
                    <div>
                        <label className={label}>
                            Products
                        </label>

                        <select
                            multiple
                            {...register(
                                "eligibleProducts",
                            )}
                            className={`${input} min-h-48`}
                        >
                            {products.map(
                                (product) => (
                                    <option
                                        key={
                                            product._id
                                        }
                                        value={
                                            product._id
                                        }
                                    >
                                        {product.name}
                                    </option>
                                ),
                            )}
                        </select>

                        <p className="mt-2 text-xs text-gray-500">
                            Hold Ctrl / Cmd to select
                            multiple products.
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <label className={label}>
                            Categories
                        </label>

                        <select
                            multiple
                            {...register(
                                "eligibleCategories",
                            )}
                            className={`${input} min-h-48`}
                        >
                            {categories.map(
                                (category) => (
                                    <option
                                        key={
                                            category._id
                                        }
                                        value={
                                            category._id
                                        }
                                    >
                                        {category.name}
                                    </option>
                                ),
                            )}
                        </select>

                        <p className="mt-2 text-xs text-gray-500">
                            Hold Ctrl / Cmd to select
                            multiple categories.
                        </p>
                    </div>

                    {/* Shops */}
                    <div>
                        <label className={label}>
                            Shops
                        </label>

                        <select
                            multiple
                            {...register(
                                "eligibleShops",
                            )}
                            className={`${input} min-h-48`}
                        >
                            {shops.map(
                                (shop) => (
                                    <option
                                        key={
                                            shop._id
                                        }
                                        value={
                                            shop._id
                                        }
                                    >
                                        {shop.name}
                                    </option>
                                ),
                            )}
                        </select>

                        <p className="mt-2 text-xs text-gray-500">
                            Hold Ctrl / Cmd to select
                            multiple shops.
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-[#E5E2D8] pt-5">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="h-11 rounded-lg border border-[#E5E2D8] px-6 text-sm font-semibold text-gray-600 transition hover:border-[#002B12] hover:text-[#002B12] disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="h-11 min-w-40 rounded-lg bg-[#D9A928] px-6 text-sm font-semibold text-[#001B08] transition hover:bg-[#E8BB44] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? isEdit
                            ? "Updating..."
                            : "Creating..."
                        : isEdit
                            ? "Update Campaign"
                            : "Create Campaign"}
                </button>
            </div>
        </form>
    );
};

export default CampaignForm;