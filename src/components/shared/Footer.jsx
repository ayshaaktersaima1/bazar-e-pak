import { serverApi } from "@/lib/server";
import Image from "next/image";
import Link from "next/link";

import {
    FaFacebookF,
    FaInstagram,
    FaPhoneAlt,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";

import AnalyticsLink from "@/components/shared/AnalyticsLink";

const Footer = async () => {
    let rows = [];

    try {
        const result = await serverApi.get(
            "/api/settings/public",
            {},
            {
                auth: false,
            },
        );

        rows = Array.isArray(result) ? result : [];
    } catch {
        rows = [];
    }

    const siteSetting = rows.find((item) => item.key === "site");
    const contactSetting = rows.find((item) => item.key === "contact");

    const site = siteSetting?.value || {};
    const contact = contactSetting?.value || {};

    const siteName = site.siteName || "Bazar-e-Pak";

    const tagline =
        site.tagline || "Trusted Digital Marketplace of Pakistan.";

    const phoneNumber = contact.phone || "03260882255";
    const whatsappDisplay = contact.whatsapp || "03260882255";
    const address = contact.address || "All Over Pakistan";

    const whatsappNumber = whatsappDisplay.startsWith("0")
        ? `92${whatsappDisplay.slice(1)}`
        : whatsappDisplay.replace("+", "");

    return (
        <footer className="bg-[#001B08] text-base text-white md:text-lg">

            {/* Top Contact Section */}
            <div className="border-b border-[#E8BB44]/20">
                <div className="mx-auto grid w-[90%] gap-6 py-7 md:grid-cols-3">

                    {/* Call */}
                    <AnalyticsLink
                        href={`tel:${phoneNumber}`}
                        eventType="CALL_CLICK"
                        source="footer_contact"
                        className="flex items-center gap-4"
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44] transition hover:bg-[#E8BB44] hover:text-[#001B08]">
                            <FaPhoneAlt />
                        </div>

                        <div>
                            <h3 className="font-semibold transition hover:text-[#E8BB44]">
                                {phoneNumber}
                            </h3>

                            <p className="text-sm text-gray-300">
                                Mon - Sun: 9:00 AM - 9:00 PM
                            </p>
                        </div>
                    </AnalyticsLink>

                    {/* WhatsApp */}
                    <AnalyticsLink
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        eventType="WHATSAPP_CLICK"
                        source="footer_contact"
                        className="flex items-center gap-4"
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-xl text-[#E8BB44] transition hover:bg-[#E8BB44] hover:text-[#001B08]">
                            <FaWhatsapp />
                        </div>

                        <div>
                            <h3 className="font-semibold transition hover:text-[#E8BB44]">
                                {whatsappDisplay}
                            </h3>

                            <p className="text-sm text-gray-300">
                                Contact us for quick assistance
                            </p>
                        </div>
                    </AnalyticsLink>

                    {/* Location */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-xl text-[#E8BB44]">
                            <FaLocationDot />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                {address}
                            </h3>

                            <p className="text-sm text-gray-300">
                                Fast Delivery Nationwide
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="mx-auto grid w-[90%] gap-10 py-10 md:grid-cols-2 lg:grid-cols-4">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/logo.webp"
                            alt={siteName}
                            width={110}
                            height={110}
                            className="h-24 w-24 object-contain"
                        />

                        <div>
                            <h2 className="font-semibold">
                                {siteName}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-300">
                                {tagline}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 flex gap-3">

                        {/* WhatsApp */}
                        <AnalyticsLink
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            eventType="WHATSAPP_CLICK"
                            source="footer_social"
                            aria-label="Chat on WhatsApp"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44] transition hover:bg-[#E8BB44] hover:text-[#001B08]"
                        >
                            <FaWhatsapp />
                        </AnalyticsLink>

                        {/* Facebook */}
                        <Link
                            href="#"
                            aria-label="Facebook"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44] transition hover:bg-[#E8BB44] hover:text-[#001B08]"
                        >
                            <FaFacebookF />
                        </Link>

                        {/* Instagram */}
                        <Link
                            href="#"
                            aria-label="Instagram"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44] transition hover:bg-[#E8BB44] hover:text-[#001B08]"
                        >
                            <FaInstagram />
                        </Link>

                        {/* YouTube */}
                        <Link
                            href="#"
                            aria-label="YouTube"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44] transition hover:bg-[#E8BB44] hover:text-[#001B08]"
                        >
                            <FaYoutube />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <nav className="flex flex-col items-start gap-3">
                    <h6 className="font-semibold text-[#E8BB44]">
                        Quick Links
                    </h6>

                    <Link href="/" className="link link-hover">
                        Home
                    </Link>

                    <Link
                        href="/products"
                        className="link link-hover"
                    >
                        All Products
                    </Link>

                    <Link
                        href="/categories"
                        className="link link-hover"
                    >
                        Categories
                    </Link>

                    <Link
                        href="/about"
                        className="link link-hover"
                    >
                        About Us
                    </Link>

                    <AnalyticsLink
                        href={`tel:${phoneNumber}`}
                        eventType="CALL_CLICK"
                        source="footer_quick_links"
                        className="link link-hover"
                    >
                        Call Us
                    </AnalyticsLink>
                </nav>

                {/* Customer Service */}
                <nav className="flex flex-col items-start gap-3">
                    <h6 className="font-semibold text-[#E8BB44]">
                        Customer Service
                    </h6>

                    <Link
                        href="/orders"
                        className="link link-hover"
                    >
                        My Orders
                    </Link>

                    <Link
                        href="/returns"
                        className="link link-hover"
                    >
                        Returns & Refunds
                    </Link>

                    <Link
                        href="/shipping-policy"
                        className="link link-hover"
                    >
                        Shipping Policy
                    </Link>

                    <Link
                        href="/terms"
                        className="link link-hover"
                    >
                        Terms & Conditions
                    </Link>

                    <Link
                        href="/privacy-policy"
                        className="link link-hover"
                    >
                        Privacy Policy
                    </Link>
                </nav>

                {/* Newsletter */}
                <form>
                    <h6 className="font-semibold text-[#E8BB44]">
                        Newsletter
                    </h6>

                    <p className="mt-3 text-sm leading-6 text-gray-300">
                        Get the latest updates and offers straight to your inbox.
                    </p>

                    <div className="join mt-5 w-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input join-item w-full bg-white text-base text-[#001B08] outline-none"
                        />

                        <button
                            type="submit"
                            className="btn join-item border-[#E8BB44] bg-[#E8BB44] text-[#001B08] hover:border-[#d6a936] hover:bg-[#d6a936]"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>

            {/* Copyright */}
            <div className="border-t border-[#E8BB44]/20">
                <p className="mx-auto w-[90%] py-5 text-center text-sm text-gray-300">
                    © {new Date().getFullYear()} {siteName}. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;