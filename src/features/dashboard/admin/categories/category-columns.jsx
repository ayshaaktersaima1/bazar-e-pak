import { FaTag } from "react-icons/fa";

const CATEGORY_STATUS_STYLES = {
    active: "bg-[#DCFCE7] text-[#166534]",
    inactive: "bg-[#F3F4F6] text-[#4B5563]",
};

export const getCategoryColumns = ({
    onEdit,
    onDelete,
    deletingId,
}) => [
    {
        key: "index",
        label: "#",
        headerClassName: "w-16",
        cellClassName: "font-medium text-[#4B5563]",
        render: (_, index) => index + 1,
    },

    {
        key: "category",
        label: "Category",
        render: (category) => (
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08]">
                    <FaTag size={15} />
                </div>

                <div>
                    <p className="font-semibold text-[#001B08]">
                        {category.name}
                    </p>

                    <p className="text-sm text-[#6B7280]">
                        {category.slug}
                    </p>
                </div>
            </div>
        ),
    },

    {
        key: "status",
        label: "Status",
        render: (category) => (
            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    CATEGORY_STATUS_STYLES[category.status]
                }`}
            >
                {category.status}
            </span>
        ),
    },

    {
        key: "actions",
        label: "Action",
        render: (category) => (
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(category)}
                    className="rounded-lg bg-[#F7F5EF] px-4 py-2 text-sm font-semibold text-[#001B08] hover:bg-[#EDEAE0]"
                >
                    Edit
                </button>

                <button
                    disabled={deletingId === category._id}
                    onClick={() => onDelete(category._id)}
                    className="rounded-lg bg-[#FEE2E2] px-4 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#FECACA] disabled:opacity-50"
                >
                    {deletingId === category._id ? "..." : "Delete"}
                </button>
            </div>
        ),
    },
];