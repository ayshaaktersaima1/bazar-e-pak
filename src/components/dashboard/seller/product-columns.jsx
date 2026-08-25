"use client";

import Image from "next/image";
import {
    Edit3,
    Star,
    Trash2,
} from "lucide-react";

const ProductColumns = ({
    onEdit,
    onDelete,
    onFeatured,
}) => [
    {
        key: "name",
        header: "Product",

        render: (product) => (
            <div className="flex min-w-[220px] items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#F7F5EF]">
                    {product.images?.[0] ? (
                        <Image
                            src={
                                product.images[0]
                            }
                            alt={
                                product.name
                            }
                            fill
                            sizes="44px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs text-[#98A2B3]">
                            N/A
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <p className="truncate font-semibold text-[#001B08]">
                        {
                            product.name
                        }
                    </p>

                    <p className="text-xs text-[#667085]">
                        {product.categoryId
                            ?.name ??
                            "Uncategorized"}
                    </p>
                </div>
            </div>
        ),
    },

    {
        key: "price",
        header: "Price",

        render: (product) => {
            const price =
                Number(
                    product.price,
                ) || 0;

            const discount =
                Number(
                    product.discount,
                ) || 0;

            const finalPrice =
                price -
                (price *
                    discount) /
                    100;

            return (
                <div>
                    {discount >
                    0 ? (
                        <>
                            <p className="font-semibold text-[#001B08]">
                                ৳
                                {finalPrice.toFixed(
                                    2,
                                )}
                            </p>

                            <p className="text-xs text-[#98A2B3] line-through">
                                ৳
                                {price.toFixed(
                                    2,
                                )}
                            </p>
                        </>
                    ) : (
                        <p className="font-semibold text-[#001B08]">
                            ৳
                            {price.toFixed(
                                2,
                            )}
                        </p>
                    )}
                </div>
            );
        },
    },

    {
        key: "stock",
        header: "Stock",

        render: (product) => (
            <span
                className={
                    product.stock >
                    0
                        ? "font-semibold text-[#166534]"
                        : "font-semibold text-[#DC2626]"
                }
            >
                {
                    product.stock ??
                    0
                }
            </span>
        ),
    },

    {
        key: "status",
        header: "Status",

        render: (product) => (
            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.status ===
                    "active"
                        ? "bg-[#DCFCE7] text-[#166534]"
                        : "bg-[#F3F4F6] text-[#667085]"
                }`}
            >
                {
                    product.status
                }
            </span>
        ),
    },

    {
        key: "isFeatured",
        header: "Featured",

        render: (product) => (
            <button
                type="button"
                onClick={() =>
                    onFeatured?.(
                        product,
                    )
                }
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                    product.isFeatured
                        ? "bg-[#FEF3C7] text-[#92400E]"
                        : "bg-[#F3F4F6] text-[#667085]"
                }`}
            >
                <Star
                    size={13}
                    fill={
                        product.isFeatured
                            ? "currentColor"
                            : "none"
                    }
                />

                {product.isFeatured
                    ? "Featured"
                    : "Normal"}
            </button>
        ),
    },

    {
        key: "actions",
        header: "Actions",

        render: (product) => (
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() =>
                        onEdit?.(
                            product,
                        )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#475467] transition hover:bg-[#F2F4F7] hover:text-[#001B08]"
                    title="Edit product"
                >
                    <Edit3
                        size={16}
                    />
                </button>

                <button
                    type="button"
                    onClick={() =>
                        onDelete?.(
                            product,
                        )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#DC2626] transition hover:bg-[#FEF2F2]"
                    title="Delete product"
                >
                    <Trash2
                        size={16}
                    />
                </button>
            </div>
        ),
    },
];

export default ProductColumns;