"use client";

import {
  Mail,
  MapPin,
  Phone,
  Star,
  Store,
} from "lucide-react";

import ShopStatus from "./shop-status";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
      <Icon className="h-4 w-4 text-zinc-600" />
    </div>

    <div className="min-w-0">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-0.5 break-words text-sm font-medium text-zinc-800">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

export default function ShopInformation({ shop }) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="h-32 bg-[#002B12]">
          {shop?.banner && (
            <img
              src={shop.banner}
              alt={`${shop.name} banner`}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-zinc-100 shadow-sm">
                {shop?.logo ? (
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Store className="h-7 w-7 text-zinc-400" />
                )}
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-semibold text-zinc-900">
                  {shop.name}
                </h2>

                <p className="mt-0.5 text-sm text-zinc-500">
                  /{shop.slug}
                </p>
              </div>
            </div>

            <ShopStatus status={shop.status} />
          </div>

          {shop.description && (
            <p className="mt-6 max-w-3xl text-sm leading-6 text-zinc-600">
              {shop.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoItem
          icon={Phone}
          label="Phone"
          value={shop.phone}
        />

        <InfoItem
          icon={Mail}
          label="Email"
          value={shop.email}
        />

        <InfoItem
          icon={MapPin}
          label="Address"
          value={shop.address}
        />

        <InfoItem
          icon={Star}
          label="Rating"
          value={`${Number(shop.rating || 0).toFixed(1)} / 5 (${shop.totalReviews || 0} reviews)`}
        />
      </div>
    </div>
  );
}