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

import CmsColumns from "./cms-columns";

const LIMIT = 20;

const FILTERS = [
    {
        key: "type",
        label: "All Types",

        options: [
            {
                label: "Hero",
                value: "hero",
            },
            {
                label: "Banner",
                value: "banner",
            },
            {
                label: "Homepage",
                value: "homepage",
            },
            {
                label: "Page",
                value: "page",
            },
            {
                label: "Template",
                value: "template",
            },
            {
                label: "Announcement",
                value: "announcement",
            },
        ],
    },

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
                label: "Published",
                value: "published",
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

    {
        key: "locale",
        label: "All Languages",

        options: [
            {
                label: "English",
                value: "en",
            },
            {
                label: "Urdu",
                value: "ur",
            },
        ],
    },
];

const AllCmsTable = () => {
    const api = useApi();
    const router = useRouter();

    const [
        items,
        setItems,
    ] = useState([]);

    const [
        filters,
        setFilters,
    ] = useState({
        type: "",
        status: "",
        locale: "",
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

    const fetchCms = async (
        page = 1,
        filterValues = filters,
    ) => {
        const params =
            new URLSearchParams({
                page: String(page),
                limit: String(LIMIT),
            });

        if (filterValues.type) {
            params.set(
                "type",
                filterValues.type,
            );
        }

        if (filterValues.status) {
            params.set(
                "status",
                filterValues.status,
            );
        }

        if (filterValues.locale) {
            params.set(
                "locale",
                filterValues.locale,
            );
        }

        const result =
            await api.get(
                `/api/cms?${params.toString()}`,
                {},
                {
                    auth: true,
                    showError: true,
                },
            );

        if (!result?.success) {
            return;
        }

        const data =
            Array.isArray(
                result.data,
            )
                ? result.data
                : [];

        setItems(data);

        setPagination({
            page:
                result.pagination?.page ??
                page,

            limit:
                result.pagination?.limit ??
                LIMIT,

            total:
                result.pagination?.total ??
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
                fetchCms(
                    1,
                    {
                        type: "",
                        status: "",
                        locale: "",
                    },
                );
            }, 0);

        return () =>
            clearTimeout(timer);
    }, []);

    const handleFilterChange = (
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

        fetchCms(
            1,
            nextFilters,
        );
    };

    const handleEdit = (
        item,
    ) => {
        if (!item?._id) {
            return;
        }

        router.push(
            `/dashboard/superadmin/cms/${item._id}/edit`,
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
                    `/api/cms/${deleteTarget._id}`,
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

            if (!result?.success) {
                return;
            }

            toast.success(
                "CMS content deleted successfully.",
            );

            setDeleteTarget(
                null,
            );

            const nextPage =
                items.length === 1 &&
                    pagination.page > 1
                    ? pagination.page - 1
                    : pagination.page;

            await fetchCms(
                nextPage,
                filters,
            );
        };

    const columns =
        CmsColumns({
            onEdit:
                handleEdit,

            onDelete:
                setDeleteTarget,
        });

    return (
        <>
            <DataTable
                columns={columns}
                data={items}
                filters={FILTERS}
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
                    fetchCms(
                        page,
                        filters,
                    )
                }
                emptyMessage="No CMS content found."
            />

            <ConfirmationModal
                open={Boolean(
                    deleteTarget,
                )}
                title="Delete CMS Content"
                message={
                    deleteTarget
                        ? `Are you sure you want to delete "${deleteTarget.title || deleteTarget.key}"?`
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

export default AllCmsTable;