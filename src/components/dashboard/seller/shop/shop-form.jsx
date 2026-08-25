"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Building2,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone,
  Save,
  Store,
} from "lucide-react";

const defaultValues = {
  name: "",
  description: "",
  logo: "",
  banner: "",
  phone: "",
  email: "",
  address: "",
};

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15";

const labelClass = "mb-1.5 block text-sm font-medium text-zinc-700";

export default function ShopForm({
  initialData,
  onSubmit,
  loading = false,
  submitLabel = "Save Changes",
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset({
      name: initialData?.name || "",
      description: initialData?.description || "",
      logo: initialData?.logo || "",
      banner: initialData?.banner || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
    });
  }, [initialData, reset]);

  const submit = async (data) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#002B12]/5">
            <Store className="h-4 w-4 text-[#002B12]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Basic Information
            </h2>
            <p className="text-xs text-zinc-500">
              Information customers will see about your shop.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClass}>Shop Name</label>

            <input
              {...register("name", {
                required: "Shop name is required",
                minLength: {
                  value: 2,
                  message: "Shop name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Shop name cannot exceed 100 characters",
                },
              })}
              placeholder="Enter your shop name"
              className={inputClass}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>

            <textarea
              {...register("description", {
                maxLength: {
                  value: 2000,
                  message: "Description cannot exceed 2000 characters",
                },
              })}
              rows={5}
              placeholder="Tell customers about your shop..."
              className={`${inputClass} resize-none`}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 pt-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D9A928]/10">
            <ImageIcon className="h-4 w-4 text-[#B78A10]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Shop Branding
            </h2>
            <p className="text-xs text-zinc-500">
              Add your shop logo and banner image URLs.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Logo URL</label>

            <input
              {...register("logo")}
              type="url"
              placeholder="https://example.com/logo.png"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Banner URL</label>

            <input
              {...register("banner")}
              type="url"
              placeholder="https://example.com/banner.png"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 pt-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#002B12]/5">
            <Phone className="h-4 w-4 text-[#002B12]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Contact Information
            </h2>
            <p className="text-xs text-zinc-500">
              How customers can contact your shop.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Phone</label>

            <input
              {...register("phone")}
              placeholder="01700000000"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>

            <input
              {...register("email", {
                validate: (value) =>
                  !value ||
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "Enter a valid email address",
              })}
              type="email"
              placeholder="shop@example.com"
              className={inputClass}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>

            <input
              {...register("address")}
              placeholder="Shop address"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-zinc-100 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#002B12] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#00451E] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />

          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}