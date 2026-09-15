import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";

import StatsCard from "@/features/dashboard/common/ui/stats-card";
import DashboardCard from "@/features/dashboard/common/ui/dashboard-card";
import DataTable from "@/features/dashboard/common/table/data-table";

const SellerAnalyticsPage =
  async () => {
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
      rankingsResponse?.data ??
      [];

    const totalViews =
      rankings.reduce(
        (sum, product) =>
          sum +
          (product.views ??
            0),
        0,
      );

    const totalClicks =
      rankings.reduce(
        (sum, product) =>
          sum +
          (product.clicks ??
            0),
        0,
      );

    const totalCarts =
      rankings.reduce(
        (sum, product) =>
          sum +
          (product.carts ??
            0),
        0,
      );

    const totalEvents =
      events.reduce(
        (sum, event) =>
          sum +
          (event.count ??
            0),
        0,
      );

    const rankingColumns = [
      {
        key: "product",
        label: "Product ID",
        render: (
          product,
        ) => (
          <span className="font-mono text-xs">
            {
              product._id
            }
          </span>
        ),
      },
      {
        key: "views",
        label: "Views",
        render: (
          product,
        ) =>
          product.views ??
          0,
      },
      {
        key: "clicks",
        label: "Clicks",
        render: (
          product,
        ) =>
          product.clicks ??
          0,
      },
      {
        key: "carts",
        label: "Add to Cart",
        render: (
          product,
        ) =>
          product.carts ??
          0,
      },
    ];

    return (
      <div className="bg-[#F7F5EF] p-6">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
            Seller Insights
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-[#4B5563]">
            Track how customers interact with your products.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            label="Total Events"
            value={
              totalEvents
            }
          />

          <StatsCard
            label="Product Views"
            value={
              totalViews
            }
          />

          <StatsCard
            label="Product Clicks"
            value={
              totalClicks
            }
          />

          <StatsCard
            label="Added to Cart"
            value={
              totalCarts
            }
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <DashboardCard title="Event Activity">
            <div className="space-y-3">
              {events.length ===
                0 ? (
                <p className="text-sm text-[#667085]">
                  No activity data yet.
                </p>
              ) : (
                events.map(
                  (
                    event,
                  ) => (
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

          <DashboardCard title="Performance Summary">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#667085]">
                  Views
                </span>

                <span className="font-semibold text-[#001B08]">
                  {
                    totalViews
                  }
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#667085]">
                  Clicks
                </span>

                <span className="font-semibold text-[#001B08]">
                  {
                    totalClicks
                  }
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#667085]">
                  Add to Cart
                </span>

                <span className="font-semibold text-[#001B08]">
                  {
                    totalCarts
                  }
                </span>
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="mt-8">
          <DashboardCard title="Product Rankings">
            <DataTable
              columns={
                rankingColumns
              }
              data={
                rankings
              }
              page={1}
              limit={20}
              meta={{
                total:
                  rankings.length,
                totalPages:
                  1,
              }}
              emptyMessage="No product ranking data yet."
            />
          </DashboardCard>
        </div>
      </div>
    );
  };

export default SellerAnalyticsPage;