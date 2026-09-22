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
            <div className="flex w-full max-w-xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="shrink-0 border-b border-zinc-100 px-6 py-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#D9A928]">
                        Seller Application
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#001B08]">
                        Review Application
                    </h2>
                </div>

                {/* Scrollable Content */}
                <form
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
                        {/* Application Information */}
                        <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F5EF] p-4">
                            <div className="mb-3 flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="truncate text-base font-bold text-[#001B08]">
                                        {application.businessName}
                                    </p>

                                    <p className="mt-1 truncate text-sm text-[#6B7280]">
                                        {application.name}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6B7280]">
                                    Application
                                </span>
                            </div>

                            <div className="grid gap-2 text-sm sm:grid-cols-2">
                                {application.email && (
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#98A2B3]">
                                            Email
                                        </p>

                                        <p className="truncate text-[#4B5563]">
                                            {application.email}
                                        </p>
                                    </div>
                                )}

                                {application.phoneNumber && (
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#98A2B3]">
                                            Phone
                                        </p>

                                        <p className="truncate text-[#4B5563]">
                                            {application.phoneNumber}
                                        </p>
                                    </div>
                                )}

                                {application.businessType && (
                                    <div className="min-w-0 sm:col-span-2">
                                        <p className="text-xs text-[#98A2B3]">
                                            Business Type
                                        </p>

                                        <p className="truncate text-[#4B5563]">
                                            {application.businessType}
                                        </p>
                                    </div>
                                )}
                            </div>

                      {application.description && (
    <div className="mt-4 border-t border-zinc-200 pt-4">
        <p className="text-xs font-medium text-[#98A2B3]">
            Description
        </p>

        <div className="mt-1 max-h-[120px] overflow-y-auto rounded-lg border border-zinc-200 bg-white p-3">
            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#4B5563]">
                {application.description}
            </p>
        </div>
    </div>
)}
                            {application.address && (
                                <div className="mt-3 border-t border-zinc-200 pt-3">
                                    <p className="text-xs text-[#98A2B3]">
                                        Address
                                    </p>

                                    <p className="mt-1 text-sm leading-5 text-[#4B5563]">
                                        {application.address}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Decision */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                                Decision
                            </label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                disabled={loading}
                                className="h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#001B08] outline-none transition focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15 disabled:cursor-not-allowed disabled:bg-zinc-50"
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

                        {/* Reason */}
                        {status !== "approved" && (
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                                    {status === "rejected"
                                        ? "Rejection Reason"
                                        : "Suspension Reason"}
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
                                    disabled={loading}
                                    className="min-h-[100px] max-h-40 w-full resize-y rounded-lg border border-[#E5E7EB] bg-white p-3 text-sm leading-5 text-[#001B08] outline-none transition placeholder:text-[#98A2B3] focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15 disabled:cursor-not-allowed disabled:bg-zinc-50"
                                />

                                <div className="mt-1 flex justify-end">
                                    <p className="text-xs text-[#98A2B3]">
                                        {rejectionReason.length}/1000
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="shrink-0 border-t border-zinc-100 bg-white px-6 py-4">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={handleClose}
                                className="rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-[#4B5563] transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-[#002B12] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003D1A] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? "Updating..."
                                    : "Confirm Decision"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewSellerApplicationModal;