import DashboardHeader from "@/components/shared/dashboard-header";
import StaffOrderDetail from "@/features/dashboard/finance/staff-order-detail";
import { requireRole, getFinanceCaps } from "@/lib/dashboard-access";

export const metadata = { title: "Order Details | Bazar-e-Pak" };

const Page = async ({ params }) => {
  const { orderId } = await params;
  await requireRole("super_admin");
  const caps = getFinanceCaps(true);

  return (
    <div>
      <DashboardHeader
        eyebrow="Super Admin"
        title="Order Details"
        description="Items, payment, proofs and refunds for this order."
      />
      <StaffOrderDetail orderId={orderId} base="/dashboard/superadmin" caps={caps} />
    </div>
  );
};

export default Page;
