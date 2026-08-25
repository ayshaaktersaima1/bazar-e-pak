"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DataTable from "@/components/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";

import ProductColumns from "./product-columns";
import ProductFilters from "./product-filters";

const LIMIT = 20;

const ProductTable = ({
    shopId,
    shopName = "",
    initialProducts = [],
    initialPagination = {},
    categories = [],
}) => {
    const router = useRouter();
    const api = useApi();

    const [products, setProducts] =
        useState(initialProducts);

    const [pagination, setPagination] =
        useState({
            page:
                initialPagination.page ?? 1,
            limit:
                initialPagination.limit ??
                LIMIT,
            total:
                initialPagination.total ??
                0,
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
        if (!shopId) return;

        const params =
            new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(LIMIT));
        params.set("shopId", String(shopId));

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

        const result = await api.get(
            `/api/products?${params.toString()}`,
            {},
            {
                showError: true,
            },
        );

        if (result.error) return;

        setProducts(result.data ?? []);

        setPagination({
            page:
                result.pagination?.page ??
                page,
            limit:
                result.pagination?.limit ??
                LIMIT,
            total:
                result.pagination?.total ??
                0,
            totalPages:
                result.pagination
                    ?.totalPages ?? 1,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts(
                1,
                search,
                filters,
            );
        }, 500);

        return () => clearTimeout(timer);
    }, [
        search,
        filters.status,
        filters.categoryId,
        shopId,
    ]);

    const changeFilter = (
        key,
        value,
    ) => {
        setFilters((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const handleDelete = async () => {
        if (
            !confirm?.product?._id
        )
            return;

        const result =
            await api.delete(
                `/api/products/${confirm.product._id}`,
            );

        if (result.error) return;

        toast.success(
            "Product deleted successfully.",
        );

        setConfirm(null);

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

    const handleFeatured = async () => {
        if (
            !confirm?.product?._id
        )
            return;

        const product =
            confirm.product;

        const result =
            await api.patch(
                `/api/products/${product._id}/featured`,
                {
                    isFeatured:
                        !product.isFeatured,
                },
            );

        if (result.error) return;

        toast.success(
            product.isFeatured
                ? "Removed from featured."
                : "Added to featured.",
        );

        setConfirm(null);

        await fetchProducts(
            pagination.page,
            search,
            filters,
        );
    };

    const columns = ProductColumns({
        onEdit: (product) =>
            router.push(
                `/dashboard/seller/products/${product._id}/edit`,
            ),

        onDelete: (product) =>
            setConfirm({
                type: "delete",
                product,
            }),

        onFeatured: (product) =>
            setConfirm({
                type: "featured",
                product,
            }),
    });

    return (
        <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold text-[#002B12]">
                            Products
                        </h1>

                        {shopName && (
                            <span className="rounded-full bg-[#002B12]/5 px-3 py-1 text-xs font-semibold text-[#002B12]">
                                {shopName}
                            </span>
                        )}
                    </div>

                    <p className="mt-1 text-sm text-zinc-500">
                        Manage your products,
                        inventory and featured
                        status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/dashboard/seller/products/new",
                        )
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#D9A928] px-5 text-sm font-semibold text-[#001B08] transition hover:bg-[#E8BB44]"
                >
                    <Plus size={17} />
                    Add Product
                </button>
            </div>

            <ProductFilters
                search={search}
                onSearch={setSearch}
                filters={filters}
                onFilterChange={
                    changeFilter
                }
                categories={categories}
            />

            <div className="mt-5 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
                <DataTable
                    columns={columns}
                    data={products}
                    loading={api.loading}
                    page={pagination.page}
                    totalPages={
                        pagination.totalPages
                    }
                    total={pagination.total}
                    limit={pagination.limit}
                    onPageChange={(page) =>
                        fetchProducts(
                            page,
                            search,
                            filters,
                        )
                    }
                    emptyMessage="No products found in your shop."
                />
            </div>

            <ConfirmationModal
                open={
                    confirm?.type ===
                    "delete"
                }
                title="Delete Product?"
                description={`Are you sure you want to delete "${confirm?.product?.name}"?`}
                confirmText="Delete Product"
                cancelText="Cancel"
                loading={api.loading}
                onCancel={() =>
                    setConfirm(null)
                }
                onConfirm={
                    handleDelete
                }
            />

            <ConfirmationModal
                open={
                    confirm?.type ===
                    "featured"
                }
                title={
                    confirm?.product
                        ?.isFeatured
                        ? "Remove Featured Status?"
                        : "Set as Featured?"
                }
                description={
                    confirm?.product
                        ?.isFeatured
                        ? "This product will no longer appear as featured."
                        : "This product will be marked as featured."
                }
                confirmText={
                    confirm?.product
                        ?.isFeatured
                        ? "Remove"
                        : "Set Featured"
                }
                cancelText="Cancel"
                loading={api.loading}
                onCancel={() =>
                    setConfirm(null)
                }
                onConfirm={
                    handleFeatured
                }
            />
        </>
    );
};

export default ProductTable;