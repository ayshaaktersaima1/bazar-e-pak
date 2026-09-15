"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import SearchFilter from "@/components/shared/SearchFilter";
import DataTable from "@/features/dashboard/common/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";

import ProductColumns from "./product-columns";

const LIMIT = 20;

const AllProductsTable = ({
    initialProducts = [],
    initialPagination = {},
    categories = [],
}) => {
    const api = useApi();

    const [products, setProducts] =
        useState(initialProducts);

    const [pagination, setPagination] =
        useState({
            page:
                initialPagination.page ??
                1,
            limit:
                initialPagination.limit ??
                LIMIT,
            total:
                initialPagination.total ??
                initialProducts.length,
            totalPages:
                initialPagination.totalPages ??
                1,
        });

    const [search, setSearch] =
        useState("");

    const [filters, setFilters] =
        useState({
            status: "",
            categoryId: "",
        });

    const [confirm, setConfirm] =
        useState(null);

    const fetchProducts = async (
        page = 1,
        searchValue = search,
        filterValues = filters,
    ) => {
        const params =
            new URLSearchParams({
                page: String(page),
                limit: String(LIMIT),
            });

        if (searchValue.trim()) {
            params.set(
                "search",
                searchValue.trim(),
            );
        }

        if (filterValues.status) {
            params.set(
                "status",
                filterValues.status,
            );
        }

        if (
            filterValues.categoryId
        ) {
            params.set(
                "categoryId",
                filterValues.categoryId,
            );
        }

        const result =
            await api.get(
                `/api/products?${params.toString()}`,
                {},
                {
                    showError: true,
                },
            );

        if (!result.success) {
            return;
        }

        const data =
            Array.isArray(result.data)
                ? result.data
                : [];

        setProducts(data);

        setPagination({
            page:
                result.pagination?.page ??
                page,

            limit:
                result.pagination?.limit ??
                LIMIT,

            total:
                result.pagination?.total ??
                data.length,

            totalPages:
                result.pagination
                    ?.totalPages ?? 1,
        });
    };

    const handleSearch = (
        value,
    ) => {
        setSearch(value);

        fetchProducts(
            1,
            value,
            filters,
        );
    };

    const changeFilter = (
        key,
        value,
    ) => {
        const nextFilters = {
            ...filters,
            [key]: value,
        };

        setFilters(nextFilters);

        fetchProducts(
            1,
            search,
            nextFilters,
        );
    };

    const clearFilters = () => {
        const emptyFilters = {
            status: "",
            categoryId: "",
        };

        setSearch("");
        setFilters(emptyFilters);

        fetchProducts(
            1,
            "",
            emptyFilters,
        );
    };

    const deleteProduct =
        async () => {
            if (
                !confirm?.product?._id
            ) {
                return;
            }

            const result =
                await api.delete(
                    `/api/products/${confirm.product._id}`,
                    {},
                    {
                        showSuccess:
                            false,
                    },
                );

            if (!result.success) {
                return;
            }

            toast.success(
                "Product deleted successfully.",
            );

            setConfirm(null);

            const nextPage =
                products.length ===
                    1 &&
                    pagination.page > 1
                    ? pagination.page -
                    1
                    : pagination.page;

            await fetchProducts(
                nextPage,
            );
        };

    const toggleFeatured =
        async () => {
            if (
                !confirm?.product?._id
            ) {
                return;
            }

            const product =
                confirm.product;

            const result =
                await api.patch(
                    `/api/products/${product._id}/featured`,
                    {
                        isFeatured:
                            !product.isFeatured,
                    },
                    {},
                    {
                        showSuccess:
                            false,
                    },
                );

            if (!result.success) {
                return;
            }

            toast.success(
                product.isFeatured
                    ? "Removed from featured."
                    : "Added to featured.",
            );

            setConfirm(null);

            await fetchProducts(
                pagination.page,
            );
        };

    const columns =
        ProductColumns({
            onDelete: (
                product,
            ) => {
                setConfirm({
                    type: "delete",
                    product,
                });
            },

            onFeatured: (
                product,
            ) => {
                setConfirm({
                    type: "featured",
                    product,
                });
            },
        });

    const searchFilters = [
        {
            name: "status",
            label: "Status",
            value:
                filters.status ||
                "all",

            onChange: (value) =>
                changeFilter(
                    "status",
                    value === "all"
                        ? ""
                        : value,
                ),

            options: [
                {
                    value: "all",
                    label: "All Status",
                },
                {
                    value: "active",
                    label: "Active",
                },
                {
                    value: "inactive",
                    label: "Inactive",
                },
            ],
        },

        {
            name: "categoryId",
            label: "Category",
            value:
                filters.categoryId ||
                "all",

            onChange: (value) =>
                changeFilter(
                    "categoryId",
                    value === "all"
                        ? ""
                        : value,
                ),

            options: [
                {
                    value: "all",
                    label:
                        "All Categories",
                },

                ...categories.map(
                    (category) => ({
                        value:
                            category._id,
                        label:
                            category.name,
                    }),
                ),
            ],
        },
    ];

    return (
        <div className="space-y-5">
            <SearchFilter
                searchValue={
                    search
                }
                onSearchChange={
                    handleSearch
                }
                searchPlaceholder="Search products..."
                filters={
                    searchFilters
                }
                onClear={
                    clearFilters
                }
            />

            <DataTable
                columns={columns}
                data={products}
                loading={
                    api.loading
                }
                page={
                    pagination.page
                }
                limit={
                    pagination.limit
                }
                meta={{
                    total:
                        pagination.total,
                    totalPages:
                        pagination.totalPages,
                }}
                onPageChange={(
                    page,
                ) =>
                    fetchProducts(
                        page,
                    )
                }
                emptyMessage="No products found."
            />

            <ConfirmationModal
                open={
                    confirm?.type ===
                    "delete"
                }
                title="Delete Product?"
                description={`Are you sure you want to delete "${confirm?.product?.name ?? ""}"?`}
                confirmText="Delete Product"
                cancelText="Cancel"
                loading={
                    api.loading
                }
                onCancel={() =>
                    setConfirm(null)
                }
                onConfirm={
                    deleteProduct
                }
            />

            <ConfirmationModal
                open={
                    confirm?.type ===
                    "featured"
                }
                title={
                    confirm
                        ?.product
                        ?.isFeatured
                        ? "Remove Featured Status?"
                        : "Set as Featured?"
                }
                description={
                    confirm
                        ?.product
                        ?.isFeatured
                        ? "This product will no longer appear as featured."
                        : "This product will be marked as featured."
                }
                confirmText={
                    confirm
                        ?.product
                        ?.isFeatured
                        ? "Remove"
                        : "Set Featured"
                }
                cancelText="Cancel"
                loading={
                    api.loading
                }
                onCancel={() =>
                    setConfirm(null)
                }
                onConfirm={
                    toggleFeatured
                }
            />
        </div>
    );
};

export default AllProductsTable;