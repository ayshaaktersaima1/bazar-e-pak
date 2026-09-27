"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaWhatsapp } from "react-icons/fa";

import CartButton from "./CartButton";
import ProductSearch from "./ProductSearch";
import AvatarDropdown from "./AvatarDropdown";
import AnalyticsLink from "./AnalyticsLink";

import { useSession } from "../../lib/auth-client";
import { useCategory } from "@/hooks/use-categories";
import useApi from "@/hooks/use-api";

import { navLinks, authNavLinks } from "@/data/navbar";

const Navbar = ({ needAuth = true }) => {
    const { data: session } = useSession();
    const user = session?.user;

    const { categories } = useCategory();
    const api = useApi();

    const [whatsappNumber, setWhatsappNumber] =
        useState("923260882255");

    const pathname = usePathname();
    const navbarRef = useRef(null);

    const activeLinkClass =
        "border-b border-[#E8BB44] text-[#E8BB44]";

    const defaultLinkClass =
        "border-b border-transparent text-white";

    const getLinkClass = (href) =>
        pathname === href
            ? activeLinkClass
            : defaultLinkClass;

    const isCollectionActive =
        pathname?.startsWith("/collection");

    const isShopsActive =
        pathname?.startsWith("/shops");

    const closeDropdowns = () => {
        document.activeElement?.blur();

        navbarRef.current
            ?.querySelectorAll("details[open]")
            ?.forEach((details) => {
                details.removeAttribute("open");
            });
    };

    useEffect(() => {
        closeDropdowns();
    }, [pathname]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                !navbarRef.current?.contains(
                    event.target,
                )
            ) {
                closeDropdowns();
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick,
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick,
            );
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            const result = await api.get(
                "/api/settings/public",
                {},
                {
                    auth: false,
                    showError: false,
                },
            );

            if (
                !result?.success ||
                !Array.isArray(result.data)
            ) {
                return;
            }

            const contactSetting =
                result.data.find(
                    (item) => item.key === "contact",
                );

            const savedWhatsapp =
                contactSetting?.value?.whatsapp;

            if (!savedWhatsapp) return;

            const cleaned = String(savedWhatsapp)
                .replace(/\s+/g, "")
                .replace(/-/g, "")
                .replace(/\+/g, "");

            if (cleaned.startsWith("0")) {
                setWhatsappNumber(
                    `92${cleaned.slice(1)}`,
                );
            } else {
                setWhatsappNumber(cleaned);
            }
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const visibleNavLinks = navLinks.filter(
        (link) => {
            if (link.auth === "authenticated") {
                return !!user;
            }

            if (link.auth === "guest") {
                return !user;
            }

            return true;
        },
    );

    const visibleAuthLinks = needAuth
        ? authNavLinks.filter((link) => {
              if (link.auth === "guest") {
                  return !user;
              }

              if (
                  link.auth === "authenticated"
              ) {
                  return !!user;
              }

              return true;
          })
        : [];

    const renderNavItems = (isMobile = false) => (
        <>
            {visibleNavLinks.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        onClick={closeDropdowns}
                        className={`
                            ${link.href === "/shops"
                                ? isShopsActive
                                    ? activeLinkClass
                                    : defaultLinkClass
                                : getLinkClass(link.href)}
                            block
                            rounded-none
                            px-2
                            py-2
                            transition-colors
                            duration-200
                            hover:text-[#E8BB44]
                        `}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}

            {/* Categories */}
            <li>
                <details>
                    <summary
                        className={`
                            cursor-pointer
                            rounded-none
                            px-2
                            py-2
                            transition-colors
                            duration-200
                            hover:text-[#E8BB44]
                            ${
                                isCollectionActive
                                    ? activeLinkClass
                                    : defaultLinkClass
                            }
                        `}
                    >
                        Categories
                    </summary>

                    <ul
                        className={
                            isMobile
                                ? "mt-2 max-h-72 gap-1 overflow-y-auto rounded-md bg-[#001B08] p-2"
                                : "z-50 mt-3 max-h-[70vh] w-60 gap-1 overflow-y-auto rounded-md bg-[#001B08] p-3 text-base shadow-xl"
                        }
                    >
                        {categories?.map(
                            (category) => (
                                <li
                                    key={
                                        category?._id
                                    }
                                >
                                    <Link
                                        href={`/collection/${category?.slug}`}
                                        onClick={
                                            closeDropdowns
                                        }
                                        className={`
                                            block
                                            rounded-md
                                            px-3
                                            py-2
                                            transition-colors
                                            duration-200
                                            ${
                                                pathname ===
                                                `/collection/${category?.slug}`
                                                    ? "bg-[#E8BB44] text-[#001B08]"
                                                    : "text-white hover:bg-white/10 hover:text-[#E8BB44]"
                                            }
                                        `}
                                    >
                                        {
                                            category?.name
                                        }
                                    </Link>
                                </li>
                            ),
                        )}
                    </ul>
                </details>
            </li>

            {/* Auth Links */}
            {visibleAuthLinks.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        onClick={closeDropdowns}
                        className={`
                            ${getLinkClass(link.href)}
                            block
                            rounded-none
                            px-2
                            py-2
                            transition-colors
                            duration-200
                            hover:text-[#E8BB44]
                        `}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <nav
            ref={navbarRef}
            className="sticky top-0 z-50 w-full bg-[#001B08] text-white"
        >
            <div
                className="
                    mx-auto
                    flex
                    min-h-16
                    w-full
                    max-w-[1600px]
                    items-center
                    gap-2
                    px-3
                    sm:min-h-[72px]
                    sm:px-4
                    md:px-5
                    lg:min-h-20
                    lg:px-6
                    xl:px-8
                    2xl:px-10
                "
            >
                {/* ==================== */}
                {/* Logo + Mobile Menu */}
                {/* ==================== */}

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                    {/* Mobile Menu */}
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            aria-label="Open navigation menu"
                            className="
                                btn
                                btn-ghost
                                h-10
                                min-h-10
                                w-10
                                px-0
                                text-white
                                hover:bg-white/10
                                sm:h-11
                                sm:min-h-11
                                sm:w-11
                            "
                        >
                            <FaBars className="text-lg sm:text-xl" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="
                                menu
                                menu-sm
                                dropdown-content
                                left-0
                                z-50
                                mt-3
                                w-[calc(100vw-24px)]
                                max-w-[360px]
                                gap-1
                                rounded-lg
                                border
                                border-white/10
                                bg-[#001B08]
                                p-3
                                text-base
                                shadow-2xl
                                sm:w-[360px]
                                sm:p-4
                            "
                        >
                            <li className="mb-2 block">
                                <ProductSearch />
                            </li>

                            {renderNavItems(true)}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={closeDropdowns}
                        className="block shrink-0"
                    >
                        <Image
                            src="/images/logo.webp"
                            alt="Bazaar E Pak"
                            width={110}
                            height={110}
                            className="
                                h-12
                                w-12
                                object-contain
                                sm:h-14
                                sm:w-14
                                md:h-16
                                md:w-16
                                lg:h-[72px]
                                lg:w-[72px]
                                xl:h-20
                                xl:w-20
                            "
                            priority
                        />
                    </Link>
                </div>

                {/* ==================== */}
                {/* Desktop Navigation */}
                {/* ==================== */}

                <div
                    className="
                        hidden
                        min-w-0
                        flex-1
                        items-center
                        justify-center
                        lg:flex
                    "
                >
                    <ul
                        className="
                            menu
                            menu-horizontal
                            flex-nowrap
                            items-center
                            justify-center
                            gap-1
                            whitespace-nowrap
                            px-0
                            text-sm
                            font-medium
                            xl:gap-2
                            xl:text-base
                            2xl:gap-3
                            2xl:text-lg
                        "
                    >
                        {renderNavItems(false)}
                    </ul>
                </div>

                {/* ==================== */}
                {/* Right Actions */}
                {/* ==================== */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-end
                        gap-1
                        sm:gap-2
                    "
                >
                    {/* Desktop Search */}
                    <div
                        className="
                            hidden
                            min-w-0
                            lg:block
                            lg:w-[160px]
                            xl:w-[200px]
                            2xl:w-[240px]
                        "
                    >
                        <ProductSearch />
                    </div>

                    {/* WhatsApp */}
                    <AnalyticsLink
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        eventType="WHATSAPP_CLICK"
                        source="navbar"
                        className="
                            btn
                            btn-circle
                            btn-ghost
                            h-9
                            min-h-9
                            w-9
                            shrink-0
                            px-0
                            text-[#E8BB44]
                            hover:bg-white/10
                            sm:h-10
                            sm:min-h-10
                            sm:w-10
                            md:h-11
                            md:min-h-11
                            md:w-11
                        "
                        aria-label="Contact on WhatsApp"
                    >
                        <FaWhatsapp className="text-lg sm:text-xl md:text-2xl" />
                    </AnalyticsLink>

                    {/* Cart */}
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            sm:h-10
                            sm:w-10
                            md:h-11
                            md:w-11
                        "
                    >
                        <CartButton />
                    </div>

                    {/* User */}
                    {user && (
                        <div className="shrink-0">
                            <AvatarDropdown
                                user={user}
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;