"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
    CalendarDays,
    Percent,
    Tag,
} from "lucide-react";

const defaultValues = {
    productId: "",
    title: "Product Offer",
    discountPercent: "",
    startDate: "",
    endDate: "",
    status: "draft",
};

const toDateTimeLocal = (value) => {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (
        Number.isNaN(
            date.getTime(),
        )
    ) {
        return "";
    }

    const offset =
        date.getTimezoneOffset();

    const localDate =
        new Date(
            date.getTime() -
            offset * 60 * 1000,
        );

    return localDate
        .toISOString()
        .slice(0, 16);
};

const OfferForm = ({
    offer = null,
    products = [],
    loading = false,
    onSubmit,
    onCancel,
}) => {
    const isEdit =
        Boolean(offer);

    const initialValues =
        useMemo(() => {
            if (!offer) {
                return {
                    ...defaultValues,
                };
            }

            return {
                productId:
                    offer.productId?._id ??
                    offer.productId ??
                    "",

                title:
                    offer.title ??
                    "Product Offer",

                discountPercent:
                    offer.discountPercent ??
                    "",

                startDate:
                    toDateTimeLocal(
                        offer.startDate,
                    ),

                endDate:
                    toDateTimeLocal(
                        offer.endDate,
                    ),

                status:
                    offer.status ??
                    "draft",
            };
        }, [offer]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues:
            initialValues,

        mode: "onBlur",
    });

    useEffect(() => {
        reset(initialValues);
    }, [
        initialValues,
        reset,
    ]);

    const startDate =
        watch("startDate");

    const submit = (
        values,
    ) => {
        const payload = {
            productId:
                values.productId,

            title:
                values.title.trim() ||
                "Product Offer",

            discountPercent:
                Number(
                    values.discountPercent,
                ),

            startDate:
                new Date(
                    values.startDate,
                ).toISOString(),

            endDate:
                new Date(
                    values.endDate,
                ).toISOString(),

            status:
                values.status,
        };

        onSubmit?.(
            payload,
        );
    };

    const inputClass =
        "w-full rounded-lg border border-[#E5E2D8] bg-white px-3 py-2.5 text-sm text-[#001B08] outline-none transition focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/20";

    const labelClass =
        "mb-2 block text-sm font-semibold text-[#001B08]";

    return (
        <form
            onSubmit={handleSubmit(
                submit,
            )}
            className="space-y-6"
        >
            {/* Basic Information */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Offer Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Select a product and
                        configure the offer.
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Product */}
                    <div>
                        <label
                            className={
                                labelClass
                            }
                        >
                            Product
                        </label>

                        <select
                            {...register(
                                "productId",
                                {
                                    required:
                                        "Product is required",
                                },
                            )}
                            disabled={
                                isEdit
                            }
                            className={`${inputClass} ${errors.productId
                                    ? "border-red-500"
                                    : ""
                                } disabled:cursor-not-allowed disabled:bg-gray-100`}
                        >
                            <option value="">
                                Select product
                            </option>

                            {products.map(
                                (
                                    product,
                                ) => (
                                    <option
                                        key={
                                            product._id
                                        }
                                        value={
                                            product._id
                                        }
                                    >
                                        {
                                            product.name
                                        }
                                        {product.price !==
                                            undefined &&
                                            ` — PKR ${Number(
                                                product.price,
                                            ).toLocaleString()}`}
                                    </option>
                                ),
                            )}
                        </select>

                        {errors.productId && (
                            <p className="mt-1 text-xs text-red-600">
                                {
                                    errors
                                        .productId
                                        .message
                                }
                            </p>
                        )}

                        {isEdit && (
                            <p className="mt-1 text-xs text-gray-500">
                                Product cannot
                                be changed while
                                editing an
                                existing offer.
                            </p>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label
                            className={
                                labelClass
                            }
                        >
                            Offer Title
                        </label>

                        <div className="relative">
                            <Tag
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                {...register(
                                    "title",
                                    {
                                        maxLength:
                                        {
                                            value: 150,
                                            message:
                                                "Maximum 150 characters",
                                        },
                                    },
                                )}
                                type="text"
                                placeholder="Product Offer"
                                className={`${inputClass} pl-10 ${errors.title
                                        ? "border-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        {errors.title && (
                            <p className="mt-1 text-xs text-red-600">
                                {
                                    errors
                                        .title
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Discount */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Discount
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Set the percentage
                        discount for this
                        product.
                    </p>
                </div>

                <div>
                    <label
                        className={
                            labelClass
                        }
                    >
                        Discount (%)
                    </label>

                    <div className="relative">
                        <Percent
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            {...register(
                                "discountPercent",
                                {
                                    required:
                                        "Discount is required",

                                    min: {
                                        value: 0,
                                        message:
                                            "Discount cannot be less than 0%",
                                    },

                                    max: {
                                        value: 100,
                                        message:
                                            "Discount cannot exceed 100%",
                                    },
                                },
                            )}
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            placeholder="Enter discount percentage"
                            className={`${inputClass} pl-10 ${errors.discountPercent
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />
                    </div>

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

            {/* Dates */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Offer Period
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Choose when this offer
                        begins and ends.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* Start */}
                    <div>
                        <label
                            className={
                                labelClass
                            }
                        >
                            Start Date
                        </label>

                        <div className="relative">
                            <CalendarDays
                                size={17}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                {...register(
                                    "startDate",
                                    {
                                        required:
                                            "Start date is required",
                                    },
                                )}
                                type="datetime-local"
                                className={`${inputClass} pl-10 ${errors.startDate
                                        ? "border-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        {errors.startDate && (
                            <p className="mt-1 text-xs text-red-600">
                                {
                                    errors
                                        .startDate
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    {/* End */}
                    <div>
                        <label
                            className={
                                labelClass
                            }
                        >
                            End Date
                        </label>

                        <div className="relative">
                            <CalendarDays
                                size={17}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

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
                                                new Date(
                                                    value,
                                                ) >
                                                new Date(
                                                    startDate,
                                                ) ||
                                                "End date must be after start date"
                                            );
                                        },
                                    },
                                )}
                                type="datetime-local"
                                className={`${inputClass} pl-10 ${errors.endDate
                                        ? "border-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        {errors.endDate && (
                            <p className="mt-1 text-xs text-red-600">
                                {
                                    errors
                                        .endDate
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Offer Status
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Control the current
                        state of this offer.
                    </p>
                </div>

                <div>
                    <label
                        className={
                            labelClass
                        }
                    >
                        Status
                    </label>

                    <select
                        {...register(
                            "status",
                        )}
                        className={
                            inputClass
                        }
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
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-[#E5E2D8] pt-5">
                <button
                    type="button"
                    onClick={
                        onCancel
                    }
                    disabled={
                        loading
                    }
                    className="h-11 rounded-lg border border-[#E5E2D8] px-6 text-sm font-semibold text-gray-600 transition hover:border-[#002B12] hover:text-[#002B12] disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={
                        loading
                    }
                    className="h-11 min-w-36 rounded-lg bg-[#D9A928] px-6 text-sm font-semibold text-[#001B08] transition hover:bg-[#E8BB44] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? isEdit
                            ? "Updating..."
                            : "Creating..."
                        : isEdit
                            ? "Update Offer"
                            : "Create Offer"}
                </button>
            </div>
        </form>
    );
};

export default OfferForm;