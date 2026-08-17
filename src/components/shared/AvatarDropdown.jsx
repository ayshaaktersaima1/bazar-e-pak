"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaSignOutAlt,
  FaTachometerAlt,
  FaChevronRight,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";
import { LuLayoutDashboard } from "react-icons/lu";

const AvatarDropdown = ({ user }) => {
  const router = useRouter();

  if (!user) return null;

  const name = user?.name || "User";
  const email = user?.email || "";
  const role = user?.role || "User";
  const initial = name.trim().charAt(0).toUpperCase();

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out");
        return;
      }

      toast.success("Signed out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        aria-label="Open user menu"
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#E8BB44] p-[2px] transition-transform duration-200 hover:scale-105 focus:outline-none sm:h-11 sm:w-11 cursor-pointer"
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#001B08]">
          {user?.image ? (
            <Image
              src={user.image}
              alt={name}
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-[#E8BB44] sm:text-base">
              {initial}
            </span>
          )}
        </div>
      </button>

      <div
        tabIndex={0}
        className="dropdown-content z-[100] mt-3 w-[280px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(0,0,0,0.14)]"
      >
        <div className="bg-[#001B08] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8BB44] p-[2px]">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#001B08]">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-bold text-[#E8BB44]">
                    {initial}
                  </span>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">
                {name}
              </h3>

              <p className="mt-0.5 truncate text-xs text-white/60">
                {email}
              </p>

              <span className="mt-1.5 inline-block text-[10px] font-medium uppercase tracking-wide text-[#E8BB44]">
                {role}
              </span>
            </div>
          </div>
        </div>

        <div className="p-2">
          <Link
            href="/dashboard"
            onClick={() => document.activeElement?.blur()}
            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#F7F5EF]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F7F5EF] text-[#001B08] group-hover:bg-[#E8BB44]">
              <LuLayoutDashboard/>
            </span>

            <span className="flex-1">
              <span className="block text-sm font-medium text-[#001B08]">
                Dashboard
              </span>
              <span className="block text-[11px] text-gray-400">
                Manage your account
              </span>
            </span>

            <FaChevronRight className="text-[10px] text-gray-300 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-red-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <FaSignOutAlt className="text-sm" />
            </span>

            <span>
              <span className="block text-sm font-medium text-gray-700">
                Sign Out
              </span>
              <span className="block text-[11px] text-gray-400">
                Sign out from your account
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarDropdown;