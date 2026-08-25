"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PanelLeft, LogOut, Settings, ChevronDown } from "lucide-react";
import { dashboardNav, defaultRole } from "@/data/dashboard";
import { useSession, authClient } from "../../lib/auth-client";
import Image from "next/image";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");

    const onChange = () => {
      setIsMobile(mql.matches);
    };

    onChange();
    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setTimeout(() => {
        setMobileOpen(false);
      }, 0);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen((value) => !value);
    } else {
      setCollapsed((value) => !value);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        mobileOpen,
        setMobileOpen,
        isMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }

  return context;
}

export function SidebarTrigger({ className = "" }) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-[#D9A928] transition-all hover:bg-[#D9A928]/10 ${className}`}
      aria-label="Toggle sidebar"
    >
      <PanelLeft className="h-4 w-4" />
    </button>
  );
}

function NavTooltip({ label, targetRef, show }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!show || !targetRef.current) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();

      setPosition({
        left: rect.right + 10,
        top: rect.top + rect.height / 2,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);

    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);

      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [show, targetRef]);

  if (!show || !position) return null;

  return createPortal(
    <span
      className="pointer-events-none fixed z-[9999] whitespace-nowrap rounded-md bg-[#002B12] px-2.5 py-1.5 text-xs font-medium leading-4 text-white shadow-lg"
      style={{
        left: position.left,
        top: position.top,
        transform: "translateY(-50%)",
      }}
    >
      {label}
    </span>,
    document.body,
  );
}

function SidebarTopBar({ collapsed, toggleSidebar }) {
  return (
    <div
      className={`group relative flex h-20 items-center border-b border-[#D9A928]/20 ${
        collapsed ? "justify-center" : "justify-between px-3"
      }`}
    >
      {!collapsed ? (
        <>
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold text-[#F0B92E]"
          >
            <Image
              src="/images/logo.webp"
              width={150}
              height={150}
              alt="Bazar-e-Pak"
              className="h-14 w-14 object-contain"
            />

            <span>Bazar-e-Pak</span>
          </Link>

          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D9A928]/30 bg-[#003817] text-[#D9A928] transition-all hover:border-[#D9A928] hover:bg-[#D9A928] hover:text-[#002B12]"
            aria-label="Collapse sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </>
      ) : (
        <div className="relative h-14 w-14 shrink-0">
          <Link
            href="/"
            className="absolute inset-0 z-10 flex h-14 w-14 items-center justify-center rounded-full transition-opacity group-hover:opacity-0"
          >
            <Image
              src="/images/logo.webp"
              width={150}
              height={150}
              alt="Bazar-e-Pak"
              className="h-14 w-14 object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            className="absolute inset-0 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#002B12] text-[#D9A928] opacity-0 transition-opacity group-hover:opacity-100"
          >
            <PanelLeft className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}

function AccountHeader({ collapsed }) {
  const { data: session } = useSession();
  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-4 ${
        collapsed ? "justify-center" : ""
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#D9A928] bg-[#D9A928] text-xs font-semibold text-[#002B12]">
        {user?.image ? (
          <img
            src={user.image}
            alt={user?.name ?? "Account"}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {!collapsed && (
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {user?.name ?? "Account"}
          </p>

          <p className="truncate text-xs text-[#B7C4BC]">
            {user?.email ?? "—"}
          </p>
        </div>
      )}
    </div>
  );
}

function NavItem({ item, collapsed, active, pathname }) {
  const Icon = item.icon;
  const linkRef = useRef(null);

  const hasChildren = item.children?.length > 0;

  const childActive = hasChildren
    ? item.children.some(
        (child) =>
          pathname === child.href || pathname.startsWith(`${child.href}/`),
      )
    : false;

  const [open, setOpen] = useState(childActive);

  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    if (childActive) {
      setTimeout(() => setOpen(true), 0);
    }
  }, [childActive]);

  if (hasChildren && !collapsed) {
    return (
      <li className="list-none">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-sm font-medium transition-all ${
            childActive
              ? "bg-[#D9A928]/10 text-[#F0B92E]"
              : "text-[#E8E8E8] hover:bg-[#D9A928]/10 hover:text-[#F0B92E]"
          }`}
        >
          <Icon className="h-[18px] w-[18px] shrink-0" />

          <span className="flex-1 truncate text-left">{item.label}</span>

          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-200 ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="ml-5 mt-1 space-y-1 border-l border-[#D9A928]/20 pl-2">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={`flex items-center rounded-md px-3 py-2 text-sm transition-all ${
                      pathname === child.href
                        ? "bg-[#D9A928] font-medium text-[#002B12]"
                        : "text-[#B7C4BC] hover:bg-[#D9A928]/10 hover:text-[#F0B92E]"
                    }`}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  }

  if (hasChildren && collapsed) {
    return (
      <li className="group relative list-none">
        <button
          ref={linkRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          className={`flex w-full items-center justify-center rounded-md px-2.5 py-2.5 transition-all ${
            childActive
              ? "bg-[#D9A928] text-[#002B12]"
              : "text-[#E8E8E8] hover:bg-[#D9A928]/10 hover:text-[#F0B92E]"
          }`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </button>

        <NavTooltip
          label={item.label}
          targetRef={linkRef}
          show={tooltipVisible}
        />

        {open && (
          <div className="absolute left-[calc(100%+8px)] top-0 z-[999] min-w-48 rounded-lg border border-[#D9A928]/20 bg-[#002B12] p-2 shadow-xl">
            <p className="px-2 py-1.5 text-xs font-semibold text-[#D9A928]">
              {item.label}
            </p>

            <ul className="space-y-1">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      pathname === child.href
                        ? "bg-[#D9A928] text-[#002B12]"
                        : "text-[#E8E8E8] hover:bg-[#D9A928]/10 hover:text-[#F0B92E]"
                    }`}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    );
  }

  return (
    <li className="group relative list-none">
      <Link
        ref={linkRef}
        href={item.href}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className={`flex items-center gap-3 rounded-md px-2.5 py-2.5 text-sm font-medium transition-all ${
          active
            ? "bg-[#D9A928] text-[#002B12] shadow-sm"
            : "text-[#E8E8E8] hover:bg-[#D9A928]/10 hover:text-[#F0B92E]"
        } ${collapsed ? "justify-center" : ""}`}
      >
        <Icon className="h-[18px] w-[18px] shrink-0" />

        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>

      <NavTooltip
        label={item.label}
        targetRef={linkRef}
        show={collapsed && tooltipVisible}
      />
    </li>
  );
}

function SignOutButton({ collapsed }) {
  const router = useRouter();
  const buttonRef = useRef(null);

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <li className="group relative list-none">
      <button
        type="button"
        ref={buttonRef}
        onClick={handleSignOut}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-sm font-medium text-[#E8E8E8] transition-all hover:bg-red-500/10 hover:text-red-400 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <LogOut className="h-[18px] w-[18px] shrink-0" />

        {!collapsed && <span>Sign Out</span>}
      </button>

      <NavTooltip
        label="Sign Out"
        targetRef={buttonRef}
        show={collapsed && tooltipVisible}
      />
    </li>
  );
}

function SidebarBody({ collapsed, toggleSidebar, role, pathname, onNavigate }) {
  const sections = dashboardNav[role] ?? dashboardNav[defaultRole];

  const settingsHref = `/dashboard/${role}/settings`;

  return (
    <div className="flex h-full flex-col bg-[#002B12]">
      <SidebarTopBar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <div className="border-b border-[#D9A928]/20">
        <AccountHeader collapsed={collapsed} />
      </div>

      <nav
        className="flex-1 space-y-5 overflow-y-auto px-2 py-4"
        onClick={onNavigate}
      >
        {sections.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p className="px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D9A928]">
                {section.section}
              </p>
            )}

            <ul className="space-y-1">
              {section.items.map((item) => (
                <NavItem
                  key={item.href ?? item.label}
                  item={item}
                  collapsed={collapsed}
                  pathname={pathname}
                  active={pathname === item.href}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#D9A928]/20 px-2 py-3">
        <ul className="space-y-1">
          <NavItem
            item={{
              label: "Settings",
              href: settingsHref,
              icon: Settings,
            }}
            collapsed={collapsed}
            active={pathname === settingsHref}
            pathname={pathname}
          />

          <SignOutButton collapsed={collapsed} />
        </ul>
      </div>
    </div>
  );
}

export function DashboardSidebar({ role = defaultRole }) {
  const { collapsed, toggleSidebar, isMobile, mobileOpen, setMobileOpen } =
    useSidebar();

  const pathname = usePathname();

  if (isMobile) {
    return (
      <>
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-[#001A0A]/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-[#D9A928]/20 bg-[#002B12] shadow-2xl transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarBody
            collapsed={false}
            toggleSidebar={toggleSidebar}
            role={role}
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        </aside>
      </>
    );
  }

  return (
    <aside
      className={`sticky top-0 hidden h-svh shrink-0 border-r border-[#D9A928]/20 bg-[#002B12] shadow-[4px_0_20px_rgba(0,0,0,0.08)] transition-[width] duration-200 md:block ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <SidebarBody
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        role={role}
        pathname={pathname}
      />
    </aside>
  );
}
