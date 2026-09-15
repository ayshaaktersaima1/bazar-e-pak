"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import ShopForm from "@/features/dashboard/seller/shop/shop-form";

export default function CreateNativeShopPage() {
    const api = useApi();

    const [loading, setLoading] = useState(false);

    const handleCreate = async (shopData) => {
        try {
            setLoading(true);

            const response = await api.post(
                "/api/native-shops",
                shopData,
                {},
                {
                    auth: true,
                    showSuccess: false,
                    showError: false,
                },
            );

            const createdShop =
                response?.data || response;

            if (!createdShop?._id) {
                throw new Error(
                    "Native shop could not be created.",
                );
            }

            toast.success(
                "Native shop created successfully.",
            );
        } catch (error) {
            console.error(
                "Create native shop error:",
                error,
            );

            toast.error(
                error?.message ||
                "Failed to create native shop.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">
                    Create Native Shop
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Create a PakBazaar-owned shop managed directly
                    by Super Admin.
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
                <ShopForm
                    showSlug
                    onSubmit={handleCreate}
                    loading={loading}
                    submitLabel="Create Native Shop"
                />
            </div>
        </div>
    );
}