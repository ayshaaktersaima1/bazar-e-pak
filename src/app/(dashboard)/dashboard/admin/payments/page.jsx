import DashboardHeader from "@/components/shared/dashboard-header";
import PaymentsTable from "@/features/dashboard/finance/payments-table";
import { requireAdminPermission } from "@/lib/dashboard-access";

export const metadata = { title: "Payments | Bazar-e-Pak" };

const Page = async () => {
  await requireAdminPermission("payments.view", { adminOnly: true });

  return (
    <div>
      <DashboardHeader
        eyebrow="Admin"
        title="Payments"
        description="PayFast and COD payment records."
      />
      <PaymentsTable base="/dashboard/admin" />
    </div>
  );
};

export default Page;
