"use client";

import {
    useEffect,
    useState,
} from "react";

import useApi from "@/hooks/use-api";
import DataTable from "@/features/dashboard/common/table/data-table";

import {
    adminFilters,
    getAdminColumns,
} from "./admin-columns";

import AdminPermissionsModal from "./admin-permissions-modal";
import PromoteAdminModal from "./promote-admin-modal";
import AdminActionConfirmModal from "./admin-action-confirm-modal";

const AllAdminsTable = () => {
    const {
        get,
        patch,
        loading,
    } = useApi();

    const [admins, setAdmins] =
        useState([]);

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
        selectedAdmin,
        setSelectedAdmin,
    ] = useState(null);

    const [
        promoteModalOpen,
        setPromoteModalOpen,
    ] = useState(false);

    const [
        pendingAction,
        setPendingAction,
    ] = useState(null);

    const [loadingId, setLoadingId] =
        useState(null);

    useEffect(() => {
        const timer = setTimeout(
            async () => {
                const params =
                    new URLSearchParams();

                params.set(
                    "role",
                    "admin",
                );

                params.set(
                    "page",
                    String(
                        pagination.page,
                    ),
                );

                params.set(
                    "limit",
                    String(
                        pagination.limit,
                    ),
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
                    `/api/users?${params.toString()}`,
                );

                if (!result.success) {
                    return;
                }

                setAdmins(
                    Array.isArray(result.data)
                        ? result.data
                        : [],
                );

                if (result.pagination) {
                    setPagination(
                        (current) => ({
                            ...current,
                            ...result.pagination,
                        }),
                    );
                }
            },
            300,
        );

        return () => {
            clearTimeout(timer);
        };
    }, [
        get,
        search,
        filters.status,
        pagination.page,
        pagination.limit,
    ]);

    const refreshAdmins = async () => {
        const params =
            new URLSearchParams();

        params.set(
            "role",
            "admin",
        );

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
            `/api/users?${params.toString()}`,
        );

        if (!result.success) {
            return;
        }

        setAdmins(
            Array.isArray(result.data)
                ? result.data
                : [],
        );

        if (result.pagination) {
            setPagination(
                (current) => ({
                    ...current,
                    ...result.pagination,
                }),
            );
        }
    };

    const handleSearch = (value) => {
        setSearch(value);

        setPagination(
            (current) => ({
                ...current,
                page: 1,
            }),
        );
    };

    const handleFilter = (
        key,
        value,
    ) => {
        setFilters(
            (current) => ({
                ...current,
                [key]: value,
            }),
        );

        setPagination(
            (current) => ({
                ...current,
                page: 1,
            }),
        );
    };

    const handlePageChange = (page) => {
        setPagination(
            (current) => ({
                ...current,
                page,
            }),
        );
    };

    const handleLimitChange = (
        limit,
    ) => {
        setPagination(
            (current) => ({
                ...current,
                page: 1,
                limit,
            }),
        );
    };

    const handlePermissionsSubmit =
        async (payload) => {
            if (!selectedAdmin?._id) {
                return;
            }

            const id =
                selectedAdmin._id;

            setLoadingId(id);

            const result = await patch(
                `/api/users/${id}/permissions`,
                payload,
                {},
                {
                    showSuccess: true,
                    successMessage:
                        "Admin permissions updated successfully",
                },
            );

            setLoadingId(null);

            if (!result.success) {
                return;
            }

            setSelectedAdmin(null);

            await refreshAdmins();
        };

    const handleStatusChange =
        (admin, status) => {
            if (!admin?._id) {
                return;
            }

            setPendingAction({
                type: "status",
                admin,
                status,
                title:
                    status === "active"
                        ? "Activate Admin"
                        : "Suspend Admin",
                message:
                    status === "active"
                        ? `Are you sure you want to activate ${admin.name}?`
                        : `Are you sure you want to suspend ${admin.name}?`,
                confirmLabel:
                    status === "active"
                        ? "Activate"
                        : "Suspend",
            });
        };

    const handleRoleChange =
        (admin, role) => {
            if (
                !admin?._id ||
                !role
            ) {
                return;
            }

            setPendingAction({
                type: "role",
                admin,
                role,
                title: "Change Admin Role",
                message: `Change ${admin.name}'s role from admin to ${role}?`,
                confirmLabel:
                    "Change Role",
            });
        };

    const handlePromoteAdmin =
        (user) => {
            if (!user?._id) {
                return;
            }

            // Close the search/promote modal first
            setPromoteModalOpen(false);

            // Then open confirmation modal after
            // the first DaisyUI dialog has closed
            setTimeout(() => {
                setPendingAction({
                    type: "promote",
                    user,
                    title:
                        "Promote User to Admin",
                    message: `Are you sure you want to promote ${user.name} to Admin?`,
                    confirmLabel:
                        "Promote",
                });
            }, 150);
        };

    const confirmAction =
        async () => {
            if (!pendingAction) {
                return;
            }

            if (
                pendingAction.type ===
                "status"
            ) {
                const {
                    admin,
                    status,
                } = pendingAction;

                setLoadingId(admin._id);

                const result =
                    await patch(
                        `/api/users/${admin._id}/status`,
                        {
                            status,
                            isBlocked:
                                status !==
                                "active",
                        },
                        {},
                        {
                            showSuccess: true,
                            successMessage:
                                status ===
                                    "active"
                                    ? "Admin activated successfully"
                                    : "Admin suspended successfully",
                        },
                    );

                setLoadingId(null);

                if (!result.success) {
                    return;
                }

                setPendingAction(null);

                await refreshAdmins();

                return;
            }

            if (
                pendingAction.type ===
                "role"
            ) {
                const {
                    admin,
                    role,
                } = pendingAction;

                setLoadingId(admin._id);

                const result =
                    await patch(
                        `/api/users/${admin._id}/role`,
                        {
                            role,
                        },
                        {},
                        {
                            showSuccess: true,
                            successMessage:
                                "User role updated successfully",
                        },
                    );

                setLoadingId(null);

                if (!result.success) {
                    return;
                }

                setPendingAction(null);

                await refreshAdmins();

                return;
            }

            if (
                pendingAction.type ===
                "promote"
            ) {
                const { user } =
                    pendingAction;

                setLoadingId(user._id);

                const result =
                    await patch(
                        `/api/users/${user._id}/role`,
                        {
                            role: "admin",
                        },
                        {},
                        {
                            showSuccess: true,
                            successMessage:
                                "User promoted to Admin successfully",
                        },
                    );

                setLoadingId(null);

                if (!result.success) {
                    return;
                }

                setPendingAction(null);

                await refreshAdmins();
            }
        };

    const columns =
        getAdminColumns({
            onManagePermissions:
                setSelectedAdmin,
            onStatusChange:
                handleStatusChange,
            onRoleChange:
                handleRoleChange,
            loadingId,
        });

    return (
        <>
            <div className="mb-4 flex justify-end">
                <button
                    type="button"
                    onClick={() =>
                        setPromoteModalOpen(
                            true,
                        )
                    }
                    className="rounded-lg bg-[#002B12] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00451E]"
                >
                    Promote User to Admin
                </button>
            </div>

            <DataTable
                columns={columns}
                data={admins}
                meta={pagination}
                search
                searchValue={search}
                onSearch={handleSearch}
                searchPlaceholder="Search admins..."
                filters={adminFilters}
                filterValues={filters}
                onFilter={handleFilter}
                page={pagination.page}
                limit={pagination.limit}
                onPageChange={
                    handlePageChange
                }
                onLimitChange={
                    handleLimitChange
                }
                loading={loading}
                emptyMessage="No admins found."
                pageSizeOptions={[
                    10,
                    20,
                    50,
                    100,
                ]}
            />

            {selectedAdmin && (
                <AdminPermissionsModal
                    admin={
                        selectedAdmin
                    }
                    loading={
                        loadingId ===
                        selectedAdmin._id
                    }
                    onClose={() =>
                        setSelectedAdmin(
                            null,
                        )
                    }
                    onSubmit={
                        handlePermissionsSubmit
                    }
                />
            )}

            <PromoteAdminModal
                open={
                    promoteModalOpen
                }
                loading={
                    Boolean(loadingId)
                }
                onClose={() =>
                    setPromoteModalOpen(
                        false,
                    )
                }
                onPromote={
                    handlePromoteAdmin
                }
            />

            <AdminActionConfirmModal
                open={
                    Boolean(
                        pendingAction,
                    )
                }
                title={
                    pendingAction?.title
                }
                message={
                    pendingAction?.message
                }
                confirmLabel={
                    pendingAction?.confirmLabel
                }
                loading={
                    Boolean(loadingId)
                }
                onClose={() =>
                    setPendingAction(
                        null,
                    )
                }
                onConfirm={
                    confirmAction
                }
            />
        </>
    );
};

export default AllAdminsTable;