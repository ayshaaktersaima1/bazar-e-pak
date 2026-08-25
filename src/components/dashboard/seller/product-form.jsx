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
  const [step, setStep] = useState(1);

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
    setStep(1);
  }, [initialValues, reset]);

  const images = watch("images") || [""];
  const price = Number(watch("price")) || 0;
  const discount = Number(watch("discount")) || 0;

  const finalPrice = Math.max(0, price - (price * discount) / 100);

  const submit = (values) => {
    onSubmit?.({
      ...values,
      shopId,
      price: Number(values.price),
      stock: Number(values.stock),
      discount: Number(values.discount || 0),
      images: values.images.filter(Boolean),
    });
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
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
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
                  step > item ? "bg-[#D9A928]" : "bg-[#E5E2D8]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
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
              className={`${input} ${errors.name ? "border-red-500" : ""}`}
              placeholder="Enter product name"
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
              rows={6}
              className={`${input} resize-none ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Describe your product..."
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={label}>Price</label>

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
              className={input}
            />

            {errors.price && (
              <p className="mt-1 text-xs text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

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
              className={input}
            />

            {errors.stock && (
              <p className="mt-1 text-xs text-red-600">
                {errors.stock.message}
              </p>
            )}
          </div>

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
              className={input}
            />

            <p className="mt-2 text-xs text-[#6B7280]">
              Final price:{" "}
              <span className="font-bold text-[#001B08]">
                ৳{finalPrice.toFixed(2)}
              </span>
            </p>
          </div>

          <div>
            <label className={label}>Status</label>

            <select {...register("status")} className={input}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

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
      )}

      {step === 3 && (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#001B08]">Product Images</h3>

              <p className="mt-1 text-xs text-[#6B7280]">
                Add up to 10 image URLs.
              </p>
            </div>

            <button
              type="button"
              onClick={addImage}
              disabled={images.length >= 10}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#D9A928] px-3 text-sm font-semibold text-[#001B08] hover:bg-[#E8BB44] disabled:opacity-50"
            >
              <Plus size={15} />
              Add Image
            </button>
          </div>

          <div className="space-y-3">
            {images.map((_, index) => (
              <div key={index} className="flex gap-2">
                <div className="relative flex-1">
                  <ImagePlus
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  <input
                    {...register(`images.${index}`, {
                      pattern: {
                        value: /^https?:\/\/.+/i,
                        message: "Enter a valid image URL",
                      },
                    })}
                    type="url"
                    className={`${input} pl-10 ${
                      errors.images?.[index] ? "border-red-500" : ""
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={images.length === 1}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E5E2D8] text-red-500 hover:bg-red-50 disabled:opacity-40"
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
          disabled={loading}
          className="h-10 rounded-lg border border-[#E5E2D8] px-5 text-sm font-semibold text-[#6B7280] hover:border-[#002B12] hover:text-[#002B12] disabled:opacity-50"
        >
          Cancel
        </button>

        <div className="flex gap-2">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={loading}
              className="h-10 rounded-lg border border-[#002B12] px-5 text-sm font-semibold text-[#002B12] hover:bg-[#002B12] hover:text-white disabled:opacity-50"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="h-10 rounded-lg bg-[#002B12] px-5 text-sm font-semibold text-white hover:bg-[#003817]"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="h-10 min-w-32 rounded-lg bg-[#D9A928] px-5 text-sm font-semibold text-[#001B08] hover:bg-[#E8BB44] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating..."
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
