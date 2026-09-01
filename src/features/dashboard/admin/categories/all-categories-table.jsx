"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

import DataTable from "@/features/dashboard/common/table/data-table";
import { getCategoryColumns } from "./category-columns";

const emptyForm = {
    name: "",
    description: "",
    image: "",
    status: "active",
};

const AllCategoriesTable = ({ categories }) => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");

    const openAddModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setIsModalOpen(true);
    };

    const openEditModal = (category) => {
        setEditingId(category._id);

        setForm({
            name: category.name || "",
            description: category.description || "",
            image: category.image || "",
            status: category.status || "active",
        });

        setError("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSaving(true);
        setError("");

        try {
            const { data } = await authClient.token();

            const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

            const url = editingId
                ? `${baseUrl}/api/categories/${editingId}`
                : `${baseUrl}/api/categories`;

            const payload = {
                name: form.name,
                description: form.description || undefined,
                image: form.image || undefined,
                status: form.status,
            };

            const res = await fetch(url, {
                method: editingId ? "PATCH" : "POST",

                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${data?.token}`,
                },

                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to save category",
                );
            }

            closeModal();
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (categoryId) => {
        if (!confirm("Delete this category?")) return;

        setDeletingId(categoryId);

        try {
            const { data } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/${categoryId}`,
                {
                    method: "DELETE",

                    headers: {
                        authorization: `Bearer ${data?.token}`,
                    },
                },
            );

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to delete category",
                );
            }

            router.refresh();
        } catch (err) {
            alert(err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const columns = getCategoryColumns({
        onEdit: openEditModal,
        onDelete: handleDelete,
        deletingId,
    });

    return (
        <div>
            <div className="mb-4 flex justify-end">
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 rounded-lg bg-[#001B08] px-4 py-2 text-sm font-semibold text-[#E8BB44] hover:bg-[#002B0F]"
                >
                    <FaPlus size={12} />
                    Add Category
                </button>
            </div>

            <DataTable
                columns={columns}
                data={categories}
                emptyMessage="No categories found."
            />

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold text-[#001B08]">
                            {editingId
                                ? "Edit Category"
                                : "Add Category"}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-[#001B08]">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-[#E5E2D8] px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-[#001B08]">
                                    Description
                                </label>

                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-[#E5E2D8] px-3 py-2 text-sm"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-[#001B08]">
                                    Image URL
                                </label>

                                <input
                                    type="text"
                                    value={form.image}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            image: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-[#E5E2D8] px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-[#001B08]">
                                    Status
                                </label>

                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-[#E5E2D8] px-3 py-2 text-sm"
                                >
                                    <option value="active">
                                        Active
                                    </option>

                                    <option value="inactive">
                                        Inactive
                                    </option>
                                </select>
                            </div>

                            {error && (
                                <p className="text-sm text-[#B91C1C]">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg bg-[#F7F5EF] px-4 py-2 text-sm font-semibold text-[#001B08] hover:bg-[#EDEAE0]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="rounded-lg bg-[#001B08] px-4 py-2 text-sm font-semibold text-[#E8BB44] hover:bg-[#002B0F] disabled:opacity-50"
                                >
                                    {isSaving
                                        ? "Saving..."
                                        : editingId
                                          ? "Save Changes"
                                          : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllCategoriesTable;