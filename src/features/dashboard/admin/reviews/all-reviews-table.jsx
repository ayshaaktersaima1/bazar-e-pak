"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ConfirmationModal from "@/components/shared/confirmation-modal";
import DataTable from "@/features/dashboard/common/table/data-table";
import useApi from "@/hooks/use-api";

import ReviewColumns from "./review-columns";

const LIMIT = 20;

const FILTERS = [
    {
        key: "reviewType",
        label: "All Review Types",
        options: [
            {
                label: "Product",
                value: "product",
            },
            {
                label: "Shop",
                value: "shop",
            },
        ],
    },

    {
        key: "rating",
        label: "All Ratings",
        options: [
            {
                label: "5 Stars",
                value: "5",
            },
            {
                label: "4 Stars",
                value: "4",
            },
            {
                label: "3 Stars",
                value: "3",
            },
            {
                label: "2 Stars",
                value: "2",
            },
            {
                label: "1 Star",
                value: "1",
            },
        ],
    },

    {
        key: "status",
        label: "All Statuses",
        options: [
            {
                label: "Published",
                value: "published",
            },
            {
                label: "Hidden",
                value: "hidden",
            },
            {
                label: "Removed",
                value: "removed",
            },
        ],
    },
];

const AllReviewsTable = ({
    canModerate = false,
    canDelete = false,
    initialReviews = [],
    initialPagination = {},
}) => {
    const api = useApi();

    const [reviews, setReviews] =
        useState(initialReviews);

    const [pagination, setPagination] =
        useState({
            page:
                initialPagination.page ?? 1,

            limit:
                initialPagination.limit ??
                LIMIT,

            total:
                initialPagination.total ??
                initialReviews.length,

            totalPages:
                initialPagination.totalPages ??
                1,
        });

    const [filters, setFilters] =
        useState({
            reviewType: "",
            rating: "",
            status: "",
        });

    const [
        selectedReview,
        setSelectedReview,
    ] = useState(null);

    const [
        moderationStatus,
        setModerationStatus,
    ] = useState("");

    const [
        moderationReason,
        setModerationReason,
    ] = useState("");

    const [
        deleteReviewTarget,
        setDeleteReviewTarget,
    ] = useState(null);

    const [
        deleteLoading,
        setDeleteLoading,
    ] = useState(false);

    const fetchReviews = async (
        page = 1,
        filterValues = filters,
    ) => {
        const params =
            new URLSearchParams({
                page: String(page),
                limit: String(LIMIT),
            });

        if (
            filterValues.reviewType
        ) {
            params.set(
                "reviewType",
                filterValues.reviewType,
            );
        }

        if (
            filterValues.rating
        ) {
            params.set(
                "rating",
                filterValues.rating,
            );
        }

        if (
            filterValues.status
        ) {
            params.set(
                "status",
                filterValues.status,
            );
        }

        const result =
            await api.get(
                `/api/reviews/manage?${params.toString()}`,
                {},
                {
                    auth: true,
                    showError: true,
                },
            );

        if (!result?.success) {
            return;
        }

        const data =
            Array.isArray(result.data)
                ? result.data
                : [];

        setReviews(data);

        setPagination({
            page:
                result.pagination?.page ??
                page,

            limit:
                result.pagination?.limit ??
                LIMIT,

            total:
                result.pagination?.total ??
                data.length,

            totalPages:
                result.pagination
                    ?.totalPages ?? 1,
        });
    };

    // Fetch reviews when the table first loads.

    useEffect(() => {
        if (initialReviews.length) {
            return;
        }

        const timer = setTimeout(() => {
            fetchReviews(1, {
                reviewType: "",
                rating: "",
                status: "",
            });
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const handleFilterChange = (
        key,
        value,
    ) => {
        const nextFilters = {
            ...filters,
            [key]: value,
        };

        setFilters(nextFilters);

        fetchReviews(
            1,
            nextFilters,
        );
    };

    const openModeration = (
        review,
    ) => {
        setSelectedReview(review);

        setModerationStatus(
            review.status,
        );

        setModerationReason(
            review.moderationReason ??
            "",
        );
    };

    const closeModeration = () => {
        setSelectedReview(null);
        setModerationStatus("");
        setModerationReason("");
    };

    const handleModerate =
        async () => {
            if (
                !canModerate ||
                !selectedReview?._id ||
                !moderationStatus
            ) {
                return;
            }

            const result =
                await api.patch(
                    `/api/reviews/${selectedReview._id}/moderation`,
                    {
                        status:
                            moderationStatus,

                        reason:
                            moderationReason,
                    },
                    {},
                    {
                        showSuccess: false,
                    },
                );

            if (!result?.success) {
                return;
            }

            toast.success(
                "Review moderation updated successfully.",
            );

            closeModeration();

            await fetchReviews(
                pagination.page,
                filters,
            );
        };

    const openDelete = (
        review,
    ) => {
        if (!canDelete) {
            return;
        }

        setDeleteReviewTarget(
            review,
        );
    };

    const handleDelete =
        async () => {
            if (
                !canDelete ||
                !deleteReviewTarget?._id
            ) {
                return;
            }

            setDeleteLoading(true);

            const result =
                await api.delete(
                    `/api/reviews/${deleteReviewTarget._id}`,
                    {},
                    {
                        showSuccess: false,
                    },
                );

            setDeleteLoading(false);

            if (!result?.success) {
                return;
            }

            toast.success(
                "Review deleted successfully.",
            );

            setDeleteReviewTarget(
                null,
            );

            await fetchReviews(
                pagination.page,
                filters,
            );
        };

    const columns =
        ReviewColumns({
            canModerate,
            canDelete,

            onModerate:
                openModeration,

            onDelete:
                openDelete,
        });

    return (
        <>
            <DataTable
                columns={columns}
                data={reviews}
                filters={FILTERS}
                filterValues={
                    filters
                }
                onFilter={
                    handleFilterChange
                }
                page={
                    pagination.page
                }
                limit={
                    pagination.limit
                }
                meta={{
                    total:
                        pagination.total,

                    totalPages:
                        pagination.totalPages,
                }}
                loading={
                    api.loading
                }
                onPageChange={(page) =>
                    fetchReviews(
                        page,
                        filters,
                    )
                }
                emptyMessage="No reviews found."
            />

            {selectedReview &&
                canModerate && (
                    <dialog
                        open
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box max-w-lg">
                            <h3 className="text-lg font-bold text-[#001B08]">
                                Moderate Review
                            </h3>

                            <p className="mt-2 text-sm text-[#667085]">
                                Review from{" "}
                                <span className="font-semibold">
                                    {selectedReview.userName ||
                                        "Customer"}
                                </span>
                            </p>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                                        Status
                                    </label>

                                    <select
                                        value={
                                            moderationStatus
                                        }
                                        onChange={(e) =>
                                            setModerationStatus(
                                                e.target.value,
                                            )
                                        }
                                        className="select select-bordered w-full"
                                    >
                                        <option value="published">
                                            Published
                                        </option>

                                        <option value="hidden">
                                            Hidden
                                        </option>

                                        <option value="removed">
                                            Removed
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                                        Reason
                                    </label>

                                    <textarea
                                        value={
                                            moderationReason
                                        }
                                        onChange={(e) =>
                                            setModerationReason(
                                                e.target.value,
                                            )
                                        }
                                        maxLength={500}
                                        rows={4}
                                        placeholder="Optional moderation reason..."
                                        className="textarea textarea-bordered w-full"
                                    />

                                    <p className="mt-1 text-right text-xs text-[#98A2B3]">
                                        {
                                            moderationReason.length
                                        }
                                        /500
                                    </p>
                                </div>
                            </div>

                            <div className="modal-action">
                                <button
                                    type="button"
                                    disabled={
                                        api.loading
                                    }
                                    onClick={
                                        closeModeration
                                    }
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        api.loading
                                    }
                                    onClick={
                                        handleModerate
                                    }
                                    className="btn border-none bg-[#002B12] text-white hover:bg-[#00451E]"
                                >
                                    {api.loading
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>
                        </div>

                        <form
                            method="dialog"
                            className="modal-backdrop"
                        >
                            <button
                                type="button"
                                onClick={
                                    closeModeration
                                }
                            >
                                close
                            </button>
                        </form>
                    </dialog>
                )}

            <ConfirmationModal
                open={Boolean(
                    deleteReviewTarget,
                )}
                title="Delete Review"
                message={
                    deleteReviewTarget
                        ? `Are you sure you want to permanently delete this review from ${deleteReviewTarget.userName || "this customer"}?`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                loading={
                    deleteLoading
                }
                onConfirm={
                    handleDelete
                }
                onCancel={() => {
                    if (
                        !deleteLoading
                    ) {
                        setDeleteReviewTarget(
                            null,
                        );
                    }
                }}
            />
        </>
    );
};

export default AllReviewsTable;