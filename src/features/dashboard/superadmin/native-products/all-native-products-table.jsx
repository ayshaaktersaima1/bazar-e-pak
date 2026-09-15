"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import SearchFilter from "@/components/shared/SearchFilter";
import DataTable from "@/features/dashboard/common/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";

const LIMIT = 20;

const AllNativeProductsTable = ({
    initialProducts = [],
    initialPagination = {},
}) => {
    const router = useRouter();
    const api = useApi();

    const [products, setProducts] = useState(initialProducts);

    const [pagination, setPagination] = useState({
        page: initialPagination.page ?? 1,
        limit: initialPagination.limit ?? LIMIT,
        total: initialPagination.total ?? initialProducts.length,
        totalPages: initialPagination.totalPages ?? 0,
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [confirm, setConfirm] = useState(null);

    const fetchProducts = async (
        page = 1,
        searchValue = search,
        statusValue = status,
    ) => {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(LIMIT),
        });

        if (searchValue.trim()) {
            params.set("search", searchValue.trim());
        }

        if (statusValue !== "all") {
            params.set("status", statusValue);
        }

        const result = await api.get(
            `/api/native-products?${params.toString()}`,
            {},
            {
                showError: true,
            },
        );

        if (!result.success) {
            return;
        }

        const data = Array.isArray(result.data)
            ? result.data
            : [];

        setProducts(data);

        setPagination({
            page: result.pagination?.page ?? page,
            limit: result.pagination?.limit ?? LIMIT,
            total: result.pagination?.total ?? data.length,
            totalPages: result.pagination?.totalPages ?? 0,
        });
    };

    const handleSearch = (value) => {
        setSearch(value);

        fetchProducts(
            1,
            value,
            status,
        );
    };

    const handleStatusChange = (value) => {
        setStatus(value);

        fetchProducts(
            1,
            search,
            value,
        );
    };

    const handleClear = () => {
        setSearch("");
        setStatus("all");

        fetchProducts(
            1,
            "",
            "all",
        );
    };

    const deleteProduct = async () => {
        const product = confirm?.product;

        if (!product?._id) {
            return;
        }

        const result = await api.delete(
            `/api/native-products/${product._id}`,
            {},
            {
                showSuccess: false,
            },
        );

        if (!result.success) {
            return;
        }

        toast.success("Native product deleted successfully.");

        setConfirm(null);

        const nextPage =
            products.length === 1 && pagination.page > 1
                ? pagination.page - 1
                : pagination.page;

        await fetchProducts(nextPage);
    };

    const filters = [
        {
            name: "status",
            label: "Status",
            value: status,
            onChange: handleStatusChange,
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
    ];

    const columns = [
        {
            key: "name",
            label: "Product",
            render: (product) => (
                <div className="flex items-center gap-3">
                    <img
                        src={
                            product.images?.[0] ||
                            "/images/placeholder.webp"
                        }
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                    />

                    <div>
                        <p className="font-semibold text-[#001B08]">
                            {product.name}
                        </p>

                        <p className="text-xs text-gray-500">
                            Native Product
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "price",
            label: "Price",
            render: (product) => (
                <span className="font-medium text-[#001B08]">
                    PKR {Number(product.price || 0).toLocaleString()}
                </span>
            ),
        },

        {
            key: "stock",
            label: "Stock",
            render: (product) => (
                <span>
                    {product.stock ?? 0}
                </span>
            ),
        },

        {
            key: "status",
            label: "Status",
            render: (product) => (
                <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {product.status}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Actions",
            render: (product) => (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                `/dashboard/superadmin/native-products/${product._id}/edit`,
                            )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#001B08] transition hover:border-[#D9A928] hover:bg-[#FFF8E5]"
                        title="Edit"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setConfirm({
                                product,
                            })
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-5">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/dashboard/superadmin/native-products/new",
                        )
                    }
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#D9A928] px-4 text-sm font-semibold text-[#001B08] transition hover:bg-[#E8BB44]"
                >
                    <Plus size={17} />
                    Add Native Product
                </button>
            </div>

            <SearchFilter
                searchValue={search}
                onSearchChange={handleSearch}
                searchPlaceholder="Search native products..."
                filters={filters}
                onClear={handleClear}
            />

            <DataTable
                columns={columns}
                data={products}
                loading={api.loading}
                page={pagination.page}
                limit={pagination.limit}
                meta={{
                    total: pagination.total,
                    totalPages: pagination.totalPages,
                }}
                onPageChange={(page) =>
                    fetchProducts(page)
                }
                emptyMessage="No native products found."
            />

            <ConfirmationModal
                open={Boolean(confirm)}
                title="Delete Native Product?"
                description={`Are you sure you want to delete "${confirm?.product?.name ?? ""}"?`}
                confirmText="Delete Product"
                cancelText="Cancel"
                loading={api.loading}
                onCancel={() =>
                    setConfirm(null)
                }
                onConfirm={deleteProduct}
            />
        </div>
    );
};

export default AllNativeProductsTable;