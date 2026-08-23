
import AllShopsTable from "@/components/admin/AllShopsTable";
import { getData } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const AllShops = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    const shops = await getData("/api/shops", token);

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Shop Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    All Shops
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    View and manage all registered shops.
                </p>
            </div>

            <AllShopsTable shops={shops} />
        </div>
    );
};

export default AllShops;