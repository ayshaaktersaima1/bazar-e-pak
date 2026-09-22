// src/modules/shops/shop-settings.jsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useShop } from "../../../../hooks/use-shop";
import ShopForm from "./shop-form";
import ConfirmationModal from "../../../../components/shared/confirmation-modal";

export default function ShopSettings({ sellerId }) {
  const router = useRouter();

  const {
    fetchShops,
    updateShop,
    deleteShop,
    loading,
    actionLoading,
  } = useShop();

  const [shop, setShop] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!sellerId) return;

    let mounted = true;

    const loadShop = async () => {
      try {
        const result = await fetchShops({
          page: 1,
          limit: 1,
          sellerId,
        });

        if (mounted) {
          setShop(result?.[0] || null);
        }
      } finally {
        if (mounted) {
          setLoaded(true);
        }
      }
    };

    loadShop();

    return () => {
      mounted = false;
    };
  }, [sellerId, fetchShops]);

  const handleUpdate = async (data) => {
    if (!shop?._id) return;

    const updated = await updateShop(shop._id, data);

    if (updated) {
      setShop(updated);
      router.push("/dashboard/seller/shop");
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!shop?._id) return;

    const deleted = await deleteShop(shop._id);

    if (deleted) {
      setDeleteModalOpen(false);
      router.push("/dashboard/seller/shop");
      router.refresh();
    }
  };

  if (!loaded || loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-[#002B12]" />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-zinc-900">
            No Shop Found
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            You do not have a shop yet.
          </p>

          <button
            type="button"
            onClick={() => router.push("/dashboard/seller/shop")}
            className="mt-5 rounded-lg bg-[#002B12] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#001F0D]"
          >
            Create Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900">
            Shop Settings
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Update your shop information, contact details, location, and
            branding.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <ShopForm
            initialData={shop}
            onSubmit={handleUpdate}
            loading={actionLoading}
            submitLabel="Save Changes"
          />

          <button
            type="button"
            onClick={() => router.push("/dashboard/seller/shop")}
            disabled={actionLoading}
            className="mt-4 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        <div className="rounded-xl border border-red-200 bg-white p-6">
          <h2 className="text-base font-semibold text-red-700">
            Danger Zone
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Permanently delete your shop and its shop information.
          </p>

          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            disabled={actionLoading}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete Shop
          </button>
        </div>
      </div>

      <ConfirmationModal
        open={deleteModalOpen}
        loading={actionLoading}
        title="Delete your shop?"
        message={`Are you sure you want to permanently delete "${shop.name}"? This action cannot be undone.`}
        confirmText="Delete Shop"
        cancelText="Keep Shop"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => {
          if (!actionLoading) {
            setDeleteModalOpen(false);
          }
        }}
      />
    </>
  );
}