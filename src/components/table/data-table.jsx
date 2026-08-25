"use client";

import TableSearch from "./table-search";
import TableFilter from "./table-filter";
import Pagination from "./pagination";

const DataTable = ({
    columns = [],
    data = [],
    meta = {},

    search = false,
    searchValue = "",
    searchPlaceholder = "Search...",
    onSearch,

    filters = [],
    filterValues = {},
    onFilter,

    page = 1,
    limit = 10,
    onPageChange,
    onLimitChange,

    loading = false,
    emptyMessage = "No data found.",

    pageSizeOptions = [10, 20, 50],
}) => {
    return (
        <div className="space-y-4">
            {(search || filters.length > 0) && (
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    {search && (
                        <TableSearch
                            value={searchValue}
                            onChange={onSearch}
                            placeholder={
                                searchPlaceholder
                            }
                        />
                    )}

                    <TableFilter
                        filters={filters}
                        values={filterValues}
                        onChange={onFilter}
                    />
                </div>
            )}

            <div className="overflow-x-auto rounded-xl bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={
                                        column.headerClassName
                                    }
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length
                                    }
                                    className="py-12 text-center"
                                >
                                    <span className="loading loading-spinner" />
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((row, index) => (
                                <tr
                                    key={
                                        row._id ||
                                        row.id ||
                                        index
                                    }
                                >
                                    {columns.map(
                                        (column) => (
                                            <td
                                                key={
                                                    column.key
                                                }
                                                className={
                                                    column.cellClassName
                                                }
                                            >
                                                {column.render
                                                    ? column.render(
                                                          row,
                                                          index,
                                                      )
                                                    : row[
                                                          column
                                                              .key
                                                      ] ??
                                                      "N/A"}
                                            </td>
                                        ),
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length
                                    }
                                    className="py-12 text-center text-base-content/60"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                page={page}
                limit={limit}
                total={meta.total}
                totalPages={meta.totalPages}
                pageSizeOptions={
                    pageSizeOptions
                }
                onPageChange={onPageChange}
                onLimitChange={onLimitChange}
            />
        </div>
    );
};

export default DataTable;