"use client";

import {
    Star,
    ShieldCheck,
    Trash2,
} from "lucide-react";

const STATUS_STYLES = {
    published:
        "bg-[#DCFCE7] text-[#166534]",

    hidden:
        "bg-[#FEF3C7] text-[#92400E]",

    removed:
        "bg-[#FEE2E2] text-[#B91C1C]",
};

const ReviewColumns = ({
    onModerate,
    onDelete,
    canModerate = false,
    canDelete = false,
}) => {
    const columns = [
        {
            key: "customer",
            label: "Customer",

            render: (review) => (
                <div>
                    <p className="font-semibold text-[#001B08]">
                        {review.userName ||
                            "Customer"}
                    </p>

                    <p className="text-xs capitalize text-[#667085]">
                        {review.reviewType}
                        {" review"}
                    </p>
                </div>
            ),
        },

        {
            key: "rating",
            label: "Rating",

            render: (review) => (
                <div className="flex items-center gap-1">
                    <Star
                        size={15}
                        className="text-[#D9A928]"
                        fill="currentColor"
                    />

                    <span className="font-semibold text-[#001B08]">
                        {review.rating}/5
                    </span>
                </div>
            ),
        },

        {
            key: "comment",
            label: "Comment",

            render: (review) => (
                <p className="max-w-[320px] text-sm leading-5 text-[#4B5563]">
                    {review.comment}
                </p>
            ),
        },

        {
            key: "status",
            label: "Status",

            render: (review) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[
                        review.status
                        ] ??
                        "bg-[#F3F4F6] text-[#667085]"
                        }`}
                >
                    {review.status}
                </span>
            ),
        },

        {
            key: "moderationReason",
            label: "Reason",

            render: (review) => (
                <span className="text-sm text-[#667085]">
                    {review.moderationReason ||
                        "—"}
                </span>
            ),
        },
    ];

    if (
        canModerate ||
        canDelete
    ) {
        columns.push({
            key: "actions",
            label: "Actions",

            render: (review) => (
                <div className="flex flex-wrap items-center gap-2">
                    {canModerate && (
                        <button
                            type="button"
                            onClick={() =>
                                onModerate?.(
                                    review,
                                )
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-[#002B12] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#00451E]"
                        >
                            <ShieldCheck
                                size={15}
                            />

                            Moderate
                        </button>
                    )}

                    {canDelete && (
                        <button
                            type="button"
                            onClick={() =>
                                onDelete?.(
                                    review,
                                )
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-[#FEE2E2] px-3 py-2 text-sm font-semibold text-[#B91C1C] transition hover:bg-[#FECACA]"
                        >
                            <Trash2
                                size={15}
                            />

                            Delete
                        </button>
                    )}
                </div>
            ),
        });
    }

    return columns;
};

export default ReviewColumns;