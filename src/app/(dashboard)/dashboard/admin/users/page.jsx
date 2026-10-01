import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";

import AllUsersTable from "@/features/dashboard/admin/users/all-users-table";

const AllUsers = async () => {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const params = new URLSearchParams();

  params.set("search", session.user.email);
  params.set("role", "admin");
  params.set("limit", "10");

  const adminResponse = await serverApi.get(
    `/api/users?${params.toString()}`,
    {},
    {
      auth: true,
      includeMeta: true,
    },
  );

  const adminUsers = Array.isArray(adminResponse?.data)
    ? adminResponse.data
    : Array.isArray(adminResponse)
      ? adminResponse
      : [];

  const currentUser = adminUsers.find(
    (user) =>
      String(user._id) === String(session.user.id) ||
      user.email === session.user.email,
  );

  const permissions = Array.isArray(currentUser?.permissions)
    ? currentUser.permissions
    : [];

  if (!permissions.includes("users.view")) {
    redirect("/dashboard/admin");
  }

  const usersResponse = await serverApi.get(
    "/api/users?page=1&limit=20",
    {},
    {
      auth: true,
      includeMeta: true,
    },
  );

  return (
    <div className="bg-[#F7F5EF] p-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
          User Management
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
          All Users
        </h1>

        <p className="mt-2 text-sm text-[#4B5563]">
          View and manage permitted user accounts.
        </p>
      </div>

      <AllUsersTable
        users={usersResponse?.data ?? []}
        currentRole="admin"
        currentUserId={session.user.id}
      />
    </div>
  );
};

export default AllUsers;