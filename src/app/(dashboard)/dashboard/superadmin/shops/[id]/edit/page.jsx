"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ShopForm from "@/features/dashboard/seller/shop/shop-form";
import useApi from "@/hooks/use-api";

const SuperAdminEditShopPage = () => {
    const params = useParams();
    const router = useRouter();

    const { get, patch } = useApi();

    const shopId = params?.id;

    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchShop = async () => {
            if (!shopId) return;

            setLoading(true);

            const result = await get(
                `/api/shops/${shopId}`,
                {},
                {
                    auth: true,
                    showError: true,
                },
            );

            setLoading(false);

            if (!result) return;

            const shopData =
                result?.data || result;

            setShop(shopData);
        };

        fetchShop();
    }, [shopId, get]);

    const handleSubmit = async (shopData) => {
        if (!shopId) return;

        setSaving(true);

        const result = await patch(
            `/api/shops/${shopId}`,
            shopData,
            {},
            {
                auth: true,
                showSuccess: true,
                successMessage:
                    "Shop updated successfully",
            },
        );

        setSaving(false);

        if (!result?.success) {
            return;
        }

        router.push(
            "/dashboard/superadmin/shops",
        );

        router.refresh();
    };

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-sm text-[#4B5563]">
                    Loading shop...
                </p>
            </div>
        );
    }

    if (!shop) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-[#001B08]">
                    Shop not found
                </h1>

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/dashboard/superadmin/shops",
                        )
                    }
                    className="mt-4 rounded-lg bg-[#001B08] px-4 py-2 text-sm font-semibold text-white"
                >
                    Back to Shops
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Shop Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Edit Shop
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Update {shop.name}
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <ShopForm
                    initialData={shop}
                    onSubmit={handleSubmit}
                    loading={saving}
                    submitLabel="Update Shop"
                    showSlug={false}
                />
            </div>
        </div>
    );
};

export default SuperAdminEditShopPage;