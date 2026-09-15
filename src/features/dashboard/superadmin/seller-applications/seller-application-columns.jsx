import {
    FaStore,
    FaUser,
} from "react-icons/fa";

const statusStyles = {
    pending: "bg-[#FEF3C7] text-[#92400E]",
    approved: "bg-[#DCFCE7] text-[#166534]",
    rejected: "bg-[#FEE2E2] text-[#B91C1C]",
    suspended: "bg-[#F3E8FF] text-[#7E22CE]",
};

const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const sellerApplicationFilters = [
    {
        key: "status",
        label: "All Statuses",
        options: [
            {
                label: "Pending",
                value: "pending",
            },
            {
                label: "Approved",
                value: "approved",
            },
            {
                label: "Rejected",
                value: "rejected",
            },
            {
                label: "Suspended",
                value: "suspended",
            },
        ],
    },
];

export const getSellerApplicationColumns = ({
    onReview,
    onSuspend,
    loadingId,
}) => [
        {
            key: "applicant",
            label: "Applicant",
            render: (application) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08]">
                        <FaUser size={14} />
                    </div>

                    <div className="min-w-0">
                        <p className="font-semibold text-[#001B08]">
                            {application.name}
                        </p>

                        <p className="max-w-[220px] truncate text-xs text-[#6B7280]">
                            {application.email || "No email"}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "business",
            label: "Business",
            render: (application) => (
                <div className="flex items-center gap-2">
                    <FaStore className="shrink-0 text-[#D9A928]" />

                    <div>
                        <p className="font-medium text-[#001B08]">
                            {application.businessName}
                        </p>

                        <p className="text-xs text-[#6B7280]">
                            {application.businessType || "Not specified"}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "phoneNumber",
            label: "Phone",
            render: (application) =>
                application.phoneNumber || "N/A",
        },

        {
            key: "status",
            label: "Status",
            render: (application) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[application.status] ??
                        "bg-zinc-100 text-zinc-600"
                        }`}
                >
                    {application.status}
                </span>
            ),
        },

        {
            key: "submittedAt",
            label: "Submitted",
            render: (application) =>
                formatDate(application.submittedAt),
        },

        {
            key: "reviewedAt",
            label: "Reviewed",
            render: (application) =>
                formatDate(application.reviewedAt),
        },

        {
            key: "actions",
            label: "Action",
            render: (application) => {
                const isLoading =
                    loadingId === application._id;

                if (application.status === "pending") {
                    return (
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => onReview(application)}
                            className="rounded-lg bg-[#002B12] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#003D1A] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? "Please wait..." : "Review"}
                        </button>
                    );
                }

                if (application.status === "approved") {
                    return (
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => onSuspend(application)}
                            className="rounded-lg bg-[#FEE2E2] px-4 py-2 text-sm font-semibold text-[#B91C1C] transition hover:bg-[#FECACA] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? "Please wait..." : "Suspend"}
                        </button>
                    );
                }

                return (
                    <span className="text-xs font-medium text-zinc-400">
                        No action
                    </span>
                );
            },
        },
    ];