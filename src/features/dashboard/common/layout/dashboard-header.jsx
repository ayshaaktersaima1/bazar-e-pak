"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiChevronRight } from "react-icons/bi";

import { SidebarTrigger } from "./dashboard-sidebar";
import { useSession } from "@/lib/auth-client";
import AvatarDropdown from "@/components/shared/AvatarDropdown";

function buildCrumbs(pathname, labels) {
    const segments = pathname
        .split("/")
        .filter(Boolean);

    let href = "";

    return segments.map(
        (segment, index) => {
            href += `/${segment}`;

            const isLast =
                index ===
                segments.length - 1;

            const label =
                labels?.[href] ??
                segment.replace(
                    /-/g,
                    " ",
                );

            return {
                href,
                label,
                isLast,
            };
        },
    );
}

export function DashboardHeader({
    title,
    actions,
    labels,
}) {
    const pathname = usePathname();

    const crumbs = buildCrumbs(
        pathname,
        labels,
    );

    const { data: session } =
        useSession();

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[#D9A928]/20 bg-white/95 px-4 backdrop-blur">
            <SidebarTrigger className="md:hidden" />

            <div className="min-w-0 flex-1">
                {title ? (
                    <h1 className="truncate text-sm font-semibold text-[#002B12]">
                        {title}
                    </h1>
                ) : (
                    <ol className="flex items-center gap-1 overflow-x-auto text-sm">
                        {crumbs.map(
                            (crumb) => (
                                <li
                                    key={
                                        crumb.href
                                    }
                                    className="flex items-center gap-1 whitespace-nowrap"
                                >
                                    {crumb.isLast ? (
                                        <span className="font-semibold capitalize text-[#002B12]">
                                            {
                                                crumb.label
                                            }
                                        </span>
                                    ) : (
                                        <>
                                            <Link
                                                href={
                                                    crumb.href
                                                }
                                                className="capitalize text-[#68756D] transition-colors hover:text-[#D9A928]"
                                            >
                                                {
                                                    crumb.label
                                                }
                                            </Link>

                                            <BiChevronRight className="h-3.5 w-3.5 text-[#AAB4AE]" />
                                        </>
                                    )}
                                </li>
                            ),
                        )}
                    </ol>
                )}
            </div>

            {actions && (
                <div className="flex shrink-0 items-center gap-2">
                    {actions}
                </div>
            )}

            <AvatarDropdown
                variant="dashboard"
                user={session?.user}
            />
        </header>
    );
}