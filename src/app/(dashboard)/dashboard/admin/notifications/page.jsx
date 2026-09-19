"use client";

import { useEffect, useState } from "react";
import {
    Bell,
    CheckCheck,
    Mail,
    MessageSquare,
    Smartphone,
} from "lucide-react";
import { useRouter } from "next/navigation";

import useApi from "@/hooks/use-api";
import { useSession } from "@/lib/auth-client";

const NotificationIcon = ({ channel }) => {
    if (channel === "email") return <Mail size={18} />;
    if (channel === "sms") return <Smartphone size={18} />;
    if (channel === "whatsapp") return <MessageSquare size={18} />;

    return <Bell size={18} />;
};

const NotificationsPage = () => {
    const api = useApi();
    const router = useRouter();

    const { data: session, isPending } = useSession();

    const role = String(
        session?.user?.role ?? "",
    )
        .trim()
        .toLowerCase();

    const [
        notifications,
        setNotifications,
    ] = useState([]);

    const [
        pagination,
        setPagination,
    ] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
    });

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        markingId,
        setMarkingId,
    ] = useState(null);

    const loadNotifications = async (
        page = 1,
    ) => {
        setLoading(true);

        const result = await api.get(
            `/api/notifications?page=${page}&limit=20`,
            {},
            {
                showError: true,
            },
        );

        if (result?.success) {
            setNotifications(
                Array.isArray(result.data)
                    ? result.data
                    : [],
            );

            setPagination(
                result.pagination || {
                    page,
                    limit: 20,
                    total: 0,
                    totalPages: 1,
                },
            );
        }

        setLoading(false);
    };

    useEffect(() => {
        if (isPending) return;

        if (!session?.user) {
            router.replace("/login");
            return;
        }

        if (role !== "admin") {
            router.replace("/dashboard");
        }
    }, [
        session,
        isPending,
        role,
        router,
    ]);

    useEffect(() => {
        if (
            isPending ||
            !session?.user ||
            role !== "admin"
        ) {
            return;
        }

        const timer = setTimeout(() => {
            loadNotifications(1);
        }, 0);

        return () =>
            clearTimeout(timer);
    }, [
        isPending,
        session?.user,
        role,
    ]);

    const markAsRead = async (
        id,
    ) => {
        setMarkingId(id);

        const result = await api.patch(
            `/api/notifications/${id}/read`,
            {},
            {},
            {
                showSuccess: false,
            },
        );

        if (result?.success) {
            setNotifications(
                (current) =>
                    current.map((item) =>
                        item._id === id
                            ? result.data
                            : item,
                    ),
            );
        }

        setMarkingId(null);
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(
            date,
        ).toLocaleDateString();
    };

    const formatTime = (date) => {
        if (!date) return "";

        return new Date(
            date,
        ).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });
    };

    const formatText = (value) => {
        if (!value) return "-";

        return String(value)
            .replaceAll("_", " ")
            .replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase(),
            );
    };

    const unreadCount =
        notifications.filter(
            (item) =>
                !item.readAt,
        ).length;

    if (
        isPending ||
        !session?.user ||
        role !== "admin"
    ) {
        return null;
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#001B08]">
                        Notifications
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View your latest PakBazaar notifications.
                    </p>
                </div>

                <div className="rounded-full bg-[#F7F5EF] px-3 py-1.5 text-sm font-semibold text-[#001B08]">
                    {unreadCount} unread
                </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-4">
                    <p className="text-sm text-gray-500">
                        {pagination.total} notification
                        {pagination.total === 1
                            ? ""
                            : "s"}
                    </p>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-sm text-gray-500">
                        Loading notifications...
                    </div>
                ) : notifications.length ===
                    0 ? (
                    <div className="p-10 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5EF] text-[#001B08]">
                            <Bell
                                size={20}
                            />
                        </div>

                        <h2 className="mt-4 font-bold text-[#001B08]">
                            No notifications yet
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            New notifications will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {notifications.map(
                            (item) => {
                                const unread =
                                    !item.readAt;

                                return (
                                    <div
                                        key={
                                            item._id
                                        }
                                        className={`flex gap-4 p-5 transition ${unread
                                                ? "bg-[#FFFDF5]"
                                                : "bg-white"
                                            }`}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F7F5EF] text-[#001B08]">
                                            <NotificationIcon
                                                channel={
                                                    item.channel
                                                }
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h2 className="font-semibold text-[#001B08]">
                                                            {
                                                                item.title
                                                            }
                                                        </h2>

                                                        {unread && (
                                                            <span className="h-2 w-2 rounded-full bg-[#E8BB44]" />
                                                        )}
                                                    </div>

                                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                                        {
                                                            item.message
                                                        }
                                                    </p>
                                                </div>

                                                <div className="shrink-0 text-right">
                                                    <p className="text-xs text-gray-500">
                                                        {formatDate(
                                                            item.createdAt,
                                                        )}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {formatTime(
                                                            item.createdAt,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                                <span className="rounded-full bg-[#F7F5EF] px-2.5 py-1 text-xs font-medium text-[#001B08]">
                                                    {formatText(
                                                        item.type,
                                                    )}
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    {formatText(
                                                        item.channel,
                                                    )}
                                                </span>

                                                {unread ? (
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            markingId ===
                                                            item._id
                                                        }
                                                        onClick={() =>
                                                            markAsRead(
                                                                item._id,
                                                            )
                                                        }
                                                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#001B08] transition hover:text-[#E8BB44] disabled:opacity-50"
                                                    >
                                                        <CheckCheck
                                                            size={
                                                                15
                                                            }
                                                        />

                                                        {markingId ===
                                                            item._id
                                                            ? "Marking..."
                                                            : "Mark as read"}
                                                    </button>
                                                ) : (
                                                    <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-green-600">
                                                        <CheckCheck
                                                            size={
                                                                15
                                                            }
                                                        />
                                                        Read
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </div>
                )}

                {pagination.totalPages >
                    1 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
                            <button
                                type="button"
                                disabled={
                                    pagination.page <=
                                    1
                                }
                                onClick={() =>
                                    loadNotifications(
                                        pagination.page -
                                        1,
                                    )
                                }
                                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-[#001B08] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-500">
                                Page{" "}
                                {pagination.page}{" "}
                                of{" "}
                                {
                                    pagination.totalPages
                                }
                            </span>

                            <button
                                type="button"
                                disabled={
                                    pagination.page >=
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    loadNotifications(
                                        pagination.page +
                                        1,
                                    )
                                }
                                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-[#001B08] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default NotificationsPage;