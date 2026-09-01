"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import DataTable from "@/features/dashboard/common/table/data-table";
import { getUserColumns } from "./user-columns";

const AllUsersTable = ({ users }) => {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState(null);

    const handleStatusChange = async (
        userId,
        isBlocked,
    ) => {
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

                    body: JSON.stringify({
                        isBlocked,
                    }),
                },
            );

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(
                    result.message ||
                        "Failed to update user status",
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

    const columns = getUserColumns({
        onStatusChange: handleStatusChange,
        loadingId,
    });

    return (
        <DataTable
            columns={columns}
            data={users}
            emptyMessage="No users found."
        />
    );
};

export default AllUsersTable;