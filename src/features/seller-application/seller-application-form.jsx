"use client";

import { useForm } from "react-hook-form";
import {
    Building2,
    FileText,
    MapPin,
    Phone,
    Send,
    Store,
    User,
} from "lucide-react";

const inputClass =
    "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15";

const labelClass = "mb-1.5 block text-sm font-medium text-zinc-700";

export default function SellerApplicationForm({
    user,
    onSubmit,
    loading = false,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            businessName: "",
            businessType: "",
            description: "",
            address: "",
        },
    });

    const submit = async (data) => {
        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-8">
            {/* Applicant Information */}
            <section>
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#002B12]/5">
                        <User className="h-4 w-4 text-[#002B12]" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-zinc-900">
                            Applicant Information
                        </h2>

                        <p className="text-xs text-zinc-500">
                            Tell us who is applying to become a seller.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>
                            Name
                        </label>

                        <input
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 150,
                                    message: "Name cannot exceed 150 characters",
                                },
                            })}
                            placeholder="Your name"
                            className={inputClass}
                        />

                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelClass}>
                            Phone Number
                        </label>

                        <div className="relative">
                            <Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" />

                            <input
                                {...register("phoneNumber", {
                                    maxLength: {
                                        value: 30,
                                        message: "Phone number cannot exceed 30 characters",
                                    },
                                })}
                                placeholder="03001234567"
                                className={`${inputClass} pl-9`}
                            />
                        </div>

                        {errors.phoneNumber && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>
                            Email
                        </label>

                        <input
                            {...register("email", {
                                validate: (value) =>
                                    !value ||
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                    "Enter a valid email address",
                            })}
                            type="email"
                            placeholder="you@example.com"
                            className={inputClass}
                        />

                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Business Information */}
            <section className="border-t border-zinc-100 pt-8">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D9A928]/10">
                        <Store className="h-4 w-4 text-[#B78A10]" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-zinc-900">
                            Business Information
                        </h2>

                        <p className="text-xs text-zinc-500">
                            Tell us about the business you want to operate on PakBazaar.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>
                            Business Name
                        </label>

                        <div className="relative">
                            <Building2 className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" />

                            <input
                                {...register("businessName", {
                                    required: "Business name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Business name must be at least 2 characters",
                                    },
                                    maxLength: {
                                        value: 150,
                                        message: "Business name cannot exceed 150 characters",
                                    },
                                })}
                                placeholder="Enter business name"
                                className={`${inputClass} pl-9`}
                            />
                        </div>

                        {errors.businessName && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.businessName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelClass}>
                            Business Type
                        </label>

                        <input
                            {...register("businessType", {
                                maxLength: {
                                    value: 100,
                                    message: "Business type cannot exceed 100 characters",
                                },
                            })}
                            placeholder="Retail, Electronics, Fashion..."
                            className={inputClass}
                        />

                        {errors.businessType && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.businessType.message}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>
                            Business Description
                        </label>

                        <div className="relative">
                            <FileText className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" />

                            <textarea
                                {...register("description", {
                                    maxLength: {
                                        value: 2000,
                                        message: "Description cannot exceed 2000 characters",
                                    },
                                })}
                                rows={5}
                                placeholder="Tell us about your business..."
                                className={`${inputClass} resize-none pl-9`}
                            />
                        </div>

                        {errors.description && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Business Location */}
            <section className="border-t border-zinc-100 pt-8">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#002B12]/5">
                        <MapPin className="h-4 w-4 text-[#002B12]" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-zinc-900">
                            Business Location
                        </h2>

                        <p className="text-xs text-zinc-500">
                            Add the main address of your business.
                        </p>
                    </div>
                </div>

                <div>
                    <label className={labelClass}>
                        Address
                    </label>

                    <input
                        {...register("address", {
                            maxLength: {
                                value: 500,
                                message: "Address cannot exceed 500 characters",
                            },
                        })}
                        placeholder="Business address"
                        className={inputClass}
                    />

                    {errors.address && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.address.message}
                        </p>
                    )}
                </div>
            </section>

            <div className="flex justify-end border-t border-zinc-100 pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#002B12] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#00451E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Send className="h-4 w-4" />

                    {loading
                        ? "Submitting..."
                        : "Submit Application"}
                </button>
            </div>
        </form>
    );
}