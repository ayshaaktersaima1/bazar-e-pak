import AllCategoriesTable from "@/components/admin/AllCategoriesTable";
import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
import { headers } from "next/headers";

const AllCategories = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    const categories = await getData(
        "/api/categories?limit=100",
        token
    );

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Category Management
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                        All Categories
                    </h1>

                    <p className="mt-2 text-sm text-[#4B5563]">
                        Add, edit, or remove product categories.
                    </p>
                </div>
            </div>

            <AllCategoriesTable categories={categories} />
        </div>
    );
};

export default AllCategories;