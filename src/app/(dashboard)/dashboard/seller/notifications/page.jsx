"use client";

import { useEffect, useState } from "react";
import {
    Bell,
    CheckCheck,
    Mail,
    MessageSquare,
    Smartphone,
} from "lucide-react";

import useApi from "@/hooks/use-api";

const NotificationIcon = ({ channel }) => {
    if (channel === "email") {
        return <Mail size={18} />;
    }

    if (channel === "sms") {
        return <Smartphone size={18} />;
    }

    if (channel === "whatsapp") {
        return <MessageSquare size={18} />;
    }

    return <Bell size={18} />;
};

const formatText = (value) => {
    if (!value) {
        return "-";
    }

    return String(value)
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase(),
        );
};

const formatDate = (date) => {
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString();
};

const formatTime = (date) => {
    if (!date) {
        return "";
    }

    return new Date(date).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
};

const NotificationItem = ({
    notification,
    markingId,
    onMarkAsRead,
}) => {
    const unread = !notification.readAt;

    return (
        <div
            className={`flex gap-4 p-5 transition ${
                unread
                    ? "bg-[#FFFDF5]"
                    : "bg-white"
            }`}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F7F5EF] text-[#001B08]">
                <NotificationIcon
                    channel={notification.channel}
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-semibold text-[#001B08]">
                                {notification.title}
                            </h2>

                            {unread && (
                                <span className="h-2 w-2 rounded-full bg-[#E8BB44]" />
                            )}
                        </div>

                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            {notification.message}
                        </p>
                    </div>

                    <div className="shrink-0 text-right">
                        <p className="text-xs text-gray-500">
                            {formatDate(
                                notification.createdAt,
                            )}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            {formatTime(
                                notification.createdAt,
                            )}
                        </p>
                    </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#F7F5EF] px-2.5 py-1 text-xs font-medium text-[#001B08]">
                        {formatText(
                            notification.type,
                        )}
                    </span>

                    <span className="text-xs text-gray-400">
                        {formatText(
                            notification.channel,
                        )}
                    </span>

                    {unread ? (
                        <button
                            type="button"
                            disabled={
                                markingId ===
                                notification._id
                            }
                            onClick={() =>
                                onMarkAsRead(
                                    notification._id,
                                )
                            }
                            className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#001B08] transition hover:text-[#E8BB44] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <CheckCheck size={15} />

                            {markingId ===
                            notification._id
                                ? "Marking..."
                                : "Mark as read"}
                        </button>
                    ) : (
                        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-green-600">
                            <CheckCheck size={15} />

                            Read
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const NotificationPagination = ({
    pagination,
    onPageChange,
}) => {
    if (pagination.totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
            <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() =>
                    onPageChange(
                        pagination.page - 1,
                    )
                }
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-[#001B08] transition hover:bg-[#F7F5EF] disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            <span className="text-sm text-gray-500">
                Page {pagination.page} of{" "}
                {pagination.totalPages}
            </span>

            <button
                type="button"
                disabled={
                    pagination.page >=
                    pagination.totalPages
                }
                onClick={() =>
                    onPageChange(
                        pagination.page + 1,
                    )
                }
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-[#001B08] transition hover:bg-[#F7F5EF] disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
};

const SellerNotificationPage = () => {
    const api = useApi();

    const [notifications, setNotifications] =
        useState([]);

    const [pagination, setPagination] =
        useState({
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 1,
        });

    const [loading, setLoading] =
        useState(true);

    const [markingId, setMarkingId] =
        useState(null);

    const loadNotifications = async (
        page = 1,
    ) => {
        setLoading(true);

        const result = await api.get(
            `/api/notifications?page=${page}&limit=20`,
            {},
            {
                auth: true,
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
        const timer = setTimeout(() => {
            loadNotifications(1);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const markAsRead = async (id) => {
        if (!id) {
            return;
        }

        setMarkingId(id);

        const result = await api.patch(
            `/api/notifications/${id}/read`,
            {},
            {},
            {
                auth: true,
                showError: true,
                showSuccess: false,
            },
        );

        if (result?.success) {
            setNotifications((current) =>
                current.map((item) =>
                    item._id === id
                        ? result.data
                        : item,
                ),
            );
        }

        setMarkingId(null);
    };

    const unreadCount =
        notifications.filter(
            (item) => !item.readAt,
        ).length;

    return (
        <div className="space-y-6 bg-[#F7F5EF] p-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Seller Updates
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                        Notifications
                    </h1>

                    <p className="mt-2 text-sm text-[#4B5563]">
                        View your latest shop and
                        account notifications.
                    </p>
                </div>

                <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#001B08] shadow-sm">
                    {unreadCount} unread
                </div>
            </div>

            {/* Notification List */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-4">
                    <p className="text-sm text-gray-500">
                        {pagination.total} notification
                        {pagination.total === 1
                            ? ""
                            : "s"}
                    </p>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="p-10 text-center">
                        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#E8BB44] border-t-transparent" />

                        <p className="mt-3 text-sm text-gray-500">
                            Loading notifications...
                        </p>
                    </div>
                ) : notifications.length ===
                  0 ? (
                    /* Empty */
                    <div className="p-10 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5EF] text-[#001B08]">
                            <Bell size={20} />
                        </div>

                        <h2 className="mt-4 font-bold text-[#001B08]">
                            No notifications yet
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            New notifications will
                            appear here.
                        </p>
                    </div>
                ) : (
                    /* Notifications */
                    <div className="divide-y divide-gray-100">
                        {notifications.map(
                            (notification) => (
                                <NotificationItem
                                    key={
                                        notification._id
                                    }
                                    notification={
                                        notification
                                    }
                                    markingId={
                                        markingId
                                    }
                                    onMarkAsRead={
                                        markAsRead
                                    }
                                />
                            ),
                        )}
                    </div>
                )}

                {/* Pagination */}
                {!loading && (
                    <NotificationPagination
                        pagination={pagination}
                        onPageChange={
                            loadNotifications
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default SellerNotificationPage;