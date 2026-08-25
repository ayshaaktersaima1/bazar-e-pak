"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import DataTable from "@/components/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import ProductColumns from "@/components/dashboard/seller/product-columns";
import ProductForm from "@/components/dashboard/seller/product-form";
import useApi from "../../../hooks/use-api";

const LIMIT = 20;

const ProductManagement = ({
    initialProducts = [],
    initialPagination = {},
    categories = [],
    shops = [],
}) => {
    const api = useApi();

    const [products, setProducts] = useState(initialProducts);

    const [pagination, setPagination] = useState({
        page: initialPagination.page ?? 1,
        limit: initialPagination.limit ?? LIMIT,
        total: initialPagination.total ?? 0,
        totalPages: initialPagination.totalPages ?? 1,
    });

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        categoryId: "",
        isFeatured: "",
    });

    const [formOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] =
        useState(null);

    const [confirmProduct, setConfirmProduct] =
        useState(null);

    const [confirmAction, setConfirmAction] =
        useState(null);

    const fetchProducts = useCallback(
        async ({
            page = pagination.page,
            searchValue = search,
            filterValues = filters,
        } = {}) => {
            try {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(LIMIT),
                });

                if (searchValue.trim()) {
                    params.set(
                        "search",
                        searchValue.trim(),
                    );
                }

                Object.entries(filterValues).forEach(
                    ([key, value]) => {
                        if (value !== "") {
                            params.set(key, value);
                        }
                    },
                );

                const result = await api.get(
                    `/api/products?${params.toString()}`,
                );

                setProducts(result.data || []);

                setPagination({
                    page: result.pagination?.page ?? page,
                    limit:
                        result.pagination?.limit ?? LIMIT,
                    total:
                        result.pagination?.total ??
                        result.meta?.total ??
                        0,
                    totalPages:
                        result.pagination?.totalPages ??
                        result.meta?.totalPages ??
                        1,
                });
            } catch (error) {
                toast.error(
                    error.message ||
                        "Failed to load products",
                );
            }
        },
        [api, pagination.page, search, filters],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts({
                page: 1,
                searchValue: search,
                filterValues: filters,
            });
        }, 350);

        return () => clearTimeout(timer);
    }, [search, filters]);

    const handleFilterChange = (key, value) => {
        setFilters((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const openCreate = () => {
        setEditingProduct(null);
        setFormOpen(true);
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setFormOpen(true);
    };

    const handleSubmit = async (values) => {
        try {
            if (editingProduct) {
                await api.patch(
                    `/api/products/${editingProduct._id}`,
                    values,
                );

                toast.success(
                    "Product updated successfully",
                );
            } else {
                await api.post("/api/products", values);

                toast.success(
                    "Product created successfully",
                );
            }

            setFormOpen(false);
            setEditingProduct(null);

            await fetchProducts({
                page: pagination.page,
            });
        } catch (error) {
            toast.error(
                error.message ||
                    "Failed to save product",
            );
        }
    };

    const handleDelete = async () => {
        if (!confirmProduct) return;

        try {
            await api.remove(
                `/api/products/${confirmProduct._id}`,
            );

            toast.success(
                "Product deleted successfully",
            );

            setConfirmProduct(null);

            await fetchProducts({
                page:
                    products.length === 1 &&
                    pagination.page > 1
                        ? pagination.page - 1
                        : pagination.page,
            });
        } catch (error) {
            toast.error(
                error.message ||
                    "Failed to delete product",
            );
        }
    };

    const handleFeatured = (product) => {
        setConfirmProduct(product);
        setConfirmAction("featured");
    };

    const handleFeaturedConfirm = async () => {
        if (!confirmProduct) return;

        try {
            await api.patch(
                `/api/products/${confirmProduct._id}/featured`,
                {
                    isFeatured: !confirmProduct.isFeatured,
                },
            );

            toast.success(
                confirmProduct.isFeatured
                    ? "Removed from featured"
                    : "Added to featured",
            );

            setConfirmProduct(null);
            setConfirmAction(null);

            await fetchProducts({
                page: pagination.page,
            });
        } catch (error) {
            toast.error(
                error.message ||
                    "Failed to update featured status",
            );
        }
    };

    const columns = useMemo(
        () =>
            ProductColumns({
                onEdit: openEdit,
                onDelete: (product) =>
                    setConfirmProduct(product),
                onFeatured: handleFeatured,
            }),
        [],
    );

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
            options: categories.map((category) => ({
                value: category._id,
                label: category.name,
            })),
        },
        {
            key: "isFeatured",
            label: "Featured",
            options: [
                {
                    value: "true",
                    label: "Featured",
                },
                {
                    value: "false",
                    label: "Not Featured",
                },
            ],
        },
    ];

    if (formOpen) {
        return (
            <div className="rounded-2xl bg-white p-5 shadow-sm md:p-7">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#001B08]">
                        {editingProduct
                            ? "Edit Product"
                            : "Add Product"}
                    </h2>

                    <p className="mt-1 text-sm text-[#6B7280]">
                        {editingProduct
                            ? "Update your product information."
                            : "Create a new product for your shop."}
                    </p>
                </div>

                <ProductForm
                    product={editingProduct}
                    categories={categories}
                    shops={shops}
                    loading={api.loading}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setFormOpen(false);
                        setEditingProduct(null);
                    }}
                />
            </div>
        );
    }

    return (
        <>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#001B08]">
                        Products
                    </h2>

                    <p className="mt-1 text-sm text-[#6B7280]">
                        Manage products, inventory and
                        featured status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreate}
                    className="btn bg-[#D9A928] text-[#001B08] hover:bg-[#E8BB44]"
                >
                    <Plus size={17} />
                    Add Product
                </button>
            </div>

            <DataTable
                columns={columns}
                data={products}
                loading={api.loading}
                search={search}
                onSearch={setSearch}
                searchPlaceholder="Search products..."
                filters={filterConfig}
                filterValues={filters}
                onFilterChange={handleFilterChange}
                page={pagination.page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                limit={pagination.limit}
                onPageChange={(nextPage) =>
                    fetchProducts({
                        page: nextPage,
                    })
                }
                emptyMessage="No products found."
            />

            <ConfirmationModal
                open={
                    Boolean(confirmProduct) &&
                    confirmAction === null
                }
                title="Delete Product?"
                description={`Are you sure you want to delete "${confirmProduct?.name}"? The product will be soft deleted.`}
                confirmText="Delete Product"
                loading={api.loading}
                onCancel={() =>
                    setConfirmProduct(null)
                }
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
                danger={false}
                loading={api.loading}
                onCancel={() => {
                    setConfirmProduct(null);
                    setConfirmAction(null);
                }}
                onConfirm={handleFeaturedConfirm}
            />
        </>
    );
};

export default ProductManagement;