"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CampaignForm from "@/features/dashboard/campaigns/campaign-form";
import useApi from "@/hooks/use-api";

const SuperAdminEditCampaignPage = () => {
    const router = useRouter();
    const params = useParams();
    const api = useApi();

    const campaignId = params?.id;

    const [campaign, setCampaign] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [shops, setShops] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!campaignId) return;

        const timer = setTimeout(async () => {
            setLoading(true);

            const [
                campaignResult,
                productsResult,
                categoriesResult,
                shopsResult,
            ] = await Promise.all([
                api.get(
                    `/api/campaigns/${campaignId}`,
                    {},
                    {
                        auth: true,
                        showError: true,
                    },
                ),

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

            if (!campaignResult?.success) {
                setLoading(false);
                return;
            }

            setCampaign(campaignResult.data);

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

            setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, [campaignId]);

    const handleSubmit = async (campaignData) => {
        if (!campaignId) return;

        setSaving(true);

        const result = await api.patch(
            `/api/campaigns/${campaignId}`,
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

        toast.success(
            "Campaign updated successfully.",
        );

        router.push(
            "/dashboard/superadmin/campaigns",
        );

        router.refresh();
    };

    if (loading) {
        return (
            <div className="bg-[#F7F5EF] p-6">
                <p className="text-sm text-gray-500">
                    Loading campaign...
                </p>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="bg-[#F7F5EF] p-6">
                <div className="rounded-2xl border border-[#E5E2D8] bg-white p-6">
                    <p className="font-semibold text-[#001B08]">
                        Campaign not found.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/dashboard/superadmin/campaigns",
                            )
                        }
                        className="mt-4 rounded-lg bg-[#D9A928] px-4 py-2 text-sm font-semibold text-[#001B08]"
                    >
                        Back to Campaigns
                    </button>
                </div>
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
                    Edit Campaign
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Update campaign details, schedule,
                    discount and eligibility.
                </p>
            </div>

            <CampaignForm
                campaign={campaign}
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

export default SuperAdminEditCampaignPage;