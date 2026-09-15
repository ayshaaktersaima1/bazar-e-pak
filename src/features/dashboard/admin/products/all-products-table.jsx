"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import DataTable from "@/features/dashboard/common/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";

import ProductColumns from "./product-columns";

const LIMIT = 20;

const AllProductsTable = ({
    initialProducts = [],
    initialPagination = {},
    canDelete = false,
}) => {
    const api = useApi();

    const [
        products,
        setProducts,
    ] = useState(
        initialProducts,
    );

    const [
        pagination,
        setPagination,
    ] = useState({
        page:
            initialPagination.page ?? 1,
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

    const [
        selectedProduct,
        setSelectedProduct,
    ] = useState(null);

    const fetchProducts = async (
        page = 1,
    ) => {
        const result =
            await api.get(
                `/api/products?page=${page}&limit=${LIMIT}`,
                {},
                {
                    showError: true,
                },
            );

        if (!result.success) {
            return;
        }

        const data =
            Array.isArray(
                result.data,
            )
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

            setSelectedProduct(
                null,
            );

            const nextPage =
                products.length === 1 &&
                    pagination.page > 1
                    ? pagination.page - 1
                    : pagination.page;

            await fetchProducts(
                nextPage,
            );
        };

    const columns =
        ProductColumns({
            canDelete,
            onDelete:
                setSelectedProduct,
        });

    return (
        <>
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
                onPageChange={
                    fetchProducts
                }
                emptyMessage="No products found."
            />

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