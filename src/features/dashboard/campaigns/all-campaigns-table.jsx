"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import DataTable from "@/features/dashboard/common/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";

import CampaignColumns from "./campaign-columns";

const LIMIT = 20;

const FILTERS = [
    {
        key: "status",
        label: "All Statuses",

        options: [
            {
                label: "Draft",
                value: "draft",
            },
            {
                label: "Scheduled",
                value: "scheduled",
            },
            {
                label: "Active",
                value: "active",
            },
            {
                label: "Inactive",
                value: "inactive",
            },
            {
                label: "Expired",
                value: "expired",
            },
        ],
    },
];

const AllCampaignsTable = () => {
    const api = useApi();
    const router = useRouter();

    const [
        campaigns,
        setCampaigns,
    ] = useState([]);

    const [
        filters,
        setFilters,
    ] = useState({
        status: "",
    });

    const [
        pagination,
        setPagination,
    ] = useState({
        page: 1,
        limit: LIMIT,
        total: 0,
        totalPages: 1,
    });

    const [
        deleteTarget,
        setDeleteTarget,
    ] = useState(null);

    const [
        deleteLoading,
        setDeleteLoading,
    ] = useState(false);

    const fetchCampaigns =
        async (
            page = 1,
            filterValues = filters,
        ) => {
            const params =
                new URLSearchParams({
                    page: String(page),
                    limit: String(LIMIT),
                });

            if (
                filterValues.status
            ) {
                params.set(
                    "status",
                    filterValues.status,
                );
            }

            const result =
                await api.get(
                    `/api/campaigns?${params.toString()}`,
                    {},
                    {
                        auth: true,
                        showError: true,
                    },
                );

            if (
                !result?.success
            ) {
                return;
            }

            const data =
                Array.isArray(
                    result.data,
                )
                    ? result.data
                    : [];

            setCampaigns(
                data,
            );

            setPagination({
                page:
                    result.pagination
                        ?.page ?? page,

                limit:
                    result.pagination
                        ?.limit ?? LIMIT,

                total:
                    result.pagination
                        ?.total ??
                    data.length,

                totalPages:
                    result.pagination
                        ?.totalPages ??
                    1,
            });
        };

    useEffect(() => {
        const timer =
            setTimeout(() => {
                fetchCampaigns(
                    1,
                    {
                        status: "",
                    },
                );
            }, 0);

        return () =>
            clearTimeout(timer);
    }, []);

    const handleFilterChange =
        (
            key,
            value,
        ) => {
            const nextFilters = {
                ...filters,
                [key]: value,
            };

            setFilters(
                nextFilters,
            );

            fetchCampaigns(
                1,
                nextFilters,
            );
        };

    const handleEdit = (
        campaign,
    ) => {
        if (!campaign?._id) {
            return;
        }

        router.push(
            `/dashboard/superadmin/campaigns/${campaign._id}/edit`,
        );
    };

    const handleDelete =
        async () => {
            if (
                !deleteTarget?._id
            ) {
                return;
            }

            setDeleteLoading(
                true,
            );

            const result =
                await api.delete(
                    `/api/campaigns/${deleteTarget._id}`,
                    {},
                    {
                        auth: true,
                        showSuccess:
                            false,
                    },
                );

            setDeleteLoading(
                false,
            );

            if (
                !result?.success
            ) {
                return;
            }

            toast.success(
                "Campaign deleted successfully.",
            );

            setDeleteTarget(
                null,
            );

            const nextPage =
                campaigns.length === 1 &&
                    pagination.page > 1
                    ? pagination.page - 1
                    : pagination.page;

            await fetchCampaigns(
                nextPage,
                filters,
            );
        };

    const columns =
        CampaignColumns({
            onEdit:
                handleEdit,

            onDelete:
                setDeleteTarget,
        });

    return (
        <>
            <DataTable
                columns={
                    columns
                }
                data={
                    campaigns
                }
                filters={
                    FILTERS
                }
                filterValues={
                    filters
                }
                onFilter={
                    handleFilterChange
                }
                loading={
                    api.loading
                }
                page={
                    pagination.page
                }
                limit={
                    pagination.limit
                }
                meta={{
                    total:
                        pagination.total,

                    totalPages:
                        pagination.totalPages,
                }}
                onPageChange={(
                    page,
                ) =>
                    fetchCampaigns(
                        page,
                        filters,
                    )
                }
                emptyMessage="No campaigns found."
            />

            <ConfirmationModal
                open={Boolean(
                    deleteTarget,
                )}
                title="Delete Campaign"
                message={
                    deleteTarget
                        ? `Are you sure you want to delete "${deleteTarget.name}"?`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                loading={
                    deleteLoading
                }
                onConfirm={
                    handleDelete
                }
                onCancel={() => {
                    if (
                        !deleteLoading
                    ) {
                        setDeleteTarget(
                            null,
                        );
                    }
                }}
            />
        </>
    );
};

export default AllCampaignsTable;