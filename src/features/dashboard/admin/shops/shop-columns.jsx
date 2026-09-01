import { FaStore } from "react-icons/fa";

const STATUS_STYLES = {
  pending: "bg-[#FEF3C7] text-[#92400E]",
  active: "bg-[#DCFCE7] text-[#166534]",
  inactive: "bg-[#F3F4F6] text-[#4B5563]",
  suspended: "bg-[#FEE2E2] text-[#B91C1C]",
  rejected: "bg-[#F3F4F6] text-[#6B7280]",
};

export const getShopColumns = ({ onStatusChange, loadingId }) => [
  {
    key: "index",
    label: "#",
    render: (_, index) => index + 1,
  },

  {
    key: "shop",
    label: "Shop",
    render: (shop) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08]">
          <FaStore size={15} />
        </div>

        <div>
          <p className="font-semibold text-[#001B08]">{shop.name}</p>

          <p className="text-sm text-[#6B7280]">{shop.slug}</p>
        </div>
      </div>
    ),
  },

  {
    key: "contact",
    label: "Contact",
    cellClassName: "text-[#4B5563]",
    render: (shop) => shop.email || shop.phone || "N/A",
  },

  {
    key: "rating",
    label: "Rating",
    cellClassName: "text-[#4B5563]",
    render: (shop) =>
      shop.rating > 0 ? `${shop.rating} (${shop.totalReviews})` : "No reviews",
  },

  {
    key: "status",
    label: "Status",
    render: (shop) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
          STATUS_STYLES[shop.status]
        }`}
      >
        {shop.status}
      </span>
    ),
  },

  {
    key: "actions",
    label: "Action",
    render: (shop) => {
      const isLoading = loadingId === shop._id;

      return (
        <div className="flex gap-2">
          {shop.status === "pending" && (
            <>
              <button
                disabled={isLoading}
                onClick={() => onStatusChange(shop._id, "active")}
                className="rounded-lg bg-[#DCFCE7] px-4 py-2 text-sm font-semibold text-[#166534] hover:bg-[#BBF7D0] disabled:opacity-50"
              >
                {isLoading ? "..." : "Approve"}
              </button>

              <button
                disabled={isLoading}
                onClick={() => onStatusChange(shop._id, "rejected")}
                className="rounded-lg bg-[#FEE2E2] px-4 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA] disabled:opacity-50"
              >
                {isLoading ? "..." : "Reject"}
              </button>
            </>
          )}

          {shop.status === "active" && (
            <button
              disabled={isLoading}
              onClick={() => onStatusChange(shop._id, "suspended")}
              className="rounded-lg bg-[#FEE2E2] px-4 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA] disabled:opacity-50"
            >
              {isLoading ? "..." : "Suspend"}
            </button>
          )}

          {shop.status === "suspended" && (
            <button
              disabled={isLoading}
              onClick={() => onStatusChange(shop._id, "active")}
              className="rounded-lg bg-[#DCFCE7] px-4 py-2 text-sm font-semibold text-[#166534] hover:bg-[#BBF7D0] disabled:opacity-50"
            >
              {isLoading ? "..." : "Unsuspend"}
            </button>
          )}

          {(shop.status === "inactive" || shop.status === "rejected") && (
            <span className="text-sm text-[#9CA3AF]">—</span>
          )}
        </div>
      );
    },
  },
];
