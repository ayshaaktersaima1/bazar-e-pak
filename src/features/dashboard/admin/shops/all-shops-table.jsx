"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import DataTable from "@/features/dashboard/common/table/data-table";
import { getShopColumns } from "./shop-columns";

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
                    result.message ||
                        "Failed to update shop status",
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

    const columns = getShopColumns({
        onStatusChange: handleStatusChange,
        loadingId,
    });

    return (
        <DataTable
            columns={columns}
            data={shops}
            emptyMessage="No shops found."
        />
    );
};

export default AllShopsTable;