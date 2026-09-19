"use client";

import { useEffect, useState } from "react";
import {
    Activity,
    Database,
    Server,
    RefreshCw,
    MemoryStick,
    HardDrive,
    ShieldAlert,
    Cpu,
} from "lucide-react";

import useApi from "@/hooks/use-api";

const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const StatusBadge = ({ status }) => {
    const healthy = status === "up";

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${healthy
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
        >
            {formatStatus(status)}
        </span>
    );
};

const SystemHealthPage = () => {
    const api = useApi();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadHealth = async () => {
        setLoading(true);

        const result = await api.get(
            "/api/system-health",
            {},
            {
                showError: true,
            },
        );

        if (result?.success) {
            setData(result.data);
        }

        setLoading(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            loadHealth();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const formatUptime = (seconds = 0) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m`;

        return `${minutes}m`;
    };

    const formatBytes = (bytes) => {
        if (bytes === null || bytes === undefined) return "Unavailable";
        if (bytes === 0) return "0 B";

        const units = ["B", "KB", "MB", "GB", "TB"];
        const index = Math.floor(Math.log(bytes) / Math.log(1024));
        const value = bytes / Math.pow(1024, index);

        return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
    };

    if (loading && !data) {
        return (
            <div className="p-6 text-sm text-gray-500">
                Loading system health...
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#001B08]">
                        System Health
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Monitor server, database and platform performance.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={loadHealth}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E8BB44] hover:text-[#001B08] disabled:opacity-50"
                >
                    <RefreshCw
                        size={16}
                        className={loading ? "animate-spin" : ""}
                    />
                    Refresh
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F5EF] text-[#001B08]">
                            <Server size={20} />
                        </div>

                        <StatusBadge status={data?.api?.status} />
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        API Server
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#001B08]">
                        {formatUptime(data?.api?.uptimeSeconds)}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Uptime
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F5EF] text-[#001B08]">
                            <Database size={20} />
                        </div>

                        <StatusBadge status={data?.database?.status} />
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        Database
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#001B08]">
                        {data?.database?.status === "up"
                            ? "Connected"
                            : "Disconnected"}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Ready state: {data?.database?.readyState ?? "-"}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F5EF] text-[#001B08]">
                        <Activity size={20} />
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        Requests
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#001B08]">
                        {data?.requests ?? 0}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Since server start
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F5EF] text-[#001B08]">
                        <ShieldAlert size={20} />
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        Error Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#001B08]">
                        {((data?.errorRate || 0) * 100).toFixed(2)}%
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        {data?.errors ?? 0} total errors
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Runtime
                    </h2>

                    <div className="mt-5 divide-y divide-gray-100">
                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-500">
                                Server Status
                            </span>

                            <StatusBadge status={data?.server} />
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-500">
                                Node Version
                            </span>

                            <span className="text-sm font-semibold text-[#001B08]">
                                {data?.api?.nodeVersion || "-"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-500">
                                Uptime
                            </span>

                            <span className="text-sm font-semibold text-[#001B08]">
                                {formatUptime(data?.api?.uptimeSeconds)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-500">
                                Authentication Failures
                            </span>

                            <span className="text-sm font-semibold text-[#001B08]">
                                {data?.authenticationFailures ?? 0}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-500">
                                Background Jobs
                            </span>

                            <span className="text-sm font-semibold text-[#001B08]">
                                {formatStatus(data?.backgroundJobs?.status)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Resources
                    </h2>

                    <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-4 rounded-lg bg-[#F7F5EF] p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#001B08]">
                                <MemoryStick size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Heap Memory Used
                                </p>

                                <p className="mt-1 font-semibold text-[#001B08]">
                                    {formatBytes(data?.memory?.heapUsed)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-lg bg-[#F7F5EF] p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#001B08]">
                                <MemoryStick size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Total Process Memory
                                </p>

                                <p className="mt-1 font-semibold text-[#001B08]">
                                    {formatBytes(data?.memory?.rss)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-lg bg-[#F7F5EF] p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#001B08]">
                                <HardDrive size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Available Storage
                                </p>

                                <p className="mt-1 font-semibold text-[#001B08]">
                                    {formatBytes(data?.storage?.availableBytes)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-lg bg-[#F7F5EF] p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#001B08]">
                                <Cpu size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    CPU Load Average
                                </p>

                                <p className="mt-1 font-semibold text-[#001B08]">
                                    {Array.isArray(data?.cpuLoad)
                                        ? data.cpuLoad
                                            .map((value) => Number(value).toFixed(2))
                                            .join(" / ")
                                        : "-"}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    1m / 5m / 15m
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemHealthPage;