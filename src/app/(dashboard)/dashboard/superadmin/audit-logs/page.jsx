"use client";

import { useEffect, useState } from "react";
import { Search, RotateCcw } from "lucide-react";

import useApi from "@/hooks/use-api";

const emptyFilters = {
    actorId: "",
    action: "",
    resourceType: "",
    resourceId: "",
};

const AuditLogsPage = () => {
    const api = useApi();

    const [logs, setLogs] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
    });

    const [filters, setFilters] = useState(emptyFilters);
    const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
    const [loading, setLoading] = useState(true);

    const loadLogs = async (page = 1, currentFilters = appliedFilters) => {
        setLoading(true);

        const params = new URLSearchParams({
            page: String(page),
            limit: "20",
        });

        Object.entries(currentFilters).forEach(([key, value]) => {
            if (value.trim()) params.set(key, value.trim());
        });

        const result = await api.get(
            `/api/audit-logs?${params.toString()}`,
            {},
            {
                showError: true,
            },
        );

        if (result?.success) {
            setLogs(Array.isArray(result.data) ? result.data : []);

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
            loadLogs(1, emptyFilters);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();

        const nextFilters = { ...filters };

        setAppliedFilters(nextFilters);

        await loadLogs(1, nextFilters);
    };

    const handleReset = async () => {
        setFilters(emptyFilters);
        setAppliedFilters(emptyFilters);

        await loadLogs(1, emptyFilters);
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString();
    };

    const formatTime = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const formatText = (value) => {
        if (!value) return "-";

        return String(value)
            .replaceAll("_", " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    };

    const shortId = (value) => {
        if (!value) return "-";

        return value.length > 12
            ? `${value.slice(0, 12)}...`
            : value;
    };

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-[#001B08]">
                    Audit Logs
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Review important actions performed across PakBazaar.
                </p>
            </div>

            <form
                onSubmit={handleSearch}
                className="rounded-xl bg-white p-5 shadow-sm"
            >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <input
                        type="text"
                        value={filters.actorId}
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                actorId: event.target.value,
                            })
                        }
                        placeholder="Actor ID"
                        className="rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                    />

                    <input
                        type="text"
                        value={filters.action}
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                action: event.target.value,
                            })
                        }
                        placeholder="Action"
                        className="rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                    />

                    <input
                        type="text"
                        value={filters.resourceType}
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                resourceType: event.target.value,
                            })
                        }
                        placeholder="Resource Type"
                        className="rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                    />

                    <input
                        type="text"
                        value={filters.resourceId}
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                resourceId: event.target.value,
                            })
                        }
                        placeholder="Resource ID"
                        className="rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                    />
                </div>

                <div className="mt-4 flex gap-3">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E8BB44] hover:text-[#001B08]"
                    >
                        <Search size={16} />
                        Filter
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#001B08] transition hover:bg-gray-50"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                </div>
            </form>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-4">
                    <p className="text-sm text-gray-500">
                        {pagination.total} audit log
                        {pagination.total === 1 ? "" : "s"}
                    </p>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-sm text-gray-500">
                        Loading audit logs...
                    </div>
                ) : logs.length === 0 ? (
                    <div className="p-8 text-center text-sm text-gray-500">
                        No audit logs found.
                    </div>
                ) : (
                    <table className="w-full table-fixed text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-[#F7F5EF] text-gray-600">
                                <th className="w-[15%] px-5 py-3 font-medium">
                                    Date
                                </th>

                                <th className="w-[12%] px-5 py-3 font-medium">
                                    Role
                                </th>

                                <th className="w-[25%] px-5 py-3 font-medium">
                                    Action
                                </th>

                                <th className="w-[23%] px-5 py-3 font-medium">
                                    Resource
                                </th>

                                <th className="w-[25%] px-5 py-3 font-medium">
                                    Reason
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {logs.map((log) => (
                                <tr
                                    key={log._id}
                                    className="border-b border-gray-50 transition hover:bg-[#FAFAF8]"
                                >
                                    <td className="px-5 py-4 align-top">
                                        <p className="font-medium text-[#001B08]">
                                            {formatDate(log.createdAt)}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            {formatTime(log.createdAt)}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 align-top">
                                        <span className="text-gray-600">
                                            {formatText(log.actorRole)}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 align-top">
                                        <span className="inline-block rounded-full bg-[#F7F5EF] px-2.5 py-1 text-xs font-semibold text-[#001B08]">
                                            {formatText(log.action)}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 align-top">
                                        <p className="font-medium text-[#001B08]">
                                            {formatText(log.resourceType)}
                                        </p>

                                        {log.resourceId && (
                                            <p
                                                title={log.resourceId}
                                                className="mt-1 truncate text-xs text-gray-400"
                                            >
                                                {shortId(log.resourceId)}
                                            </p>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 align-top text-gray-600">
                                        <p className="line-clamp-2 break-words">
                                            {log.reason || "-"}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
                        <button
                            type="button"
                            disabled={pagination.page <= 1}
                            onClick={() =>
                                loadLogs(
                                    pagination.page - 1,
                                    appliedFilters,
                                )
                            }
                            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-[#001B08] disabled:cursor-not-allowed disabled:opacity-40"
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
                                pagination.page >= pagination.totalPages
                            }
                            onClick={() =>
                                loadLogs(
                                    pagination.page + 1,
                                    appliedFilters,
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

export default AuditLogsPage;