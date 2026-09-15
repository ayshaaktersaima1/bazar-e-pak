"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import CmsForm from "@/features/dashboard/cms/cms-form";
import useApi from "@/hooks/use-api";

const SuperAdminCreateCmsPage = () => {
    const router = useRouter();
    const api = useApi();

    const [saving, setSaving] = useState(false);

    const handleSubmit = async (cmsData) => {
        setSaving(true);

        const result = await api.post(
            "/api/cms",
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
            "CMS content created successfully.",
        );

        router.push(
            "/dashboard/superadmin/cms",
        );

        router.refresh();
    };

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Content Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Create CMS Content
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Add a new content record for the public website.
                </p>
            </div>

            <CmsForm
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

export default SuperAdminCreateCmsPage;