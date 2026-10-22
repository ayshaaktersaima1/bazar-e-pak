import DashboardHeader from "@/components/shared/dashboard-header";
import ShopFinance from "@/features/dashboard/finance/shop-finance";
import { requireRole } from "@/lib/dashboard-access";

export const metadata = { title: "Earnings & Payouts | Bazar-e-Pak" };

const Page = async () => {
  await requireRole("seller");

  return (
    <div>
      <DashboardHeader
        eyebrow="Seller"
        title="Earnings & Payouts"
        description="Your 60% share, gateway fees, refunds and settlement history."
      />
      <ShopFinance mode="seller" base="/dashboard/seller" />
    </div>
  );
};

export default Page;
