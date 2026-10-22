import DashboardHeader from "@/components/shared/dashboard-header";
import OrdersTable from "@/features/dashboard/finance/orders-table";
import { requireAdminPermission } from "@/lib/dashboard-access";

export const metadata = { title: "Orders | Bazar-e-Pak" };

const Page = async () => {
  await requireAdminPermission("orders.view", { adminOnly: true });

  return (
    <div>
      <DashboardHeader
        eyebrow="Admin"
        title="Orders"
        description="All marketplace orders, payment status and COD collection."
      />
      <OrdersTable mode="staff" base="/dashboard/admin" />
    </div>
  );
};

export default Page;
