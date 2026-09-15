"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../../lib/auth-client";

const DASHBOARD_ROUTES = {
  seller: "/dashboard/seller",
  admin: "/dashboard/admin",
  super_admin: "/dashboard/superadmin",
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    const role = String(session?.user?.role ?? "customer")
      .trim()
      .toLowerCase();

    const dashboardRoute = DASHBOARD_ROUTES[role];

    if (dashboardRoute) {
      router.replace(dashboardRoute);
      return;
    }

    // Customer or unknown role → no dashboard
    router.replace("/");
  }, [session, status, router]);

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <p className="text-sm text-zinc-500">Redirecting...</p>
    </div>
  );
}