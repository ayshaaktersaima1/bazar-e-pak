import Image from "next/image";
import Link from "next/link";
import {
    FaBars,
    FaShoppingCart,
    FaWhatsapp,
} from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-[#001B08] text-base text-white md:text-lg">
            <div className="navbar mx-auto w-[90%] px-0 py-2">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* Mobile Dropdown */}
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost px-2 text-white lg:hidden"
                        >
                            <FaBars className="text-xl" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content z-50 mt-3 w-60 gap-2 rounded-md bg-[#001B08] p-4 text-base shadow-lg md:text-lg"
                        >
                            <li>
                                <Link className="text-[#E8BB44]" href="/">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link href="/products">All Products</Link>
                            </li>

                            <li>
                                <details>
                                    <summary>Categories</summary>

                                    <ul className="mt-2 gap-2 bg-[#001B08] p-2">
                                        <li>
                                            <Link href="/products/honey">
                                                Pure Forest Honey
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href="/products/mehak-collection">
                                                Mehak Collection
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href="/products/mobile-accessories">
                                                Mobile Accessories
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href="/products/furniture">
                                                Best Furniture
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <li>
                                <Link href="/about">About Us</Link>
                            </li>

                            <li>
                                <Link href="/why-choose-us">
                                    Why Choose Us
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/images/logo.webp"
                            alt="Bazaar E Pak"
                            width={110}
                            height={110}
                            className="h-16 w-16 object-contain md:h-20 md:w-20 lg:h-24 lg:w-24"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center md:gap-5 xl:gap-10 px-1 text-base xl:text-lg font-medium">
                        <li>
                            <Link
                                href="/"
                                className="rounded-none border-b-2 border-[#E8BB44] text-[#E8BB44]"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link href="/products">All Products</Link>
                        </li>

                        <li>
                            <details>
                                <summary>Categories</summary>

                                <ul className="z-50 mt-3 w-60 gap-2 rounded-md bg-[#001B08] p-3 shadow-lg">
                                    <li>
                                        <Link href="/products/honey">
                                            Pure Forest Honey
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/products/mehak-collection">
                                            Mehak Collection
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/products/mobile-accessories">
                                            Mobile Accessories
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/products/furniture">
                                            Best Furniture
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>

                        <li>
                            <Link href="/about">About Us</Link>
                        </li>

                        <li>
                            <Link href="/why-choose-us">
                                Why Choose Us
                            </Link>
                        </li>

                        <li>
                            <Link href="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-2 md:gap-3">
                    <Link
                        href="https://wa.me/923326688403"
                        target="_blank"
                        className="btn btn-circle btn-ghost text-[#E8BB44]"
                        aria-label="Contact on WhatsApp"
                    >
                        <FaWhatsapp className="text-2xl md:text-3xl" />
                    </Link>

                    <Link
                        href="/cart"
                        className="btn btn-circle btn-ghost text-[#E8BB44]"
                        aria-label="Shopping cart"
                    >
                        <FaShoppingCart className="text-2xl md:text-3xl" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;