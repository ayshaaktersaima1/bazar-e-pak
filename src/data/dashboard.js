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
    Truck,
    MapPin,
    History,
    Bike,
    Image,
    Tags,
    UserCheck,
    AlertTriangle,
} from "lucide-react";

// One nav config per role. Keep hrefs absolute and grouped by section.
export const dashboardNav = {
    customer: [
        {
            section: "Overview",
            items: [
                {
                    label: "Dashboard",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    label: "My Orders",
                    href: "/dashboard/orders",
                    icon: ShoppingBag,
                },
                {
                    label: "Wishlist",
                    href: "/dashboard/wishlist",
                    icon: Heart,
                },
            ],
        },
        {
            section: "Account",
            items: [
                {
                    label: "Wallet",
                    href: "/dashboard/wallet",
                    icon: Wallet,
                },
                {
                    label: "Profile",
                    href: "/dashboard/profile",
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
                    href: "/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    label: "My Shop",
                    href: "/dashboard/shop",
                    icon: Store,
                },
            ],
        },
        {
            section: "Shop",
            items: [
                {
                    label: "Shop CMS",
                    href: "/dashboard/shop/cms",
                    icon: Image,
                },
                {
                    label: "Shop Information",
                    href: "/dashboard/shop/settings",
                    icon: Settings,
                },
            ],
        },
        {
            section: "Catalog",
            items: [
                {
                    label: "Products",
                    href: "/dashboard/products",
                    icon: Boxes,
                },
                {
                    label: "Add Product",
                    href: "/dashboard/products/new",
                    icon: PackagePlus,
                },
                {
                    label: "Categories",
                    href: "/dashboard/categories",
                    icon: Tags,
                },
            ],
        },
        {
            section: "Orders",
            items: [
                {
                    label: "Orders",
                    href: "/dashboard/orders",
                    icon: ClipboardList,
                },
                {
                    label: "Order History",
                    href: "/dashboard/orders/history",
                    icon: History,
                },
            ],
        },
        {
            section: "Insights",
            items: [
                {
                    label: "Analytics",
                    href: "/dashboard/analytics",
                    icon: BarChart3,
                },
                {
                    label: "Reviews",
                    href: "/dashboard/reviews",
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
                    href: "/dashboard",
                    icon: LayoutDashboard,
                },
            ],
        },
        {
            section: "Management",
            items: [
                {
                    label: "Users",
                    href: "/dashboard/users",
                    icon: Users,
                },
                {
                    label: "Shops",
                    href: "/dashboard/shops",
                    icon: Store,
                },
                {
                    label: "Riders",
                    href: "/dashboard/riders",
                    icon: Bike,
                },
                {
                    label: "Orders",
                    href: "/dashboard/orders",
                    icon: ClipboardList,
                },
                {
                    label: "Products",
                    href: "/dashboard/products",
                    icon: Boxes,
                },
            ],
        },
        {
            section: "Verification",
            items: [
                {
                    label: "Shop Verification",
                    href: "/dashboard/verification/shops",
                    icon: ShieldCheck,
                },
                {
                    label: "Seller Verification",
                    href: "/dashboard/verification/sellers",
                    icon: UserCheck,
                },
            ],
        },
        {
            section: "Platform",
            items: [
                {
                    label: "Categories",
                    href: "/dashboard/categories",
                    icon: Tags,
                },
                {
                    label: "Reports",
                    href: "/dashboard/reports",
                    icon: BarChart3,
                },
                {
                    label: "Complaints",
                    href: "/dashboard/complaints",
                    icon: AlertTriangle,
                },
            ],
        },
    ],

    // rider: [
    //     {
    //         section: "Overview",
    //         items: [
    //             {
    //                 label: "Dashboard",
    //                 href: "/dashboard",
    //                 icon: LayoutDashboard,
    //             },
    //         ],
    //     },
    //     {
    //         section: "Deliveries",
    //         items: [
    //             {
    //                 label: "Active Delivery",
    //                 href: "/dashboard/active",
    //                 icon: Truck,
    //             },
    //             {
    //                 label: "Nearby Zone",
    //                 href: "/dashboard/zone",
    //                 icon: MapPin,
    //             },
    //             {
    //                 label: "Delivery History",
    //                 href: "/dashboard/history",
    //                 icon: History,
    //             },
    //         ],
    //     },
    //     {
    //         section: "Account",
    //         items: [
    //             {
    //                 label: "Earnings",
    //                 href: "/dashboard/earnings",
    //                 icon: Wallet,
    //             },
    //             {
    //                 label: "Profile",
    //                 href: "/dashboard/profile",
    //                 icon: User,
    //             },
    //         ],
    //     },
    // ],
};

// Shown at the bottom for every role
export const dashboardFooterNav = [
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

// Fallback if role is missing or unrecognized
export const defaultRole = "customer";