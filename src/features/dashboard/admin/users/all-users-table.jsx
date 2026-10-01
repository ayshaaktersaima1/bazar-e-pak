"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import DataTable from "@/features/dashboard/common/table/data-table";
import ManageUserModal from "@/features/dashboard/superadmin/users/manage-user-modal";
import useApi from "@/hooks/use-api";

import { getUserColumns } from "./user-columns";

const userFilters = [
    {
        key: "role",
        label: "All Roles",
        options: [
            { label: "Customer", value: "customer" },
            { label: "Seller", value: "seller" },
            { label: "Admin", value: "admin" },
            { label: "Super Admin", value: "super_admin" },
        ],
    },
    {
        key: "status",
        label: "All Statuses",
        options: [
            { label: "Active", value: "active" },
            { label: "Suspended", value: "suspended" },
            { label: "Banned", value: "banned" },
        ],
    },
];

const AllUsersTable = ({
    currentRole,
    currentUserId,
}) => {
    const { get, patch } = useApi();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        role: "",
        status: "",
    });

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
    });

    const [loadingId, setLoadingId] = useState(null);
    const [manageUser, setManageUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [savingManage, setSavingManage] = useState(false);

    const isSuperAdmin = currentRole === "super_admin";

    const fetchUsers = useCallback(
        async ({
            page,
            limit,
            searchValue,
            roleValue,
            statusValue,
        }) => {
            try {
                setLoading(true);

                const params = new URLSearchParams();

                params.set("page", String(page));
                params.set("limit", String(limit));

                if (searchValue.trim()) {
                    params.set("search", searchValue.trim());
                }

                if (roleValue) {
                    params.set("role", roleValue);
                }

                if (statusValue) {
                    params.set("status", statusValue);
                }

                const result = await get(
                    `/api/users?${params.toString()}`,
                );

                if (!result?.success) {
                    return;
                }

                const userList = Array.isArray(result.data)
                    ? result.data
                    : [];

                setUsers(userList);

                setPagination((current) => ({
                    ...current,
                    page: result.pagination?.page ?? page,
                    limit: result.pagination?.limit ?? limit,
                    total: result.pagination?.total ?? userList.length,
                    totalPages: result.pagination?.totalPages ?? 1,
                }));
            } finally {
                setLoading(false);
            }
        },
        [get],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers({
                page: pagination.page,
                limit: pagination.limit,
                searchValue: search,
                roleValue: filters.role,
                statusValue: filters.status,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [
        fetchUsers,
        search,
        filters.role,
        filters.status,
        pagination.page,
        pagination.limit,
    ]);

    const handleSearch = (value) => {
        setSearch(value);

        setPagination((current) => ({
            ...current,
            page: 1,
        }));
    };

    const handleFilter = (key, value) => {
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

    const refreshUsers = async () => {
        await fetchUsers({
            page: pagination.page,
            limit: pagination.limit,
            searchValue: search,
            roleValue: filters.role,
            statusValue: filters.status,
        });
    };

    const handleStatusChange = async (
        userId,
        status,
    ) => {
        setLoadingId(userId);

        const result = await patch(
            `/api/users/${userId}/status`,
            {
                status,
                isBlocked: status !== "active",
            },
            {},
            {
                showSuccess: true,
                successMessage:
                    status === "active"
                        ? "User activated successfully"
                        : "User deactivated successfully",
            },
        );

        setLoadingId(null);

        if (!result?.success) {
            return;
        }

        await refreshUsers();
    };

    const openManageUser = (user) => {
        setManageUser(user);
        setSelectedRole(user.role);

        setSelectedPermissions(
            Array.isArray(user.permissions)
                ? user.permissions
                : [],
        );
    };

    const closeManageUser = () => {
        if (savingManage) return;

        setManageUser(null);
        setSelectedRole("");
        setSelectedPermissions([]);
    };

    const togglePermission = (permission) => {
        setSelectedPermissions((current) =>
            current.includes(permission)
                ? current.filter(
                    (item) => item !== permission,
                )
                : [...current, permission],
        );
    };

    const saveUserManagement = async () => {
        if (!manageUser) return;

        setSavingManage(true);

        try {
            let finalRole = manageUser.role;

            if (selectedRole !== manageUser.role) {
                const roleResult = await patch(
                    `/api/users/${manageUser._id}/role`,
                    {
                        role: selectedRole,
                    },
                    {},
                    {
                        showSuccess: false,
                    },
                );

                if (!roleResult?.success) {
                    return;
                }

                finalRole = selectedRole;
            }

            if (finalRole === "admin") {
                const permissionResult = await patch(
                    `/api/users/${manageUser._id}/permissions`,
                    {
                        permissions: selectedPermissions,
                    },
                    {},
                    {
                        showSuccess: false,
                    },
                );

                if (!permissionResult?.success) {
                    return;
                }
            }

            toast.success("User updated successfully.");

            setManageUser(null);

            await refreshUsers();
        } finally {
            setSavingManage(false);
        }
    };

    const columns = getUserColumns({
        onStatusChange: handleStatusChange,
        loadingId,
        currentRole,
        currentUserId,
        onManage: openManageUser,
    });

    return (
        <>
            <DataTable
                columns={columns}
                data={users}
                meta={pagination}
                search
                searchValue={search}
                onSearch={handleSearch}
                searchPlaceholder="Search users..."
                filters={userFilters}
                filterValues={filters}
                onFilter={handleFilter}
                page={pagination.page}
                limit={pagination.limit}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                loading={loading}
                emptyMessage="No users found."
                pageSizeOptions={[10, 20, 50, 100]}
            />

            <ManageUserModal
                open={Boolean(manageUser) && isSuperAdmin}
                user={manageUser}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                loading={savingManage}
                onClose={closeManageUser}
                onSave={saveUserManagement}
            />
        </>
    );
};

export default AllUsersTable;