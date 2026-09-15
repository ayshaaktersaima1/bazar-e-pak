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

    published:
        "bg-green-100 text-green-700",

    inactive:
        "bg-yellow-100 text-yellow-700",

    expired:
        "bg-red-100 text-red-700",
};

const TYPE_LABELS = {
    hero: "Hero",
    banner: "Banner",
    homepage: "Homepage",
    page: "Page",
    template: "Template",
    announcement: "Announcement",
};

const CmsColumns = ({
    onEdit,
    onDelete,
}) => {
    return [
        {
            key: "key",
            label: "Key",

            render: (item) => (
                <div>
                    <p className="font-semibold text-[#001B08]">
                        {item.key}
                    </p>

                    {item.title && (
                        <p className="mt-1 max-w-72 truncate text-xs text-gray-500">
                            {item.title}
                        </p>
                    )}
                </div>
            ),
        },

        {
            key: "type",
            label: "Type",

            render: (item) => (
                <span className="text-sm font-medium text-[#001B08]">
                    {TYPE_LABELS[item.type] ??
                        item.type ??
                        "—"}
                </span>
            ),
        },

        {
            key: "locale",
            label: "Language",

            render: (item) => (
                <span className="text-sm font-medium uppercase text-[#001B08]">
                    {item.locale ?? "—"}
                </span>
            ),
        },

        {
            key: "order",
            label: "Order",

            render: (item) => (
                <span className="text-sm text-[#001B08]">
                    {item.order ?? 0}
                </span>
            ),
        },

        {
            key: "status",
            label: "Status",

            render: (item) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[
                        item.status
                        ] ||
                        "bg-gray-100 text-gray-700"
                        }`}
                >
                    {item.status}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Actions",

            render: (item) => (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            onEdit?.(item)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-[#D9A928] px-3 py-2 text-sm font-semibold text-[#001B08] transition hover:bg-[#D9A928]/10"
                    >
                        <Pencil size={15} />
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete?.(item)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        <Trash2 size={15} />
                        Delete
                    </button>
                </div>
            ),
        },
    ];
};

export default CmsColumns;