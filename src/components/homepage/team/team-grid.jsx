"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import TeamCard from "@/components/homepage/team/TeamCard";
import ConfirmationModal from "@/components/shared/confirmation-modal";

const LIMIT = 12;

const TeamGrid = () => {
    const api = useApi();
    const router = useRouter();

    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
    });

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchMembers = async (pageNumber = 1) => {
        const result = await api.get(
            `/api/team?page=${pageNumber}&limit=${LIMIT}`,
            {},
            {
                auth: true,
                showError: true,
            },
        );

        if (!result?.success) return;

        const data = Array.isArray(result.data)
            ? result.data
            : [];

        setMembers(data);

        setPagination({
            total: result.pagination?.total ?? data.length,
            totalPages: result.pagination?.totalPages ?? 1,
        });

        setPage(result.pagination?.page ?? pageNumber);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMembers(1);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const handleEdit = (member) => {
        router.push(
            `/dashboard/superadmin/team/${member._id}/edit`,
        );
    };

    const handleDelete = async () => {
        if (!deleteTarget?._id) return;

        setDeleteLoading(true);

        const result = await api.delete(
            `/api/team/${deleteTarget._id}`,
            {},
            {
                auth: true,
                showSuccess: false,
            },
        );

        setDeleteLoading(false);

        if (!result?.success) return;

        toast.success("Team member deleted successfully.");
        setDeleteTarget(null);

        const nextPage =
            members.length === 1 && page > 1
                ? page - 1
                : page;

        await fetchMembers(nextPage);
    };

    return (
        <>
            {members.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {members.map((member) => (
                        <div
                            key={member._id}
                            className="overflow-hidden rounded-2xl border border-[#E5E2D8] bg-white"
                        >
                            <TeamCard member={member} />

                            <div className="border-t border-[#E5E2D8] p-4">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${member.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {member.status}
                                    </span>

                                    <span className="text-xs font-medium text-[#001B08]/50">
                                        Order: {member.order ?? 0}
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(member)}
                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D9A928] px-4 py-2.5 text-sm font-semibold text-[#001B08] transition hover:bg-[#D9A928]/10"
                                    >
                                        <Pencil size={16} />
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setDeleteTarget(member)}
                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-[#E5E2D8] bg-white p-10 text-center">
                    <p className="text-sm text-gray-500">
                        No team members found.
                    </p>
                </div>
            )}

            {pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() => fetchMembers(page - 1)}
                        className="rounded-lg border border-[#E5E2D8] bg-white px-4 py-2 text-sm font-semibold text-[#001B08] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-[#001B08]/60">
                        Page {page} of {pagination.totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={page >= pagination.totalPages}
                        onClick={() => fetchMembers(page + 1)}
                        className="rounded-lg border border-[#E5E2D8] bg-white px-4 py-2 text-sm font-semibold text-[#001B08] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}

            <ConfirmationModal
                open={Boolean(deleteTarget)}
                title="Delete Team Member"
                message={
                    deleteTarget
                        ? `Are you sure you want to delete "${deleteTarget.name}"?`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                loading={deleteLoading}
                onConfirm={handleDelete}
                onCancel={() => {
                    if (!deleteLoading) {
                        setDeleteTarget(null);
                    }
                }}
            />
        </>
    );
};

export default TeamGrid;