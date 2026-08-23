"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaStore } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const STATUS_STYLES = {
    pending: "bg-[#FEF3C7] text-[#92400E]",
    active: "bg-[#DCFCE7] text-[#166534]",
    inactive: "bg-[#F3F4F6] text-[#4B5563]",
    suspended: "bg-[#FEE2E2] text-[#B91C1C]",
    rejected: "bg-[#F3F4F6] text-[#6B7280]",
};

const AllShopsTable = ({ shops }) => {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState(null);

    const handleStatusChange = async (shopId, status) => {
        setLoadingId(shopId);

        try {
            const { data } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/shops/${shopId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${data?.token}`,
                    },
                    body: JSON.stringify({ status }),
                },
            );

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to update shop status",
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
                        <th className="text-[#E8BB44]">Shop</th>
                        <th className="text-[#E8BB44]">Contact</th>
                        <th className="text-[#E8BB44]">Rating</th>
                        <th className="text-[#E8BB44]">Status</th>
                        <th className="text-[#E8BB44]">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {shops.length > 0 ? (
                        shops.map((shop, index) => {
                            const isLoading = loadingId === shop._id;

                            return (
                                <tr
                                    key={shop._id || shop.id}
                                    className="border-b border-[#E5E2D8] hover:bg-[#F7F5EF]"
                                >
                                    <th className="font-medium text-[#4B5563]">
                                        {index + 1}
                                    </th>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08]">
                                                <FaStore size={15} />
                                            </div>

                                            <div>
                                                <p className="font-semibold text-[#001B08]">
                                                    {shop.name}
                                                </p>
                                                <p className="text-sm text-[#6B7280]">
                                                    {shop.slug}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-[#4B5563]">
                                        {shop.email || shop.phone || "N/A"}
                                    </td>

                                    <td className="text-[#4B5563]">
                                        {shop.rating > 0
                                            ? `${shop.rating} (${shop.totalReviews})`
                                            : "No reviews"}
                                    </td>

                                    <td>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[shop.status]}`}
                                        >
                                            {shop.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex gap-2">
                                            {shop.status === "pending" && (
                                                <>
                                                    <button
                                                        disabled={isLoading}
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                shop._id,
                                                                "active",
                                                            )
                                                        }
                                                        className="rounded-lg bg-[#DCFCE7] px-4 py-2 text-sm font-semibold text-[#166534] hover:bg-[#BBF7D0] disabled:opacity-50"
                                                    >
                                                        {isLoading ? "..." : "Approve"}
                                                    </button>

                                                    <button
                                                        disabled={isLoading}
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                shop._id,
                                                                "rejected",
                                                            )
                                                        }
                                                        className="rounded-lg bg-[#FEE2E2] px-4 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA] disabled:opacity-50"
                                                    >
                                                        {isLoading ? "..." : "Reject"}
                                                    </button>
                                                </>
                                            )}

                                            {shop.status === "active" && (
                                                <button
                                                    disabled={isLoading}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            shop._id,
                                                            "suspended",
                                                        )
                                                    }
                                                    className="rounded-lg bg-[#FEE2E2] px-4 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA] disabled:opacity-50"
                                                >
                                                    {isLoading ? "..." : "Suspend"}
                                                </button>
                                            )}

                                            {shop.status === "suspended" && (
                                                <button
                                                    disabled={isLoading}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            shop._id,
                                                            "active",
                                                        )
                                                    }
                                                    className="rounded-lg bg-[#DCFCE7] px-4 py-2 text-sm font-semibold text-[#166534] hover:bg-[#BBF7D0] disabled:opacity-50"
                                                >
                                                    {isLoading ? "..." : "Unsuspend"}
                                                </button>
                                            )}

                                            {(shop.status === "inactive" ||
                                                shop.status === "rejected") && (
                                                    <span className="text-sm text-[#9CA3AF]">
                                                        —
                                                    </span>
                                                )}
                                        </div>
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
                                No shops found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllShopsTable;