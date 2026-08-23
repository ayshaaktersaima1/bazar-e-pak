"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const AllUsersTable = ({ users }) => {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState(null);

    const handleStatusChange = async (userId, isBlocked) => {
        setLoadingId(userId);

        try {
            const { data } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${data?.token}`,
                    },
                    body: JSON.stringify({ isBlocked }),
                },
            );

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to update user status",
                );
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="overflow-x-auto rounded-xl bg-white">
            <table className="table w-full">
                <thead>
                    <tr className="border-b border-[#E5E2D8] bg-[#001B08]">
                        <th className="text-[#E8BB44]">#</th>

                        <th className="text-[#E8BB44]">
                            User
                        </th>

                        <th className="text-[#E8BB44]">
                            Phone
                        </th>

                        <th className="text-[#E8BB44]">
                            Role
                        </th>

                        <th className="text-[#E8BB44]">
                            Status
                        </th>

                        <th className="text-[#E8BB44]">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => {
                            const isLoading = loadingId === user._id;

                            return (
                                <tr
                                    key={user._id || user.id}
                                    className="border-b border-[#E5E2D8] hover:bg-[#F7F5EF]"
                                >
                                    {/* Number */}
                                    <th className="font-medium text-[#4B5563]">
                                        {index + 1}
                                    </th>

                                    {/* User */}
                                    <td>
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
                                    </td>

                                    {/* Phone */}
                                    <td className="text-[#4B5563]">
                                        {user.phoneNumber || "N/A"}
                                    </td>

                                    {/* Role */}
                                    <td>
                                        <span className="rounded-full bg-[#F7F5EF] px-3 py-1 text-xs font-semibold capitalize text-[#001B08]">
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td>
                                        {user.isBlocked ? (
                                            <span className="rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-semibold text-[#B91C1C]">
                                                Blocked
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#166534]">
                                                Active
                                            </span>
                                        )}
                                    </td>

                                    {/* Action */}
                                    <td>
                                        {user.isBlocked ? (
                                            <button
                                                disabled={isLoading}
                                                onClick={() =>
                                                    handleStatusChange(
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
                                                    handleStatusChange(
                                                        user._id,
                                                        true,
                                                    )
                                                }
                                                className="rounded-lg bg-[#FEE2E2] px-4 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA] disabled:opacity-50"
                                            >
                                                {isLoading ? "..." : "Suspend"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="py-12 text-center text-[#6B7280]"
                            >
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsersTable;