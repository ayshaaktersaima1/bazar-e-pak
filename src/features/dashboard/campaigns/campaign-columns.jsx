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

const CampaignColumns = ({
    onEdit,
    onDelete,
}) => {
    return [
        {
            key: "name",
            label: "Campaign",

            render: (campaign) => (
                <div>
                    <p className="font-semibold text-[#001B08]">
                        {campaign.name}
                    </p>

                    {campaign.description && (
                        <p className="mt-1 max-w-72 truncate text-xs text-gray-500">
                            {
                                campaign.description
                            }
                        </p>
                    )}
                </div>
            ),
        },

        {
            key: "discountPercent",
            label: "Discount",

            render: (campaign) => (
                <span className="font-semibold text-[#001B08]">
                    {campaign.discountPercent ===
                        null ||
                        campaign.discountPercent ===
                        undefined
                        ? "—"
                        : `${campaign.discountPercent}%`}
                </span>
            ),
        },

        {
            key: "startDate",
            label: "Start",

            render: (campaign) =>
                campaign.startDate
                    ? new Date(
                        campaign.startDate,
                    ).toLocaleString()
                    : "—",
        },

        {
            key: "endDate",
            label: "End",

            render: (campaign) =>
                campaign.endDate
                    ? new Date(
                        campaign.endDate,
                    ).toLocaleString()
                    : "—",
        },

        {
            key: "status",
            label: "Status",

            render: (campaign) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[
                        campaign.status
                        ] ||
                        "bg-gray-100 text-gray-700"
                        }`}
                >
                    {campaign.status}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Actions",

            render: (campaign) => (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            onEdit?.(
                                campaign,
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
                                campaign,
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

export default CampaignColumns;