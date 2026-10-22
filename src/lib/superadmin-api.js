import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const json = (body, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

// Only a signed-in `super_admin` may call the backup/restore routes. Everyone else (including `admin`) is refused.
export const requireSuperAdmin = async (request) => {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) return { error: json({ success: false, message: "Unauthorized" }, 401) };

  if (session.user.role !== "super_admin") return { error: json({ success: false, message: "Forbidden - Super Admin only" }, 403) };

  if (request.method !== "GET") {
    const origin = request.headers.get("origin");

    if (origin && new URL(origin).host !== request.headers.get("host")) {
      return { error: json({ success: false, message: "Cross-origin request refused" }, 403) };
    }
  }

  return { session };
};
