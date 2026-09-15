"use client";

import {
    AlertTriangle,
    X,
} from "lucide-react";

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
        <dialog
            open
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box max-w-md">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                            <AlertTriangle className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#001B08]">
                                {title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-zinc-600">
                                {message}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="modal-action">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={onClose}
                        className="btn btn-ghost"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onConfirm}
                        className="btn border-none bg-[#002B12] text-white hover:bg-[#00451E]"
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-xs" />
                                Please wait...
                            </>
                        ) : (
                            confirmLabel
                        )}
                    </button>
                </div>
            </div>

            <form
                method="dialog"
                className="modal-backdrop"
            >
                <button
                    type="button"
                    onClick={onClose}
                >
                    close
                </button>
            </form>
        </dialog>
    );
};

export default AdminActionConfirmModal;