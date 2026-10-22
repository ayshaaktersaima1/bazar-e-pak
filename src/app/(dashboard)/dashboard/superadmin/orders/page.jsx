import DashboardHeader from "@/components/shared/dashboard-header";
import OrdersTable from "@/features/dashboard/finance/orders-table";
import { requireRole } from "@/lib/dashboard-access";

export const metadata = { title: "Orders | Bazar-e-Pak" };

const Page = async () => {
  await requireRole("super_admin");

  return (
    <div>
      <DashboardHeader
        eyebrow="Super Admin"
        title="Orders"
        description="All marketplace orders, payment status and COD collection."
      />
      <OrdersTable mode="staff" base="/dashboard/superadmin" />
    </div>
  );
};

export default Page;
