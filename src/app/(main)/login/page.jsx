"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    FaGoogle,
    FaMotorcycle,
    FaShieldAlt,
    FaShoppingBag,
    FaStore,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        setIsSubmitting(true);

        const { error } = await authClient.signIn.email({
            email: user?.email,
            password: user?.password,
        });

        if (error) {
            alert(error.message);
            setIsSubmitting(false);
            return;
        }

        alert("Login successful!");

        router.push("/");
    };

    return (
        <main className="relative min-h-screen bg-[#F7F5EF]">
            {/* Left Background */}
            <div className="absolute bottom-0 left-0 top-0 hidden overflow-hidden lg:block lg:w-[42%] xl:w-[48%]">
                <Image
                    src="/images/test.png"
                    alt=""
                    fill
                    priority
                    className="object-cover object-left"
                />
            </div>

            {/* Website Content */}
            <div className="relative mx-auto grid min-h-screen w-[90%] items-start gap-4 py-10 lg:grid-cols-[38%_1fr] xl:grid-cols-[42%_1fr] xl:gap-8">
                {/* Left Content */}
                <div className="relative z-10 hidden lg:block">
                    <div className="max-w-[300px] xl:max-w-md">
                        <h1 className="text-3xl font-bold leading-tight text-white xl:text-4xl">
                            Welcome Back to <br />

                            <span className="text-[#E8BB44]">
                                Bazaar E Pak
                            </span>
                        </h1>

                        <div className="mt-5 h-1 w-14 bg-[#E8BB44]" />

                        <p className="mt-5 text-sm leading-6 text-gray-200 xl:text-base xl:leading-7 w-80">
                            Login to continue shopping, manage your store or
                            handle deliveries from your account.
                        </p>

                        {/* Benefits */}
                        <div className="mt-8 space-y-5">
                            <div className="flex items-start gap-3 xl:gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                                    <FaShoppingBag />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        Continue Shopping
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-gray-300">
                                        Access your cart, orders and favourite
                                        products.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 xl:gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                                    <FaStore />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        Manage Your Store
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-gray-300">
                                        Access your store, products and orders
                                        anytime.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 xl:gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                                    <FaMotorcycle />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        Manage Deliveries
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-gray-300">
                                        Riders can view and manage their
                                        delivery activities.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 xl:gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                                    <FaShieldAlt />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        Safe & Secure
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-gray-300">
                                        Your account and information stay
                                        protected.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="min-w-0 w-full">
                    <div className="w-full">
                        {/* Register Link */}
                        <div className="mb-5 flex items-center justify-end gap-3 text-sm">
                            <span className="text-gray-600">
                                Don&apos;t have an account?
                            </span>

                            <Link
                                href="/register"
                                className="rounded-md border border-[#001B08] px-4 py-2 font-semibold text-[#001B08] transition hover:bg-[#001B08] hover:text-white"
                            >
                                Register
                            </Link>
                        </div>

                        {/* Login Form */}
                        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-[#001B08] sm:text-3xl">
                                    Login to Your Account
                                </h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    Enter your details to continue
                                </p>
                            </div>

                            <form onSubmit={onSubmit} className="mt-8">
                                {/* Email */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-[#001B08]">
                                        Email Address
                                    </legend>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        className="input w-full border border-gray-300 bg-white text-[#001B08] focus:border-[#E8BB44] focus:outline-none"
                                        required
                                    />
                                </fieldset>

                                {/* Password */}
                                <fieldset className="fieldset mt-4">
                                    <legend className="fieldset-legend text-[#001B08]">
                                        Password
                                    </legend>

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="input w-full border border-gray-300 bg-white text-[#001B08] focus:border-[#E8BB44] focus:outline-none"
                                        required
                                    />
                                </fieldset>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn mt-6 w-full border-none bg-[#001B08] text-white hover:bg-[#E8BB44] hover:text-[#001B08]"
                                >
                                    {isSubmitting
                                        ? "Logging in..."
                                        : "Login"}
                                </button>

                                {/* Divider */}
                                <div className="my-5 flex items-center gap-3">
                                    <span className="h-px flex-1 bg-gray-200" />

                                    <span className="text-sm text-gray-500">
                                        or continue with
                                    </span>

                                    <span className="h-px flex-1 bg-gray-200" />
                                </div>

                                {/* Google */}
                                <button
                                    type="button"
                                    className="btn w-full border border-gray-300 bg-white text-[#001B08] shadow-none hover:border-[#E8BB44] hover:bg-white"
                                >
                                    <FaGoogle />
                                    Continue with Google
                                </button>

                                {/* Demo Credentials */}
                                <div className="mt-6 rounded-xl border border-[#E8BB44]/40 bg-[#F7F5EF] p-4">
                                    <h3 className="text-center font-semibold text-[#001B08]">
                                        Demo Credentials
                                    </h3>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-lg border border-gray-200 bg-white p-3">
                                            <p className="font-semibold text-[#001B08]">
                                                Customer
                                            </p>

                                            <p className="mt-1 text-sm text-gray-600">
                                                customer@demo.com
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                Demo1234
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-gray-200 bg-white p-3">
                                            <p className="font-semibold text-[#001B08]">
                                                Store Owner
                                            </p>

                                            <p className="mt-1 text-sm text-gray-600">
                                                owner@demo.com
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                Demo1234
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-gray-200 bg-white p-3">
                                            <p className="font-semibold text-[#001B08]">
                                                Rider
                                            </p>

                                            <p className="mt-1 text-sm text-gray-600">
                                                rider@demo.com
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                Demo1234
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-gray-200 bg-white p-3">
                                            <p className="font-semibold text-[#001B08]">
                                                Admin
                                            </p>

                                            <p className="mt-1 text-sm text-gray-600">
                                                admin@demo.com
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                Demo1234
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Register */}
                                <p className="mt-6 text-center text-sm text-gray-600 lg:hidden">
                                    Don&apos;t have an account?{" "}

                                    <Link
                                        href="/register"
                                        className="font-semibold text-[#001B08]"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;