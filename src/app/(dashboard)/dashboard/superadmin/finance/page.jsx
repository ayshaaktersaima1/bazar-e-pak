import DashboardHeader from "@/components/shared/dashboard-header";
import ShopsFinanceTable from "@/features/dashboard/finance/shops-finance-table";
import { requireRole } from "@/lib/dashboard-access";

export const metadata = { title: "Shop Finance | Bazar-e-Pak" };

const Page = async () => {
  await requireRole("super_admin");

  return (
    <div>
      <DashboardHeader
        eyebrow="Super Admin"
        title="Shop Finance"
        description="Earnings, fees and settlement balances for every shop."
      />
      <ShopsFinanceTable base="/dashboard/superadmin" />
    </div>
  );
};

export default Page;
