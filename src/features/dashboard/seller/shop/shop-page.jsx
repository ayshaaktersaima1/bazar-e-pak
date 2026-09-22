"use client";

import { useEffect, useState } from "react";
import ShopOverview from "./shop-overview";
import ShopForm from "./shop-form";
import { useShop } from "../../../../hooks/use-shop";

export default function ShopPage({ sellerId }) {
    const {
        loading,
        createShop,
        fetchMyShop,
        actionLoading,
    } = useShop();

    const [shop, setShop] = useState(null);

    useEffect(() => {
        if (!sellerId) return;

        const loadShop = async () => {
            const result = await fetchMyShop();
            setShop(result || null);
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
            <div className="flex min-h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E8BB44] border-t-transparent" />
            </div>
        );
    }

    if (shop) {
        return <ShopOverview shop={shop} />;
    }

    return (
        <ShopForm
            onSubmit={handleCreate}
            loading={actionLoading}
        />
    );
}