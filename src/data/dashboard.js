import {
    LayoutDashboard,
    ShoppingBag,
    Heart,
    Wallet,
    User,
    Store,
    PackagePlus,
    ClipboardList,
    BarChart3,
    Star,
    Users,
    ShieldCheck,
    Boxes,
    Settings,
    History,
    Image,
    Tags,
    UserCheck,
    AlertTriangle,
    Bike,
} from "lucide-react";

export const dashboardNav = {
    customer: [
        {
            section: "Overview",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard/customer",
                    icon: LayoutDashboard,
                },
                {
                    label: "Orders",
                    icon: ShoppingBag,
                    children: [
                        {
                            label: "My Orders",
                            href: "/dashboard/customer/orders",
                        },
                        {
                            label: "Order History",
                            href: "/dashboard/customer/orders/history",
                        },
                    ],
                },
                {
                    label: "Wishlist",
                    href: "/dashboard/customer/wishlist",
                    icon: Heart,
                },
            ],
        },

        {
            section: "Account",
            items: [
                {
                    label: "Wallet",
                    href: "/dashboard/customer/wallet",
                    icon: Wallet,
                },
                {
                    label: "Profile",
                    href: "/dashboard/customer/profile",
                    icon: User,
                },
            ],
        },
    ],

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
                    icon: Users,
                    children: [
                        {
                            label: "All Users",
                            href: "/dashboard/admin/users",
                        },
                    ],
                },

                {
                    label: "Shops",
                    icon: Store,
                    children: [
                        {
                            label: "All Shops",
                            href: "/dashboard/admin/shops",
                        },
                    ],
                },

                {
                    label: "Riders",
                    icon: Bike,
                    children: [
                        {
                            label: "All Riders",
                            href: "/dashboard/admin/riders",
                        },
                    ],
                },

                {
                    label: "Orders",
                    icon: ClipboardList,
                    children: [
                        {
                            label: "All Orders",
                            href: "/dashboard/admin/orders",
                        },
                    ],
                },

                {
                    label: "Products",
                    icon: Boxes,
                    children: [
                        {
                            label: "All Products",
                            href: "/dashboard/admin/products",
                        },
                    ],
                },
            ],
        },

        {
            section: "Verification",
            items: [
                {
                    label: "Verification",
                    icon: ShieldCheck,
                    children: [
                        {
                            label: "Shop Verification",
                            href: "/dashboard/admin/verification/shops",
                        },
                        {
                            label: "Seller Verification",
                            href: "/dashboard/admin/verification/sellers",
                        },
                    ],
                },
            ],
        },

        {
            section: "Platform",
            items: [
                {
                    label: "Categories",
                    icon: Tags,
                    children: [
                        {
                            label: "All Categories",
                            href: "/dashboard/admin/categories",
                        },
                    ],
                },

                {
                    label: "Reports",
                    href: "/dashboard/admin/reports",
                    icon: BarChart3,
                },

                {
                    label: "Complaints",
                    href: "/dashboard/admin/complaints",
                    icon: AlertTriangle,
                },
            ],
        },
    ],
};

export const dashboardSettings = {
    customer: {
        label: "Settings",
        href: "/dashboard/customer/settings",
        icon: Settings,
    },

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
};

export const defaultRole = "customer";