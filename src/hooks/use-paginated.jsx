"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useApi from "@/hooks/use-api";

// Generic page/limit/search/filter loader for DataTable (backend controls pagination).
// `endpoint` may be null to skip loading. `extra` are fixed query params.
const usePaginated = (endpoint, { extra = {}, initialLimit = 20, debounce = 300, initialFilters = {} } = {}) => {
  const { get } = useApi();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(Boolean(endpoint));
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [pageState, setPageState] = useState({ page: 1, limit: initialLimit });
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [tick, setTick] = useState(0);
  const extraKey = JSON.stringify(extra);
  const requestId = useRef(0);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    params.set("page", String(pageState.page));
    params.set("limit", String(pageState.limit));

    if (search.trim()) params.set("search", search.trim());

    Object.entries({ ...JSON.parse(extraKey), ...filters }).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
    });

    return params.toString();
  }, [pageState, search, filters, extraKey]);

  useEffect(() => {
    if (!endpoint) return undefined;

    const id = ++requestId.current;

    const timer = setTimeout(async () => {
      setLoading(true);

      const result = await get(`${endpoint}${endpoint.includes("?") ? "&" : "?"}${queryString}`);

      if (id !== requestId.current) return;

      if (result.success) {
        const list = Array.isArray(result.data) ? result.data : [];

        setRows(list);
        setMeta({
          total: result.pagination?.total ?? list.length,
          totalPages: result.pagination?.totalPages ?? 1,
        });
      } else {
        setRows([]);
      }

      setLoading(false);
    }, debounce);

    return () => clearTimeout(timer);
  }, [endpoint, queryString, tick, get, debounce]);

  const refresh = useCallback(() => setTick((value) => value + 1), []);

  return {
    rows,
    loading,
    meta,
    page: pageState.page,
    limit: pageState.limit,
    search,
    filters,
    refresh,
    onSearch: (value) => {
      setSearch(value);
      setPageState((current) => ({ ...current, page: 1 }));
    },
    onFilter: (key, value) => {
      setFilters((current) => ({ ...current, [key]: value }));
      setPageState((current) => ({ ...current, page: 1 }));
    },
    onPageChange: (page) => setPageState((current) => ({ ...current, page })),
    onLimitChange: (limit) => setPageState({ page: 1, limit }),
  };
};

export default usePaginated;
