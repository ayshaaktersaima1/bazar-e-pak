"use client";

import DataTable from "../../common/table/data-table";
import DashboardCard from "../../common/ui/dahboard-card";
import StatsCard from "../../common/ui/stats-card";



const AnalyticsOverview = ({
    analytics = {},
    rankings = [],
}) => {
    const totals =
        analytics.totals ?? {};

    const sourceComparison =
        analytics.sourceComparison ?? {};

    const events =
        analytics.events ?? [];

    const eventColumns = [
        {
            key: "event",
            label: "Event",
            render: (event) => (
                <span className="font-medium text-[#001B08]">
                    {event._id}
                </span>
            ),
        },
        {
            key: "count",
            label: "Count",
            render: (event) =>
                event.count ?? 0,
        },
    ];

    const rankingColumns = [
        {
            key: "product",
            label: "Product ID",
            render: (product) => (
                <span className="font-mono text-xs">
                    {product._id}
                </span>
            ),
        },
        {
            key: "views",
            label: "Views",
            render: (product) =>
                product.views ?? 0,
        },
        {
            key: "clicks",
            label: "Clicks",
            render: (product) =>
                product.clicks ?? 0,
        },
        {
            key: "carts",
            label: "Add to Cart",
            render: (product) =>
                product.carts ?? 0,
        },
    ];

    return (
        <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    label="Total Users"
                    value={totals.users}
                />

                <StatsCard
                    label="Total Shops"
                    value={totals.shops}
                />

                <StatsCard
                    label="Total Products"
                    value={totals.products}
                />

                <StatsCard
                    label="Published Reviews"
                    value={totals.reviews}
                />
            </div>

            <div>
                <h2 className="mb-4 text-xl font-bold text-[#001B08]">
                    Source Comparison
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatsCard
                        label="Seller Products"
                        value={
                            sourceComparison.externalSellerProducts
                        }
                    />

                    <StatsCard
                        label="Native Products"
                        value={
                            sourceComparison.nativeProducts
                        }
                    />

                    <StatsCard
                        label="Seller Shops"
                        value={
                            sourceComparison.externalSellerShops
                        }
                    />

                    <StatsCard
                        label="Native Shops"
                        value={
                            sourceComparison.nativeShops
                        }
                    />
                </div>
            </div>

            <DashboardCard title="Event Activity">
                <DataTable
                    columns={eventColumns}
                    data={events}
                    page={1}
                    limit={20}
                    meta={{
                        total: events.length,
                        totalPages: 1,
                    }}
                    emptyMessage="No analytics events found."
                />
            </DashboardCard>

            <DashboardCard title="Top Product Rankings">
                <DataTable
                    columns={rankingColumns}
                    data={rankings}
                    page={1}
                    limit={20}
                    meta={{
                        total: rankings.length,
                        totalPages: 1,
                    }}
                    emptyMessage="No product ranking data found."
                />
            </DashboardCard>
        </div>
    );
};

export default AnalyticsOverview;