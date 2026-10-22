import Link from "next/link";

import { serverApi } from "@/lib/server";

const count = async (endpoint) => {
  try {
    const result = await serverApi.get(endpoint, {}, { includeMeta: true });

    return result?.pagination?.total ?? (Array.isArray(result?.data) ? result.data.length : 0);
  } catch {
    return null;
  }
};

// Work queue counters for admin / super admin overview pages (server component).
const FinanceOverview = async ({ base, caps }) => {
  const [cod, pending, invalid, requested, reconcile] = await Promise.all([
    caps.viewOrders ? count("/api/orders?paymentMethod=cod&paymentStatus=cod_pending&limit=1") : null,
    caps.view ? count("/api/finance/admin/payments?status=pending&limit=1") : null,
    caps.view ? count("/api/finance/admin/payments?status=invalid&limit=1") : null,
    caps.view ? count("/api/finance/admin/refunds?status=requested&limit=1") : null,
    caps.view ? count("/api/finance/admin/refunds?status=processing&limit=1") : null,
  ]);

  const cards = [
    { label: "COD awaiting collection", value: cod, href: `${base}/orders` },
    { label: "Online payments pending", value: pending, href: `${base}/payments` },
    { label: "Payments needing review", value: invalid, href: `${base}/payments` },
    { label: "Refund requests", value: requested, href: `${base}/refunds` },
    { label: "Refunds to reconcile", value: reconcile, href: `${base}/refunds` },
  ].filter((card) => card.value !== null);

  if (!cards.length) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-bold text-[#001B08]">Orders & Payments</h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#001B08]">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FinanceOverview;
