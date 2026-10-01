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
    canDelete = false,
}) => {
    const api = useApi();

    const [products, setProducts] =
        useState(initialProducts);

    const [pagination, setPagination] =
        useState({
            page:
                initialPagination.page ?? 1,
            limit:
                initialPagination.limit ?? LIMIT,
            total:
                initialPagination.total ??
                initialProducts.length,
            totalPages:
                initialPagination.totalPages ?? 1,
        });

    const [search, setSearch] =
        useState("");

    const [filters, setFilters] =
        useState({
            status: "",
            categoryId: "",
        });

    const [
        selectedProduct,
        setSelectedProduct,
    ] = useState(null);

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

        if (filterValues.categoryId) {
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

    const handleSearch = (value) => {
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

    const handleDelete =
        async () => {
            if (
                !canDelete ||
                !selectedProduct?._id
            ) {
                return;
            }

            const result =
                await api.delete(
                    `/api/products/${selectedProduct._id}`,
                );

            if (
                result.error ||
                !result.success
            ) {
                return;
            }

            toast.success(
                "Product deleted successfully.",
            );

            setSelectedProduct(null);

            const nextPage =
                products.length === 1 &&
                    pagination.page > 1
                    ? pagination.page - 1
                    : pagination.page;

            await fetchProducts(
                nextPage,
                search,
                filters,
            );
        };

    const columns =
        ProductColumns({
            categories,
            canDelete,
            onDelete:
                setSelectedProduct,
        });

    const searchFilters = [
        {
            name: "status",
            label: "Status",
            value:
                filters.status || "all",
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
        <>
            <SearchFilter
                searchValue={search}
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

            <div className="mt-5">
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
                    onPageChange={(page) =>
                        fetchProducts(
                            page,
                            search,
                            filters,
                        )
                    }
                    emptyMessage="No products found."
                />
            </div>

            <ConfirmationModal
                open={Boolean(
                    selectedProduct,
                )}
                title="Delete Product?"
                description={`Are you sure you want to delete "${selectedProduct?.name ?? ""}"?`}
                confirmText="Delete Product"
                cancelText="Cancel"
                loading={
                    api.loading
                }
                onCancel={() =>
                    setSelectedProduct(
                        null,
                    )
                }
                onConfirm={
                    handleDelete
                }
            />
        </>
    );
};

export default AllProductsTable;