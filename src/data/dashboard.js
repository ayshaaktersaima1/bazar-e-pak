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
} from "lucide-react";

// One nav config per role. Keep hrefs absolute, group by section.
export const dashboardNav = {
    customer: [
        {
            section: "Overview",
            items: [
                { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
                { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
            ],
        },
        {
            section: "Account",
            items: [
                { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
                { label: "Profile", href: "/dashboard/profile", icon: User },
            ],
        },
    ],

    seller: [
        {
            section: "Overview",
            items: [
                { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                { label: "My Shop", href: "/dashboard/shop", icon: Store },
            ],
        },
        {
            section: "Catalog",
            items: [
                { label: "Products", href: "/dashboard/products", icon: Boxes },
                { label: "Add Product", href: "/dashboard/products/new", icon: PackagePlus },
                { label: "Orders", href: "/dashboard/orders", icon: ClipboardList },
            ],
        },
        {
            section: "Insights",
            items: [
                { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
                { label: "Reviews", href: "/dashboard/reviews", icon: Star },
            ],
        },
    ],

    admin: [
        {
            section: "Overview",
            items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
        },
        {
            section: "Management",
            items: [
                { label: "Users", href: "/dashboard/users", icon: Users },
                { label: "Shops", href: "/dashboard/shops", icon: Store },
                { label: "Riders", href: "/dashboard/riders", icon: Bike },
                { label: "Orders", href: "/dashboard/orders", icon: ClipboardList },
            ],
        },
        {
            section: "Platform",
            items: [
                { label: "Verification", href: "/dashboard/verification", icon: ShieldCheck },
                { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
            ],
        },
    ],

    rider: [
        {
            section: "Overview",
            items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
        },
        {
            section: "Deliveries",
            items: [
                { label: "Active Delivery", href: "/dashboard/active", icon: Truck },
                { label: "Nearby Zone", href: "/dashboard/zone", icon: MapPin },
                { label: "History", href: "/dashboard/history", icon: History },
            ],
        },
        {
            section: "Account",
            items: [
                { label: "Earnings", href: "/dashboard/earnings", icon: Wallet },
                { label: "Profile", href: "/dashboard/profile", icon: User },
            ],
        },
    ],
};

// Shown at bottom for every role
export const dashboardFooterNav = [
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Fallback if role is missing or unrecognized
export const defaultRole = "customer";