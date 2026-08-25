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

const ProductList = ({
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
                initialPagination.total ?? 0,
            totalPages:
                initialPagination.totalPages ??
                1,
        });

    const [search, setSearch] = useState("");

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
            new URLSearchParams({
                page: String(page),
                limit: String(LIMIT),
                shopId: String(shopId),
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

        const result = await api.get(
            `/api/products?${params}`,
            {},
            { showError: true },
        );

        if (!result.success) return;

        const data = Array.isArray(
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

    useEffect(() => {
        if (!shopId) return;

        const timer = setTimeout(() => {
            fetchProducts(
                1,
                search,
                filters,
            );
        }, 350);

        return () =>
            clearTimeout(timer);
    }, [
        shopId,
        search,
        filters.status,
        filters.categoryId,
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

    const editProduct = (product) => {
        router.push(
            `/dashboard/seller/products/${product._id}/edit`,
        );
    };

    const deleteProduct = async () => {
        if (!confirm?.product?._id)
            return;

        const result = await api.delete(
            `/api/products/${confirm.product._id}`,
        );

        if (!result.success) return;

        toast.success(
            "Product deleted successfully.",
        );

        setConfirm(null);

        const nextPage =
            products.length === 1 &&
            pagination.page > 1
                ? pagination.page - 1
                : pagination.page;

        fetchProducts(nextPage);
    };

    const toggleFeatured =
        async () => {
            if (!confirm?.product?._id)
                return;

            const product =
                confirm.product;

            const result = await api.patch(
                `/api/products/${product._id}/featured`,
                {
                    isFeatured:
                        !product.isFeatured,
                },
            );

            if (!result.success) return;

            toast.success(
                product.isFeatured
                    ? "Removed from featured."
                    : "Added to featured.",
            );

            setConfirm(null);

            fetchProducts(
                pagination.page,
            );
        };

    const columns = ProductColumns({
        onEdit: editProduct,

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

    if (!shopId) {
        return null;
    }

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

                    <p className="mt-1 text-sm text-[#667085]">
                        Manage your products,
                        inventory and
                        featured status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/dashboard/seller/products/new",
                        )
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#D9A928] px-5 text-sm font-semibold text-[#001B08] hover:bg-[#E8BB44]"
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

            <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
                <DataTable
                    columns={columns}
                    data={products}
                    loading={api.loading}
                    search=""
                    onSearch={() => {}}
                    page={pagination.page}
                    totalPages={
                        pagination.totalPages
                    }
                    total={pagination.total}
                    limit={pagination.limit}
                    onPageChange={(page) =>
                        fetchProducts(
                            page,
                        )
                    }
                    emptyMessage="No products found."
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
                    deleteProduct
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
                    toggleFeatured
                }
            />
        </div>
    );
};

export default ProductList;