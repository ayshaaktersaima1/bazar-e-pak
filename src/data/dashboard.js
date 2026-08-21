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

// One nav config per role.
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
                    label: "My Orders",
                    href: "/dashboard/customer/orders",
                    icon: ShoppingBag,
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
                {
                    label: "My Shop",
                    href: "/dashboard/seller/shop",
                    icon: Store,
                },
            ],
        },
        {
            section: "Shop",
            items: [
                {
                    label: "Shop CMS",
                    href: "/dashboard/seller/shop/cms",
                    icon: Image,
                },
                {
                    label: "Shop Information",
                    href: "/dashboard/seller/shop/settings",
                    icon: Settings,
                },
            ],
        },
        {
            section: "Catalog",
            items: [
                {
                    label: "Products",
                    href: "/dashboard/seller/products",
                    icon: Boxes,
                },
                {
                    label: "Add Product",
                    href: "/dashboard/seller/products/new",
                    icon: PackagePlus,
                },
                {
                    label: "Categories",
                    href: "/dashboard/seller/categories",
                    icon: Tags,
                },
            ],
        },
        {
            section: "Orders",
            items: [
                {
                    label: "Orders",
                    href: "/dashboard/seller/orders",
                    icon: ClipboardList,
                },
                {
                    label: "Order History",
                    href: "/dashboard/seller/orders/history",
                    icon: History,
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
                    href: "/dashboard/admin/users",
                    icon: Users,
                },
                {
                    label: "Shops",
                    href: "/dashboard/admin/shops",
                    icon: Store,
                },
                {
                    label: "Riders",
                    href: "/dashboard/admin/riders",
                    icon: Bike,
                },
                {
                    label: "Orders",
                    href: "/dashboard/admin/orders",
                    icon: ClipboardList,
                },
                {
                    label: "Products",
                    href: "/dashboard/admin/products",
                    icon: Boxes,
                },
            ],
        },
        {
            section: "Verification",
            items: [
                {
                    label: "Shop Verification",
                    href: "/dashboard/admin/verification/shops",
                    icon: ShieldCheck,
                },
                {
                    label: "Seller Verification",
                    href: "/dashboard/admin/verification/sellers",
                    icon: UserCheck,
                },
            ],
        },
        {
            section: "Platform",
            items: [
                {
                    label: "Categories",
                    href: "/dashboard/admin/categories",
                    icon: Tags,
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

// Settings path for each role.
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

// Fallback if role is missing or unrecognized.
export const defaultRole = "customer";