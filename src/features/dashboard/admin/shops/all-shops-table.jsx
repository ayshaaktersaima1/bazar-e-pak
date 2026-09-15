"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DataTable from "@/features/dashboard/common/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";

import { getShopColumns } from "./shop-columns";

const AllShopsTable = ({
    shops,
    currentRole,
}) => {
    const router = useRouter();

    const {
        patch,
        delete: deleteRequest,
    } = useApi();

    const [
        statusLoadingId,
        setStatusLoadingId,
    ] = useState(null);

    const [
        deleteShopTarget,
        setDeleteShopTarget,
    ] = useState(null);

    const [
        deleteLoading,
        setDeleteLoading,
    ] = useState(false);

    const handleStatusChange = async (
        shopId,
        status,
    ) => {
        setStatusLoadingId(shopId);

        const result = await patch(
            `/api/shops/${shopId}/status`,
            {
                status,
            },
            {},
            {
                showSuccess: true,
                successMessage:
                    "Shop status updated successfully",
            },
        );

        setStatusLoadingId(null);

        if (!result.success) {
            return;
        }

        window.location.reload();
    };

    const handleEdit = (shop) => {
        router.push(
            `/dashboard/superadmin/shops/${shop._id}/edit`,
        );
    };

    const handleDeleteClick = (
        shop,
    ) => {
        setDeleteShopTarget(shop);
    };

    const handleDeleteConfirm =
        async () => {
            if (!deleteShopTarget?._id) {
                return;
            }

            setDeleteLoading(true);

            const result =
                await deleteRequest(
                    `/api/shops/${deleteShopTarget._id}`,
                    {},
                    {
                        showSuccess: true,
                        successMessage:
                            "Shop deleted successfully",
                    },
                );

            setDeleteLoading(false);

            if (!result.success) {
                return;
            }

            setDeleteShopTarget(null);

            window.location.reload();
        };

    const columns = getShopColumns({
        currentRole,
        statusLoadingId,
        onStatusChange:
            handleStatusChange,
        onEdit: handleEdit,
        onDelete:
            handleDeleteClick,
    });

    return (
        <>
            <DataTable
                columns={columns}
                data={shops}
                emptyMessage="No shops found."
            />

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
                    if (
                        !deleteLoading
                    ) {
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