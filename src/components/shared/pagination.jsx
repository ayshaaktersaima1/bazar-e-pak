"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  page = 1,
  limit = 10,
  total = 0,
  totalPages = 1,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onLimitChange,
}) => {
  if (!total) return null;

  const currentPage = Math.min(
    Math.max(page, 1),
    Math.max(totalPages, 1),
  );

  const pages = [];

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let number = start; number <= end; number += 1) {
    pages.push(number);
  }

  const firstItem = (currentPage - 1) * limit + 1;
  const lastItem = Math.min(
    currentPage * limit,
    total,
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-zinc-500">
        Showing{" "}
        <span className="font-semibold text-[#002B12]">
          {firstItem}-{lastItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#002B12]">
          {total}
        </span>
      </p>

      <div className="flex items-center gap-1.5">
        <select
          value={limit}
          onChange={(event) =>
            onLimitChange?.(
              Number(event.target.value),
            )
          }
          className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 outline-none transition focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/10"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>

        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() =>
            onPageChange?.(currentPage - 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition hover:border-[#D9A928]/40 hover:text-[#002B12] disabled:pointer-events-none disabled:opacity-40"
        >
          <FaChevronLeft className="h-3 w-3" />
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() =>
              onPageChange?.(pageNumber)
            }
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
              pageNumber === currentPage
                ? "bg-[#002B12] text-[#F0B92E] shadow-sm"
                : "border border-zinc-200 bg-white text-zinc-600 hover:border-[#D9A928]/40 hover:text-[#002B12]"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() =>
            onPageChange?.(currentPage + 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition hover:border-[#D9A928]/40 hover:text-[#002B12] disabled:pointer-events-none disabled:opacity-40"
        >
          <FaChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;