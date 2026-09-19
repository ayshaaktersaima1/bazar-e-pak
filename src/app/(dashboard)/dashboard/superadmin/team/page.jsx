import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { auth } from "@/lib/auth";
import TeamGrid from "@/components/homepage/team/team-grid";



const SuperAdminTeamPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== "super_admin") {
        redirect("/dashboard");
    }

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Team Management
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                        Team Members
                    </h1>

                    <p className="mt-2 text-sm text-[#4B5563]">
                        Manage the team members shown on the public Team page.
                    </p>
                </div>

                <Link
                    href="/dashboard/superadmin/team/create"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D9A928] px-5 text-sm font-semibold text-[#001B08] transition hover:bg-[#E8BB44]"
                >
                    <Plus size={17} />
                    Add Team Member
                </Link>
            </div>

            <TeamGrid />
        </div>
    );
};

export default SuperAdminTeamPage;