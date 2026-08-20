
"use client";

import { useSession } from "../../../lib/auth-client";

export default function DashboardPage() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "there";

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-zinc-900">
          Welcome back, {name}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          This is your dashboard overview. Replace this block with real widgets
          per role.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 bg-white p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Stat {i}
            </p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}

