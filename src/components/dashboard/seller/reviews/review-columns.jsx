"use client";

import { Star, Trash2 } from "lucide-react";

const ReviewColumns = ({ onDelete } = {}) => [
    {
        key: "customer",
        label: "Customer",
        render: (review) => (
            <div>
                <p className="font-semibold text-[#001B08]">
                    {review.userName || "Customer"}
                </p>

                <p className="text-xs text-zinc-400">
                    {review.userId || "N/A"}
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
                    fill="currentColor"
                    className="text-[#D9A928]"
                />

                <span className="font-semibold text-[#001B08]">
                    {review.rating}/5
                </span>
            </div>
        ),
    },
    {
        key: "comment",
        label: "Review",
        render: (review) => (
            <p className="max-w-[420px] truncate text-sm text-zinc-600">
                {review.comment || "No comment"}
            </p>
        ),
    },
    {
        key: "type",
        label: "Type",
        render: (review) => (
            <span className="rounded-full bg-[#002B12]/5 px-3 py-1 text-xs font-semibold capitalize text-[#002B12]">
                {review.reviewType}
            </span>
        ),
    },
    {
        key: "date",
        label: "Date",
        render: (review) => (
            <span className="whitespace-nowrap text-sm text-zinc-500">
                {review.createdAt
                    ? new Date(
                          review.createdAt,
                      ).toLocaleDateString()
                    : "N/A"}
            </span>
        ),
    },
    {
        key: "actions",
        label: "Actions",
        render: (review) => (
            <button
                type="button"
                onClick={() => onDelete?.(review)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50"
                title="Delete review"
            >
                <Trash2 size={16} />
            </button>
        ),
    },
];

export default ReviewColumns;