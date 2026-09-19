"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import TeamForm from "@/components/homepage/team/team-form";

const SuperAdminCreateTeamMemberPage = () => {
    const router = useRouter();
    const api = useApi();

    const [saving, setSaving] = useState(false);

    const handleSubmit = async (memberData) => {
        setSaving(true);

        const result = await api.post(
            "/api/team",
            memberData,
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

        toast.success("Team member created successfully.");

        router.push(
            "/dashboard/superadmin/team",
        );

        router.refresh();
    };

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Team Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Add Team Member
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Add a team member to the public Team page.
                </p>
            </div>

            <TeamForm
                loading={saving}
                onSubmit={handleSubmit}
                onCancel={() =>
                    router.push(
                        "/dashboard/superadmin/team",
                    )
                }
            />
        </div>
    );
};

export default SuperAdminCreateTeamMemberPage;