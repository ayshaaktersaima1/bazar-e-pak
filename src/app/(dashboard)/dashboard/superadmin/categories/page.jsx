"use client";

import {
    useEffect,
    useState,
} from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import SearchFilter from "@/components/shared/SearchFilter";
import DataTable from "@/features/dashboard/common/table/data-table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import useApi from "@/hooks/use-api";
import CategoryColumns from "@/features/dashboard/superadmin/categories/category-columns";


const LIMIT = 20;

export default function CategoriesPage() {
    const api = useApi();

    const [
        categories,
        setCategories,
    ] = useState([]);

    const [
        pagination,
        setPagination,
    ] = useState({
        page: 1,
        limit: LIMIT,
        total: 0,
        totalPages: 1,
    });

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        filters,
        setFilters,
    ] = useState({
        status: "",
    });

    const [
        confirm,
        setConfirm,
    ] = useState(null);

    const [
        deleting,
        setDeleting,
    ] = useState(false);

    const fetchCategories = async (
        page = 1,
        searchValue = search,
        filterValues = filters,
    ) => {
        const params =
            new URLSearchParams({
                page: String(page),
                limit: String(LIMIT),
                sortBy: "order",
                sortOrder: "asc",
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

        const result =
            await api.get(
                `/api/categories?${params.toString()}`,
                {},
                {
                    auth: true,
                    showError: true,
                },
            );

        if (!result?.success) {
            return;
        }

        const data =
            Array.isArray(result.data)
                ? result.data
                : [];

        setCategories(data);

        setPagination({
            page:
                result.pagination?.page ??
                page,

            limit:
                result.pagination
                    ?.limit ?? LIMIT,

            total:
                result.pagination
                    ?.total ??
                data.length,

            totalPages:
                result.pagination
                    ?.totalPages ?? 1,
        });
    };

    useEffect(() => {
        const timer =
            setTimeout(() => {
                fetchCategories(
                    1,
                    "",
                    {
                        status: "",
                    },
                );
            }, 0);

        return () =>
            clearTimeout(timer);

        // Initial load only.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (
        value,
    ) => {
        setSearch(value);

        fetchCategories(
            1,
            value,
            filters,
        );
    };

    const changeFilter = (
        name,
        value,
    ) => {
        const nextFilters = {
            ...filters,
            [name]: value,
        };

        setFilters(nextFilters);

        fetchCategories(
            1,
            search,
            nextFilters,
        );
    };

    const clearFilters = () => {
        setSearch("");

        const cleared = {
            status: "",
        };

        setFilters(cleared);

        fetchCategories(
            1,
            "",
            cleared,
        );
    };

    const handleDelete =
        async () => {
            if (!confirm?._id) {
                return;
            }

            try {
                setDeleting(true);

                const result =
                    await api.delete(
                        `/api/categories/${confirm._id}`,
                        {},
                        {
                            auth: true,
                            showSuccess:
                                false,
                            showError:
                                false,
                        },
                    );

                if (
                    result?.success ===
                    false
                ) {
                    throw new Error(
                        result?.message ||
                        "Failed to delete category.",
                    );
                }

                toast.success(
                    "Category deleted successfully.",
                );

                setConfirm(null);

                const nextPage =
                    categories.length ===
                        1 &&
                        pagination.page > 1
                        ? pagination.page -
                        1
                        : pagination.page;

                await fetchCategories(
                    nextPage,
                );
            } catch (error) {
                console.error(
                    "Delete category error:",
                    error,
                );

                toast.error(
                    error?.message ||
                    "Failed to delete category.",
                );
            } finally {
                setDeleting(false);
            }
        };

    const columns =
        CategoryColumns({
            onDelete: (
                category,
            ) => {
                setConfirm(category);
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
    ];

    return (
        <>
            <div className="space-y-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-zinc-900">
                            Categories
                        </h1>

                        <p className="mt-1 text-sm text-zinc-500">
                            Manage product
                            categories across
                            PakBazaar.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/superadmin/categories/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#002B12] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#00451E]"
                    >
                        <Plus className="h-4 w-4" />

                        Add Category
                    </Link>
                </div>

                <SearchFilter
                    searchValue={
                        search
                    }
                    onSearchChange={
                        handleSearch
                    }
                    searchPlaceholder="Search categories..."
                    filters={
                        searchFilters
                    }
                    onClear={
                        clearFilters
                    }
                />

                <DataTable
                    columns={
                        columns
                    }
                    data={
                        categories
                    }
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
                        fetchCategories(
                            page,
                        )
                    }
                    emptyMessage="No categories found."
                />
            </div>

            <ConfirmationModal
                open={Boolean(confirm)}
                title="Delete Category?"
                message={
                    confirm
                        ? `Are you sure you want to delete "${confirm.name}"?`
                        : ""
                }
                confirmText="Delete Category"
                cancelText="Cancel"
                variant="danger"
                loading={deleting}
                onConfirm={
                    handleDelete
                }
                onCancel={() => {
                    if (
                        !deleting
                    ) {
                        setConfirm(
                            null,
                        );
                    }
                }}
            />
        </>
    );
}