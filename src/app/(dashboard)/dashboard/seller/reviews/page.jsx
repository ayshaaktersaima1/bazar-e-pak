"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import DataTable from "@/components/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";

import {
    ReviewFilters,
    ReviewColumns,
    ReviewSummary,
} from "@/components/dashboard/seller/reviews";

const ReviewTable = ({
    reviews = [],
    pagination = {},
    summary = {},
    shopName = "",
}) => {
    const api = useApi();

    const [search, setSearch] = useState("");

    const [filterValues, setFilterValues] =
        useState({
            rating: "",
        });

    const [selectedReview, setSelectedReview] =
        useState(null);

    const filters = [
        {
            key: "rating",
            label: "Rating",
            options: [
                {
                    value: "5",
                    label: "5 Stars",
                },
                {
                    value: "4",
                    label: "4 Stars",
                },
                {
                    value: "3",
                    label: "3 Stars",
                },
                {
                    value: "2",
                    label: "2 Stars",
                },
                {
                    value: "1",
                    label: "1 Star",
                },
            ],
        },
    ];

    const handleFilter = (
        key,
        value,
    ) => {
        setFilterValues((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const filteredReviews = useMemo(() => {
        const query = search
            .trim()
            .toLowerCase();

        return reviews.filter(
            (review) => {
                const matchesSearch =
                    !query ||
                    String(
                        review.userName ??
                            "",
                    )
                        .toLowerCase()
                        .includes(query) ||
                    String(
                        review.comment ??
                            "",
                    )
                        .toLowerCase()
                        .includes(query);

                const matchesRating =
                    !filterValues.rating ||
                    Number(
                        review.rating,
                    ) ===
                        Number(
                            filterValues.rating,
                        );

                return (
                    matchesSearch &&
                    matchesRating
                );
            },
        );
    }, [
        reviews,
        search,
        filterValues.rating,
    ]);

    const handleDelete = async () => {
        if (!selectedReview?._id) {
            return;
        }

        const result =
            await api.delete(
                `/api/reviews/${selectedReview._id}`,
            );

        if (result?.error) {
            return;
        }

        toast.success(
            "Review deleted successfully.",
        );

        setSelectedReview(null);

        window.location.reload();
    };

    const columns =
        ReviewColumns({
            onDelete:
                setSelectedReview,
        });

    return (
        <div className="space-y-5">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-[#002B12]">
                        Reviews
                    </h1>

                    {shopName && (
                        <span className="rounded-full bg-[#002B12]/5 px-3 py-1 text-xs font-semibold text-[#002B12]">
                            {shopName}
                        </span>
                    )}
                </div>

                <p className="mt-1 text-sm text-[#667085]">
                    Manage and monitor customer
                    reviews for your shop.
                </p>
            </div>

            <ReviewSummary
                summary={summary}
            />

            <ReviewFilters
                searchValue={search}
                onSearch={setSearch}
                filters={filters}
                filterValues={
                    filterValues
                }
                onFilter={
                    handleFilter
                }
            />

            <DataTable
                columns={columns}
                data={filteredReviews}
                meta={{
                    total:
                        filteredReviews.length,
                    totalPages: 1,
                }}
                page={1}
                limit={
                    pagination.limit ??
                    20
                }
                loading={false}
                emptyMessage="No reviews found."
            />

            <ConfirmationModal
                open={Boolean(
                    selectedReview,
                )}
                title="Delete Review?"
                description={`Are you sure you want to delete the review from "${selectedReview?.userName ?? "Customer"}"?`}
                confirmText="Delete Review"
                cancelText="Cancel"
                loading={api.loading}
                onCancel={() =>
                    setSelectedReview(
                        null,
                    )
                }
                onConfirm={
                    handleDelete
                }
            />
        </div>
    );
};

export default ReviewTable;