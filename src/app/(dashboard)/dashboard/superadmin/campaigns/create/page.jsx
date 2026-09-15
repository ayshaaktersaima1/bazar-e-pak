"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CampaignForm from "@/features/dashboard/campaigns/campaign-form";
import useApi from "@/hooks/use-api";

const SuperAdminCreateCampaignPage = () => {
    const router = useRouter();
    const api = useApi();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [shops, setShops] = useState([]);

    const [loadingOptions, setLoadingOptions] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoadingOptions(true);

            const [
                productsResult,
                categoriesResult,
                shopsResult,
            ] = await Promise.all([
                api.get(
                    "/api/products?limit=100",
                    {},
                    {
                        auth: true,
                        showError: true,
                    },
                ),

                api.get(
                    "/api/categories?limit=100",
                    {},
                    {
                        auth: true,
                        showError: true,
                    },
                ),

                api.get(
                    "/api/shops?limit=100",
                    {},
                    {
                        auth: true,
                        showError: true,
                    },
                ),
            ]);

            setProducts(
                Array.isArray(productsResult?.data)
                    ? productsResult.data
                    : [],
            );

            setCategories(
                Array.isArray(categoriesResult?.data)
                    ? categoriesResult.data
                    : [],
            );

            setShops(
                Array.isArray(shopsResult?.data)
                    ? shopsResult.data
                    : [],
            );

            setLoadingOptions(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (campaignData) => {
        setSaving(true);

        const result = await api.post(
            "/api/campaigns",
            campaignData,
            {},
            {
                auth: true,
                showSuccess: false,
            },
        );

        setSaving(false);

        if (!result?.success) {
            return;
        }

        toast.success("Campaign created successfully.");

        router.push(
            "/dashboard/superadmin/campaigns",
        );

        router.refresh();
    };

    if (loadingOptions) {
        return (
            <div className="bg-[#F7F5EF] p-6">
                <p className="text-sm text-gray-500">
                    Loading campaign options...
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Campaign Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Create Campaign
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Build a platform-wide campaign and choose which products,
                    categories or shops are eligible.
                </p>
            </div>

            <CampaignForm
                products={products}
                categories={categories}
                shops={shops}
                loading={saving}
                onSubmit={handleSubmit}
                onCancel={() =>
                    router.push(
                        "/dashboard/superadmin/campaigns",
                    )
                }
            />
        </div>
    );
};

export default SuperAdminCreateCampaignPage;