"use client";


import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { FaBars, FaWhatsapp } from "react-icons/fa";
import CartButton from "./CartButton";
import ProductSearch from "./ProductSearch";
import AvatarDropdown from "./AvatarDropdown";
import { useSession } from "../../lib/auth-client";
import { useCategory } from "@/hooks/use-categories";

const Navbar = ({ needAuth = true }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const { categories } = useCategory();

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
      details.removeAttribute("open");
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
            className={
              isMobile
                ? "mt-2 gap-2 bg-[#001B08] p-2"
                : "z-50 mt-3 w-60 gap-2 rounded-md bg-[#001B08] p-3 text-base shadow-lg"
            }
          >
            {categories?.map((category) => (
              <li key={category?._id}>
                <Link
                  href={`/collection/${category?.slug}`}
                  onClick={closeDropdowns}
                  className={
                    pathname === `/collection/${category?.slug}`
                      ? "rounded-md bg-[#E8BB44] text-[#001B08]"
                      : "rounded-md text-white"
                  }
                >
                  {category?.name}
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

      {needAuth && !user && (
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
      className="sticky top-0 z-50 bg-[#001B08] text-white"
    >
      <div className="mx-auto flex min-h-20 w-[92%] max-w-[1600px] items-center justify-between gap-2 py-1.5 sm:gap-3 lg:gap-4">
        <div className="flex min-w-0 shrink-0 items-center">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost h-10 min-h-10 w-10 px-0 text-white sm:h-11 sm:min-h-11 sm:w-11"
            >
              <FaBars className="text-lg sm:text-xl" />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-50 mt-3 w-[calc(100vw-32px)] max-w-72 gap-2 rounded-md bg-[#001B08] p-4 text-base shadow-lg sm:text-lg"
            >
              <li className="mb-2 block">
                <ProductSearch />
              </li>

              {renderNavItems(true)}
            </ul>
          </div>

          <Link href="/" onClick={closeDropdowns} className="block shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Bazaar E Pak"
              width={110}
              height={110}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-[72px] md:w-[72px] lg:h-20 lg:w-20 xl:h-24 xl:w-24"
              priority
            />
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <ul className="menu menu-horizontal flex-nowrap items-center gap-2 whitespace-nowrap px-0 text-sm font-medium xl:gap-4 xl:text-base 2xl:gap-5 2xl:text-lg">
            {renderNavItems(false)}
          </ul>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
          <div className="hidden w-[180px] shrink-0 lg:block xl:w-[220px] 2xl:w-[250px]">
            <ProductSearch />
          </div>

          <Link
            href="https://wa.me/923260882255"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-ghost h-10 min-h-10 w-10 shrink-0 px-0 text-[#E8BB44] sm:h-11 sm:min-h-11 sm:w-11"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp className="text-xl sm:text-2xl" />
          </Link>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11">
            <CartButton />
          </div>

          {user && <AvatarDropdown user={user} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;