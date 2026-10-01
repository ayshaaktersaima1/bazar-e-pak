"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Edit,
    Plus,
    Store,
    Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import DataTable from "@/features/dashboard/common/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";

const LIMIT = 20;

const STATUS_STYLES = {
    active: "bg-[#DCFCE7] text-[#166534]",
    inactive: "bg-[#F3F4F6] text-[#4B5563]",
    pending: "bg-[#FEF3C7] text-[#92400E]",
    suspended: "bg-[#FEE2E2] text-[#B91C1C]",
    rejected: "bg-[#F3F4F6] text-[#6B7280]",
};

export default function NativeShopsPage() {
    const api = useApi();

    const [shops, setShops] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [pagination, setPagination] = useState({
        page: 1,
        limit: LIMIT,
        total: 0,
        totalPages: 1,
    });

    const [shopToDelete, setShopToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchNativeShops = async ({
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
            `/api/native-shops?${params.toString()}`,
            {},
            {
                auth: true,
                showError: true,
            },
        );

        if (!result?.success) {
            return;
        }

        const data = Array.isArray(result.data)
            ? result.data
            : [];

        setShops(data);

        setPagination({
            page: result.pagination?.page ?? page,
            limit: result.pagination?.limit ?? LIMIT,
            total: result.pagination?.total ?? data.length,
            totalPages: result.pagination?.totalPages ?? 1,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchNativeShops({
                page: 1,
                searchValue: search,
                statusValue: statusFilter,
            });
        }, 400);

        return () => clearTimeout(timer);
    }, [search, statusFilter]);

    const handlePageChange = async (page) => {
        await fetchNativeShops({
            page,
            searchValue: search,
            statusValue: statusFilter,
        });
    };

    const openDeleteModal = (shop) => {
        setShopToDelete(shop);
    };

    const closeDeleteModal = () => {
        if (deleteLoading) return;
        setShopToDelete(null);
    };

    const handleDelete = async () => {
        if (!shopToDelete?._id) return;

        setDeleteLoading(true);

        const result = await api.delete(
            `/api/native-shops/${shopToDelete._id}`,
            {},
            {
                auth: true,
                showSuccess: false,
                showError: true,
            },
        );

        setDeleteLoading(false);

        if (!result?.success) {
            return;
        }

        toast.success("Native shop deleted successfully.");

        setShopToDelete(null);

        const nextPage =
            shops.length === 1 && pagination.page > 1
                ? pagination.page - 1
                : pagination.page;

        await fetchNativeShops({
            page: nextPage,
            searchValue: search,
            statusValue: statusFilter,
        });
    };

    const columns = [
        {
            key: "index",
            label: "#",
            render: (_, index) =>
                (pagination.page - 1) * pagination.limit + index + 1,
        },
        {
            key: "shop",
            label: "Shop",
            render: (shop) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08]">
                        <Store size={15} />
                    </div>

                    <div>
                        <p className="font-semibold text-[#001B08]">
                            {shop.name}
                        </p>

                        <p className="text-sm text-[#6B7280]">
                            {shop.slug || "No slug"}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "contact",
            label: "Contact",
            render: (shop) => (
                <div className="text-sm text-[#4B5563]">
                    <p>{shop.email || "No email"}</p>
                    <p className="mt-1 text-xs text-[#6B7280]">
                        {shop.phone || "No phone"}
                    </p>
                </div>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (shop) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[shop.status] ??
                        STATUS_STYLES.inactive
                        }`}
                >
                    {shop.status || "inactive"}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (shop) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/superadmin/native-shops/${shop._id}/edit`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#E8BB44] px-3 py-2 text-sm font-semibold text-[#001B08] hover:bg-[#D9A928]"
                    >
                        <Edit size={15} />
                        Edit
                    </Link>

                    <button
                        type="button"
                        onClick={() => openDeleteModal(shop)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#FEE2E2] px-3 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA]"
                    >
                        <Trash2 size={15} />
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Native Shop Management
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                        Native Shops
                    </h1>

                    <p className="mt-2 text-sm text-[#4B5563]">
                        Manage PakBazaar-owned shops.
                    </p>
                </div>

                <Link
                    href="/dashboard/superadmin/native-shops/create"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#002B12] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00451E]"
                >
                    <Plus size={16} />
                    Create Native Shop
                </Link>
            </div>

            <div className="mb-5 flex flex-col gap-3 md:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search native shops..."
                    className="w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2.5 text-sm text-[#001B08] outline-none focus:border-[#E8BB44] md:max-w-md"
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="rounded-lg border border-[#D1D5DB] bg-white px-4 py-2.5 text-sm font-medium text-[#001B08] outline-none focus:border-[#E8BB44]"
                >
                    <option value="">
                        All Statuses
                    </option>

                    <option value="active">
                        Active
                    </option>

                    <option value="inactive">
                        Inactive
                    </option>

                    <option value="pending">
                        Pending
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
                data={shops}
                loading={api.loading}
                page={pagination.page}
                limit={pagination.limit}
                meta={{
                    total: pagination.total,
                    totalPages: pagination.totalPages,
                }}
                onPageChange={handlePageChange}
                emptyMessage="No native shops found."
            />

            <ConfirmationModal
                open={Boolean(shopToDelete)}
                title="Delete Native Shop?"
                message={
                    shopToDelete
                        ? `Are you sure you want to delete "${shopToDelete.name}"? This action cannot be undone.`
                        : ""
                }
                confirmText="Delete Shop"
                cancelText="Cancel"
                variant="danger"
                loading={deleteLoading}
                onConfirm={handleDelete}
                onCancel={closeDeleteModal}
            />
        </div>
    );
}