"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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

const LoginPage = () => {
  const router = useRouter();

  const [isDemoLogin, setIsDemoLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "customer",
      email: "customer@bep.com",
      password: "customer@BEP",
    },
  });

  const role = watch("role");

  // Auto-fill login details when role changes
  useEffect(() => {
    if (role === "customer") {
      setValue("email", "customer@bep.com");
      setValue("password", "customer@BEP");
    } else if (role === "seller") {
      setValue("email", "seller-shop@bep.com");
      setValue("password", "seller@BEP");
    } else if (role === "rider") {
      setValue("email", "rider@bep.com");
      setValue("password", "rider@BEP");
    } else if (role === "admin") {
      setValue("email", "admin@bep.com");
      setValue("password", "admin@BEP");
    }
  }, [role, setValue]);

  const loginUser = async (email, password) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        console.error("Better Auth Login Error:", error);

        toast.error(
          error.message || "Login failed. Please check your credentials.",
          {
            duration: 4000,
          },
        );

        return false;
      }

      if (!data) {
        toast.error("Login failed. Please try again.", {
          duration: 4000,
        });

        return false;
      }

      toast.success("Login successful! Redirecting...", {
        duration: 2000,
      });

      reset();

      setTimeout(() => {
        router.push("/");
      }, 500);

      return true;
    } catch (error) {
      console.error("Unexpected Login Error:", error);

      toast.error(
        error?.message ||
          "Something went wrong while logging in. Please try again.",
        {
          duration: 5000,
        },
      );

      return false;
    }
  };

  const onSubmit = async (data) => {
    await loginUser(data.email, data.password);
  };

  const isLoading = isSubmitting || isDemoLogin;

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

        <div className="relative z-10 hidden lg:block">
          <div className="max-w-[300px] xl:max-w-md">
            <h1 className="text-3xl font-bold leading-tight text-white xl:text-4xl">
              Welcome Back to <br />
              <span className="text-[#E8BB44]">Bazaar E Pak</span>
            </h1>

            <div className="mt-5 h-1 w-14 bg-[#E8BB44]" />

            <p className="mt-5 w-80 text-sm leading-6 text-gray-200 xl:text-base xl:leading-7">
              Login to continue shopping, manage your store or handle deliveries
              from your account.
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
                    Access your cart, orders and favourite products.
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
                    Access your store, products and orders anytime.
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
                    Riders can view and manage their delivery activities.
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
          <div className="mx-auto w-full max-w-xl">
            {/* Back to Home + Register Link */}

            <div className="mb-5 flex items-center justify-between gap-3 text-sm">
              <Link
                href="/"
                className="font-semibold text-[#001B08] transition hover:text-[#E8BB44]"
              >
                ← Back to Home
              </Link>

              <div className="flex items-center gap-3">
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
            </div>

            {/* Login Form */}

            <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#001B08] sm:text-3xl">
                  Login to Your Account
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Select a role to autofill demo credentials
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6"
                noValidate
              >
                {/* Roles */}

                <p className="mb-3 text-sm font-semibold text-[#001B08]">
                  Login as Demo Role
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {/* Customer */}

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="customer"
                      className="peer hidden"
                      {...register("role")}
                    />

                    <div className="rounded-xl border-2 border-gray-200 p-3 text-center transition peer-checked:border-[#001B08] peer-checked:bg-[#001B08]/5">
                      <FaUser className="mx-auto text-2xl text-[#001B08]" />

                      <h3 className="mt-2 text-xs font-semibold text-[#001B08]">
                        Customer
                      </h3>
                    </div>
                  </label>

                  {/* Store Owner */}

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="seller"
                      className="peer hidden"
                      {...register("role")}
                    />

                    <div className="rounded-xl border-2 border-gray-200 p-3 text-center transition peer-checked:border-[#001B08] peer-checked:bg-[#001B08]/5">
                      <FaStore className="mx-auto text-2xl text-[#E8BB44]" />

                      <h3 className="mt-2 text-xs font-semibold text-[#001B08]">
                        Store Owner
                      </h3>
                    </div>
                  </label>

                  {/* Rider */}

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="rider"
                      className="peer hidden"
                      {...register("role")}
                    />

                    <div className="rounded-xl border-2 border-gray-200 p-3 text-center transition peer-checked:border-[#001B08] peer-checked:bg-[#001B08]/5">
                      <FaMotorcycle className="mx-auto text-2xl text-[#001B08]" />

                      <h3 className="mt-2 text-xs font-semibold text-[#001B08]">
                        Rider
                      </h3>
                    </div>
                  </label>

                  {/* Admin */}

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="admin"
                      className="peer hidden"
                      {...register("role")}
                    />

                    <div className="rounded-xl border-2 border-gray-200 p-3 text-center transition peer-checked:border-[#001B08] peer-checked:bg-[#001B08]/5">
                      <FaShieldAlt className="mx-auto text-2xl text-[#001B08]" />

                      <h3 className="mt-2 text-xs font-semibold text-[#001B08]">
                        Admin
                      </h3>
                    </div>
                  </label>
                </div>

                {/* Email */}

                <fieldset className="fieldset mt-5">
                  <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                    Email Address
                  </legend>

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    className={`input w-full border bg-white text-[#001B08] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
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

                {/* Password */}

                <fieldset className="fieldset mt-4">
                  <legend className="fieldset-legend whitespace-nowrap text-[#001B08]">
                    Password
                  </legend>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className={`input w-full border bg-white pr-11 text-[#001B08] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-[#E8BB44]"
                      }`}
                      {...register("password", {
                        required: "Password is required.",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters.",
                        },
                      })}
                    />

                    {/* Password Toggle */}

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-500 transition hover:text-[#001B08] disabled:cursor-not-allowed disabled:opacity-50"
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

                {/* Login Button */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn mt-6 w-full border-none bg-[#001B08] text-white hover:bg-[#E8BB44] hover:text-[#001B08] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
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
                  disabled={isLoading}
                  className="btn w-full border border-gray-300 bg-white text-[#001B08] shadow-none hover:border-[#E8BB44] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaGoogle />
                  Continue with Google
                </button>

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
