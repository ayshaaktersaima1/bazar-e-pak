"use client";

import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

const defaultValues = {
    name: "",
    designation: "",
    bio: "",
    picture: "",
    order: 0,
    status: "active",
    socialLinks: [],
};

const TeamForm = ({
    member = null,
    loading = false,
    onSubmit,
    onCancel,
}) => {
    const isEdit = Boolean(member);

    const initialValues = useMemo(() => {
        if (!member) {
            return { ...defaultValues };
        }

        return {
            name: member.name ?? "",
            designation: member.designation ?? "",
            bio: member.bio ?? "",
            picture: member.picture ?? "",
            order: member.order ?? 0,
            status: member.status ?? "active",
            socialLinks: Array.isArray(member.socialLinks)
                ? member.socialLinks.map((item) => ({
                    platform: item?.platform ?? "",
                    url: item?.url ?? "",
                }))
                : [],
        };
    }, [member]);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "socialLinks",
    });

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    const submit = (values) => {
        const socialLinks = (values.socialLinks || [])
            .map((item) => ({
                platform: item.platform?.trim() || "",
                url: item.url?.trim() || "",
            }))
            .filter((item) => item.platform && item.url);

        onSubmit?.({
            name: values.name.trim(),
            designation: values.designation.trim(),
            bio: values.bio?.trim() || "",
            picture: values.picture?.trim() || "",
            order: Number(values.order || 0),
            status: values.status,
            socialLinks,
        });
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
            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Team Member Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add the member&apos;s basic information.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className={label}>
                            Name
                        </label>

                        <input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            placeholder="Enter team member name"
                            className={`${input} ${errors.name ? "border-red-500" : ""
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
                            Designation
                        </label>

                        <input
                            {...register("designation", {
                                required: "Designation is required",
                            })}
                            placeholder="Founder, Developer, Designer..."
                            className={`${input} ${errors.designation ? "border-red-500" : ""
                                }`}
                        />

                        {errors.designation && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.designation.message}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className={label}>
                            Picture URL
                        </label>

                        <input
                            {...register("picture")}
                            placeholder="/images/team/member.jpg or https://..."
                            className={input}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={label}>
                            Bio
                        </label>

                        <textarea
                            {...register("bio")}
                            rows={5}
                            placeholder="Short description about the team member"
                            className={`${input} resize-y`}
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Display Settings
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
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

                        <p className="mt-1 text-xs text-gray-500">
                            Lower numbers appear first.
                        </p>
                    </div>

                    <div>
                        <label className={label}>
                            Status
                        </label>

                        <select
                            {...register("status")}
                            className={input}
                        >
                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-[#001B08]">
                            Social Links
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add GitHub, LinkedIn, portfolio or other links.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            append({
                                platform: "",
                                url: "",
                            })
                        }
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#001B08] px-4 text-sm font-semibold text-white transition hover:bg-[#D9A928] hover:text-[#001B08]"
                    >
                        <Plus size={16} />
                        Add Link
                    </button>
                </div>

                {fields.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-[#E5E2D8] p-5 text-center text-sm text-gray-500">
                        No social links added.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="grid gap-3 rounded-xl border border-[#E5E2D8] p-4 md:grid-cols-[1fr_2fr_auto]"
                            >
                                <div>
                                    <label className={label}>
                                        Platform
                                    </label>

                                    <input
                                        {...register(
                                            `socialLinks.${index}.platform`,
                                        )}
                                        placeholder="linkedin"
                                        className={input}
                                    />
                                </div>

                                <div>
                                    <label className={label}>
                                        URL
                                    </label>

                                    <input
                                        {...register(
                                            `socialLinks.${index}.url`,
                                        )}
                                        placeholder="https://..."
                                        className={input}
                                    />
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                                        aria-label="Remove social link"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <p className="mt-4 text-xs text-gray-500">
                    For the public Team page, use platform names like
                    <strong> github</strong>,
                    <strong> linkedin</strong>,
                    <strong> portfolio</strong> or
                    <strong> website</strong>.
                </p>
            </div>

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
                            ? "Update Member"
                            : "Create Member"}
                </button>
            </div>
        </form>
    );
};

export default TeamForm;