import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";
import StatsCard from "@/features/dashboard/common/ui/stats-card";
import DashboardCard from "@/features/dashboard/common/ui/dahboard-card";
import TopProductsTable from "@/features/dashboard/seller/product/top-products-table";
import { formatMinor } from "@/utils/payments";


const SellerDashboard = async () => {
  const requestHeaders =
    await headers();

  const session =
    await auth.api.getSession({
      headers: requestHeaders,
    });

  if (!session?.user) {
    redirect("/login");
  }

  if (
    session.user.role !==
    "seller"
  ) {
    redirect("/dashboard");
  }

  const [
    dashboardResponse,
    rankingsResponse,
  ] = await Promise.all([
    serverApi.get(
      "/api/analytics/dashboard",
      {},
      {
        auth: true,
        includeMeta: true,
      },
    ),

    serverApi.get(
      "/api/analytics/rankings/products",
      {},
      {
        auth: true,
        includeMeta: true,
      },
    ),
  ]);

  const events =
    dashboardResponse?.data
      ?.events ?? [];

  const rankings =
    rankingsResponse?.data ?? [];

  let finance = null;

  try {
    finance = await serverApi.get("/api/finance/seller/summary");
  } catch {
    finance = null;
  }

  const totalEvents =
    events.reduce(
      (sum, event) =>
        sum +
        (event.count ?? 0),
      0,
    );

  const totalViews =
    rankings.reduce(
      (sum, product) =>
        sum +
        (product.views ?? 0),
      0,
    );

  const totalClicks =
    rankings.reduce(
      (sum, product) =>
        sum +
        (product.clicks ?? 0),
      0,
    );

  const totalCarts =
    rankings.reduce(
      (sum, product) =>
        sum +
        (product.carts ?? 0),
      0,
    );

  const quickLinks = [
    {
      label: "My Shop",
      href: "/dashboard/seller/shop",
    },
    {
      label: "Products",
      href: "/dashboard/seller/products",
    },
    {
      label: "Orders",
      href: "/dashboard/seller/orders",
    },
    {
      label: "Earnings & Payouts",
      href: "/dashboard/seller/finance",
    },
    {
      label: "Reviews",
      href: "/dashboard/seller/reviews",
    },
    {
      label: "Analytics",
      href: "/dashboard/seller/analytics",
    },
  ];

  return (
    <div className="bg-[#F7F5EF] p-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
          Seller Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
          Seller Dashboard
        </h1>

        <p className="mt-2 text-sm text-[#4B5563]">
          Manage your shop and see your recent activity.
        </p>
      </div>

      {finance && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-[#001B08]">
            Earnings
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              label="Paid Orders"
              value={finance.orders ?? 0}
            />

            <StatsCard
              label="Your Share (60%)"
              value={formatMinor(finance.sellerShareMinor)}
            />

            <StatsCard
              label="Online Payable"
              value={formatMinor(finance.online?.sellerPayableMinor)}
            />

            <StatsCard
              label="Settled to You"
              value={formatMinor(finance.online?.sellerSettledMinor)}
            />
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Total Events"
          value={totalEvents}
        />

        <StatsCard
          label="Product Views"
          value={totalViews}
        />

        <StatsCard
          label="Product Clicks"
          value={totalClicks}
        />

        <StatsCard
          label="Added to Cart"
          value={totalCarts}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Activity">
          <div className="space-y-3">
            {events.length === 0 ? (
              <p className="text-sm text-[#667085]">
                No activity data yet.
              </p>
            ) : (
              events.map(
                (event) => (
                  <div
                    key={
                      event._id
                    }
                    className="flex items-center justify-between border-b border-[#F0F0F0] pb-3"
                  >
                    <span className="text-sm font-medium text-[#344054]">
                      {
                        event._id
                      }
                    </span>

                    <span className="font-semibold text-[#001B08]">
                      {
                        event.count
                      }
                    </span>
                  </div>
                ),
              )
            )}
          </div>
        </DashboardCard>

        <DashboardCard title="Quick Links">
          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map(
              (item) => (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className="rounded-xl border border-[#E5E7EB] px-4 py-3 text-sm font-semibold text-[#001B08] transition hover:bg-[#F7F5EF]"
                >
                  {
                    item.label
                  }
                </Link>
              ),
            )}
          </div>
        </DashboardCard>
      </div>

      <div className="mt-8">
        <DashboardCard
          title="Top Products"
          action={
            <Link
              href="/dashboard/seller/analytics"
              className="text-sm font-semibold text-[#006B35]"
            >
              View Analytics
            </Link>
          }
        >
          <TopProductsTable
            rankings={rankings}
          />
        </DashboardCard>
      </div>
    </div>
  );
};

export default SellerDashboard;