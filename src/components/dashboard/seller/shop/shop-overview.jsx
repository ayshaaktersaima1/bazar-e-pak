"use client";

import { useState } from "react";
import {
  Star,
  MessageSquare,
  CalendarDays,
} from "lucide-react";

import ShopActions from "./shop-actions";
import ShopForm from "./shop-form";
import ShopInformation from "./shop-information";
import { useShop } from "../../../../hooks/use-shop";
import ConfirmationModal from "../../../shared/confirmation-modal";

const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-500">
            {label}
          </p>

          <p className="mt-1 text-2xl font-semibold text-zinc-900">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002B12]/5">
          <Icon className="h-5 w-5 text-[#002B12]" />
        </div>
      </div>
    </div>
  );
};

export default function ShopOverview({
  shop: initialShop,
}) {
  const {
    updateShop,
    deleteShop,
    fetchShopById,
    actionLoading,
  } = useShop();

  const [shop, setShop] = useState(initialShop);
  const [editing, setEditing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

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

  const handleUpdate = async (data) => {
    if (!shop?._id) return;

    const updated = await updateShop(
      shop._id,
      data,
    );

    if (updated) {
      setShop(updated);
      setEditing(false);
    }
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (actionLoading) return;

    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!shop?._id) return;

    const deleted = await deleteShop(shop._id);

    if (deleted) {
      setDeleteModalOpen(false);

      // Go back to seller shop page after deletion.
      window.location.href =
        "/dashboard/seller/shop";
    }
  };

  if (!shop) {
    return null;
  }

  if (editing) {
    return (
      <>
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">
              Edit Shop
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Update your shop information and contact
              details.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <ShopForm
              initialData={shop}
              onSubmit={handleUpdate}
              loading={actionLoading}
              submitLabel="Update Shop"
            />

            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={actionLoading}
              className="mt-4 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>

        <ConfirmationModal
          open={deleteModalOpen}
          loading={actionLoading}
          title="Delete your shop?"
          message={`This will permanently delete "${shop.name}". This action cannot be undone.`}
          confirmText="Delete Shop"
          cancelText="Cancel"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={closeDeleteModal}
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-zinc-900">
              Shop Overview
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Manage your shop information and
              customer-facing details.
            </p>
          </div>

          <ShopActions
            onEdit={() => setEditing(true)}
            onDelete={openDeleteModal}
            onRefresh={refresh}
            loading={refreshing}
          />
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={Star}
            label="Rating"
            value={Number(
              shop.rating || 0,
            ).toFixed(1)}
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
              shop.createdAt
                ? new Date(
                    shop.createdAt,
                  ).toLocaleDateString()
                : "—"
            }
          />
        </div>

        {/* Shop Information */}
        <ShopInformation shop={shop} />
      </div>

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={deleteModalOpen}
        loading={actionLoading}
        title="Delete your shop?"
        message={`Are you sure you want to delete "${shop.name}"? This action cannot be undone.`}
        confirmText="Delete Shop"
        cancelText="Keep Shop"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </>
  );
}