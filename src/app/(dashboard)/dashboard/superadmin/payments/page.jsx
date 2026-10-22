import DashboardHeader from "@/components/shared/dashboard-header";
import PaymentsTable from "@/features/dashboard/finance/payments-table";
import { requireRole } from "@/lib/dashboard-access";

export const metadata = { title: "Payments | Bazar-e-Pak" };

const Page = async () => {
  await requireRole("super_admin");

  return (
    <div>
      <DashboardHeader
        eyebrow="Super Admin"
        title="Payments"
        description="PayFast and COD payment records."
      />
      <PaymentsTable base="/dashboard/superadmin" />
    </div>
  );
};

export default Page;
