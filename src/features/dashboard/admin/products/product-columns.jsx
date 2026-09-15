"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

const ProductColumns = ({
    onDelete,
    canDelete = false,
}) => {
    const columns = [
        {
            key: "product",
            label: "Product",

            render: (product) => (
                <div className="flex min-w-[220px] items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#F7F5EF]">
                        {product.images?.[0] ? (
                            <Image
                                src={
                                    product
                                        .images[0]
                                }
                                alt={
                                    product.name ||
                                    "Product"
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
                            {product.name}
                        </p>

                        <p className="text-xs text-[#667085]">
                            {product
                                .categoryId
                                ?.name ||
                                "Uncategorized"}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "price",
            label: "Price",

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
                        <p className="font-semibold text-[#001B08]">
                            PKR
                            {finalPrice.toFixed(
                                2,
                            )}
                        </p>

                        {discount >
                            0 && (
                                <p className="text-xs text-[#98A2B3] line-through">
                                    PKR
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
            label: "Stock",

            render: (product) => (
                <span
                    className={
                        Number(
                            product.stock,
                        ) > 0
                            ? "font-semibold text-[#166534]"
                            : "font-semibold text-[#DC2626]"
                    }
                >
                    {product.stock ??
                        0}
                </span>
            ),
        },

        {
            key: "status",
            label: "Status",

            render: (product) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${product.status ===
                            "active"
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : "bg-[#F3F4F6] text-[#667085]"
                        }`}
                >
                    {product.status}
                </span>
            ),
        },

        {
            key: "featured",
            label: "Featured",

            render: (product) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${product.isFeatured
                            ? "bg-[#FEF3C7] text-[#92400E]"
                            : "bg-[#F3F4F6] text-[#667085]"
                        }`}
                >
                    {product.isFeatured
                        ? "Featured"
                        : "Normal"}
                </span>
            ),
        },
    ];

    if (canDelete) {
        columns.push({
            key: "actions",
            label: "Action",

            render: (product) => (
                <button
                    type="button"
                    onClick={() =>
                        onDelete(
                            product,
                        )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#DC2626] transition hover:bg-[#FEF2F2]"
                    aria-label={`Delete ${product.name}`}
                >
                    <Trash2
                        size={16}
                    />
                </button>
            ),
        });
    }

    return columns;
};

export default ProductColumns;