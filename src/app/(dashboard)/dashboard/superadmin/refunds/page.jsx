import DashboardHeader from "@/components/shared/dashboard-header";
import RefundsTable from "@/features/dashboard/finance/refunds-table";
import { requireRole, getFinanceCaps } from "@/lib/dashboard-access";

export const metadata = { title: "Refunds | Bazar-e-Pak" };

const Page = async () => {
  await requireRole("super_admin");
  const caps = getFinanceCaps(true);

  return (
    <div>
      <DashboardHeader
        eyebrow="Super Admin"
        title="Refunds"
        description="Review customer refund requests and reconcile gateway refunds."
      />
      <RefundsTable base="/dashboard/superadmin" caps={caps} />
    </div>
  );
};

export default Page;
