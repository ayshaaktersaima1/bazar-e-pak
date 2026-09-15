import { FaUserShield } from "react-icons/fa";

const statusStyles = {
    active: "bg-[#DCFCE7] text-[#166534]",
    suspended: "bg-[#FEF3C7] text-[#92400E]",
    banned: "bg-[#FEE2E2] text-[#B91C1C]",
};

export const adminFilters = [
    {
        key: "status",
        label: "All Statuses",
        options: [
            {
                label: "Active",
                value: "active",
            },
            {
                label: "Suspended",
                value: "suspended",
            },
            {
                label: "Banned",
                value: "banned",
            },
        ],
    },
];

export const getAdminColumns = ({
    onManagePermissions,
    onStatusChange,
    onRoleChange,
    loadingId,
}) => [
        {
            key: "admin",
            label: "Admin",
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08]">
                        <FaUserShield size={15} />
                    </div>

                    <div className="min-w-0">
                        <p className="font-semibold text-[#001B08]">
                            {user.name}
                        </p>

                        <p className="max-w-[220px] truncate text-xs text-[#6B7280]">
                            {user.email}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "phoneNumber",
            label: "Phone",
            render: (user) =>
                user.phoneNumber || "N/A",
        },

        {
            key: "status",
            label: "Status",
            render: (user) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[user.status] ??
                        "bg-zinc-100 text-zinc-600"
                        }`}
                >
                    {user.status || "active"}
                </span>
            ),
        },

        {
            key: "permissions",
            label: "Permissions",
            render: (user) => {
                const count = Array.isArray(
                    user.permissions,
                )
                    ? user.permissions.length
                    : 0;

                return (
                    <span className="text-sm text-[#4B5563]">
                        {count} assigned
                    </span>
                );
            },
        },

        {
            key: "actions",
            label: "Actions",
            render: (user) => {
                const isLoading =
                    loadingId === user._id;

                const isSuspended =
                    user.status === "suspended" ||
                    user.isBlocked;

                return (
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                                onManagePermissions(user)
                            }
                            className="rounded-lg bg-[#002B12] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#00451E] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Permissions
                        </button>

                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                                onStatusChange(
                                    user,
                                    isSuspended
                                        ? "active"
                                        : "suspended",
                                )
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${isSuspended
                                    ? "bg-[#DCFCE7] text-[#166534] hover:bg-[#BBF7D0]"
                                    : "bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A]"
                                }`}
                        >
                            {isLoading
                                ? "..."
                                : isSuspended
                                    ? "Activate"
                                    : "Suspend"}
                        </button>

                        <select
                            disabled={isLoading}
                            defaultValue=""
                            onChange={(event) => {
                                const role =
                                    event.target.value;

                                if (!role) return;

                                onRoleChange(
                                    user,
                                    role,
                                );

                                event.target.value = "";
                            }}
                            className="rounded-lg border border-zinc-200 bg-white px-2 py-2 text-xs font-medium text-[#001B08] outline-none focus:border-[#D9A928]"
                        >
                            <option value="">
                                Change role
                            </option>

                            <option value="customer">
                                Customer
                            </option>

                            <option value="seller">
                                Seller
                            </option>
                        </select>
                    </div>
                );
            },
        },
    ];