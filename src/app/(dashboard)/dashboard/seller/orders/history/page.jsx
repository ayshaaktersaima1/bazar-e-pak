import DashboardHeader from "@/components/shared/dashboard-header";
import OrdersTable from "@/features/dashboard/finance/orders-table";
import { requireRole } from "@/lib/dashboard-access";

export const metadata = { title: "Order History | Bazar-e-Pak" };

const Page = async () => {
  await requireRole("seller");

  return (
    <div>
      <DashboardHeader
        eyebrow="Seller"
        title="Order History"
        description="Completed orders from your shop (change the filter to see others)."
      />
      <OrdersTable mode="seller" base="/dashboard/seller" defaultFilters={{ status: "delivered" }} />
    </div>
  );
};

export default Page;
