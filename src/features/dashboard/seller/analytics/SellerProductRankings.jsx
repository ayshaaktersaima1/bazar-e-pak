"use client";

import DataTable from "@/features/dashboard/common/table/data-table";

const columns = [
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
    render: (product) => product.views ?? 0,
  },
  {
    key: "clicks",
    label: "Clicks",
    render: (product) => product.clicks ?? 0,
  },
  {
    key: "carts",
    label: "Add to Cart",
    render: (product) => product.carts ?? 0,
  },
];

const SellerProductRankings = ({ rankings }) => {
  return (
    <DataTable
      columns={columns}
      data={rankings}
      page={1}
      limit={20}
      meta={{
        total: rankings.length,
        totalPages: 1,
      }}
      emptyMessage="No product ranking data yet."
    />
  );
};

export default SellerProductRankings;