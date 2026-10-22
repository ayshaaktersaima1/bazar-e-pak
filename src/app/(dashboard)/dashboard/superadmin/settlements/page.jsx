import DashboardHeader from "@/components/shared/dashboard-header";
import SettlementsPanel from "@/features/dashboard/finance/settlements-panel";
import { requireRole, getFinanceCaps } from "@/lib/dashboard-access";

export const metadata = { title: "Settlements | Bazar-e-Pak" };

const Page = async () => {
  await requireRole("super_admin");
  const caps = getFinanceCaps(true);

  return (
    <div>
      <DashboardHeader
        eyebrow="Super Admin"
        title="Settlements"
        description="Track seller payouts. Payouts are made outside PayFast and recorded here."
      />
      <SettlementsPanel caps={caps} />
    </div>
  );
};

export default Page;
