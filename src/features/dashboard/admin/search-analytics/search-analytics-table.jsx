"use client";

import { useState } from "react";

import DataTable from "@/features/dashboard/common/table/data-table";
import useApi from "@/hooks/use-api";

const LIMIT = 20;

const SearchAnalyticsTable = ({
    initialRows = [],
    initialPagination = {},
}) => {
    const api = useApi();

    const [rows, setRows] =
        useState(initialRows);

    const [keyword, setKeyword] =
        useState("");

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
            initialRows.length,
        totalPages:
            initialPagination.totalPages ??
            1,
    });

    const fetchRows = async (
        page = 1,
        searchKeyword = keyword,
    ) => {
        const params =
            new URLSearchParams({
                page: String(page),
                limit: String(LIMIT),
            });

        if (searchKeyword.trim()) {
            params.set(
                "keyword",
                searchKeyword.trim(),
            );
        }

        const result =
            await api.get(
                `/api/search-analytics?${params.toString()}`,
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

        setRows(data);

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
        setKeyword(value);

        fetchRows(
            1,
            value,
        );
    };

    const columns = [
        {
            key: "keyword",
            label: "Keyword",

            render: (row) => (
                <span className="font-medium text-[#001B08]">
                    {row._id || "N/A"}
                </span>
            ),
        },

        {
            key: "searches",
            label: "Searches",

            render: (row) =>
                row.searches ?? 0,
        },

        {
            key: "noResults",
            label: "No Results",

            render: (row) =>
                row.noResults ?? 0,
        },

        {
            key: "noResultRate",
            label: "No Result Rate",

            render: (row) => {
                const searches =
                    Number(
                        row.searches,
                    ) || 0;

                const noResults =
                    Number(
                        row.noResults,
                    ) || 0;

                const rate =
                    searches > 0
                        ? (
                            (noResults /
                                searches) *
                            100
                        ).toFixed(1)
                        : "0.0";

                return `${rate}%`;
            },
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={rows}
            search
            searchValue={keyword}
            searchPlaceholder="Search keywords..."
            onSearch={
                handleSearch
            }
            loading={api.loading}
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
                fetchRows(
                    page,
                    keyword,
                )
            }
            emptyMessage="No search analytics found."
        />
    );
};

export default SearchAnalyticsTable;