"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import DataTable from "@/features/dashboard/common/table/data-table";
import ManageUserModal from "@/features/dashboard/superadmin/users/manage-user-modal";
import useApi from "@/hooks/use-api";

import { getUserColumns } from "./user-columns";

const AllUsersTable = ({
    users,
    currentRole,
    currentUserId,
}) => {
    const { patch } = useApi();

    const [loadingId, setLoadingId] =
        useState(null);

    const [manageUser, setManageUser] =
        useState(null);

    const [selectedRole, setSelectedRole] =
        useState("");

    const [
        selectedPermissions,
        setSelectedPermissions,
    ] = useState([]);

    const [
        savingManage,
        setSavingManage,
    ] = useState(false);

    const isSuperAdmin =
        currentRole === "super_admin";

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
                        : "User suspended successfully",
            },
        );

        setLoadingId(null);

        if (!result.success) {
            return;
        }

        window.location.reload();
    };

    const openManageUser = (user) => {
        setManageUser(user);

        setSelectedRole(
            user.role,
        );

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

    const togglePermission = (
        permission,
    ) => {
        setSelectedPermissions(
            (current) =>
                current.includes(permission)
                    ? current.filter(
                        (item) =>
                            item !== permission,
                    )
                    : [
                        ...current,
                        permission,
                    ],
        );
    };

    const saveUserManagement =
        async () => {
            if (!manageUser) return;

            setSavingManage(true);

            try {
                let finalRole =
                    manageUser.role;

                if (
                    selectedRole !==
                    manageUser.role
                ) {
                    const roleResult =
                        await patch(
                            `/api/users/${manageUser._id}/role`,
                            {
                                role: selectedRole,
                            },
                            {},
                            {
                                showSuccess:
                                    false,
                            },
                        );

                    if (
                        !roleResult.success
                    ) {
                        return;
                    }

                    finalRole =
                        selectedRole;
                }

                if (
                    finalRole ===
                    "admin"
                ) {
                    const permissionResult =
                        await patch(
                            `/api/users/${manageUser._id}/permissions`,
                            {
                                permissions:
                                    selectedPermissions,
                            },
                            {},
                            {
                                showSuccess:
                                    false,
                            },
                        );

                    if (
                        !permissionResult.success
                    ) {
                        return;
                    }
                }

                toast.success(
                    "User updated successfully",
                );

                setManageUser(null);

                window.location.reload();
            } finally {
                setSavingManage(false);
            }
        };

    const columns =
        getUserColumns({
            onStatusChange:
                handleStatusChange,
            loadingId,
            currentRole,
            currentUserId,
            onManage:
                openManageUser,
        });

    return (
        <>
            <DataTable
                columns={columns}
                data={users}
                emptyMessage="No users found."
            />

            <ManageUserModal
                open={
                    Boolean(manageUser) &&
                    isSuperAdmin
                }
                user={manageUser}
                selectedRole={
                    selectedRole
                }
                setSelectedRole={
                    setSelectedRole
                }
                selectedPermissions={
                    selectedPermissions
                }
                togglePermission={
                    togglePermission
                }
                loading={
                    savingManage
                }
                onClose={
                    closeManageUser
                }
                onSave={
                    saveUserManagement
                }
            />
        </>
    );
};

export default AllUsersTable;