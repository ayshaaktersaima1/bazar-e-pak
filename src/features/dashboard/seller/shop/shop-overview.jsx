"use client";

import { useState } from "react";
import { Star, MessageSquare, CalendarDays, RefreshCw } from "lucide-react";
import ShopInformation from "./shop-information";
import { useShop } from "../../../../hooks/use-shop";


const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-500">{label}</p>

          <p className="mt-1 text-2xl font-semibold text-zinc-900">{value}</p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002B12]/5">
          <Icon className="h-5 w-5 text-[#002B12]" />
        </div>
      </div>
    </div>
  );
};

export default function ShopOverview({ shop: initialShop }) {
  const { fetchShopById } = useShop();

  const [shop, setShop] = useState(initialShop);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    if (!shop?._id) return;

    try {
      setRefreshing(true);

      const freshShop = await fetchShopById(shop._id);

      if (freshShop) {
        setShop(freshShop);
      }
    } finally {
      setRefreshing(false);
    }
  };

  if (!shop) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-zinc-900">Shop Overview</h1>

          <p className="mt-1 text-sm text-zinc-500">
            View your shop information and customer-facing details.
          </p>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={refreshing}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Star}
          label="Rating"
          value={Number(shop.rating || 0).toFixed(1)}
        />

        <StatCard
          icon={MessageSquare}
          label="Reviews"
          value={shop.totalReviews || 0}
        />

        <StatCard
          icon={CalendarDays}
          label="Shop Since"
          value={
            shop.createdAt ? new Date(shop.createdAt).toLocaleDateString() : "—"
          }
        />
      </div>

      <ShopInformation shop={shop} />
    </div>
  );
}
