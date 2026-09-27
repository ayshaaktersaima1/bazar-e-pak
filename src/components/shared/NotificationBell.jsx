"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import useApi from "../../hooks/use-api";


function getNotificationPath(role) {
    if (role === "super_admin") {
        return "/dashboard/superadmin/notifications";
    }

    if (role === "admin") {
        return "/dashboard/admin/notifications";
    }

    if (role === "seller") {
        return "/dashboard/seller/notifications";
    }

    return null;
}

export default function NotificationBell({ role }) {
    const api = useApi();

    const [unreadCount, setUnreadCount] = useState(0);

    const notificationPath = getNotificationPath(role);

    useEffect(() => {
        if (!notificationPath) return;

        let mounted = true;

        const loadUnreadCount = async () => {
            const result = await api.get(
                "/api/notifications?page=1&limit=100",
                {},
                {
                    auth: true,
                    showError: false,
                },
            );

            if (!mounted || !result?.data) return;

            const count = result.data.filter(
                (notification) => !notification.readAt,
            ).length;

            setUnreadCount(count);
        };

        loadUnreadCount();

        return () => {
            mounted = false;
        };
    }, [role]);

    if (!notificationPath) return null;

    return (
        <Link
            href={notificationPath}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#002B12] transition-colors hover:bg-[#D9A928]/10"
        >
            <Bell className="h-[18px] w-[18px]" />

            {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#D9A928] px-1 text-[10px] font-bold leading-none text-[#002B12]">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </Link>
    );
}