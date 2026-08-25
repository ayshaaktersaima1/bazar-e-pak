import {
    LayoutDashboard,
    Store,
    Image,
    Settings,
    Boxes,
    PackagePlus,
    Tags,
    ClipboardList,
    History,
    BarChart3,
    Star,
} from "lucide-react";

export const dashboardNav = {
    seller: [
        {
            section: "Overview",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard/seller",
                    icon: LayoutDashboard,
                },
            ],
        },

        {
            section: "Shop",
            items: [
                {
                    label: "My Shop",
                    icon: Store,
                    children: [
                        {
                            label: "Shop Overview",
                            href: "/dashboard/seller/shop",
                        },
                        {
                            label: "Shop CMS",
                            href: "/dashboard/seller/shop/cms",
                        },
                        {
                            label: "Shop Information",
                            href: "/dashboard/seller/shop/settings",
                        },
                    ],
                },
            ],
        },

        {
            section: "Catalog",
            items: [
                {
                    label: "Products",
                    icon: Boxes,
                    children: [
                        {
                            label: "All Products",
                            href: "/dashboard/seller/products",
                        },
                        {
                            label: "Add Product",
                            href: "/dashboard/seller/products/new",
                        },
                    ],
                },

                {
                    label: "Categories",
                    icon: Tags,
                    children: [
                        {
                            label: "All Categories",
                            href: "/dashboard/seller/categories",
                        },
                    ],
                },
            ],
        },

        {
            section: "Orders",
            items: [
                {
                    label: "Orders",
                    icon: ClipboardList,
                    children: [
                        {
                            label: "All Orders",
                            href: "/dashboard/seller/orders",
                        },
                        {
                            label: "Order History",
                            href: "/dashboard/seller/orders/history",
                        },
                    ],
                },
            ],
        },

        {
            section: "Insights",
            items: [
                {
                    label: "Analytics",
                    href: "/dashboard/seller/analytics",
                    icon: BarChart3,
                },
                {
                    label: "Reviews",
                    href: "/dashboard/seller/reviews",
                    icon: Star,
                },
            ],
        },
    ],
};

export const dashboardSettings = {
    label: "Settings",
    href: "/dashboard/seller/settings",
    icon: Settings,
};

export const defaultRole = "seller";