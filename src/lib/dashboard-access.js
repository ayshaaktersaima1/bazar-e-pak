import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";

// Server-side page guard. The backend remains the real authority; this only avoids rendering pages
// the current account can never use.
export const getSessionOrRedirect = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/login");

  return session;
};

export const requireRole = async (...roles) => {
  const session = await getSessionOrRedirect();

  if (!roles.includes(session.user.role)) redirect("/dashboard");

  return session;
};

export const getAdminPermissions = async (session) => {
  try {
    const params = new URLSearchParams({ search: session.user.email, role: "admin", limit: "10" });
    const result = await serverApi.get(`/api/users?${params.toString()}`);
    const users = Array.isArray(result) ? result : [];
    const current = users.find(
      (item) => String(item._id) === String(session.user.id) || item.email === session.user.email,
    );

    return Array.isArray(current?.permissions) ? current.permissions : [];
  } catch {
    return [];
  }
};

// admin → must hold `permission`; super_admin → always allowed.
export const requireAdminPermission = async (permission, { adminOnly = false } = {}) => {
  const session = await requireRole(...(adminOnly ? ["admin"] : ["admin", "super_admin"]));

  if (session.user.role === "super_admin") return { session, permissions: [], isSuperAdmin: true };

  const permissions = await getAdminPermissions(session);

  if (!permissions.includes(permission)) redirect("/dashboard/admin");

  return { session, permissions, isSuperAdmin: false };
};

// Which finance actions the current account may use (UI hints only; the backend enforces them).
export const getFinanceCaps = (isSuperAdmin, permissions = []) => {
  const has = (permission) => isSuperAdmin || permissions.includes(permission);

  return {
    viewOrders: has("orders.view"),
    view: has("payments.view"),
    manage: has("payments.manage"),
    refund: has("payments.refund"),
    settle: has("settlements.manage"),
  };
};
