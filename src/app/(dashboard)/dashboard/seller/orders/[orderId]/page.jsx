import DashboardHeader from "@/components/shared/dashboard-header";
import SellerOrderDetail from "@/features/dashboard/finance/seller-order-detail";
import { requireRole } from "@/lib/dashboard-access";

export const metadata = { title: "Order Details | Bazar-e-Pak" };

const Page = async ({ params }) => {
  const { orderId } = await params;
  await requireRole("seller");

  return (
    <div>
      <DashboardHeader
        eyebrow="Seller"
        title="Order Details"
        description="Your items, payment status and delivery address."
      />
      <SellerOrderDetail orderId={orderId} />
    </div>
  );
};

export default Page;
