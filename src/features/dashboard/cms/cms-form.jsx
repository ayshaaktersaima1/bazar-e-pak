"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
    key: "",
    type: "homepage",
    title: "",
    slug: "",
    locale: "en",
    status: "draft",
    order: 0,
    startDate: "",
    endDate: "",
    content: "{}",
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

    return localDate
        .toISOString()
        .slice(0, 16);
};

const CmsForm = ({
    cmsItem = null,
    loading = false,
    onSubmit,
    onCancel,
}) => {
    const isEdit = Boolean(cmsItem);

    const initialValues = useMemo(() => {
        if (!cmsItem) {
            return {
                ...defaultValues,
            };
        }

        return {
            key: cmsItem.key ?? "",
            type: cmsItem.type ?? "homepage",
            title: cmsItem.title ?? "",
            slug: cmsItem.slug ?? "",
            locale: cmsItem.locale ?? "en",
            status: cmsItem.status ?? "draft",
            order: cmsItem.order ?? 0,

            startDate: toDateTimeLocal(
                cmsItem.startDate,
            ),

            endDate: toDateTimeLocal(
                cmsItem.endDate,
            ),

            content: JSON.stringify(
                cmsItem.content ?? {},
                null,
                2,
            ),
        };
    }, [cmsItem]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: initialValues,
        mode: "onBlur",
    });

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    const startDate =
        watch("startDate");

    const submit = (values) => {
        let parsedContent = {};

        try {
            parsedContent = values.content
                ? JSON.parse(values.content)
                : {};
        } catch {
            return;
        }

        const payload = {
            key: values.key.trim(),

            type: values.type,

            title:
                values.title?.trim() || "",

            slug:
                values.slug?.trim() || "",

            locale:
                values.locale,

            status:
                values.status,

            order:
                Number(
                    values.order || 0,
                ),

            startDate:
                values.startDate
                    ? new Date(
                        values.startDate,
                    ).toISOString()
                    : null,

            endDate:
                values.endDate
                    ? new Date(
                        values.endDate,
                    ).toISOString()
                    : null,

            content:
                parsedContent,
        };

        onSubmit?.(
            payload,
        );
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
            {/* Main Information */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        CMS Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Define the CMS record and where it belongs.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className={label}>
                            Key
                        </label>

                        <input
                            {...register("key", {
                                required:
                                    "Key is required",
                            })}
                            placeholder="homepage.hero"
                            className={`${input} ${errors.key
                                    ? "border-red-500"
                                    : ""
                                }`}
                        />

                        {errors.key && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.key.message}
                            </p>
                        )}

                        <p className="mt-2 text-xs text-gray-500">
                            Key must be unique for each locale.
                        </p>
                    </div>

                    <div>
                        <label className={label}>
                            Type
                        </label>

                        <select
                            {...register("type", {
                                required:
                                    "Type is required",
                            })}
                            className={input}
                        >
                            <option value="hero">
                                Hero
                            </option>

                            <option value="banner">
                                Banner
                            </option>

                            <option value="homepage">
                                Homepage
                            </option>

                            <option value="page">
                                Page
                            </option>

                            <option value="template">
                                Template
                            </option>

                            <option value="announcement">
                                Announcement
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className={label}>
                            Title
                        </label>

                        <input
                            {...register("title")}
                            placeholder="Enter title"
                            className={input}
                        />
                    </div>

                    <div>
                        <label className={label}>
                            Slug
                        </label>

                        <input
                            {...register("slug")}
                            placeholder="about-us"
                            className={input}
                        />
                    </div>
                </div>
            </div>

            {/* Language & Publishing */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Publishing
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <div>
                        <label className={label}>
                            Locale
                        </label>

                        <select
                            {...register("locale")}
                            className={input}
                        >
                            <option value="en">
                                English
                            </option>

                            <option value="ur">
                                Urdu
                            </option>
                        </select>
                    </div>

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

                            <option value="published">
                                Published
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
                            Order
                        </label>

                        <input
                            {...register("order", {
                                valueAsNumber: true,
                            })}
                            type="number"
                            step="1"
                            className={input}
                        />
                    </div>
                </div>
            </div>

            {/* Schedule */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Schedule
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Dates are optional. Leave them empty for no time restriction.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className={label}>
                            Start Date
                        </label>

                        <input
                            {...register("startDate")}
                            type="datetime-local"
                            className={input}
                        />
                    </div>

                    <div>
                        <label className={label}>
                            End Date
                        </label>

                        <input
                            {...register("endDate", {
                                validate: (value) => {
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
                            })}
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

            {/* Flexible Content */}
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Content
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Enter the CMS content as valid JSON.
                    </p>
                </div>

                <div>
                    <label className={label}>
                        Content JSON
                    </label>

                    <textarea
                        {...register("content", {
                            required:
                                "Content JSON is required",

                            validate: (value) => {
                                try {
                                    JSON.parse(
                                        value || "{}",
                                    );

                                    return true;
                                } catch {
                                    return "Content must be valid JSON";
                                }
                            },
                        })}
                        rows={14}
                        spellCheck={false}
                        placeholder={`{
  "headline": "Welcome to PakBazaar",
  "subheading": "Discover businesses across Pakistan"
}`}
                        className={`${input} resize-y font-mono ${errors.content
                                ? "border-red-500"
                                : ""
                            }`}
                    />

                    {errors.content && (
                        <p className="mt-1 text-xs text-red-600">
                            {
                                errors.content
                                    .message
                            }
                        </p>
                    )}
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
                            ? "Update Content"
                            : "Create Content"}
                </button>
            </div>
        </form>
    );
};

export default CmsForm;