import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AllUsersTable from "@/features/dashboard/admin/users/all-users-table";

const SuperAdminUsersPage = async () => {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (session?.user?.role !== "super_admin") {
        redirect("/dashboard");
    }

    const { token } = await auth.api.getToken({
        headers: requestHeaders,
    });

    const users = await getData(
        "/api/users",
        token,
    );

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    User Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Platform Users
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Manage user status, roles, and admin permissions.
                </p>
            </div>

            <AllUsersTable
                users={users}
                currentRole="super_admin"
                currentUserId={session?.user?.id}
            />
        </div>
    );
};

export default SuperAdminUsersPage;