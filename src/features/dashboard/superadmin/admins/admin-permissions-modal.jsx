"use client";

import { useState } from "react";
import {
    ShieldCheck,
    X,
} from "lucide-react";

const ADMIN_PERMISSIONS = [
    {
        value: "users.view",
        label: "Users - View",
    },
    {
        value: "shops.view",
        label: "Shops - View",
    },
    {
        value: "products.view",
        label: "Products - View",
    },
    {
        value: "products.delete",
        label: "Products - Delete",
    },
    {
        value: "reviews.view",
        label: "Reviews - View",
    },
    {
        value: "reviews.moderate",
        label: "Reviews - Moderate",
    },
    {
        value: "analytics.view",
        label: "Analytics - View",
    },
];

const AdminPermissionsModal = ({
    admin,
    loading = false,
    onClose,
    onSubmit,
}) => {
    const [permissions, setPermissions] =
        useState(
            Array.isArray(admin?.permissions)
                ? admin.permissions
                : [],
        );

    const handleToggle = (permission) => {
        setPermissions((current) => {
            if (
                current.includes(permission)
            ) {
                return current.filter(
                    (item) =>
                        item !== permission,
                );
            }

            return [
                ...current,
                permission,
            ];
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit({
            permissions,
        });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A928]/10">
                            <ShieldCheck className="h-5 w-5 text-[#B78A10]" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-[#001B08]">
                                Admin Permissions
                            </h2>

                            <p className="text-xs text-zinc-500">
                                {admin?.name}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6"
                >
                    <p className="mb-5 text-sm text-zinc-600">
                        Select which areas this
                        administrator is allowed to
                        access and manage.
                    </p>

                    <div className="space-y-3">
                        {ADMIN_PERMISSIONS.map(
                            (permission) => (
                                <label
                                    key={
                                        permission.value
                                    }
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 transition hover:bg-[#F7F5EF]"
                                >
                                    <input
                                        type="checkbox"
                                        checked={permissions.includes(
                                            permission.value,
                                        )}
                                        onChange={() =>
                                            handleToggle(
                                                permission.value,
                                            )
                                        }
                                        className="h-4 w-4 accent-[#002B12]"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-[#001B08]">
                                            {
                                                permission.label
                                            }
                                        </p>

                                        <p className="mt-0.5 text-xs text-zinc-400">
                                            {
                                                permission.value
                                            }
                                        </p>
                                    </div>
                                </label>
                            ),
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3 border-t border-zinc-100 pt-5">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={onClose}
                            className="rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-[#002B12] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#00451E] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Permissions"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPermissionsModal;