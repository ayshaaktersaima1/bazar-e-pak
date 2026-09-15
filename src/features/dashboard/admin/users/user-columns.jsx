import { FaUser } from "react-icons/fa";

export const getUserColumns = ({
    onStatusChange,
    loadingId,
    currentRole,
    currentUserId,
    onManage,
}) => [
        {
            key: "index",
            label: "#",
            render: (_, index) =>
                index + 1,
        },

        {
            key: "user",
            label: "User",
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08]">
                        <FaUser size={15} />
                    </div>

                    <div>
                        <p className="font-semibold text-[#001B08]">
                            {user.name}
                        </p>

                        <p className="text-sm text-[#6B7280]">
                            {user.email}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "phone",
            label: "Phone",
            cellClassName:
                "text-[#4B5563]",
            render: (user) =>
                user.phoneNumber ||
                "N/A",
        },

        {
            key: "role",
            label: "Role",
            render: (user) => (
                <span className="rounded-full bg-[#F7F5EF] px-3 py-1 text-xs font-semibold capitalize text-[#001B08]">
                    {user.role?.replace(
                        "_",
                        " ",
                    )}
                </span>
            ),
        },

        {
            key: "status",
            label: "Status",
            render: (user) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${user.status ===
                            "active"
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : "bg-[#FEE2E2] text-[#B91C1C]"
                        }`}
                >
                    {user.status ||
                        "active"}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Actions",

            render: (user) => {
                const isLoading =
                    loadingId ===
                    user._id;

                const isSelf =
                    String(
                        currentUserId,
                    ) ===
                    String(user._id);

                const isSuperAdminUser =
                    user.role ===
                    "super_admin";

                const canChangeStatus =
                    !isSelf &&
                    !isSuperAdminUser;

                return (
                    <div className="flex flex-wrap gap-2">
                        {canChangeStatus &&
                            (user.status !==
                                "active" ? (
                                <button
                                    disabled={
                                        isLoading
                                    }
                                    onClick={() =>
                                        onStatusChange(
                                            user._id,
                                            "active",
                                        )
                                    }
                                    className="rounded-lg bg-[#DCFCE7] px-3 py-2 text-sm font-semibold text-[#166534] hover:bg-[#BBF7D0] disabled:opacity-50"
                                >
                                    {isLoading
                                        ? "..."
                                        : "Activate"}
                                </button>
                            ) : (
                                <button
                                    disabled={
                                        isLoading
                                    }
                                    onClick={() =>
                                        onStatusChange(
                                            user._id,
                                            "suspended",
                                        )
                                    }
                                    className="rounded-lg bg-[#FEE2E2] px-3 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA] disabled:opacity-50"
                                >
                                    {isLoading
                                        ? "..."
                                        : "Suspend"}
                                </button>
                            ))}

                        {currentRole ===
                            "super_admin" &&
                            !isSelf &&
                            !isSuperAdminUser && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onManage?.(
                                            user,
                                        )
                                    }
                                    className="rounded-lg bg-[#001B08] px-3 py-2 text-sm font-semibold text-white hover:bg-[#003817]"
                                >
                                    Manage
                                </button>
                            )}

                        {(isSelf ||
                            isSuperAdminUser) && (
                                <span className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-500">
                                    Protected
                                </span>
                            )}
                    </div>
                );
            },
        },
    ];