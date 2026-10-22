import DashboardHeader from "@/components/shared/dashboard-header";
import RefundsTable from "@/features/dashboard/finance/refunds-table";
import { requireAdminPermission, getFinanceCaps } from "@/lib/dashboard-access";

export const metadata = { title: "Refunds | Bazar-e-Pak" };

const Page = async () => {
  const { permissions } = await requireAdminPermission("payments.view", { adminOnly: true });
  const caps = getFinanceCaps(false, permissions);

  return (
    <div>
      <DashboardHeader
        eyebrow="Admin"
        title="Refunds"
        description="Review customer refund requests and reconcile gateway refunds."
      />
      <RefundsTable base="/dashboard/admin" caps={caps} />
    </div>
  );
};

export default Page;
