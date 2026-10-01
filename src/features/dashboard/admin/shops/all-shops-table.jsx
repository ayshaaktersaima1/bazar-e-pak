"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DataTable from "@/features/dashboard/common/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";

import { getShopColumns } from "./shop-columns";

const LIMIT = 20;

const AllShopsTable = ({
    shops = [],
    initialPagination = {},
    currentRole,
}) => {
    const router = useRouter();
    const api = useApi();

    const [shopList, setShopList] = useState(shops);

    const [pagination, setPagination] = useState({
        page: initialPagination.page ?? 1,
        limit: initialPagination.limit ?? LIMIT,
        total: initialPagination.total ?? shops.length,
        totalPages: initialPagination.totalPages ?? 1,
    });

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [statusLoadingId, setStatusLoadingId] = useState(null);

    const [pendingStatusChange, setPendingStatusChange] =
        useState(null);

    const [statusReason, setStatusReason] = useState("");

    const [deleteShopTarget, setDeleteShopTarget] =
        useState(null);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    const fetchShops = async ({
        page = 1,
        searchValue = search,
        statusValue = statusFilter,
    } = {}) => {
        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(LIMIT));

        if (searchValue.trim()) {
            params.set("search", searchValue.trim());
        }

        if (statusValue) {
            params.set("status", statusValue);
        }

        const result = await api.get(
            `/api/shops?${params.toString()}`,
            {},
            {
                showError: true,
            },
        );

        if (!result?.success) {
            return;
        }

        const data = Array.isArray(result.data)
            ? result.data
            : [];

        setShopList(data);

        setPagination({
            page: result.pagination?.page ?? page,
            limit: result.pagination?.limit ?? LIMIT,
            total: result.pagination?.total ?? data.length,
            totalPages:
                result.pagination?.totalPages ?? 1,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchShops({
                page: 1,
                searchValue: search,
                statusValue: statusFilter,
            });
        }, 400);

        return () => clearTimeout(timer);
    }, [search, statusFilter]);

    const handlePageChange = async (page) => {
        await fetchShops({
            page,
            searchValue: search,
            statusValue: statusFilter,
        });
    };

    const updateShopStatus = async (
        shopId,
        status,
        reason = "",
    ) => {
        setStatusLoadingId(shopId);

        const result = await api.patch(
            `/api/shops/${shopId}/status`,
            {
                status,
                reason,
            },
            {},
            {
                showSuccess: true,
                successMessage:
                    "Shop status updated successfully",
            },
        );

        setStatusLoadingId(null);

        if (!result?.success) {
            return false;
        }

        await fetchShops({
            page: pagination.page,
            searchValue: search,
            statusValue: statusFilter,
        });

        return true;
    };

    const handleStatusChange = async (
        shopId,
        status,
    ) => {
        const needsReason = [
            "inactive",
            "suspended",
            "rejected",
        ].includes(status);

        if (needsReason) {
            const shop = shopList.find(
                (item) => item._id === shopId,
            );

            setPendingStatusChange({
                shopId,
                shopName: shop?.name || "Shop",
                status,
            });

            setStatusReason("");
            return;
        }

        await updateShopStatus(
            shopId,
            status,
            "",
        );
    };

    const handleReasonConfirm = async () => {
        if (
            !pendingStatusChange ||
            !statusReason.trim()
        ) {
            return;
        }

        const success = await updateShopStatus(
            pendingStatusChange.shopId,
            pendingStatusChange.status,
            statusReason.trim(),
        );

        if (!success) {
            return;
        }

        setPendingStatusChange(null);
        setStatusReason("");
    };

    const handleReasonCancel = () => {
        if (api.loading) {
            return;
        }

        setPendingStatusChange(null);
        setStatusReason("");
    };

    const handleEdit = (shop) => {
        if (currentRole === "super_admin") {
            router.push(
                `/dashboard/superadmin/shops/${shop._id}/edit`,
            );
        }
    };

    const handleDeleteClick = (shop) => {
        setDeleteShopTarget(shop);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteShopTarget?._id) {
            return;
        }

        setDeleteLoading(true);

        const result = await api.delete(
            `/api/shops/${deleteShopTarget._id}`,
            {},
            {
                showSuccess: true,
                successMessage:
                    "Shop deleted successfully",
            },
        );

        setDeleteLoading(false);

        if (!result?.success) {
            return;
        }

        setDeleteShopTarget(null);

        const nextPage =
            shopList.length === 1 &&
                pagination.page > 1
                ? pagination.page - 1
                : pagination.page;

        await fetchShops({
            page: nextPage,
            searchValue: search,
            statusValue: statusFilter,
        });
    };

    const columns = getShopColumns({
        currentRole,
        statusLoadingId,
        onStatusChange: handleStatusChange,
        onEdit: handleEdit,
        onDelete: handleDeleteClick,
    });

    return (
        <>
            <div className="mb-5 flex flex-col gap-3 md:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search shops..."
                    className="w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2.5 text-sm text-[#001B08] outline-none focus:border-[#E8BB44] md:max-w-md"
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value,
                        )
                    }
                    className="rounded-lg border border-[#D1D5DB] bg-white px-4 py-2.5 text-sm font-medium text-[#001B08] outline-none focus:border-[#E8BB44]"
                >
                    <option value="">
                        All Statuses
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="active">
                        Active
                    </option>

                    <option value="inactive">
                        Inactive
                    </option>

                    <option value="suspended">
                        Suspended
                    </option>

                    <option value="rejected">
                        Rejected
                    </option>
                </select>
            </div>

            <DataTable
                columns={columns}
                data={shopList}
                loading={api.loading}
                page={pagination.page}
                limit={pagination.limit}
                meta={{
                    total: pagination.total,
                    totalPages:
                        pagination.totalPages,
                }}
                onPageChange={
                    handlePageChange
                }
                emptyMessage="No shops found."
            />

            {pendingStatusChange && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-[#FFFCF4] p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-[#001B08]">
                            Add Status Reason
                        </h3>

                        <p className="mt-2 text-sm text-[#667085]">
                            You are changing{" "}
                            <span className="font-semibold text-[#001B08]">
                                {pendingStatusChange.shopName}
                            </span>{" "}
                            to{" "}
                            <span className="font-semibold capitalize text-[#B91C1C]">
                                {pendingStatusChange.status}
                            </span>
                            .
                        </p>

                        <label className="mt-5 block text-sm font-semibold text-[#001B08]">
                            Reason
                        </label>

                        <textarea
                            value={statusReason}
                            onChange={(e) =>
                                setStatusReason(
                                    e.target.value,
                                )
                            }
                            maxLength={500}
                            rows={4}
                            placeholder="Enter the reason for this status change..."
                            className="mt-2 w-full resize-none rounded-lg border border-[#D1D5DB] bg-white px-3 py-2.5 text-sm text-[#001B08] outline-none focus:border-[#E8BB44] focus:ring-2 focus:ring-[#E8BB44]/20"
                        />

                        <p className="mt-1 text-right text-xs text-[#98A2B3]">
                            {statusReason.length}/500
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={
                                    handleReasonCancel
                                }
                                disabled={api.loading}
                                className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-semibold text-[#4B5563] hover:bg-white disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleReasonConfirm
                                }
                                disabled={
                                    api.loading ||
                                    !statusReason.trim()
                                }
                                className="rounded-lg bg-[#002B12] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00451E] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {api.loading
                                    ? "Saving..."
                                    : "Save Change"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmationModal
                open={Boolean(
                    deleteShopTarget,
                )}
                title="Delete Shop"
                message={
                    deleteShopTarget
                        ? `Are you sure you want to delete "${deleteShopTarget.name}"? This action cannot be undone.`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                loading={
                    deleteLoading
                }
                onConfirm={
                    handleDeleteConfirm
                }
                onCancel={() => {
                    if (!deleteLoading) {
                        setDeleteShopTarget(
                            null,
                        );
                    }
                }}
            />
        </>
    );
};

export default AllShopsTable;