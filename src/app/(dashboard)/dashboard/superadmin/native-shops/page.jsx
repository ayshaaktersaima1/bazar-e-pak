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
import ConfirmationModal from "@/components/shared/confirmation-modal";

export default function NativeShopsPage() {
    const {
        get,
        delete: deleteRequest,
    } = useApi();

    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    const [shopToDelete, setShopToDelete] =
        useState(null);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    useEffect(() => {
        let cancelled = false;

        const loadNativeShops = async () => {
            try {
                const response = await get(
                    "/api/native-shops",
                    {},
                    {
                        auth: true,
                        showError: false,
                    },
                );

                if (cancelled) return;

                const shopList = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.data)
                        ? response.data
                        : [];

                setShops(shopList);
            } catch (error) {
                if (cancelled) return;

                console.error(
                    "Fetch native shops error:",
                    error,
                );

                toast.error(
                    error?.message ||
                    "Failed to load native shops.",
                );

                setShops([]);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadNativeShops();

        return () => {
            cancelled = true;
        };
    }, [get]);

    const openDeleteModal = (shop) => {
        setShopToDelete(shop);
    };

    const closeDeleteModal = () => {
        if (deleteLoading) return;

        setShopToDelete(null);
    };

    const handleDelete = async () => {
        if (!shopToDelete?._id) return;

        try {
            setDeleteLoading(true);

            await deleteRequest(
                `/api/native-shops/${shopToDelete._id}`,
                {},
                {
                    auth: true,
                    showSuccess: false,
                    showError: false,
                },
            );

            setShops((prev) =>
                prev.filter(
                    (shop) =>
                        String(shop._id) !==
                        String(shopToDelete._id),
                ),
            );

            toast.success(
                "Native shop deleted successfully.",
            );

            setShopToDelete(null);
        } catch (error) {
            console.error(
                "Delete native shop error:",
                error,
            );

            toast.error(
                error?.message ||
                "Failed to delete native shop.",
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-zinc-900">
                            Native Shops
                        </h1>

                        <p className="mt-1 text-sm text-zinc-500">
                            Manage PakBazaar-owned shops.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/superadmin/native-shops/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#002B12] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#00451E]"
                    >
                        <Plus className="h-4 w-4" />

                        Create Native Shop
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                    {loading ? (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-[#002B12]" />
                        </div>
                    ) : shops.length === 0 ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#002B12]/5">
                                <Store className="h-5 w-5 text-[#002B12]" />
                            </div>

                            <h2 className="text-base font-semibold text-zinc-900">
                                No Native Shops Yet
                            </h2>

                            <p className="mt-1 max-w-md text-sm text-zinc-500">
                                Create a PakBazaar-owned shop to
                                manage it directly from the Super
                                Admin dashboard.
                            </p>

                            <Link
                                href="/dashboard/superadmin/native-shops/create"
                                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#002B12] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#00451E]"
                            >
                                <Plus className="h-4 w-4" />

                                Create Native Shop
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-zinc-200 bg-zinc-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                            Shop
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                            Contact
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-zinc-100">
                                    {shops.map((shop) => (
                                        <tr
                                            key={shop._id}
                                            className="transition hover:bg-zinc-50/70"
                                        >
                                            <td className="px-5 py-4">
                                                <div>
                                                    <p className="font-medium text-zinc-900">
                                                        {shop.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-zinc-500">
                                                        {shop.slug ||
                                                            "No slug"}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="text-sm text-zinc-700">
                                                    <p>
                                                        {shop.phone ||
                                                            "No phone"}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-zinc-500">
                                                        {shop.email ||
                                                            "No email"}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${shop.status ===
                                                            "active"
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-zinc-100 text-zinc-600"
                                                        }`}
                                                >
                                                    {shop.status ||
                                                        "active"}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/superadmin/native-shops/${shop._id}/edit`}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:border-[#D9A928] hover:text-[#B78A10]"
                                                        title="Edit native shop"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                shop,
                                                            )
                                                        }
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-red-500 transition hover:border-red-200 hover:bg-red-50"
                                                        title="Delete native shop"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

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
        </>
    );
}