"use client";

import Pagination from "../../../../components/shared/pagination";
import TableFilter from "./table-filter";
import TableSearch from "./table-search";

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
  const total = Number(meta?.total ?? 0);
  const totalPages = Number(meta?.totalPages ?? 1);

  return (
    <div className="space-y-5">
      {(search || filters.length > 0) && (
        <div className="flex flex-col gap-3 rounded-xl border border-[#D9A928]/15 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          {search && (
            <TableSearch
              value={searchValue}
              onChange={onSearch}
              placeholder={searchPlaceholder}
            />
          )}

          {filters.length > 0 && (
            <TableFilter
              filters={filters}
              values={filterValues}
              onChange={onFilter}
            />
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-[#D9A928]/15 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D9A928]/15 bg-[#002B12]/[0.025]">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`whitespace-nowrap px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#002B12] ${column.headerClassName ?? ""}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length || 1} className="py-16">
                    <div className="flex justify-center">
                      <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#D9A928]/30 border-t-[#002B12]" />
                    </div>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row, index) => (
                  <tr
                    key={row._id || row.id || index}
                    className="border-b border-zinc-100 transition-colors last:border-0 hover:bg-[#002B12]/[0.02]"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-3.5 text-sm text-zinc-700 ${column.cellClassName ?? ""}`}
                      >
                        {column.render
                          ? column.render(row, index)
                          : (row[column.key] ?? "N/A")}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length || 1}
                    className="py-16 text-center"
                  >
                    <p className="text-sm font-medium text-[#002B12]">
                      {emptyMessage}
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        page={page}
        limit={limit}
        total={total}
        totalPages={totalPages}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default DataTable;
