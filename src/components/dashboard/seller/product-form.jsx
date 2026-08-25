"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ImagePlus, Plus, Trash2 } from "lucide-react";

const defaultValues = {
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: 0,
    categoryId: "",
    shopId: "",
    status: "active",
    images: [""],
};

const ProductForm = ({
    product = null,
    categories = [],
    shops = [],
    loading = false,
    onSubmit,
    onCancel,
}) => {
    const isEdit = Boolean(product);

    const initialValues = useMemo(() => {
        if (!product) return defaultValues;

        return {
            name: product.name ?? "",
            description: product.description ?? "",
            price: product.price ?? "",
            stock: product.stock ?? "",
            discount: product.discount ?? 0,
            categoryId: product.categoryId?._id ?? product.categoryId ?? "",
            shopId: product.shopId?._id ?? product.shopId ?? "",
            status: product.status ?? "active",
            images:
                product.images?.length > 0
                    ? product.images
                    : [""],
        };
    }, [product]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        mode: "onBlur",
    });

    const [step, setStep] = useState(1);

    const images = watch("images") || [""];
    const price = Number(watch("price")) || 0;
    const discount = Number(watch("discount")) || 0;

    const discountedPrice = Math.max(
        0,
        price - (price * discount) / 100,
    );

    useEffect(() => {
        reset(initialValues);
        setStep(1);
    }, [initialValues, reset]);

    const submit = (values) => {
        onSubmit?.({
            ...values,
            price: Number(values.price),
            stock: Number(values.stock),
            discount: Number(values.discount || 0),
            images: values.images.filter(Boolean),
        });
    };

    const addImage = () => {
        setValue("images", [...images, ""]);
    };

    const removeImage = (index) => {
        const next = images.filter((_, imageIndex) => imageIndex !== index);

        setValue(
            "images",
            next.length > 0 ? next : [""],
        );
    };

    const nextStep = () => setStep((current) => Math.min(current + 1, 3));
    const previousStep = () =>
        setStep((current) => Math.max(current - 1, 1));

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="mb-6 flex items-center gap-2">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex flex-1 items-center gap-2">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                                step >= item
                                    ? "bg-[#D9A928] text-[#001B08]"
                                    : "bg-[#E5E2D8] text-[#6B7280]"
                            }`}
                        >
                            {item}
                        </div>

                        {item < 3 && (
                            <div
                                className={`h-1 flex-1 rounded ${
                                    step > item
                                        ? "bg-[#D9A928]"
                                        : "bg-[#E5E2D8]"
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {step === 1 && (
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Product Name
                        </label>

                        <input
                            {...register("name", {
                                required: "Product name is required",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Minimum 2 characters",
                                },
                                maxLength: {
                                    value: 150,
                                    message:
                                        "Maximum 150 characters",
                                },
                            })}
                            className="input input-bordered w-full"
                            placeholder="Enter product name"
                        />

                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#001B08]">
                            Description
                        </label>

                        <textarea
                            {...register("description", {
                                required:
                                    "Description is required",
                                maxLength: {
                                    value: 5000,
                                    message:
                                        "Maximum 5000 characters",
                                },
                            })}
                            rows={6}
                            className="textarea textarea-bordered w-full"
                            placeholder="Describe your product..."
                        />

                        {errors.description && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Price
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register("price", {
                                required: "Price is required",
                                min: {
                                    value: 0,
                                    message:
                                        "Price cannot be negative",
                                },
                            })}
                            className="input input-bordered w-full"
                        />

                        {errors.price && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Stock
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="1"
                            {...register("stock", {
                                required: "Stock is required",
                                min: {
                                    value: 0,
                                    message:
                                        "Stock cannot be negative",
                                },
                                valueAsNumber: true,
                            })}
                            className="input input-bordered w-full"
                        />

                        {errors.stock && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.stock.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Discount (%)
                        </label>

                        <input
                            type="number"
                            min="0"
                            max="100"
                            {...register("discount", {
                                min: 0,
                                max: 100,
                            })}
                            className="input input-bordered w-full"
                        />

                        <p className="mt-2 text-xs text-[#6B7280]">
                            Final price:{" "}
                            <span className="font-bold text-[#001B08]">
                                ৳{discountedPrice.toFixed(2)}
                            </span>
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Status
                        </label>

                        <select
                            {...register("status")}
                            className="select select-bordered w-full"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">
                                Inactive
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Category
                        </label>

                        <select
                            {...register("categoryId", {
                                required:
                                    "Category is required",
                            })}
                            className="select select-bordered w-full"
                        >
                            <option value="">
                                Select category
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {errors.categoryId && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.categoryId.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Shop
                        </label>

                        <select
                            {...register("shopId", {
                                required: "Shop is required",
                            })}
                            className="select select-bordered w-full"
                        >
                            <option value="">
                                Select shop
                            </option>

                            {shops.map((shop) => (
                                <option
                                    key={shop._id}
                                    value={shop._id}
                                >
                                    {shop.name}
                                </option>
                            ))}
                        </select>

                        {errors.shopId && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.shopId.message}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-[#001B08]">
                                Product Images
                            </h3>

                            <p className="text-xs text-[#6B7280]">
                                Add up to 10 valid image URLs.
                            </p>
                        </div>

                        <button
                            type="button"
                            disabled={images.length >= 10}
                            onClick={addImage}
                            className="btn btn-sm bg-[#D9A928] text-[#001B08] hover:bg-[#E8BB44]"
                        >
                            <Plus size={15} />
                            Add Image
                        </button>
                    </div>

                    <div className="space-y-3">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className="flex gap-2"
                            >
                                <div className="relative flex-1">
                                    <ImagePlus
                                        size={17}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                                    />

                                    <input
                                        {...register(
                                            `images.${index}`,
                                        )}
                                        type="url"
                                        className="input input-bordered w-full pl-10"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeImage(index)
                                    }
                                    className="btn btn-square btn-ghost text-red-500"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-[#E5E2D8] pt-5">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-ghost"
                >
                    Cancel
                </button>

                <div className="flex gap-2">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={previousStep}
                            className="btn btn-outline"
                        >
                            Back
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="btn bg-[#002B12] text-white hover:bg-[#003817]"
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn bg-[#D9A928] text-[#001B08] hover:bg-[#E8BB44]"
                        >
                            {loading
                                ? "Saving..."
                                : isEdit
                                  ? "Update Product"
                                  : "Create Product"}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ProductForm;