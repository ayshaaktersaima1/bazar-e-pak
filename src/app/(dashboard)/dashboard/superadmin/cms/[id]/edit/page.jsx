"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CmsForm from "@/features/dashboard/cms/cms-form";
import useApi from "@/hooks/use-api";

const SuperAdminEditCmsPage = () => {
    const router = useRouter();
    const params = useParams();
    const api = useApi();

    const cmsId = params?.id;

    const [cmsItem, setCmsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!cmsId) return;

        const timer = setTimeout(async () => {
            setLoading(true);

            const result = await api.get(
                `/api/cms/${cmsId}`,
                {},
                {
                    auth: true,
                    showError: true,
                },
            );

            if (result?.success) {
                setCmsItem(result.data);
            }

            setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, [cmsId]);

    const handleSubmit = async (cmsData) => {
        if (!cmsId) return;

        setSaving(true);

        const result = await api.patch(
            `/api/cms/${cmsId}`,
            cmsData,
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
            "CMS content updated successfully.",
        );

        router.push(
            "/dashboard/superadmin/cms",
        );

        router.refresh();
    };

    if (loading) {
        return (
            <div className="bg-[#F7F5EF] p-6">
                <p className="text-sm text-gray-500">
                    Loading CMS content...
                </p>
            </div>
        );
    }

    if (!cmsItem) {
        return (
            <div className="bg-[#F7F5EF] p-6">
                <div className="rounded-2xl border border-[#E5E2D8] bg-white p-6">
                    <p className="font-semibold text-[#001B08]">
                        CMS content not found.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/dashboard/superadmin/cms",
                            )
                        }
                        className="mt-4 rounded-lg bg-[#D9A928] px-4 py-2 text-sm font-semibold text-[#001B08]"
                    >
                        Back to CMS
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Content Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Edit CMS Content
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Update the content, publishing settings and schedule.
                </p>
            </div>

            <CmsForm
                cmsItem={cmsItem}
                loading={saving}
                onSubmit={handleSubmit}
                onCancel={() =>
                    router.push(
                        "/dashboard/superadmin/cms",
                    )
                }
            />
        </div>
    );
};

export default SuperAdminEditCmsPage;