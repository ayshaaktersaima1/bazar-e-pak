"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarTrigger } from "./dashboard-sidebar";
import { BiChevronRight } from "react-icons/bi";

import { useSession } from "../../lib/auth-client";
import AvatarDropdown from "../shared/AvatarDropdown";

// Turns "/dashboard/products/new" into Dashboard / Products / New
function buildCrumbs(pathname, labels) {
  const segments = pathname.split("/").filter(Boolean);
  let href = "";

  return segments.map((segment, i) => {
    href += `/${segment}`;
    const isLast = i === segments.length - 1;
    const label = labels?.[href] ?? segment.replace(/-/g, " ");
    return { href, label, isLast };
  });
}

// title/actions are optional overrides, breadcrumbs are derived from the URL
export function DashboardHeader({ title, actions, labels }) {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname, labels);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur">
      {/* <SidebarTrigger className="md:hidden" /> */}
      <SidebarTrigger className="md:hidden sm:hidden cursor-pointer"></SidebarTrigger>

      <div className="min-w-0 flex-1">
        {title ? (
          <h1 className="truncate text-sm font-semibold text-zinc-900">
            {title}
          </h1>
        ) : (
          <ol className="flex items-center gap-1 overflow-x-auto text-sm">
            {crumbs.map((crumb) => (
              <li
                key={crumb.href}
                className="flex items-center gap-1 whitespace-nowrap"
              >
                {crumb.isLast ? (
                  <span className="font-semibold capitalize text-zinc-900">
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="capitalize text-zinc-500 "
                    >
                      {crumb.label}
                    </Link>
                    <BiChevronRight className="h-3.5 w-3.5 text-zinc-300" />
                  </>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}

      <AvatarDropdown variant="dashboard" user={session?.user} />
    </header>
  );
}
