import AllAdminsTable from "@/features/dashboard/superadmin/admins/all-admins-table";

const AdminsPage = () => {
    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    User Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Admin Management
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Manage admin accounts, permissions,
                    access status, and roles.
                </p>
            </div>

            <AllAdminsTable />
        </div>
    );
};

export default AdminsPage;