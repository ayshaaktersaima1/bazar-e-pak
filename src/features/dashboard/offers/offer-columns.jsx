"use client";

import {
    Pencil,
    Trash2,
} from "lucide-react";

const STATUS_STYLES = {
    draft:
        "bg-gray-100 text-gray-700",

    scheduled:
        "bg-blue-100 text-blue-700",

    active:
        "bg-green-100 text-green-700",

    inactive:
        "bg-yellow-100 text-yellow-700",

    expired:
        "bg-red-100 text-red-700",
};

const OfferColumns = ({
    onEdit,
    onDelete,
}) => {
    return [
        {
            key: "product",
            label: "Product",

            render: (offer) => (
                <div>
                    <p className="font-semibold text-[#001B08]">
                        {offer.productId
                            ?.name ||
                            "Unknown Product"}
                    </p>

                    <p className="text-xs text-gray-500">
                        {offer.title ||
                            "Product Offer"}
                    </p>
                </div>
            ),
        },

        {
            key: "discount",
            label: "Discount",

            render: (offer) => (
                <span className="font-semibold text-[#001B08]">
                    {
                        offer.discountPercent
                    }
                    %
                </span>
            ),
        },

        {
            key: "startDate",
            label: "Start",

            render: (offer) =>
                offer.startDate
                    ? new Date(
                        offer.startDate,
                    ).toLocaleString()
                    : "—",
        },

        {
            key: "endDate",
            label: "End",

            render: (offer) =>
                offer.endDate
                    ? new Date(
                        offer.endDate,
                    ).toLocaleString()
                    : "—",
        },

        {
            key: "status",
            label: "Status",

            render: (offer) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[
                        offer.status
                        ] ??
                        "bg-gray-100 text-gray-700"
                        }`}
                >
                    {offer.status}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Actions",

            render: (offer) => (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            onEdit?.(
                                offer,
                            )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-[#D9A928] px-3 py-2 text-sm font-semibold text-[#001B08] transition hover:bg-[#D9A928]/10"
                    >
                        <Pencil
                            size={15}
                        />
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete?.(
                                offer,
                            )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        <Trash2
                            size={15}
                        />
                        Delete
                    </button>
                </div>
            ),
        },
    ];
};

export default OfferColumns;