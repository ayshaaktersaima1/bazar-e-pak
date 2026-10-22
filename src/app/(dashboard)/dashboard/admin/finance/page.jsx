import DashboardHeader from "@/components/shared/dashboard-header";
import ShopsFinanceTable from "@/features/dashboard/finance/shops-finance-table";
import { requireAdminPermission } from "@/lib/dashboard-access";

export const metadata = { title: "Shop Finance | Bazar-e-Pak" };

const Page = async () => {
  await requireAdminPermission("payments.view", { adminOnly: true });

  return (
    <div>
      <DashboardHeader
        eyebrow="Admin"
        title="Shop Finance"
        description="Earnings, fees and settlement balances for every shop."
      />
      <ShopsFinanceTable base="/dashboard/admin" />
    </div>
  );
};

export default Page;
