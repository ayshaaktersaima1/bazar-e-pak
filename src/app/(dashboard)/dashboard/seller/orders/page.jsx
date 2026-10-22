import DashboardHeader from "@/components/shared/dashboard-header";
import OrdersTable from "@/features/dashboard/finance/orders-table";
import { requireRole } from "@/lib/dashboard-access";

export const metadata = { title: "Orders | Bazar-e-Pak" };

const Page = async () => {
  await requireRole("seller");

  return (
    <div>
      <DashboardHeader
        eyebrow="Seller"
        title="Orders"
        description="Orders that include products from your shop."
      />
      <OrdersTable mode="seller" base="/dashboard/seller" />
    </div>
  );
};

export default Page;
