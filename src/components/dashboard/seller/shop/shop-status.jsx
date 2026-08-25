"use client";

import {
  CheckCircle2,
  Clock3,
  Ban,
  PauseCircle,
  XCircle,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending Review",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  active: {
    label: "Active",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  inactive: {
    label: "Inactive",
    icon: PauseCircle,
    className: "bg-zinc-50 text-zinc-600 border-zinc-200",
  },
  suspended: {
    label: "Suspended",
    icon: Ban,
    className: "bg-red-50 text-red-700 border-red-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function ShopStatus({ status }) {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}