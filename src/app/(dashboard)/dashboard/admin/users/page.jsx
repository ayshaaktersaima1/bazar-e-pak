import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AllUsersTable from "../../../../../features/dashboard/admin/users/all-users-table";

const AllUsers = async () => {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  const users = await getData(
    "/api/users",
    token,
  );

  const currentUser = users.find(
    (user) =>
      String(user._id) === String(session?.user?.id) ||
      user.email === session?.user?.email,
  );

  const role = session?.user?.role;

  const hasUsersPermission =
    role === "super_admin" ||
    currentUser?.permissions?.includes("users.view");

  if (!hasUsersPermission) {
    redirect("/dashboard/admin");
  }

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
        users={users}
        currentRole={role}
        currentUserId={session?.user?.id}
      />
    </div>
  );
};

export default AllUsers;