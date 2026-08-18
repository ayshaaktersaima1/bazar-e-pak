"use client";

import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

import {
  FaEye,
  FaEyeSlash,
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,

    handleSubmit,

    watch,

    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "customer",

      name: "",

      email: "",

      phoneNumber: "",

      password: "",

      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const phoneRegex = /^03\d{9}$/;

      if (!phoneRegex.test(data.phoneNumber)) {
        toast.error("Please enter a valid 11-digit Pakistani mobile number.", {
          duration: 4000,
        });

        setIsSubmitting(false);

        return;
      }

      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match.", {
          duration: 4000,
        });

        setIsSubmitting(false);

        return;
      }

      const { error } = await authClient.signUp.email({
        email: data.email,

        password: data.password,

        name: data.name,

        role: data.role,

        phoneNumber: data.phoneNumber,
      });

      if (error) {
        console.error("Registration Error:", error);

        toast.error(error.message || "Registration failed. Please try again.", {
          duration: 5000,
        });

        setIsSubmitting(false);

        return;
      }

      await authClient.signOut();

      toast.success("Account created successfully!", {
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 700);
    } catch (error) {
      console.error("Unexpected Registration Error:", error);

      toast.error(
        error?.message || "Something went wrong while creating your account.",

        {
          duration: 5000,
        },
      );

      setIsSubmitting(false);
    }
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
          className="object-cover object-left pointer-none select-none"
        />
      </div>

      {/* Website Content */}

      <div className="relative mx-auto grid min-h-screen w-[90%] items-start gap-4 py-10 lg:grid-cols-[38%_1fr] xl:grid-cols-[42%_1fr] xl:gap-8">
        {/* Left Content */}

        <div className="relative z-10 hidden min-h-180 lg:block">
          <div className="mt-8 max-w-75 xl:mt-10 xl:max-w-md">
            <h1 className="text-3xl font-bold leading-tight text-white xl:text-4xl">
              Join <span className="text-[#E8BB44]">Bazaar E Pak</span>
              <span className="block">and be a part of</span>
              <span className="block">something bigger.</span>
            </h1>

            <div className="mt-5 h-1 w-14 bg-[#E8BB44]" />

            <p className="mt-5 text-sm leading-6 text-gray-200 xl:text-base xl:leading-7">
              Create your account and enjoy a seamless shopping, selling or
              delivery experience with us.
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
                    Shop everything you need from trusted stores.
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
                    Start your own store and grow your business.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 xl:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                  <FaMotorcycle />
                </div>

                <div>
                  <h3 className="font-semibold text-white">Deliver & Earn</h3>

                  <p className="mt-1 text-sm leading-5 text-gray-300">
                    Join as a rider and earn by delivering orders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 xl:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8BB44] text-[#E8BB44]">
                  <FaShieldAlt />
                </div>

                <div>
                  <h3 className="font-semibold text-white">Safe & Secure</h3>

                  <p className="mt-1 text-sm leading-5 text-gray-300">
                    Your account and information stay protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="min-w-0 w-full">
          <div className="mx-auto w-full ">
            {/* Login */}

            <div className="mb-5 flex items-center justify-end gap-3 text-sm">
              <span className="text-gray-600">Already have an account?</span>

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

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-7"
                noValidate
              >
                {/* Roles */}

                <p className="mb-3 text-sm font-semibold text-[#001B08]">
                  I want to register as
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {/* Customer */}

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="customer"
                      className="peer hidden"
                      {...register("role", {
                        required: "Please select a role.",
                      })}
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
                      value="store-owner"
                      className="peer hidden"
                      {...register("role", {
                        required: "Please select a role.",
                      })}
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
                      value="rider"
                      className="peer hidden"
                      {...register("role", {
                        required: "Please select a role.",
                      })}
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

                {errors.role && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.role.message}
                  </p>
                )}

                {/* Name + Email */}

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                      Full Name
                    </legend>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                      className={`input w-full border bg-white text-[#001B08] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#E8BB44]"
                      }`}
                      {...register("name", {
                        required: "Full name is required.",

                        minLength: {
                          value: 2,

                          message: "Name must be at least 2 characters.",
                        },
                      })}
                    />

                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                      Email Address
                    </legend>

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                      className={`input w-full border bg-white text-[#001B08] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#E8BB44]"
                      }`}
                      {...register("email", {
                        required: "Email address is required.",

                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                          message: "Please enter a valid email address.",
                        },
                      })}
                    />

                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </fieldset>
                </div>

                {/* Phone */}

                <fieldset className="fieldset mt-3">
                  <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                    Phone Number
                  </legend>

                  <input
                    type="tel"
                    placeholder="03XXXXXXXXX"
                    inputMode="numeric"
                    maxLength={11}
                    disabled={isSubmitting}
                    className={`input w-full border bg-white text-[#001B08] placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                      errors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#E8BB44]"
                    }`}
                    {...register("phoneNumber", {
                      required: "Phone number is required.",

                      pattern: {
                        value: /^03\d{9}$/,

                        message:
                          "Please enter a valid 11-digit Pakistani mobile number.",
                      },
                    })}
                  />

                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </fieldset>

                {/* Password */}

                <fieldset className="fieldset mt-3">
                  <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                    Password
                  </legend>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={isSubmitting}
                      className={`input w-full border bg-white pr-11 text-[#001B08] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#E8BB44]"
                      }`}
                      {...register("password", {
                        required: "Password is required.",

                        minLength: {
                          value: 8,

                          message: "Password must be at least 8 characters.",
                        },
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={isSubmitting}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#001B08] disabled:cursor-not-allowed"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </fieldset>

                {/* Confirm Password */}

                <fieldset className="fieldset mt-3">
                  <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                    Confirm Password
                  </legend>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      disabled={isSubmitting}
                      className={`input w-full border bg-white pr-11 text-[#001B08] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#E8BB44]"
                      }`}
                      {...register("confirmPassword", {
                        required: "Please confirm your password.",

                        validate: (value) =>
                          value === password || "Passwords do not match.",
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      disabled={isSubmitting}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#001B08] disabled:cursor-not-allowed"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </fieldset>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn mt-6 w-full border-none bg-[#001B08] text-white hover:bg-[#E8BB44] hover:text-[#001B08] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
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
                  disabled={isSubmitting}
                  className="btn w-full border border-gray-300 bg-white text-[#001B08] shadow-none hover:border-[#E8BB44] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
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
