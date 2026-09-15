"use client";

const ADMIN_PERMISSIONS = [
    "users.view",
    "shops.view",
    "products.view",
    "products.delete",
    "reviews.view",
    "reviews.moderate",
    "analytics.view",
];

const ManageUserModal = ({
    open,
    user,
    selectedRole,
    setSelectedRole,
    selectedPermissions,
    togglePermission,
    loading,
    onClose,
    onSave,
}) => {
    if (!open || !user) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#001B08]">
                        Manage User
                    </h2>

                    <p className="mt-1 text-sm text-[#6B7280]">
                        {user.name} · {user.email}
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Role
                        </label>

                        <select
                            value={selectedRole}
                            onChange={(event) =>
                                setSelectedRole(event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#E8BB44]"
                        >
                            <option value="customer">
                                Customer
                            </option>

                            <option value="seller">
                                Seller
                            </option>

                            <option value="admin">
                                Admin
                            </option>
                        </select>
                    </div>

                    {selectedRole === "admin" && (
                        <div>
                            <div className="mb-3">
                                <p className="text-sm font-semibold text-[#001B08]">
                                    Admin Permissions
                                </p>

                                <p className="mt-1 text-xs text-[#6B7280]">
                                    Select which dashboard areas this admin can access.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {ADMIN_PERMISSIONS.map((permission) => (
                                    <label
                                        key={permission}
                                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPermissions.includes(
                                                permission,
                                            )}
                                            onChange={() =>
                                                togglePermission(permission)
                                            }
                                        />

                                        <span className="text-sm text-[#374151]">
                                            {permission}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-7 flex justify-end gap-3">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onSave}
                        className="rounded-lg bg-[#001B08] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageUserModal;