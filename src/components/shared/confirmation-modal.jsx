"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({
    open = false,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger",
    loading = false,
    onConfirm,
    onCancel,
}) => {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !loading) {
                onCancel?.();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [open, loading, onCancel]);

    if (!open) return null;

    const confirmClass =
        variant === "danger"
            ? "btn-error"
            : variant === "warning"
              ? "btn-warning"
              : "btn-primary";

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (
                    event.target ===
                        event.currentTarget &&
                    !loading
                ) {
                    onCancel?.();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirmation-title"
                className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                variant === "danger"
                                    ? "bg-error/10 text-error"
                                    : variant ===
                                        "warning"
                                      ? "bg-warning/10 text-warning"
                                      : "bg-primary/10 text-primary"
                            }`}
                        >
                            <AlertTriangle className="h-5 w-5" />
                        </div>

                        <div>
                            <h2
                                id="confirmation-title"
                                className="text-lg font-semibold"
                            >
                                {title}
                            </h2>

                            <p className="mt-1 text-sm text-base-content/60">
                                {message}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="btn btn-ghost btn-sm btn-square"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="btn btn-ghost"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`btn ${confirmClass}`}
                    >
                        {loading && (
                            <span className="loading loading-spinner loading-sm" />
                        )}

                        {loading
                            ? "Processing..."
                            : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;