import { FaUser } from "react-icons/fa";

export const getUserColumns = ({
    onStatusChange,
    loadingId,
}) => [
    {
        key: "index",
        label: "#",
        render: (_, index) => index + 1,
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
        cellClassName: "text-[#4B5563]",
        render: (user) =>
            user.phoneNumber || "N/A",
    },

    {
        key: "role",
        label: "Role",
        render: (user) => (
            <span className="rounded-full bg-[#F7F5EF] px-3 py-1 text-xs font-semibold capitalize text-[#001B08]">
                {user.role}
            </span>
        ),
    },

    {
        key: "status",
        label: "Status",
        render: (user) =>
            user.isBlocked ? (
                <span className="rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-semibold text-[#B91C1C]">
                    Blocked
                </span>
            ) : (
                <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#166534]">
                    Active
                </span>
            ),
    },

    {
        key: "actions",
        label: "Action",
        render: (user) => {
            const isLoading = loadingId === user._id;

            return user.isBlocked ? (
                <button
                    disabled={isLoading}
                    onClick={() =>
                        onStatusChange(
                            user._id,
                            false,
                        )
                    }
                    className="rounded-lg bg-[#DCFCE7] px-4 py-2 text-sm font-semibold text-[#166534] hover:bg-[#BBF7D0] disabled:opacity-50"
                >
                    {isLoading ? "..." : "Unsuspend"}
                </button>
            ) : (
                <button
                    disabled={isLoading}
                    onClick={() =>
                        onStatusChange(
                            user._id,
                            true,
                        )
                    }
                    className="rounded-lg bg-[#FEE2E2] px-4 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA] disabled:opacity-50"
                >
                    {isLoading ? "..." : "Suspend"}
                </button>
            );
        },
    },
];