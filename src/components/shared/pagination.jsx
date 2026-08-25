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

  const pages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-base-content/60">
        Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of{" "}
        {total}
      </p>

      <div className="flex items-center gap-2">
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="select select-bordered select-sm"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-sm btn-square"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <FaChevronLeft />
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`btn btn-sm ${pageNumber === page ? "btn-primary" : ""}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          className="btn btn-sm btn-square"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
