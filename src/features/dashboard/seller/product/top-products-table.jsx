"use client";

import DataTable from "@/features/dashboard/common/table/data-table";

const TopProductsTable = ({ rankings = [] }) => {
    const rankingColumns = [
        {
            key: "product",
            label: "Product ID",
            render: (product) => (
                <span className="font-mono text-xs">
                    {product._id}
                </span>
            ),
        },
        {
            key: "views",
            label: "Views",
            render: (product) =>
                product.views ?? 0,
        },
        {
            key: "clicks",
            label: "Clicks",
            render: (product) =>
                product.clicks ?? 0,
        },
        {
            key: "carts",
            label: "Add to Cart",
            render: (product) =>
                product.carts ?? 0,
        },
    ];

    const topRankings = rankings.slice(0, 5);

    return (
        <DataTable
            columns={rankingColumns}
            data={topRankings}
            page={1}
            limit={5}
            meta={{
                total: topRankings.length,
                totalPages: 1,
            }}
            emptyMessage="No product analytics data yet."
        />
    );
};

export default TopProductsTable;