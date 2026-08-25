"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  DashboardSidebar,
  SidebarProvider,
} from "@/components/dashboard/dashboard-sidebar";
import { defaultRole } from "@/data/dashboard";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  const role = session?.user?.role ?? defaultRole;

  if (status === "loading") {
    return (
      <div className="flex h-svh items-center justify-center bg-[#F7F8F6] text-sm text-[#5F6B63]">
        Loading...
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-svh bg-[#F7F8F6] text-[#1F2A23]">
        <DashboardSidebar role={role} />

        <div className="flex min-h-svh min-w-0 flex-1 flex-col">
          <DashboardHeader />

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
