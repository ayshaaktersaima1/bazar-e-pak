import AllSellerApplicationsTable from "@/features/dashboard/superadmin/seller-applications/all-seller-applications-table";

const SellerApplicationsPage = () => {
    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Seller Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Seller Applications
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Review and manage businesses applying
                    to become PakBazaar sellers.
                </p>
            </div>

            <AllSellerApplicationsTable />
        </div>
    );
};

export default SellerApplicationsPage;