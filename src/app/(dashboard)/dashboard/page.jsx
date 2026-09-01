"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../../lib/auth-client";

const DASHBOARD_ROLES = ["seller", "admin", "superadmin"];

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    const role = String(session?.user?.role ?? "customer")
      .trim()
      .toLowerCase();

    if (DASHBOARD_ROLES.includes(role)) {
      router.replace(`/dashboard/${role}`);
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