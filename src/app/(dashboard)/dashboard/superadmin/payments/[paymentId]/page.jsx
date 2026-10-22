import DashboardHeader from "@/components/shared/dashboard-header";
import PaymentDetail from "@/features/dashboard/finance/payment-detail";
import { requireRole, getFinanceCaps } from "@/lib/dashboard-access";

export const metadata = { title: "Payment Details | Bazar-e-Pak" };

const Page = async ({ params }) => {
  const { paymentId } = await params;
  await requireRole("super_admin");
  const caps = getFinanceCaps(true);

  return (
    <div>
      <DashboardHeader
        eyebrow="Super Admin"
        title="Payment Details"
        description="Gateway verification and 60/40 accounting for this payment."
      />
      <PaymentDetail paymentId={paymentId} base="/dashboard/superadmin" caps={caps} />
    </div>
  );
};

export default Page;
