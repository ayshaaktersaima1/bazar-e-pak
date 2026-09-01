"use client";

import { useEffect, useState } from "react";
import ShopOverview from "./shop-overview";
import ShopForm from "./shop-form";
import { useShop } from "../../../../hooks/use-shop";



export default function ShopPage({ sellerId }) {
  const {
    loading,
    createShop,
    fetchShops,
    actionLoading,
  } = useShop();

  const [shop, setShop] = useState(null);

  useEffect(() => {
    if (!sellerId) return;

    const loadShop = async () => {
      const result = await fetchShops({
        page: 1,
        limit: 1,
        sellerId,
      });

      setShop(result?.[0] || null);
    };

    loadShop();
  }, [sellerId]);

  const handleCreate = async (data) => {
    const created = await createShop(data);

    if (created) {
      setShop(created);
    }
  };

  if (loading && !shop) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-[#002B12]" />
      </div>
    );
  }

  if (shop) {
    return <ShopOverview shop={shop} />;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">
          Create Your Shop
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Set up your seller profile before adding products.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
        <ShopForm
          onSubmit={handleCreate}
          loading={actionLoading}
          submitLabel="Create Shop"
        />
      </div>
    </div>
  );
}