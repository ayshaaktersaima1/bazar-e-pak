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

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [open, loading, onCancel]);

    if (!open) return null;

    const styles =
        variant === "danger"
            ? {
                  icon:
                      "bg-red-50 text-red-600",
                  confirm:
                      "bg-red-600 text-white hover:bg-red-700",
              }
            : variant === "warning"
              ? {
                    icon:
                        "bg-[#E8BB44]/15 text-[#B8860B]",
                    confirm:
                        "bg-[#E8BB44] text-[#001B08] hover:bg-[#D9A928]",
                }
              : {
                    icon:
                        "bg-[#002B12]/10 text-[#002B12]",
                    confirm:
                        "bg-[#002B12] text-white hover:bg-[#001F0D]",
                };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
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
                className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${styles.icon}`}
                        >
                            <AlertTriangle className="h-5 w-5" />
                        </div>

                        <div>
                            <h2
                                id="confirmation-title"
                                className="text-lg font-semibold text-[#001B08]"
                            >
                                {title}
                            </h2>

                            <p className="mt-1 text-sm leading-5 text-zinc-500">
                                {message}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                        className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex min-w-[110px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles.confirm}`}
                    >
                        {loading && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
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