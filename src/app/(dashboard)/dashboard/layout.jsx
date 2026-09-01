"use client";

import { DashboardHeader } from "@/features/dashboard/common/layout/dashboard-header";
import {
  DashboardSidebar,
  SidebarProvider,
} from "@/features/dashboard/common/layout/dashboard-sidebar";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DASHBOARD_ROLES = ["seller", "admin", "superadmin"];

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const role = String(session?.user?.role ?? "")
    .trim()
    .toLowerCase();

  useEffect(() => {
    if (status === "loading") return;

    // Not logged in
    if (!session?.user) {
      router.replace("/login");
      return;
    }

    // Customer / invalid role → no dashboard
    if (!DASHBOARD_ROLES.includes(role)) {
      router.replace("/");
    }
  }, [session, status, role, router]);

  if (status === "loading") {
    return (
      <div className="flex h-svh items-center justify-center bg-[#F7F8F6] text-sm text-[#5F6B63]">
        Loading...
      </div>
    );
  }

  // Don't render dashboard UI for customer/invalid role
  if (!session?.user || !DASHBOARD_ROLES.includes(role)) {
    return null;
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
