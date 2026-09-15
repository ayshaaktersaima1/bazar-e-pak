"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Edit,
    Trash2,
} from "lucide-react";

const CategoryColumns = ({
    onDelete,
}) => [
        {
            key: "name",
            label: "Category",

            render: (category) => (
                <div className="flex min-w-[220px] items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#F7F5EF]">
                        {category.image ? (
                            <Image
                                src={category.image}
                                alt={
                                    category.name ||
                                    "Category"
                                }
                                fill
                                sizes="44px"
                                className="object-cover"
                            />
                        ) : (
                            <span className="flex h-full items-center justify-center text-xs text-[#98A2B3]">
                                N/A
                            </span>
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-semibold text-[#001B08]">
                            {category.name}
                        </p>

                        <p className="truncate text-xs text-[#667085]">
                            {category.slug ||
                                "No slug"}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "description",
            label: "Description",

            render: (category) => (
                <p className="max-w-[360px] truncate text-sm text-[#667085]">
                    {category.description ||
                        "No description"}
                </p>
            ),
        },

        {
            key: "order",
            label: "Order",

            render: (category) => (
                <span className="font-medium text-[#001B08]">
                    {category.order ?? 0}
                </span>
            ),
        },

        {
            key: "status",
            label: "Status",

            render: (category) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${category.status ===
                            "active"
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : "bg-[#F3F4F6] text-[#667085]"
                        }`}
                >
                    {category.status}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Actions",

            render: (category) => (
                <div className="flex items-center gap-1">
                    <Link
                        href={`/dashboard/superadmin/categories/${category._id}/edit`}
                        title="Edit category"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#002B12] hover:bg-[#F7F5EF]"
                    >
                        <Edit size={16} />
                    </Link>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete?.(
                                category,
                            )
                        }
                        title="Delete category"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#DC2626] hover:bg-[#FEF2F2]"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

export default CategoryColumns;