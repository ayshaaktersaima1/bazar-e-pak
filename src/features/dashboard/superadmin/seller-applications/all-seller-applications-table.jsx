"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import useApi from "@/hooks/use-api";

import DataTable from "@/features/dashboard/common/table/data-table";

import {
    getSellerApplicationColumns,
    sellerApplicationFilters,
} from "./seller-application-columns";

import ReviewSellerApplicationModal from "./review-seller-application-modal";

const AllSellerApplicationsTable = () => {
    const {
        get,
        patch,
        loading,
    } = useApi();

    const [
        applications,
        setApplications,
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

    const [search, setSearch] =
        useState("");

    const [filters, setFilters] =
        useState({
            status: "",
        });

    const [
        selectedApplication,
        setSelectedApplication,
    ] = useState(null);

    const [loadingId, setLoadingId] =
        useState(null);

    const fetchApplications =
        useCallback(async () => {
            const params =
                new URLSearchParams();

            params.set(
                "page",
                String(pagination.page),
            );

            params.set(
                "limit",
                String(pagination.limit),
            );

            if (search.trim()) {
                params.set(
                    "search",
                    search.trim(),
                );
            }

            if (filters.status) {
                params.set(
                    "status",
                    filters.status,
                );
            }

            const result = await get(
                `/api/seller-applications?${params.toString()}`,
            );

            if (!result.success) {
                return;
            }

            setApplications(
                Array.isArray(result.data)
                    ? result.data
                    : [],
            );

            if (result.pagination) {
                setPagination((current) => ({
                    ...current,
                    ...result.pagination,
                }));
            }
        }, [
            get,
            search,
            filters.status,
            pagination.page,
            pagination.limit,
        ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchApplications();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [fetchApplications]);

    const handleSearch = (value) => {
        setSearch(value);

        setPagination((current) => ({
            ...current,
            page: 1,
        }));
    };

    const handleFilter = (
        key,
        value,
    ) => {
        setFilters((current) => ({
            ...current,
            [key]: value,
        }));

        setPagination((current) => ({
            ...current,
            page: 1,
        }));
    };

    const handlePageChange = (page) => {
        setPagination((current) => ({
            ...current,
            page,
        }));
    };

    const handleLimitChange = (limit) => {
        setPagination((current) => ({
            ...current,
            page: 1,
            limit,
        }));
    };

    const handleReviewSubmit =
        async (payload) => {
            if (!selectedApplication?._id) {
                return;
            }

            const id =
                selectedApplication._id;

            setLoadingId(id);

            const result = await patch(
                `/api/seller-applications/${id}`,
                payload,
                {},
                {
                    showSuccess: true,
                    successMessage:
                        "Seller application updated successfully",
                },
            );

            setLoadingId(null);

            if (!result.success) {
                return;
            }

            setSelectedApplication(null);

            await fetchApplications();
        };

    const handleSuspend =
        async (application) => {
            if (!application?._id) {
                return;
            }

            const confirmed =
                window.confirm(
                    `Suspend ${application.businessName}?`,
                );

            if (!confirmed) {
                return;
            }

            setLoadingId(application._id);

            const result = await patch(
                `/api/seller-applications/${application._id}`,
                {
                    status: "suspended",
                    rejectionReason:
                        "Seller suspended by Super Admin",
                },
                {},
                {
                    showSuccess: true,
                    successMessage:
                        "Seller suspended successfully",
                },
            );

            setLoadingId(null);

            if (!result.success) {
                return;
            }

            await fetchApplications();
        };

    const columns =
        getSellerApplicationColumns({
            onReview:
                setSelectedApplication,
            onSuspend:
                handleSuspend,
            loadingId,
        });

    return (
        <>
            <DataTable
                columns={columns}
                data={applications}
                meta={pagination}
                search
                searchValue={search}
                onSearch={handleSearch}
                searchPlaceholder="Search seller applications..."
                filters={
                    sellerApplicationFilters
                }
                filterValues={filters}
                onFilter={handleFilter}
                page={pagination.page}
                limit={pagination.limit}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                loading={loading}
                emptyMessage="No seller applications found."
                pageSizeOptions={[
                    10,
                    20,
                    50,
                    100,
                ]}
            />

            <ReviewSellerApplicationModal
                open={Boolean(
                    selectedApplication,
                )}
                application={
                    selectedApplication
                }
                loading={
                    loadingId ===
                    selectedApplication?._id
                }
                onClose={() =>
                    setSelectedApplication(null)
                }
                onSubmit={
                    handleReviewSubmit
                }
            />
        </>
    );
};

export default AllSellerApplicationsTable;