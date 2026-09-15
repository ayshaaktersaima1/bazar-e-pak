import {
  FaEdit,
  FaStore,
  FaTrash,
} from "react-icons/fa";

const STATUS_STYLES = {
  pending:
    "bg-[#FEF3C7] text-[#92400E]",
  active:
    "bg-[#DCFCE7] text-[#166534]",
  inactive:
    "bg-[#F3F4F6] text-[#4B5563]",
  suspended:
    "bg-[#FEE2E2] text-[#B91C1C]",
  rejected:
    "bg-[#F3F4F6] text-[#6B7280]",
};

const SHOP_STATUSES = [
  "pending",
  "active",
  "inactive",
  "suspended",
  "rejected",
];

export const getShopColumns = ({
  currentRole,
  statusLoadingId,
  onStatusChange,
  onEdit,
  onDelete,
} = {}) => {
  const columns = [
    {
      key: "index",
      label: "#",
      render: (_, index) =>
        index + 1,
    },

    {
      key: "shop",
      label: "Shop",

      render: (shop) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08]">
            <FaStore
              size={15}
            />
          </div>

          <div>
            <p className="font-semibold text-[#001B08]">
              {shop.name}
            </p>

            <p className="text-sm text-[#6B7280]">
              {shop.slug}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "contact",
      label: "Contact",
      cellClassName:
        "text-[#4B5563]",

      render: (shop) =>
        shop.email ||
        shop.phone ||
        "N/A",
    },

    {
      key: "rating",
      label: "Rating",
      cellClassName:
        "text-[#4B5563]",

      render: (shop) =>
        shop.rating > 0
          ? `${shop.rating} (${shop.totalReviews || 0})`
          : "No reviews",
    },

    {
      key: "status",
      label: "Status",

      render: (shop) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[
            shop.status
            ] ||
            STATUS_STYLES.inactive
            }`}
        >
          {shop.status ||
            "inactive"}
        </span>
      ),
    },
  ];

  if (
    currentRole ===
    "super_admin"
  ) {
    columns.push({
      key: "actions",
      label: "Actions",

      render: (shop) => {
        const isLoading =
          statusLoadingId ===
          shop._id;

        return (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onEdit?.(
                  shop,
                )
              }
              className="flex items-center gap-2 rounded-lg bg-[#E8BB44] px-3 py-2 text-sm font-semibold text-[#001B08] hover:bg-[#D9A928]"
            >
              <FaEdit />

              Edit
            </button>

            <select
              value={
                shop.status
              }
              disabled={
                isLoading
              }
              onChange={(
                event,
              ) =>
                onStatusChange?.(
                  shop._id,
                  event
                    .target
                    .value,
                )
              }
              className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm font-semibold capitalize text-[#001B08] outline-none focus:border-[#E8BB44] disabled:opacity-50"
            >
              {SHOP_STATUSES.map(
                (
                  status,
                ) => (
                  <option
                    key={
                      status
                    }
                    value={
                      status
                    }
                  >
                    {
                      status
                    }
                  </option>
                ),
              )}
            </select>

            <button
              type="button"
              onClick={() =>
                onDelete?.(
                  shop,
                )
              }
              className="flex items-center gap-2 rounded-lg bg-[#FEE2E2] px-3 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA]"
            >
              <FaTrash />

              Delete
            </button>
          </div>
        );
      },
    });
  }

  return columns;
};