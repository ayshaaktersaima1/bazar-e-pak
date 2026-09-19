"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AdminSettingsForm = ({ user }) => {
    const [profile, setProfile] = useState({
        name: user.name,
        image: user.image,
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        if (!profile.name.trim()) {
            toast.error("Name is required.");
            return;
        }

        setProfileLoading(true);

        const { error } = await authClient.updateUser({
            name: profile.name.trim(),
            image: profile.image.trim() || null,
        });

        setProfileLoading(false);

        if (error) {
            toast.error(error.message || "Failed to update profile.");
            return;
        }

        toast.success("Profile updated successfully.");
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!passwords.currentPassword) {
            toast.error("Enter your current password.");
            return;
        }

        if (passwords.newPassword.length < 8) {
            toast.error("New password must be at least 8 characters.");
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        setPasswordLoading(true);

        const { error } = await authClient.changePassword({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
            revokeOtherSessions: true,
        });

        setPasswordLoading(false);

        if (error) {
            toast.error(error.message || "Failed to change password.");
            return;
        }

        setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

        toast.success("Password changed successfully.");
    };

    return (
        <div className="grid gap-6 xl:grid-cols-2">
            <form
                onSubmit={handleProfileSubmit}
                className="rounded-xl bg-white p-6 shadow-sm"
            >
                <h2 className="text-xl font-bold text-[#001B08]">
                    Profile
                </h2>

                <p className="mt-1 text-sm text-[#667085]">
                    Update your admin account information.
                </p>

                <div className="mt-6 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Name
                        </label>

                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    name: e.target.value,
                                })
                            }
                            className="input input-bordered w-full"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Email
                        </label>

                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-50"
                        />

                        <p className="mt-1 text-xs text-[#98A2B3]">
                            Email cannot be changed from this page.
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Profile Image URL
                        </label>

                        <input
                            type="url"
                            value={profile.image}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    image: e.target.value,
                                })
                            }
                            className="input input-bordered w-full"
                            placeholder="https://example.com/profile.jpg"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={profileLoading}
                        className="btn border-none bg-[#002B12] text-white hover:bg-[#00451E]"
                    >
                        {profileLoading
                            ? "Saving..."
                            : "Save Profile"}
                    </button>
                </div>
            </form>

            <form
                onSubmit={handlePasswordSubmit}
                className="rounded-xl bg-white p-6 shadow-sm"
            >
                <h2 className="text-xl font-bold text-[#001B08]">
                    Password
                </h2>

                <p className="mt-1 text-sm text-[#667085]">
                    Change the password for your admin account.
                </p>

                <div className="mt-6 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Current Password
                        </label>

                        <input
                            type="password"
                            value={passwords.currentPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    currentPassword: e.target.value,
                                })
                            }
                            className="input input-bordered w-full"
                            autoComplete="current-password"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    newPassword: e.target.value,
                                })
                            }
                            className="input input-bordered w-full"
                            autoComplete="new-password"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    confirmPassword: e.target.value,
                                })
                            }
                            className="input input-bordered w-full"
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={passwordLoading}
                        className="btn border-none bg-[#002B12] text-white hover:bg-[#00451E]"
                    >
                        {passwordLoading
                            ? "Changing..."
                            : "Change Password"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSettingsForm;