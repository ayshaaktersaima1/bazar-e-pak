"use client";

import { useState } from "react";

const ReviewSellerApplicationModal = ({
    application,
    open,
    loading,
    onClose,
    onSubmit,
}) => {
    const [status, setStatus] = useState("approved");

    const [rejectionReason, setRejectionReason] =
        useState("");

    if (!open || !application) {
        return null;
    }

    const resetForm = () => {
        setStatus("approved");
        setRejectionReason("");
    };

    const handleClose = () => {
        resetForm();
        onClose?.();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit?.({
            status,
            rejectionReason:
                status === "approved"
                    ? ""
                    : rejectionReason,
        });
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="border-b border-zinc-100 px-6 py-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#D9A928]">
                        Seller Application
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#001B08]">
                        Review Application
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >
                    <div className="rounded-xl bg-[#F7F5EF] p-4">
                        <p className="font-semibold text-[#001B08]">
                            {application.businessName}
                        </p>

                        <p className="mt-1 text-sm text-[#6B7280]">
                            {application.name}
                        </p>

                        {application.email && (
                            <p className="mt-1 text-sm text-[#6B7280]">
                                {application.email}
                            </p>
                        )}

                        {application.phoneNumber && (
                            <p className="mt-1 text-sm text-[#6B7280]">
                                {application.phoneNumber}
                            </p>
                        )}

                        {application.businessType && (
                            <p className="mt-1 text-sm text-[#6B7280]">
                                {application.businessType}
                            </p>
                        )}

                        {application.description && (
                            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
                                {application.description}
                            </p>
                        )}

                        {application.address && (
                            <p className="mt-2 text-xs text-[#6B7280]">
                                {application.address}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Decision
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#001B08] outline-none transition focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15"
                        >
                            <option value="approved">
                                Approve
                            </option>

                            <option value="rejected">
                                Reject
                            </option>

                            <option value="suspended">
                                Suspend
                            </option>
                        </select>
                    </div>

                    {status !== "approved" && (
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                                Reason
                            </label>

                            <textarea
                                value={rejectionReason}
                                onChange={(e) =>
                                    setRejectionReason(
                                        e.target.value,
                                    )
                                }
                                maxLength={1000}
                                rows={4}
                                placeholder={
                                    status === "rejected"
                                        ? "Enter rejection reason..."
                                        : "Enter suspension reason..."
                                }
                                className="w-full resize-none rounded-lg border border-[#E5E7EB] bg-white p-3 text-sm text-[#001B08] outline-none transition focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15"
                            />

                            <p className="mt-1 text-right text-xs text-[#98A2B3]">
                                {rejectionReason.length}/1000
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 border-t border-zinc-100 pt-5">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleClose}
                            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-[#4B5563] transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-[#002B12] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#003D1A] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Updating..."
                                : "Confirm Decision"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewSellerApplicationModal;