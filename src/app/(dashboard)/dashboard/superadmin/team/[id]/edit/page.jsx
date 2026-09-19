"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import TeamForm from "@/components/homepage/team/team-form";

const SuperAdminEditTeamMemberPage = () => {
    const router = useRouter();
    const params = useParams();
    const api = useApi();

    const memberId = params?.id;

    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!memberId) return;

        const timer = setTimeout(async () => {
            setLoading(true);

            const result = await api.get(
                `/api/team/${memberId}`,
                {},
                {
                    auth: true,
                    showError: true,
                },
            );

            if (result?.success) {
                setMember(result.data);
            }

            setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, [memberId]);

    const handleSubmit = async (memberData) => {
        if (!memberId) return;

        setSaving(true);

        const result = await api.patch(
            `/api/team/${memberId}`,
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

        toast.success("Team member updated successfully.");

        router.push("/dashboard/superadmin/team");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="bg-[#F7F5EF] p-6">
                <p className="text-sm text-gray-500">
                    Loading team member...
                </p>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="bg-[#F7F5EF] p-6">
                <div className="rounded-2xl border border-[#E5E2D8] bg-white p-6">
                    <p className="font-semibold text-[#001B08]">
                        Team member not found.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            router.push("/dashboard/superadmin/team")
                        }
                        className="mt-4 rounded-lg bg-[#D9A928] px-4 py-2 text-sm font-semibold text-[#001B08]"
                    >
                        Back to Team
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Team Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Edit Team Member
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Update the team member&apos;s profile, social links,
                    status, and display order.
                </p>
            </div>

            <TeamForm
                member={member}
                loading={saving}
                onSubmit={handleSubmit}
                onCancel={() =>
                    router.push("/dashboard/superadmin/team")
                }
            />
        </div>
    );
};

export default SuperAdminEditTeamMemberPage;