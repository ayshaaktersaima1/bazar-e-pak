"use client";

import { DashboardHeader } from "../../../components/dashboard/dashboard-header";
import {
  DashboardSidebar,
  SidebarProvider,
} from "../../../components/dashboard/dashboard-sidebar";
import { defaultRole } from "../../../data/dashboard";
import { useSession } from "../../../lib/auth-client";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const role = session?.user?.role ?? defaultRole;

  if (status === "loading") {
    return (
      <div className="flex h-svh items-center justify-center text-sm text-zinc-500">
        Loading…
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-svh bg-zinc-50">
        <DashboardSidebar role={role} />
        <div className="flex min-h-svh flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
