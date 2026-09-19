"use client";

import { useEffect, useState } from "react";
import {
    Search,
    SearchX,
    ListFilter,
    Clock,
} from "lucide-react";

import useApi from "@/hooks/use-api";

const SearchAnalyticsPage = () => {
    const api = useApi();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnalytics = async () => {
            setLoading(true);

            const result = await api.get(
                "/api/analytics/search",
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

        loadAnalytics();
    }, []);

    const summary = data?.summary || {
        totalSearches: 0,
        zeroResultSearches: 0,
        averageResultsPerSearch: 0,
    };

    const topKeywords = data?.topKeywords || [];
    const zeroResultKeywords =
        data?.zeroResultKeywords || [];
    const recentSearches = data?.recentSearches || [];

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString();
    };

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-sm text-gray-500">
                    Loading search analytics...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            <div>
                <h1 className="text-2xl font-bold text-[#001B08]">
                    Search Analytics
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    See what visitors are searching for across PakBazaar.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Total Searches
                        </p>

                        <Search
                            size={20}
                            className="text-[#E8BB44]"
                        />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-[#001B08]">
                        {summary.totalSearches}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Zero Result Searches
                        </p>

                        <SearchX
                            size={20}
                            className="text-[#E8BB44]"
                        />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-[#001B08]">
                        {summary.zeroResultSearches}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Avg. Results Per Search
                        </p>

                        <ListFilter
                            size={20}
                            className="text-[#E8BB44]"
                        />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-[#001B08]">
                        {summary.averageResultsPerSearch}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Top Search Keywords
                    </h2>

                    <div className="mt-5 overflow-x-auto">
                        {topKeywords.length > 0 ? (
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 text-gray-500">
                                        <th className="pb-3 font-medium">
                                            Keyword
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Searches
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Avg. Results
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {topKeywords.map((item) => (
                                        <tr
                                            key={item.keyword}
                                            className="border-b border-gray-50"
                                        >
                                            <td className="py-3 font-medium text-[#001B08]">
                                                {item.keyword}
                                            </td>

                                            <td className="py-3 text-gray-600">
                                                {item.searches}
                                            </td>

                                            <td className="py-3 text-gray-600">
                                                {item.averageResults}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="py-6 text-sm text-gray-500">
                                No search data yet.
                            </p>
                        )}
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-[#001B08]">
                        Zero Result Keywords
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Searches visitors made but PakBazaar could not match.
                    </p>

                    <div className="mt-5 overflow-x-auto">
                        {zeroResultKeywords.length > 0 ? (
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 text-gray-500">
                                        <th className="pb-3 font-medium">
                                            Keyword
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Searches
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Last Search
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {zeroResultKeywords.map((item) => (
                                        <tr
                                            key={item.keyword}
                                            className="border-b border-gray-50"
                                        >
                                            <td className="py-3 font-medium text-[#001B08]">
                                                {item.keyword}
                                            </td>

                                            <td className="py-3 text-gray-600">
                                                {item.searches}
                                            </td>

                                            <td className="py-3 text-gray-600">
                                                {formatDate(item.lastSearchedAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="py-6 text-sm text-gray-500">
                                No zero-result searches yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                    <Clock
                        size={20}
                        className="text-[#E8BB44]"
                    />

                    <h2 className="text-lg font-bold text-[#001B08]">
                        Recent Searches
                    </h2>
                </div>

                <div className="mt-5 overflow-x-auto">
                    {recentSearches.length > 0 ? (
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 text-gray-500">
                                    <th className="pb-3 font-medium">
                                        Keyword
                                    </th>
                                    <th className="pb-3 font-medium">
                                        Results
                                    </th>
                                    <th className="pb-3 font-medium">
                                        Source
                                    </th>
                                    <th className="pb-3 font-medium">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentSearches.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b border-gray-50"
                                    >
                                        <td className="py-3 font-medium text-[#001B08]">
                                            {item.searchKeyword || "-"}
                                        </td>

                                        <td className="py-3 text-gray-600">
                                            {item.resultCount ?? 0}
                                        </td>

                                        <td className="py-3 text-gray-600">
                                            {item.source || "-"}
                                        </td>

                                        <td className="py-3 text-gray-600">
                                            {formatDate(item.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="py-6 text-sm text-gray-500">
                            No recent searches yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchAnalyticsPage;