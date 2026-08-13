"use client";

import categories from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { FaBars, FaSearch, FaShoppingCart, FaWhatsapp } from "react-icons/fa";

const Navbar = ({ needAuth = false }) => {
  const pathname = usePathname();
  const navbarRef = useRef(null);

  const activeLinkClass =
    "rounded-none border-b border-[#E8BB44] text-[#E8BB44]";

  const defaultLinkClass =
    "rounded-none border-b border-transparent text-white";

  const getLinkClass = (href) =>
    pathname === href ? activeLinkClass : defaultLinkClass;

  const isCollectionActive = pathname?.startsWith("/collection");
  const isShopsActive = pathname?.startsWith("/shops");

  const closeDropdowns = () => {
    document.activeElement?.blur();

    navbarRef.current?.querySelectorAll("details[open]")?.forEach((details) => {
      details?.removeAttribute("open");
    });
  };

  useEffect(() => {
    closeDropdowns();
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!navbarRef.current?.contains(event.target)) {
        closeDropdowns();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    { href: "/shops", label: "Shops" },
    { href: "/about", label: "About Us" },
  ];

  const renderNavItems = (isMobile = false) => (
    <>
      {navLinks.slice(0, 3).map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={closeDropdowns}
            className={
              link.href === "/shops"
                ? isShopsActive
                  ? activeLinkClass
                  : defaultLinkClass
                : getLinkClass(link.href)
            }
          >
            {link.label}
          </Link>
        </li>
      ))}

      <li>
        <details>
          <summary
            className={isCollectionActive ? activeLinkClass : defaultLinkClass}
          >
            Categories
          </summary>

          <ul
            className={`${
              isMobile
                ? "mt-2 gap-2 bg-[#001B08] p-2"
                : "z-50 mt-3 w-60 gap-2 rounded-md bg-[#001B08] p-3 text-base shadow-lg"
            }`}
          >
            {categories?.map((category) => (
              <li key={category?.id}>
                <Link
                  href={category?.href}
                  onClick={closeDropdowns}
                  className={
                    pathname === category?.href
                      ? "rounded-md bg-[#E8BB44] text-[#001B08]"
                      : "rounded-md text-white"
                  }
                >
                  {category?.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </li>

      <li>
        <Link
          href={navLinks[3].href}
          onClick={closeDropdowns}
          className={getLinkClass(navLinks[3].href)}
        >
          {navLinks[3].label}
        </Link>
      </li>

      {needAuth && (
        <>
          <li>
            <Link
              href="/login"
              onClick={closeDropdowns}
              className={getLinkClass("/login")}
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              href="/register"
              onClick={closeDropdowns}
              className={getLinkClass("/register")}
            >
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav
      ref={navbarRef}
      className="sticky top-0 z-50 bg-[#001B08] text-base text-white md:text-lg"
    >
      <div className="mx-auto grid w-[90%] grid-cols-[auto_1fr_auto] items-center gap-2 py-2 lg:gap-1 xl:gap-4">
        {/* Left: Mobile Menu and Logo */}
        <div className="flex items-center">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost px-2 text-white"
            >
              <FaBars className="text-xl" />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-50 mt-3 w-72 gap-2 rounded-md bg-[#001B08] p-4 text-base shadow-lg md:text-lg"
            >
              {/* Mobile Search UI */}
              <li className="mb-2 block">
                <div className="grid w-full grid-cols-[1fr_auto]">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="h-11 min-w-0 rounded-l-md border border-r-0 border-[#E8BB44] bg-white px-3 text-sm text-[#001B08] outline-none"
                  />

                  <button
                    type="button"
                    aria-label="Search products"
                    className="flex h-11 w-12 shrink-0 items-center justify-center rounded-r-md bg-[#E8BB44] text-[#001B08]"
                  >
                    <FaSearch className="text-base" />
                  </button>
                </div>
              </li>

              {renderNavItems(true)}
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" onClick={closeDropdowns} className="block">
            <Image
              src="/images/logo.webp"
              alt="Bazaar E Pak"
              width={110}
              height={110}
              className="h-16 w-16 object-contain md:h-20 md:w-20 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
              priority
            />
          </Link>
        </div>

        {/* Middle: Desktop Navigation */}
        <div className="hidden min-w-0 justify-center lg:flex">
          <ul className="menu menu-horizontal flex-nowrap items-center gap-0 whitespace-nowrap px-0 text-base font-medium lg:gap-5 lg:text-lg">
            {renderNavItems(false)}
          </ul>
        </div>

        {/* Right: Search and Icons */}
        <div className="flex items-center justify-end gap-1 md:gap-2">
          {/* Desktop Search UI */}
          <div className="hidden shrink-0 lg:flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-32 rounded-l-md border border-r-0 border-[#E8BB44] bg-white px-3 py-2 text-sm text-[#001B08] outline-none xl:w-52"
            />

            <button
              type="button"
              aria-label="Search products"
              className="flex w-11 shrink-0 items-center justify-center rounded-r-md bg-[#E8BB44] text-[#001B08] transition hover:bg-white"
            >
              <FaSearch />
            </button>
          </div>

          <Link
            href="https://wa.me/923260882255"
            target="_blank"
            className="btn btn-circle btn-ghost text-[#E8BB44]"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp className="text-2xl xl:text-3xl" />
          </Link>

          <Link
            href="/cart"
            onClick={closeDropdowns}
            className="btn btn-circle btn-ghost text-[#E8BB44]"
            aria-label="Shopping cart"
          >
            <FaShoppingCart className="text-2xl xl:text-3xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
