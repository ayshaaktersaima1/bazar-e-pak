"use client";

import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaSave,
  FaStore,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdLocationCity } from "react-icons/md";
import { useRouter } from "next/navigation";

import { useShop } from "@/hooks/use-shop";

const SellerSettingPage = () => {
  const router = useRouter();

  const { myShop, loading, actionLoading, fetchMyShop, updateShop } = useShop();

  const [form, setForm] = useState({
    name: "",
    description: "",
    businessType: "",
    services: "",
    logo: "",
    banner: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    youtube: "",
    address: "",
    city: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchMyShop();
  }, []);

  useEffect(() => {
    if (!myShop) return;

    setForm({
      name: myShop.name || "",
      description: myShop.description || "",
      businessType: myShop.businessType || "",
      services: Array.isArray(myShop.services)
        ? myShop.services.join(", ")
        : "",
      logo: myShop.logo || "",
      banner: myShop.banner || "",
      phone: myShop.phone || "",
      whatsapp: myShop.whatsapp || "",
      email: myShop.email || "",
      website: myShop.website || "",
      youtube: myShop.youtube || "",
      address: myShop.address || "",
      city: myShop.city || "",
      location: myShop.location || "",
      latitude:
        myShop.latitude !== null && myShop.latitude !== undefined
          ? String(myShop.latitude)
          : "",
      longitude:
        myShop.longitude !== null && myShop.longitude !== undefined
          ? String(myShop.longitude)
          : "",
    });
  }, [myShop]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!myShop?._id) return;

    const services = form.services
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      businessType: form.businessType.trim(),
      services,

      logo: form.logo.trim() || null,
      banner: form.banner.trim() || null,

      phone: form.phone.trim(),
      whatsapp: form.whatsapp.trim(),
      email: form.email.trim(),

      website: form.website.trim() || null,
      youtube: form.youtube.trim() || null,

      address: form.address.trim(),
      city: form.city.trim(),
      location: form.location.trim(),

      latitude: form.latitude === "" ? null : Number(form.latitude),

      longitude: form.longitude === "" ? null : Number(form.longitude),
    };

    await updateShop(myShop._id, payload);
  };

  if (loading && !myShop) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#E8BB44]" />
      </div>
    );
  }

  if (!myShop) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-[#D9A928]/20 bg-white p-8 text-center shadow-sm">
          <FaStore className="mx-auto text-4xl text-[#E8BB44]" />

          <h2 className="mt-4 text-xl font-bold text-[#001B08]">
            No Shop Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You do not have a shop yet.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#001B08] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E8BB44] hover:text-[#001B08]"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#001B08]">Shop Settings</h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your shop information and contact details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                myShop.status === "active"
                  ? "bg-green-100 text-green-700"
                  : myShop.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {myShop.status}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Information */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2 sm:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001B08] text-[#E8BB44]">
                <FaStore />
              </div>

              <div>
                <h2 className="font-semibold text-[#001B08]">
                  Basic Information
                </h2>

                <p className="text-xs text-gray-500">
                  Your public shop information
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Shop Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Field
                label="Business Type"
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                placeholder="e.g. Electronics"
              />

              <div className="md:col-span-2">
                <Field
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  textarea
                  rows={5}
                  placeholder="Describe your shop..."
                />
              </div>

              <div className="md:col-span-2">
                <Field
                  label="Services"
                  name="services"
                  value={form.services}
                  onChange={handleChange}
                  placeholder="Delivery, Repair, Installation"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate multiple services with commas.
                </p>
              </div>
            </div>
          </section>

          {/* Shop Status */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-[#001B08]">Shop Overview</h2>

            <div className="mt-5 space-y-4">
              <InfoRow label="Status" value={myShop.status} />

              <InfoRow
                label="Rating"
                value={`${Number(myShop.rating || 0).toFixed(1)} / 5`}
              />

              <InfoRow label="Reviews" value={myShop.totalReviews || 0} />

              <InfoRow label="Slug" value={myShop.slug} />

              <InfoRow label="Source" value={myShop.source} />
            </div>

            <p className="mt-5 rounded-lg bg-[#F7F5EF] p-3 text-xs leading-5 text-gray-600">
              Shop status, rating, reviews, seller ownership, and slug are
              managed by the system and cannot be changed from this page.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2 sm:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001B08] text-[#E8BB44]">
                <FaPhone />
              </div>

              <div>
                <h2 className="font-semibold text-[#001B08]">
                  Contact Information
                </h2>

                <p className="text-xs text-gray-500">
                  How customers can contact your shop
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                icon={<FaPhone />}
              />

              <Field
                label="WhatsApp"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                icon={<FaWhatsapp />}
              />

              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                icon={<MdEmail />}
              />

              <Field
                label="Website"
                name="website"
                type="url"
                value={form.website}
                onChange={handleChange}
                icon={<FaGlobe />}
              />

              <Field
                label="YouTube"
                name="youtube"
                type="url"
                value={form.youtube}
                onChange={handleChange}
                icon={<FaGlobe />}
              />
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#001B08] text-[#E8BB44]">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h2 className="font-semibold text-[#001B08]">Location</h2>

                <p className="text-xs text-gray-500">Shop location details</p>
              </div>
            </div>

            <div className="space-y-5">
              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                icon={<FaMapMarkerAlt />}
              />

              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                icon={<MdLocationCity />}
              />

              <Field
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                icon={<FaMapMarkerAlt />}
                placeholder="Area / Landmark"
              />

              <div className="grid gap-4 grid-cols-2">
                <Field
                  label="Latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="23.8103"
                />

                <Field
                  label="Longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="90.4125"
                />
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-3 sm:p-6">
            <div className="mb-5">
              <h2 className="font-semibold text-[#001B08]">Shop Media</h2>

              <p className="mt-1 text-xs text-gray-500">
                Add image URLs for your shop logo and banner.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Logo URL"
                name="logo"
                type="url"
                value={form.logo}
                onChange={handleChange}
                placeholder="https://..."
              />

              <Field
                label="Banner URL"
                name="banner"
                type="url"
                value={form.banner}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </section>
        </div>

        {/* Save */}
        <div className="sticky bottom-0 z-10 mt-6 flex justify-end border-t border-gray-200 bg-[#F7F5EF]/95 py-4 backdrop-blur">
          <button
            type="submit"
            disabled={actionLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001B08] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E8BB44] hover:text-[#001B08] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {actionLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  textarea = false,
  rows = 4,
  icon,
  step,
}) => {
  const className =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#001B08] outline-none transition placeholder:text-gray-400 focus:border-[#E8BB44] focus:ring-2 focus:ring-[#E8BB44]/20";

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#001B08]"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        {textarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={className}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            step={step}
            className={`${className} ${icon ? "pl-9" : ""}`}
          />
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>

    <span className="max-w-[60%] truncate text-right text-sm font-medium capitalize text-[#001B08]">
      {value || "—"}
    </span>
  </div>
);

export default SellerSettingPage;
