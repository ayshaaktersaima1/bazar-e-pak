"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ImagePlus, Plus, Trash2 } from "lucide-react";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  stock: "",
  discount: 0,
  categoryId: "",
  status: "active",
  images: [""],
};

const ProductForm = ({
  product = null,
  categories = [],
  shopId = "",
  loading = false,
  onSubmit,
  onCancel,
}) => {
  const isEdit = Boolean(product);

  const initialValues = useMemo(() => {
    if (!product) {
      return {
        ...defaultValues,
        shopId,
      };
    }

    return {
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      discount: product.discount ?? 0,

      categoryId: product.categoryId?._id ?? product.categoryId ?? "",

      shopId: product.shopId?._id ?? product.shopId ?? shopId,

      status: product.status ?? "active",

      images: product.images?.length ? product.images : [""],
    };
  }, [product, shopId]);

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

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const images = watch("images") || [""];

  const price = Number(watch("price")) || 0;

  const discount = Number(watch("discount")) || 0;

  const finalPrice = Math.max(0, price - (price * discount) / 100);

  const submit = (values) => {
    const payload = {
      ...values,

      price: Number(values.price),

      stock: Number(values.stock),

      discount: Number(values.discount || 0),

      images: (values.images || []).filter(Boolean),
    };

    /*
     * Seller:
     * shopId exists, so keep it.
     *
     * Native Product:
     * no shopId is passed, so remove it.
     */
    if (shopId) {
      payload.shopId = shopId;
    } else {
      delete payload.shopId;
    }

    onSubmit?.(payload);
  };

  const addImage = () => {
    if (images.length < 10) {
      setValue("images", [...images, ""]);
    }
  };

  const removeImage = (index) => {
    const next = images.filter((_, i) => i !== index);

    setValue("images", next.length ? next : [""]);
  };

  const input =
    "w-full rounded-lg border border-[#E5E2D8] bg-white px-3 py-2.5 text-sm text-[#001B08] outline-none focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/20";

  const label = "mb-2 block text-sm font-semibold text-[#001B08]";

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      {/* Product Information */}
      <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#001B08]">
            Product Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the basic product details.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className={label}>Product Name</label>

            <input
              {...register("name", {
                required: "Product name is required",

                minLength: {
                  value: 2,
                  message: "Minimum 2 characters",
                },

                maxLength: {
                  value: 150,
                  message: "Maximum 150 characters",
                },
              })}
              placeholder="Enter product name"
              className={`${input} ${errors.name ? "border-red-500" : ""}`}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={label}>Description</label>

            <textarea
              {...register("description", {
                required: "Description is required",

                maxLength: {
                  value: 5000,
                  message: "Maximum 5000 characters",
                },
              })}
              rows={5}
              placeholder="Describe your product..."
              className={`${input} resize-none ${
                errors.description ? "border-red-500" : ""
              }`}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing and Inventory */}
      <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#001B08]">
            Pricing & Inventory
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Set the price, stock, discount and category.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Price */}
          <div>
            <label className={label}>Price (PKR)</label>

            <input
              type="number"
              min="0"
              step="0.01"
              {...register("price", {
                required: "Price is required",

                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
              })}
              placeholder="Enter price"
              className={`${input} ${errors.price ? "border-red-500" : ""}`}
            />

            {errors.price && (
              <p className="mt-1 text-xs text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className={label}>Stock</label>

            <input
              type="number"
              min="0"
              step="1"
              {...register("stock", {
                required: "Stock is required",

                min: {
                  value: 0,
                  message: "Stock cannot be negative",
                },

                valueAsNumber: true,
              })}
              placeholder="Enter stock"
              className={`${input} ${errors.stock ? "border-red-500" : ""}`}
            />

            {errors.stock && (
              <p className="mt-1 text-xs text-red-600">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Discount */}
          <div>
            <label className={label}>Discount (%)</label>

            <input
              type="number"
              min="0"
              max="100"
              {...register("discount", {
                min: {
                  value: 0,
                  message: "Discount cannot be negative",
                },

                max: {
                  value: 100,
                  message: "Discount cannot exceed 100%",
                },
              })}
              placeholder="Enter discount"
              className={`${input} ${errors.discount ? "border-red-500" : ""}`}
            />

            {errors.discount && (
              <p className="mt-1 text-xs text-red-600">
                {errors.discount.message}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-500">
              Final price:{" "}
              <span className="font-semibold text-[#001B08]">
                PKR {finalPrice.toFixed(2)}
              </span>
            </p>
          </div>

          {/* Status */}
          <div>
            <label className={label}>Status</label>

            <select {...register("status")} className={input}>
              <option value="active">Active</option>

              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <label className={label}>Category</label>

            <select
              {...register("categoryId", {
                required: "Category is required",
              })}
              className={`${input} ${
                errors.categoryId ? "border-red-500" : ""
              }`}
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.categoryId && (
              <p className="mt-1 text-xs text-red-600">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="rounded-2xl border border-[#E5E2D8] bg-white p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#001B08]">Product Images</h2>

            <p className="mt-1 text-sm text-gray-500">
              Add up to 10 product image URLs.
            </p>
          </div>

          <button
            type="button"
            onClick={addImage}
            disabled={images.length >= 10}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#D9A928] px-4 text-sm font-semibold text-[#001B08] transition hover:bg-[#E8BB44] disabled:opacity-50"
          >
            <Plus size={16} />
            Add Image
          </button>
        </div>

        <div className="space-y-3">
          {images.map((_, index) => (
            <div key={index} className="flex gap-2">
              <div className="relative flex-1">
                <ImagePlus
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  {...register(`images.${index}`, {
                    pattern: {
                      value: /^https?:\/\/.+/i,

                      message: "Enter a valid image URL",
                    },
                  })}
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={`${input} pl-10 ${
                    errors.images?.[index] ? "border-red-500" : ""
                  }`}
                />

                {errors.images?.[index] && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.images[index]?.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeImage(index)}
                disabled={images.length === 1}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E5E2D8] text-red-500 transition hover:bg-red-50 disabled:opacity-40"
                title="Remove image"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t border-[#E5E2D8] pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="h-11 rounded-lg border border-[#E5E2D8] px-6 text-sm font-semibold text-gray-600 transition hover:border-[#002B12] hover:text-[#002B12] disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="h-11 min-w-36 rounded-lg bg-[#D9A928] px-6 text-sm font-semibold text-[#001B08] transition hover:bg-[#E8BB44] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
