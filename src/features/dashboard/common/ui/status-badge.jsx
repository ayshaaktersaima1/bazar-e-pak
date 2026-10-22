import { STATUS_STYLES, humanize } from "@/utils/payments";

const StatusBadge = ({ status, label, className = "" }) => {
  const key = String(status ?? "").toLowerCase();
  const style = STATUS_STYLES[key] ?? "bg-zinc-100 text-zinc-600 border-zinc-200";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${style} ${className}`}
    >
      {label ?? humanize(status)}
    </span>
  );
};

export default StatusBadge;
