import DashboardHeader from "@/components/shared/dashboard-header";
import ShopFinance from "@/features/dashboard/finance/shop-finance";
import { requireAdminPermission } from "@/lib/dashboard-access";

export const metadata = { title: "Shop Finance Profile | Bazar-e-Pak" };

const Page = async ({ params }) => {
  const { shopId } = await params;
  await requireAdminPermission("payments.view", { adminOnly: true });

  return (
    <div>
      <DashboardHeader
        eyebrow="Admin"
        title="Shop Finance Profile"
        description="Complete transaction and settlement history of a shop."
      />
      <ShopFinance mode="staff" shopId={shopId} base="/dashboard/admin" />
    </div>
  );
};

export default Page;
