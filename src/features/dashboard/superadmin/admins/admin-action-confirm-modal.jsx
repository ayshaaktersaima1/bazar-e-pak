"use client";

import { AlertTriangle, X } from "lucide-react";

const AdminActionConfirmModal = ({
    open,
    title,
    message,
    confirmLabel = "Confirm",
    loading = false,
    onConfirm,
    onClose,
}) => {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl border border-[#E8BB44]/20 bg-[#FFFCF4] p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#B7791F]">
                            <AlertTriangle className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#001B08]">
                                {title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                                {message}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#4B5563] transition hover:bg-[#F3F4F6] hover:text-[#001B08] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="rounded-lg border border-[#D1D5DB] bg-white px-4 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onConfirm}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#002B12] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00451E] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        )}

                        {loading
                            ? "Please wait..."
                            : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminActionConfirmModal;