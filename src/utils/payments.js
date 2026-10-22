// Shared payment/order helpers. All backend amounts are integer paisa (`*Minor`).
const PKR = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatMinor = (minor) => {
  const value = Number(minor);

  if (!Number.isFinite(value)) return "—";

  return PKR.format(value / 100).replace(/\s+/g, " ").replace(/^(PKR|Rs)\.?\s?/, "Rs. ");
};

// Backend refund/fee inputs accept PKR decimals as string (max 2 decimals).
export const minorToInput = (minor) => (Number(minor || 0) / 100).toFixed(2);

export const isValidPkrInput = (value) => /^\d{1,10}(\.\d{1,2})?$/.test(String(value ?? "").trim());

const PKT = new Intl.DateTimeFormat("en-PK", {
  timeZone: "Asia/Karachi",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatPKT = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "—" : `${PKT.format(date)} PKT`;
};

export const humanize = (value) =>
  String(value ?? "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "—";

const GREEN = "bg-emerald-50 text-emerald-700 border-emerald-200";
const AMBER = "bg-amber-50 text-amber-700 border-amber-200";
const RED = "bg-red-50 text-red-700 border-red-200";
const BLUE = "bg-sky-50 text-sky-700 border-sky-200";
const GRAY = "bg-zinc-100 text-zinc-600 border-zinc-200";

export const STATUS_STYLES = {
  // order
  pending: AMBER,
  confirmed: BLUE,
  processing: BLUE,
  shipped: BLUE,
  delivered: GREEN,
  cancelled: GRAY,
  refunded: GRAY,
  draft: GRAY,
  // payment
  paid: GREEN,
  unpaid: AMBER,
  cod_pending: AMBER,
  failed: RED,
  timed_out: RED,
  invalid: RED,
  partially_refunded: BLUE,
  authorized: BLUE,
  // refund / settlement / proof
  requested: AMBER,
  approved: BLUE,
  rejected: RED,
  processed: GREEN,
  submitted: AMBER,
  accepted: GREEN,
  // accounting
  provisional: AMBER,
  final: GREEN,
  unsettled: GRAY,
  included: BLUE,
  settled: GREEN,
};

export const PAYMENT_METHOD_LABELS = {
  cod: "Cash on Delivery",
  payfast: "PayFast (Online)",
};
