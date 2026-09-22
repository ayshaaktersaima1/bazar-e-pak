// src/modules/shops/shop-information.jsx

"use client";

import {
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
  Store,
} from "lucide-react";

import ShopStatus from "./shop-status";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-zinc-200 bg-white p-4">
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
        <Icon className="h-4 w-4 text-zinc-600" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-400">{label}</p>

        <p className="mt-1 break-words text-sm font-medium text-zinc-800">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  </div>
);

export default function ShopInformation({ shop }) {
  const status = shop?.status || "pending";

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-44 bg-[#002B12] sm:h-56">
          {shop?.banner ? (
            <img
              src={shop.banner}
              alt={`${shop.name} banner`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Store className="h-12 w-12 text-white/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 sm:left-7 sm:right-7">
            <div className="min-w-0">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-white/70">
                Your Shop
              </p>

              <h2 className="truncate text-xl font-bold text-white sm:text-2xl">
                {shop?.name || "Unnamed Shop"}
              </h2>

              <p className="mt-1 truncate text-sm text-white/75">
                /{shop?.slug || "shop"}
              </p>
            </div>

            <div className="shrink-0">
              <ShopStatus status={status} />
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          {status === "pending" && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex gap-3">
                <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />

                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    Your shop is pending review
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    Your shop information has been submitted successfully.
                    Please wait while the administration reviews and approves
                    your shop.
                  </p>
                </div>
              </div>
            </div>
          )}

          {status === "rejected" && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-900">
                Your shop was rejected
              </p>

              <p className="mt-1 text-xs leading-5 text-red-800">
                Please contact the administration for more information.
              </p>
            </div>
          )}

          {status === "suspended" && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-900">
                Your shop is suspended
              </p>

              <p className="mt-1 text-xs leading-5 text-red-800">
                Your shop is currently unavailable to customers. Please
                contact the administration for further information.
              </p>
            </div>
          )}

          {shop?.description && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                About the Shop
              </p>

              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-600">
                {shop.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-zinc-900">
            Shop Information
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Your current customer-facing shop information.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem
            icon={Phone}
            label="Phone"
            value={shop?.phone}
          />

          <InfoItem
            icon={Mail}
            label="Email"
            value={shop?.email}
          />

          <InfoItem
            icon={MapPin}
            label="Address"
            value={shop?.address}
          />

          <InfoItem
            icon={MapPin}
            label="Location"
            value={shop?.location}
          />

          <InfoItem
            icon={Globe}
            label="Website"
            value={shop?.website}
          />

          <InfoItem
            icon={Star}
            label="Rating"
            value={`${Number(shop?.rating || 0).toFixed(1)} / 5 (${shop?.totalReviews || 0} reviews)`}
          />
        </div>
      </div>
    </div>
  );
}