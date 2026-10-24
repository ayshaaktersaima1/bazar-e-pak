"use client";

import DataTable from "../../common/table/data-table";
import DashboardCard from "../../common/ui/dahboard-card";
import StatsCard from "../../common/ui/stats-card";

const AnalyticsOverview = ({
    analytics = {},
    rankings = [],
    shopRankings = [],
}) => {
    const totals = analytics.totals ?? {};
    const sourceComparison = analytics.sourceComparison ?? {};
    const events = analytics.events ?? [];

    const getEventCount = (eventType) => {
        const event = events.find(
            (item) => item._id === eventType
        );

        return event?.count ?? 0;
    };

    const productViews = getEventCount("PRODUCT_VIEW");
    const productClicks = getEventCount("PRODUCT_CLICK");
    const addToCart = getEventCount("ADD_TO_CART");
    const shopViews = getEventCount("SHOP_VIEW");
    const shopClicks = getEventCount("SHOP_CLICK");
    const categoryViews = getEventCount("CATEGORY_VIEW");

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
            label: "Product",
            render: (product) => (
                <span className="font-medium text-[#001B08]">
                    {product.name || "Unknown Product"}
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

    const shopRankingColumns = [
        {
            key: "shop",
            label: "Shop",
            render: (shop) => (
                <span className="font-medium text-[#001B08]">
                    {shop.name || "Unknown Shop"}
                </span>
            ),
        },
        {
            key: "views",
            label: "Views",
            render: (shop) =>
                shop.views ?? 0,
        },
        {
            key: "clicks",
            label: "Clicks",
            render: (shop) =>
                shop.clicks ?? 0,
        },
        {
            key: "whatsapp",
            label: "WhatsApp",
            render: (shop) =>
                shop.whatsapp ?? 0,
        },
        {
            key: "calls",
            label: "Calls",
            render: (shop) =>
                shop.calls ?? 0,
        },
        {
            key: "shares",
            label: "Shares",
            render: (shop) =>
                shop.shares ?? 0,
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
                    Engagement Activity
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <StatsCard
                        label="Product Views"
                        value={productViews}
                    />

                    <StatsCard
                        label="Product Clicks"
                        value={productClicks}
                    />

                    <StatsCard
                        label="Add to Cart"
                        value={addToCart}
                    />

                    <StatsCard
                        label="Shop Views"
                        value={shopViews}
                    />

                    <StatsCard
                        label="Shop Clicks"
                        value={shopClicks}
                    />

                    <StatsCard
                        label="Category Views"
                        value={categoryViews}
                    />
                </div>
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

            <DashboardCard title="Product Performance">
                <DataTable
                    columns={rankingColumns}
                    data={rankings}
                    page={1}
                    limit={20}
                    meta={{
                        total: rankings.length,
                        totalPages: 1,
                    }}
                    emptyMessage="No product analytics data found."
                />
            </DashboardCard>

            <DashboardCard title="Shop Performance">
                <DataTable
                    columns={shopRankingColumns}
                    data={shopRankings}
                    page={1}
                    limit={20}
                    meta={{
                        total: shopRankings.length,
                        totalPages: 1,
                    }}
                    emptyMessage="No shop analytics data found."
                />
            </DashboardCard>
        </div>
    );
};

export default AnalyticsOverview;