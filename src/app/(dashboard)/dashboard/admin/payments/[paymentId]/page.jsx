import DashboardHeader from "@/components/shared/dashboard-header";
import PaymentDetail from "@/features/dashboard/finance/payment-detail";
import { requireAdminPermission, getFinanceCaps } from "@/lib/dashboard-access";

export const metadata = { title: "Payment Details | Bazar-e-Pak" };

const Page = async ({ params }) => {
  const { paymentId } = await params;
  const { permissions } = await requireAdminPermission("payments.view", { adminOnly: true });
  const caps = getFinanceCaps(false, permissions);

  return (
    <div>
      <DashboardHeader
        eyebrow="Admin"
        title="Payment Details"
        description="Gateway verification and 60/40 accounting for this payment."
      />
      <PaymentDetail paymentId={paymentId} base="/dashboard/admin" caps={caps} />
    </div>
  );
};

export default Page;
