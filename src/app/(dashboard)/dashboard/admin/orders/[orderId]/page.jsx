import DashboardHeader from "@/components/shared/dashboard-header";
import StaffOrderDetail from "@/features/dashboard/finance/staff-order-detail";
import { requireAdminPermission, getFinanceCaps } from "@/lib/dashboard-access";

export const metadata = { title: "Order Details | Bazar-e-Pak" };

const Page = async ({ params }) => {
  const { orderId } = await params;
  const { permissions } = await requireAdminPermission("orders.view", { adminOnly: true });
  const caps = getFinanceCaps(false, permissions);

  return (
    <div>
      <DashboardHeader
        eyebrow="Admin"
        title="Order Details"
        description="Items, payment, proofs and refunds for this order."
      />
      <StaffOrderDetail orderId={orderId} base="/dashboard/admin" caps={caps} />
    </div>
  );
};

export default Page;
