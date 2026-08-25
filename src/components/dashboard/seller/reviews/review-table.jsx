"use client";

import DataTable from "@/components/table/data-table";
import ReviewColumns from "./review-columns";

const ReviewTable = ({
    reviews = [],
    pagination = {},
    loading = false,
    onPageChange,
    onDelete,
}) => {
    const columns = ReviewColumns({
        onDelete,
    });

    return (
        <DataTable
            columns={columns}
            data={reviews}
            loading={loading}
            page={pagination.page ?? 1}
            limit={pagination.limit ?? 20}
            meta={{
                total: pagination.total ?? reviews.length,
                totalPages:
                    pagination.totalPages ?? 1,
            }}
            onPageChange={onPageChange}
            emptyMessage="No reviews found."
        />
    );
};

export default ReviewTable;