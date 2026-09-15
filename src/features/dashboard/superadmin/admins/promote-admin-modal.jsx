"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Search,
    UserPlus,
    X,
} from "lucide-react";

import useApi from "@/hooks/use-api";

const PromoteAdminModal = ({
    open,
    loading = false,
    onClose,
    onPromote,
}) => {
    const dialogRef = useRef(null);

    const { get } = useApi();

    const [search, setSearch] =
        useState("");

    const [users, setUsers] =
        useState([]);

    const [searching, setSearching] =
        useState(false);

    // Open / close DaisyUI dialog
    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        }

        if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    // Search users
    useEffect(() => {
        if (
            !open ||
            !search.trim()
        ) {
            return;
        }

        const timer = setTimeout(
            async () => {
                setSearching(true);

                const params =
                    new URLSearchParams();

                params.set(
                    "search",
                    search.trim(),
                );

                params.set(
                    "limit",
                    "10",
                );

                const result = await get(
                    `/api/users?${params.toString()}`,
                    {},
                    {
                        showError: false,
                    },
                );

                if (result.success) {
                    const availableUsers =
                        Array.isArray(
                            result.data,
                        )
                            ? result.data.filter(
                                (user) =>
                                    user.role !==
                                    "admin" &&
                                    user.role !==
                                    "super_admin",
                            )
                            : [];

                    setUsers(
                        availableUsers,
                    );
                } else {
                    setUsers([]);
                }

                setSearching(false);
            },
            300,
        );

        return () => {
            clearTimeout(timer);
        };
    }, [
        open,
        search,
        get,
    ]);

    const handleSearchChange = (
        event,
    ) => {
        const value =
            event.target.value;

        setSearch(value);

        if (!value.trim()) {
            setUsers([]);
        }
    };

    const handleClose = () => {
        setSearch("");
        setUsers([]);
        setSearching(false);

        onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            className="modal modal-bottom sm:modal-middle"
            onCancel={(event) => {
                event.preventDefault();
                handleClose();
            }}
        >
            <div className="modal-box max-h-[85vh] max-w-xl overflow-hidden p-0">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A928]/10">
                            <UserPlus className="h-5 w-5 text-[#B78A10]" />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#001B08]">
                                Promote User to Admin
                            </h3>

                            <p className="text-xs text-zinc-500">
                                Search for an
                                existing customer or
                                seller.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={
                            handleClose
                        }
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Search */}
                <div className="border-b border-zinc-100 p-6">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={
                                handleSearchChange
                            }
                            placeholder="Search by name or email..."
                            className="input input-bordered w-full pl-9 focus:border-[#D9A928] focus:outline-none"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto p-6">
                    {!search.trim() && (
                        <div className="py-10 text-center">
                            <Search className="mx-auto h-8 w-8 text-zinc-300" />

                            <p className="mt-3 text-sm font-medium text-zinc-600">
                                Search for a user
                            </p>

                            <p className="mt-1 text-xs text-zinc-400">
                                Enter a name or
                                email address.
                            </p>
                        </div>
                    )}

                    {searching && (
                        <div className="flex justify-center py-10">
                            <span className="loading loading-spinner loading-md text-[#002B12]" />
                        </div>
                    )}

                    {!searching &&
                        search.trim() &&
                        users.length ===
                        0 && (
                            <div className="py-10 text-center">
                                <p className="text-sm font-medium text-zinc-600">
                                    No eligible
                                    users found.
                                </p>

                                <p className="mt-1 text-xs text-zinc-400">
                                    Admin and
                                    Super Admin
                                    accounts are
                                    excluded.
                                </p>
                            </div>
                        )}

                    {!searching &&
                        users.length >
                        0 && (
                            <div className="space-y-3">
                                {users.map(
                                    (user) => (
                                        <div
                                            key={
                                                user._id
                                            }
                                            className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4 transition hover:border-[#D9A928]/50 hover:bg-[#F7F5EF]"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-[#001B08]">
                                                    {
                                                        user.name
                                                    }
                                                </p>

                                                <p className="mt-0.5 truncate text-xs text-zinc-500">
                                                    {
                                                        user.email
                                                    }
                                                </p>

                                                <span className="mt-2 inline-block rounded-full bg-[#F7F5EF] px-2.5 py-1 text-[10px] font-semibold capitalize text-[#001B08]">
                                                    {
                                                        user.role
                                                    }
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                disabled={
                                                    loading
                                                }
                                                onClick={() =>
                                                    onPromote(
                                                        user,
                                                    )
                                                }
                                                className="btn btn-sm border-none bg-[#002B12] text-white hover:bg-[#00451E]"
                                            >
                                                {loading
                                                    ? (
                                                        <span className="loading loading-spinner loading-xs" />
                                                    )
                                                    : "Promote"}
                                            </button>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-zinc-100 px-6 py-4">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={
                            handleClose
                        }
                        className="btn btn-ghost btn-sm"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Click outside to close */}
            <form
                method="dialog"
                className="modal-backdrop"
            >
                <button
                    onClick={
                        handleClose
                    }
                >
                    close
                </button>
            </form>
        </dialog>
    );
};

export default PromoteAdminModal;