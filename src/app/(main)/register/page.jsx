"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FaGoogle,
    FaMotorcycle,
    FaShieldAlt,
    FaShoppingBag,
    FaStore,
    FaUser,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        if (user?.password !== user?.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const phoneRegex = /^03\d{9}$/;

        if (!phoneRegex.test(user?.phoneNumber)) {
            alert("Please enter a valid 11-digit Pakistani mobile number.");
            return;
        }

        const { error } = await authClient.signUp.email({
            email: user?.email,
            password: user?.password,
            name: user?.name,
            role: user?.role,
            phoneNumber: user?.phoneNumber,
        });

        if (error) {
            alert(error.message);
            return;
        }

        await authClient.signOut();

        alert("Account created successfully!");

        router.push("/login");
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
                <div className="relative z-10 hidden min-h-180 lg:block">
                    <div className="mt-8 max-w-75 xl:mt-10 xl:max-w-md">
                        <h1 className="text-3xl font-bold leading-tight text-white xl:text-4xl">
                            Join{" "}
                            <span className="text-[#E8BB44]">
                                Bazaar E Pak
                            </span>

                            <span className="block">
                                and be a part of
                            </span>

                            <span className="block">
                                something bigger.
                            </span>
                        </h1>

                        <div className="mt-5 h-1 w-14 bg-[#E8BB44]" />

                        <p className="mt-5 text-sm leading-6 text-gray-200 xl:text-base xl:leading-7">
                            Create your account and enjoy a seamless shopping,
                            selling or delivery experience with us.
                        </p>

                        {/* Benefits */}
                        <div className="mt-8 space-y-5">
                            <div className="flex items-start gap-3 xl:gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                                    <FaShoppingBag />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        Wide Range of Products
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-gray-300">
                                        Shop everything you need from trusted
                                        stores.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 xl:gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                                    <FaStore />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        Sell & Grow Your Store
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-gray-300">
                                        Start your own store and grow your
                                        business.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 xl:gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                                    <FaMotorcycle />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        Deliver & Earn
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-gray-300">
                                        Join as a rider and earn by delivering
                                        orders.
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
                        {/* Login */}
                        <div className="mb-5 flex items-center justify-end gap-3 text-sm">
                            <span className="text-gray-600">
                                Already have an account?
                            </span>

                            <Link
                                href="/login"
                                className="rounded-md border border-[#001B08] px-4 py-2 font-semibold text-[#001B08] transition hover:bg-[#001B08] hover:text-white"
                            >
                                Login
                            </Link>
                        </div>

                        {/* Form */}
                        <div className="rounded-2xl bg-white p-5 shadow-md sm:p-7 md:p-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-[#001B08] sm:text-3xl">
                                    Create Your Account
                                </h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    Choose your role and get started
                                </p>
                            </div>

                            <form onSubmit={onSubmit} className="mt-7">
                                {/* Roles */}
                                <p className="mb-3 text-sm font-semibold text-[#001B08]">
                                    I want to register as
                                </p>

                                <div className="grid gap-3 sm:grid-cols-3">
                                    {/* Customer */}
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="customer"
                                            className="peer hidden"
                                            defaultChecked
                                        />

                                        <div className="rounded-xl border-2 border-gray-200 p-4 text-center transition peer-checked:border-[#001B08] peer-checked:bg-[#001B08]/5">
                                            <FaUser className="mx-auto text-3xl text-[#001B08]" />

                                            <h3 className="mt-3 font-semibold text-[#001B08]">
                                                Customer
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Shop products from stores
                                            </p>
                                        </div>
                                    </label>

                                    {/* Store Owner */}
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="store-owner"
                                            className="peer hidden"
                                        />

                                        <div className="rounded-xl border-2 border-gray-200 p-4 text-center transition peer-checked:border-[#001B08] peer-checked:bg-[#001B08]/5">
                                            <FaStore className="mx-auto text-3xl text-[#E8BB44]" />

                                            <h3 className="mt-3 font-semibold text-[#001B08]">
                                                Store Owner
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Create and manage your store
                                            </p>
                                        </div>
                                    </label>

                                    {/* Rider */}
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="rider"
                                            className="peer hidden"
                                        />

                                        <div className="rounded-xl border-2 border-gray-200 p-4 text-center transition peer-checked:border-[#001B08] peer-checked:bg-[#001B08]/5">
                                            <FaMotorcycle className="mx-auto text-3xl text-[#001B08]" />

                                            <h3 className="mt-3 font-semibold text-[#001B08]">
                                                Rider
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Deliver orders and earn
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Name + Email */}
                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                                            Full Name
                                        </legend>

                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            className="input w-full border border-gray-300 bg-white text-[#001B08] focus:border-[#E8BB44] focus:outline-none"
                                            required
                                        />
                                    </fieldset>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
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
                                </div>

                                {/* Phone */}
                                <fieldset className="fieldset mt-3">
                                    <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                                        Phone Number
                                    </legend>

                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="03XXXXXXXXX"
                                        inputMode="numeric"
                                        pattern="03[0-9]{9}"
                                        maxLength={11}
                                        className="input w-full border border-gray-300 bg-white text-[#001B08] placeholder:text-gray-400 focus:border-[#E8BB44] focus:outline-none"
                                        required
                                    />
                                </fieldset>

                                {/* Password */}
                                <fieldset className="fieldset mt-3">
                                    <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
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

                                {/* Confirm Password */}
                                <fieldset className="fieldset mt-3">
                                    <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                                        Confirm Password
                                    </legend>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        className="input w-full border border-gray-300 bg-white text-[#001B08] focus:border-[#E8BB44] focus:outline-none"
                                        required
                                    />
                                </fieldset>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="btn mt-6 w-full border-none bg-[#001B08] text-white hover:bg-[#E8BB44] hover:text-[#001B08]"
                                >
                                    Create Account
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;