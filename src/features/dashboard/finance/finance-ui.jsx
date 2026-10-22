import { formatMinor } from "@/utils/payments";

export const Panel = ({ title, action, children, className = "" }) => (
  <section className={`rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm ${className}`}>
    {(title || action) && (
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {title && <h2 className="text-lg font-bold text-[#001B08]">{title}</h2>}
        {action}
      </div>
    )}
    {children}
  </section>
);

export const Stat = ({ label, minor, value, hint }) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
    <p className="text-sm text-[#667085]">{label}</p>
    <p className="mt-2 text-2xl font-bold text-[#001B08]">{value ?? formatMinor(minor ?? 0)}</p>
    {hint && <p className="mt-1 text-xs text-[#98A2B3]">{hint}</p>}
  </div>
);

export const KeyValue = ({ items }) => (
  <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
    {items.map(([label, value]) => (
      <div key={label} className="flex justify-between gap-3 border-b border-zinc-100 pb-2">
        <dt className="text-zinc-500">{label}</dt>
        <dd className="text-right font-medium text-[#001B08]">{value ?? "—"}</dd>
      </div>
    ))}
  </dl>
);

export const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  const online = summary.online ?? {};
  const cod = summary.cod ?? {};

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Paid orders" value={summary.orders ?? 0} />
        <Stat label="Gross sales" minor={summary.grossMinor} />
        <Stat label="Refunded" minor={summary.refundedGrossMinor} />
        <Stat label="Gateway fees" minor={summary.gatewayFeeMinor} />
        <Stat label="Seller share (60%)" minor={summary.sellerShareMinor} />
        <Stat label="PakBazaar share (40%)" minor={summary.platformShareMinor} />
        <Stat label="Online payable to seller" minor={online.sellerPayableMinor} hint="Final fee, not yet settled" />
        <Stat label="Awaiting fee finalisation" minor={online.sellerPendingFeeFinalisationMinor} hint="Provisional estimate" />
        <Stat label="Settled to seller" minor={online.sellerSettledMinor} />
        <Stat label="Refund clawback owed" minor={online.sellerClawbackMinor} hint="Refunds after payout" />
        <Stat label="COD seller share" minor={cod.sellerShareMinor} hint="Cash handled outside PayFast" />
        <Stat label="COD PakBazaar receivable" minor={cod.platformReceivableMinor} hint="Reconcile manually" />
      </div>
      {summary.provisionalAllocations > 0 && (
        <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          {summary.provisionalAllocations} allocation(s) are provisional until the actual PayFast gateway fee is recorded by an administrator.
        </p>
      )}
    </div>
  );
};
