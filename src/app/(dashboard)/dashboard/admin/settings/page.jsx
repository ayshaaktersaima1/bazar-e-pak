import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import AdminSettingsForm from "@/features/dashboard/admin/settings/admin-settings-form";

const AdminSettingsPage = async () => {
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

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Account Settings
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Settings
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Manage your admin profile and account security.
                </p>
            </div>

            <AdminSettingsForm
                user={{
                    name: session.user.name ?? "",
                    email: session.user.email ?? "",
                    image: session.user.image ?? "",
                }}
            />
        </div>
    );
};

export default AdminSettingsPage;