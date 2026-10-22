import {
    LayoutDashboard,
    Store,
    BarChart3,
    Star,
    Users,
    Boxes,
    Settings,
    Tags,
    UserCheck,
    UserCog,
    UserPlus,
    BadgePercent,
    Megaphone,
    PanelsTopLeft,
    Search,
    ScrollText,
    Bell,
    Activity,
    ShieldCheck,
    ShoppingBag,
    CreditCard,
    Undo2,
    Wallet,
    Landmark,
    DatabaseBackup,
} from "lucide-react";

export const dashboardNav = {
    // =====================================================
    // SELLER
    // =====================================================
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
            section: "Business Management",
            items: [
                {
                    label: "My Shop",
                    href: "/dashboard/seller/shop",
                    icon: Store,
                },

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
                    label: "Offers & Discounts",
                    href: "/dashboard/seller/offers",
                    icon: BadgePercent,
                },
            ],
        },

        {
            section: "Orders & Earnings",
            items: [
                {
                    label: "Orders",
                    icon: ShoppingBag,
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

                {
                    label: "Earnings & Payouts",
                    href: "/dashboard/seller/finance",
                    icon: Wallet,
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
                    permission: "analytics.view",
                },

        
            ],
        },

        {
            section: "Account",
            items: [
                {
                    label: "Notifications",
                    href: "/dashboard/seller/notifications",
                    icon: Bell,
                },
            ],
        },
    ],

    // =====================================================
    // ADMIN
    // =====================================================
    admin: [
        {
            section: "Overview",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard/admin",
                    icon: LayoutDashboard,
                },
            ],
        },

        {
            section: "Management",
            items: [
                {
                    label: "Users",
                    href: "/dashboard/admin/users",
                    icon: Users,
                    permission: "users.view",
                },

                {
                    label: "Shops",
                    href: "/dashboard/admin/shops",
                    icon: Store,
                    permission: "shops.view",
                },

                {
                    label: "Products",
                    href: "/dashboard/admin/products",
                    icon: Boxes,
                    permission: "products.view",
                },
            ],
        },

        {
            section: "Orders & Payments",
            items: [
                {
                    label: "Orders",
                    href: "/dashboard/admin/orders",
                    icon: ShoppingBag,
                    permission: "orders.view",
                },

                {
                    label: "Payments",
                    href: "/dashboard/admin/payments",
                    icon: CreditCard,
                    permission: "payments.view",
                },

                {
                    label: "Refunds",
                    href: "/dashboard/admin/refunds",
                    icon: Undo2,
                    permission: "payments.view",
                },

                {
                    label: "Shop Finance",
                    href: "/dashboard/admin/finance",
                    icon: Wallet,
                    permission: "payments.view",
                },

                {
                    label: "Settlements",
                    href: "/dashboard/admin/settlements",
                    icon: Landmark,
                    permission: "payments.view",
                },

            ],
        },

        {
            section: "Moderation",
            items: [
                {
                    label: "Reviews",
                    href: "/dashboard/admin/reviews",
                    icon: Star,
                    permission: "reviews.view",
                },
            ],
        },

        {
            section: "Insights",
            items: [
                {
                    label: "Analytics",
                    href: "/dashboard/admin/analytics",
                    icon: BarChart3,
                    permission: "analytics.view",
                },
            ],
        },

        {
            section: "Account",
            items: [
                {
                    label: "Notifications",
                    href: "/dashboard/admin/notifications",
                    icon: Bell,
                },
            ],
        },
    ],

    // =====================================================
    // SUPER ADMIN
    // =====================================================
    super_admin: [
        {
            section: "Overview",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard/superadmin",
                    icon: LayoutDashboard,
                },
            ],
        },

        {
            section: "User Management",
            items: [
                {
                    label: "Admins",
                    href: "/dashboard/superadmin/admins",
                    icon: UserCog,
                },

                {
                    label: "Users",
                    href: "/dashboard/superadmin/users",
                    icon: Users,
                },
            ],
        },

        {
            section: "Seller Management",
            items: [
                {
                    label: "Seller Applications",
                    href: "/dashboard/superadmin/seller-applications",
                    icon: UserCheck,
                },

                {
                    label: "Create Seller & Shop",
                    href: "/dashboard/superadmin/create-seller-shop",
                    icon: UserPlus,
                },

                {
                    label: "Shops",
                    href: "/dashboard/superadmin/shops",
                    icon: Store,
                },

                {
                    label: "Native Shops",
                    href: "/dashboard/superadmin/native-shops",
                    icon: Store,
                },
            ],
        },

        {
            section: "Orders & Payments",
            items: [
                {
                    label: "Orders",
                    href: "/dashboard/superadmin/orders",
                    icon: ShoppingBag,
                },

                {
                    label: "Payments",
                    href: "/dashboard/superadmin/payments",
                    icon: CreditCard,
                },

                {
                    label: "Refunds",
                    href: "/dashboard/superadmin/refunds",
                    icon: Undo2,
                },

                {
                    label: "Shop Finance",
                    href: "/dashboard/superadmin/finance",
                    icon: Wallet,
                },

                {
                    label: "Settlements",
                    href: "/dashboard/superadmin/settlements",
                    icon: Landmark,
                },

            ],
        },

        {
            section: "Product Management",
            items: [
                {
                    label: "Products",
                    href: "/dashboard/superadmin/products",
                    icon: Boxes,
                },

                {
                    label: "Native Products",
                    href: "/dashboard/superadmin/native-products",
                    icon: Boxes,
                },

                {
                    label: "Categories",
                    href: "/dashboard/superadmin/categories",
                    icon: Tags,
                },

                {
                    label: "Offers & Discounts",
                    href: "/dashboard/superadmin/offers",
                    icon: BadgePercent,
                },
            ],
        },

        {
            section: "Content Management",
            items: [
                {
                    label: "Campaigns",
                    href: "/dashboard/superadmin/campaigns",
                    icon: Megaphone,
                },

                {
                    label: "CMS",
                    href: "/dashboard/superadmin/cms",
                    icon: PanelsTopLeft,
                },

                {
                    label: "Team",
                    href: "/dashboard/superadmin/team",
                    icon: Users,
                },
            ],
        },

        {
            section: "Moderation",
            items: [
                {
                    label: "Reviews",
                    href: "/dashboard/superadmin/reviews",
                    icon: Star,
                },
            ],
        },

        {
            section: "Analytics & Monitoring",
            items: [
                {
                    label: "Analytics",
                    href: "/dashboard/superadmin/analytics",
                    icon: BarChart3,
                },

                {
                    label: "Search Analytics",
                    href: "/dashboard/superadmin/search-analytics",
                    icon: Search,
                },

                {
                    label: "Audit Logs",
                    href: "/dashboard/superadmin/audit-logs",
                    icon: ScrollText,
                },

                {
                    label: "System Health",
                    href: "/dashboard/superadmin/system-health",
                    icon: Activity,
                },
            ],
        },

        {
            section: "System",
            items: [
                {
                    label: "Backup & Restore",
                    href: "/dashboard/superadmin/backup",
                    icon: DatabaseBackup,
                },
            ],
        },

        {
            section: "Platform",
            items: [
                {
                    label: "Notifications",
                    href: "/dashboard/superadmin/notifications",
                    icon: Bell,
                },

                {
                    label: "Platform Settings",
                    href: "/dashboard/superadmin/settings",
                    icon: Settings,
                },
            ],
        },
    ],
};

export const dashboardSettings = {
    seller: {
        label: "Settings",
        href: "/dashboard/seller/settings",
        icon: Settings,
    },

    admin: {
        label: "Settings",
        href: "/dashboard/admin/settings",
        icon: Settings,
    },

    super_admin: null,
};

export const defaultRole = "seller";