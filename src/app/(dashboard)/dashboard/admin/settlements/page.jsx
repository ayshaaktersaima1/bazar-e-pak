import DashboardHeader from "@/components/shared/dashboard-header";
import SettlementsPanel from "@/features/dashboard/finance/settlements-panel";
import { requireAdminPermission, getFinanceCaps } from "@/lib/dashboard-access";

export const metadata = { title: "Settlements | Bazar-e-Pak" };

const Page = async () => {
  const { permissions } = await requireAdminPermission("payments.view", { adminOnly: true });
  const caps = getFinanceCaps(false, permissions);

  return (
    <div>
      <DashboardHeader
        eyebrow="Admin"
        title="Settlements"
        description="Track seller payouts. Payouts are made outside PayFast and recorded here."
      />
      <SettlementsPanel caps={caps} />
    </div>
  );
};

export default Page;
