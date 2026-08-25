"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import DataTable from "@/components/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import ProductColumns from "@/components/dashboard/seller/product-columns";
import useApi from "../../../hooks/use-api";

const LIMIT = 20;

const ProductManagement = ({
    shopId,
    initialProducts = [],
    initialPagination = {},
    categories = [],
}) => {
    const router = useRouter();
    const api = useApi();

    const [products, setProducts] =
        useState(initialProducts);

    const [pagination, setPagination] = useState({
        page: initialPagination.page ?? 1,
        limit: initialPagination.limit ?? LIMIT,
        total: initialPagination.total ?? 0,
        totalPages:
            initialPagination.totalPages ?? 1,
    });

    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        status: "",
        categoryId: "",
    });

    const [confirmProduct, setConfirmProduct] =
        useState(null);

    const [confirmAction, setConfirmAction] =
        useState(null);

    const fetchProducts = async ({
        page = 1,
        searchValue = search,
        filterValues = filters,
    } = {}) => {
        if (!shopId) {
            return;
        }

        try {
            const params = new URLSearchParams();

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
            );

            const productData = Array.isArray(
                result?.data,
            )
                ? result.data
                : Array.isArray(result)
                  ? result
                  : [];

            setProducts(productData);

            setPagination({
                page:
                    result?.pagination?.page ??
                    page,
                limit:
                    result?.pagination?.limit ??
                    LIMIT,
                total:
                    result?.pagination?.total ??
                    productData.length,
                totalPages:
                    result?.pagination?.totalPages ??
                    1,
            });
        } catch (error) {
            console.error(
                "Fetch products error:",
                error,
            );

            toast.error(
                error?.message ||
                    "Failed to load products",
            );
        }
    };

    useEffect(() => {
        if (!shopId) {
            return;
        }

        const timer = setTimeout(() => {
            fetchProducts({
                page: 1,
                searchValue: search,
                filterValues: filters,
            });
        }, 350);

        return () => clearTimeout(timer);
    }, [
        shopId,
        search,
        filters.status,
        filters.categoryId,
    ]);

    const handleFilterChange = (
        key,
        value,
    ) => {
        setFilters((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const handleCreate = () => {
        router.push(
            "/dashboard/seller/products/new",
        );
    };

    const handleEdit = (product) => {
        if (!product?._id) {
            toast.error("Invalid product.");
            return;
        }

        router.push(
            `/dashboard/seller/products/${product._id}/edit`,
        );
    };

    const openDelete = (product) => {
        if (!product?._id) {
            toast.error("Invalid product.");
            return;
        }

        setConfirmProduct(product);
        setConfirmAction("delete");
    };

    const handleDelete = async () => {
        if (!confirmProduct?._id) {
            return;
        }

        try {
            await api.remove(
                `/api/products/${confirmProduct._id}`,
            );

            toast.success(
                "Product deleted successfully.",
            );

            const nextPage =
                products.length === 1 &&
                pagination.page > 1
                    ? pagination.page - 1
                    : pagination.page;

            setConfirmProduct(null);
            setConfirmAction(null);

            await fetchProducts({
                page: nextPage,
            });
        } catch (error) {
            console.error(
                "Delete product error:",
                error,
            );

            toast.error(
                error?.message ||
                    "Failed to delete product",
            );
        }
    };

    const openFeatured = (product) => {
        if (!product?._id) {
            toast.error("Invalid product.");
            return;
        }

        setConfirmProduct(product);
        setConfirmAction("featured");
    };

    const handleFeaturedConfirm =
        async () => {
            if (!confirmProduct?._id) {
                return;
            }

            try {
                await api.patch(
                    `/api/products/${confirmProduct._id}/featured`,
                    {
                        isFeatured:
                            !confirmProduct.isFeatured,
                    },
                );

                toast.success(
                    confirmProduct.isFeatured
                        ? "Removed from featured."
                        : "Added to featured.",
                );

                setConfirmProduct(null);
                setConfirmAction(null);

                await fetchProducts({
                    page: pagination.page,
                });
            } catch (error) {
                console.error(
                    "Featured update error:",
                    error,
                );

                toast.error(
                    error?.message ||
                        "Failed to update featured status",
                );
            }
        };

    const columns = ProductColumns({
        onEdit: handleEdit,
        onDelete: openDelete,
        onFeatured: openFeatured,
    });

    const filterConfig = [
        {
            key: "status",
            label: "Status",
            options: [
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
            key: "categoryId",
            label: "Category",
            options: categories.map(
                (category) => ({
                    value: String(
                        category._id,
                    ),
                    label: category.name,
                }),
            ),
        },
    ];

    if (!shopId) {
        return (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-10 text-center">
                <h2 className="text-xl font-bold text-[#002B12]">
                    No Shop Found
                </h2>

                <p className="mt-2 text-sm text-[#6B7280]">
                    Create your shop before
                    managing products.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#002B12]">
                        Products
                    </h2>

                    <p className="mt-1 text-sm text-[#6B7280]">
                        Manage your products,
                        inventory and featured
                        status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    className="btn border-0 bg-[#D9A928] text-[#001B08] shadow-sm hover:bg-[#E8BB44]"
                >
                    <Plus size={17} />
                    Add Product
                </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
                <DataTable
                    columns={columns}
                    data={products}
                    loading={api.loading}
                    search={search}
                    onSearch={setSearch}
                    searchPlaceholder="Search your products..."
                    filters={filterConfig}
                    filterValues={filters}
                    onFilterChange={
                        handleFilterChange
                    }
                    page={pagination.page}
                    totalPages={
                        pagination.totalPages
                    }
                    total={pagination.total}
                    limit={pagination.limit}
                    onPageChange={(nextPage) =>
                        fetchProducts({
                            page: nextPage,
                        })
                    }
                    emptyMessage="No products found in your shop."
                />
            </div>

            <ConfirmationModal
                open={
                    Boolean(confirmProduct) &&
                    confirmAction === "delete"
                }
                title="Delete Product?"
                description={`Are you sure you want to delete "${confirmProduct?.name}"? The product will be soft deleted.`}
                confirmText="Delete Product"
                cancelText="Cancel"
                loading={api.loading}
                onCancel={() => {
                    setConfirmProduct(null);
                    setConfirmAction(null);
                }}
                onConfirm={handleDelete}
            />

            <ConfirmationModal
                open={
                    Boolean(confirmProduct) &&
                    confirmAction === "featured"
                }
                title={
                    confirmProduct?.isFeatured
                        ? "Remove Featured Status?"
                        : "Set as Featured?"
                }
                description={
                    confirmProduct?.isFeatured
                        ? "This product will no longer appear as a featured product."
                        : "This product will be marked as featured."
                }
                confirmText={
                    confirmProduct?.isFeatured
                        ? "Remove"
                        : "Set Featured"
                }
                cancelText="Cancel"
                loading={api.loading}
                onCancel={() => {
                    setConfirmProduct(null);
                    setConfirmAction(null);
                }}
                onConfirm={
                    handleFeaturedConfirm
                }
            />
        </>
    );
};

export default ProductManagement;