// src/modules/shops/shop-form.jsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Building2,
  Clock3,
  Globe,
  Image as ImageIcon,
  Link2,
  MapPin,
  Phone,
  Save,
  Store,
} from "lucide-react";

const defaultValues = {
  name: "",
  description: "",
  businessType: "",
  services: "",
  logo: "",
  banner: "",
  gallery: "",
  phone: "",
  whatsapp: "",
  email: "",
  website: "",
  youtube: "",
  socialLinks: "",
  address: "",
  city: "",
  location: "",
  latitude: "",
  longitude: "",
  hours: {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
};

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15";

const textareaClass =
  "w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15";

const labelClass = "mb-1.5 block text-sm font-medium text-zinc-700";

const requiredMark = <span className="text-red-500"> *</span>;

const days = [
  ["monday", "Monday"],
  ["tuesday", "Tuesday"],
  ["wednesday", "Wednesday"],
  ["thursday", "Thursday"],
  ["friday", "Friday"],
  ["saturday", "Saturday"],
  ["sunday", "Sunday"],
];

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
    if (!initialData) {
      reset(defaultValues);
      return;
    }

    reset({
      name: initialData.name || "",
      description: initialData.description || "",
      businessType: initialData.businessType || "",
      services: Array.isArray(initialData.services)
        ? initialData.services.join(", ")
        : "",
      logo: initialData.logo || "",
      banner: initialData.banner || "",
      gallery: Array.isArray(initialData.gallery)
        ? initialData.gallery.join(", ")
        : "",
      phone: initialData.phone || "",
      whatsapp: initialData.whatsapp || "",
      email: initialData.email || "",
      website: initialData.website || "",
      youtube: initialData.youtube || "",
      socialLinks: Array.isArray(initialData.socialLinks)
        ? initialData.socialLinks
            .map((item) => `${item.platform}|${item.url}`)
            .join("\n")
        : "",
      address: initialData.address || "",
      city: initialData.city || "",
      location: initialData.location || "",
      latitude:
        initialData.latitude !== null &&
        initialData.latitude !== undefined
          ? String(initialData.latitude)
          : "",
      longitude:
        initialData.longitude !== null &&
        initialData.longitude !== undefined
          ? String(initialData.longitude)
          : "",
      hours: {
        monday: initialData.hours?.monday || "",
        tuesday: initialData.hours?.tuesday || "",
        wednesday: initialData.hours?.wednesday || "",
        thursday: initialData.hours?.thursday || "",
        friday: initialData.hours?.friday || "",
        saturday: initialData.hours?.saturday || "",
        sunday: initialData.hours?.sunday || "",
      },
    });
  }, [initialData, reset]);

  const submit = async (formData) => {
    const services = formData.services
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const gallery = formData.gallery
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const socialLinks = formData.socialLinks
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [platform, ...urlParts] = item.split("|");

        return {
          platform: platform.trim(),
          url: urlParts.join("|").trim(),
        };
      });

    const hours = Object.fromEntries(
      days.map(([key]) => [key, formData.hours[key].trim()]),
    );

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      businessType: formData.businessType.trim(),
      services,
      logo: formData.logo.trim(),
      banner: formData.banner.trim(),
      gallery,
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim(),
      email: formData.email.trim(),
      website: formData.website.trim(),
      youtube: formData.youtube.trim(),
      socialLinks,
      address: formData.address.trim(),
      city: formData.city.trim(),
      location: formData.location.trim(),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      hours,
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-10">
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
              Provide the basic information customers will see about your shop.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Shop Name
              {requiredMark}
            </label>

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

          <div>
            <label className={labelClass}>
              Business Type
              {requiredMark}
            </label>

            <input
              {...register("businessType", {
                required: "Business type is required",
                maxLength: {
                  value: 100,
                  message: "Business type cannot exceed 100 characters",
                },
              })}
              placeholder="e.g. Clothing, Electronics, Grocery"
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
              Description
              {requiredMark}
            </label>

            <textarea
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 2000,
                  message: "Description cannot exceed 2000 characters",
                },
              })}
              rows={6}
              placeholder="Tell customers about your shop..."
              className={textareaClass}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Services
              {requiredMark}
            </label>

            <input
              {...register("services", {
                required: "At least one service is required",
              })}
              placeholder="e.g. Home Delivery, Custom Orders, Repair"
              className={inputClass}
            />

            <p className="mt-1 text-xs text-zinc-400">
              Separate multiple services with commas.
            </p>

            {errors.services && (
              <p className="mt-1 text-xs text-red-500">
                {errors.services.message}
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
              Add valid image URLs for your shop.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Logo URL
              {requiredMark}
            </label>

            <input
              {...register("logo", {
                required: "Logo URL is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid URL",
                },
              })}
              type="url"
              placeholder="https://example.com/logo.png"
              className={inputClass}
            />

            {errors.logo && (
              <p className="mt-1 text-xs text-red-500">
                {errors.logo.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Banner URL
              {requiredMark}
            </label>

            <input
              {...register("banner", {
                required: "Banner URL is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid URL",
                },
              })}
              type="url"
              placeholder="https://example.com/banner.png"
              className={inputClass}
            />

            {errors.banner && (
              <p className="mt-1 text-xs text-red-500">
                {errors.banner.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Gallery Image URLs
              {requiredMark}
            </label>

            <input
              {...register("gallery", {
                required: "At least one gallery image URL is required",
              })}
              placeholder="https://example.com/image-1.jpg, https://example.com/image-2.jpg"
              className={inputClass}
            />

            <p className="mt-1 text-xs text-zinc-400">
              Separate multiple image URLs with commas. Maximum 20.
            </p>

            {errors.gallery && (
              <p className="mt-1 text-xs text-red-500">
                {errors.gallery.message}
              </p>
            )}
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
              Provide complete contact information for customers.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Phone
              {requiredMark}
            </label>

            <input
              {...register("phone", {
                required: "Phone number is required",
                maxLength: {
                  value: 30,
                  message: "Phone number cannot exceed 30 characters",
                },
              })}
              type="tel"
              placeholder="03001234567"
              className={inputClass}
            />

            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              WhatsApp
              {requiredMark}
            </label>

            <input
              {...register("whatsapp", {
                required: "WhatsApp number is required",
                maxLength: {
                  value: 30,
                  message: "WhatsApp number cannot exceed 30 characters",
                },
              })}
              type="tel"
              placeholder="03001234567"
              className={inputClass}
            />

            {errors.whatsapp && (
              <p className="mt-1 text-xs text-red-500">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Email
              {requiredMark}
            </label>

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
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

          <div>
            <label className={labelClass}>
              Website
              {requiredMark}
            </label>

            <input
              {...register("website", {
                required: "Website URL is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid URL",
                },
              })}
              type="url"
              placeholder="https://example.com"
              className={inputClass}
            />

            {errors.website && (
              <p className="mt-1 text-xs text-red-500">
                {errors.website.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              YouTube
              {requiredMark}
            </label>

            <input
              {...register("youtube", {
                required: "YouTube URL is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid URL",
                },
              })}
              type="url"
              placeholder="https://youtube.com/@yourchannel"
              className={inputClass}
            />

            {errors.youtube && (
              <p className="mt-1 text-xs text-red-500">
                {errors.youtube.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Social Links
              {requiredMark}
            </label>

            <textarea
              {...register("socialLinks", {
                required: "At least one social link is required",
              })}
              rows={4}
              placeholder={"Facebook|https://facebook.com/yourpage\nInstagram|https://instagram.com/yourpage"}
              className={textareaClass}
            />

            <p className="mt-1 text-xs text-zinc-400">
              One per line using: Platform|URL
            </p>

            {errors.socialLinks && (
              <p className="mt-1 text-xs text-red-500">
                {errors.socialLinks.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Address
              {requiredMark}
            </label>

            <input
              {...register("address", {
                required: "Address is required",
                maxLength: {
                  value: 500,
                  message: "Address cannot exceed 500 characters",
                },
              })}
              placeholder="Complete shop address"
              className={inputClass}
            />

            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 pt-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#002B12]/5">
            <MapPin className="h-4 w-4 text-[#002B12]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Location
            </h2>

            <p className="text-xs text-zinc-500">
              Provide your shop location and coordinates.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              City
              {requiredMark}
            </label>

            <input
              {...register("city", {
                required: "City is required",
                maxLength: {
                  value: 100,
                  message: "City cannot exceed 100 characters",
                },
              })}
              placeholder="e.g. Dhaka"
              className={inputClass}
            />

            {errors.city && (
              <p className="mt-1 text-xs text-red-500">
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Location
              {requiredMark}
            </label>

            <input
              {...register("location", {
                required: "Location is required",
                maxLength: {
                  value: 500,
                  message: "Location cannot exceed 500 characters",
                },
              })}
              placeholder="Area / landmark / locality"
              className={inputClass}
            />

            {errors.location && (
              <p className="mt-1 text-xs text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Latitude
              {requiredMark}
            </label>

            <input
              {...register("latitude", {
                required: "Latitude is required",
                validate: (value) =>
                  !Number.isNaN(Number(value)) &&
                  Number(value) >= -90 &&
                  Number(value) <= 90
                    ? true
                    : "Latitude must be between -90 and 90",
              })}
              type="number"
              step="any"
              placeholder="23.8103"
              className={inputClass}
            />

            {errors.latitude && (
              <p className="mt-1 text-xs text-red-500">
                {errors.latitude.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Longitude
              {requiredMark}
            </label>

            <input
              {...register("longitude", {
                required: "Longitude is required",
                validate: (value) =>
                  !Number.isNaN(Number(value)) &&
                  Number(value) >= -180 &&
                  Number(value) <= 180
                    ? true
                    : "Longitude must be between -180 and 180",
              })}
              type="number"
              step="any"
              placeholder="90.4125"
              className={inputClass}
            />

            {errors.longitude && (
              <p className="mt-1 text-xs text-red-500">
                {errors.longitude.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 pt-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D9A928]/10">
            <Clock3 className="h-4 w-4 text-[#B78A10]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Business Hours
            </h2>

            <p className="text-xs text-zinc-500">
              Provide the opening hours for every day.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {days.map(([key, label]) => (
            <div key={key}>
              <label className={labelClass}>
                {label}
                {requiredMark}
              </label>

              <input
                {...register(`hours.${key}`, {
                  required: `${label} hours are required`,
                  maxLength: {
                    value: 100,
                    message: "Hours cannot exceed 100 characters",
                  },
                })}
                placeholder="09:00 AM - 08:00 PM"
                className={inputClass}
              />

              {errors.hours?.[key] && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.hours[key].message}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <div className="mt-0.5 shrink-0">
            <Store className="h-5 w-5 text-amber-700" />
          </div>

          <div>
            <p className="text-sm font-semibold text-amber-900">
              Shop review
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800">
              After submission, your shop will be marked as Pending Review.
              You can view its status from your shop dashboard while it is
              being reviewed.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-zinc-100 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#002B12] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#00451E] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {loading ? "Submitting..." : submitLabel}
        </button>
      </div>
    </form>
  );
}