import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
import { headers } from "next/headers";
import AllUsersTable from "../../../../../features/dashboard/admin/users/all-users-table";

const AllUsers = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const users = await getData("/api/users", token);

  return (
    <div className="bg-[#F7F5EF] p-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
          User Management
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#001B08]">All Users</h1>

        <p className="mt-2 text-sm text-[#4B5563]">
          View all registered users.
        </p>
      </div>

      <AllUsersTable users={users} />
    </div>
  );
};

export default AllUsers;
