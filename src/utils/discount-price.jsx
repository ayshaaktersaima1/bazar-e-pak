export function discountPrice(price, discount) {
    if (typeof price !== "number" || typeof discount !== "number") {
        return 0;
    }

    return price - (price * discount) / 100;
}

export default function DiscountPrice({
    product,
    variant = "default",
}) {
    const hasDiscount =
        typeof product.discount === "number" && product.discount > 0;

    const finalPrice = hasDiscount
        ? discountPrice(product.price, product.discount)
        : product.price;

    if (variant === "cart") {
        return (
            <div className="flex items-baseline gap-2">
                {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                        PKR {product.price}
                    </span>
                )}

                <span className="text-lg font-bold tracking-tight text-[#001B08]">
                    PKR {finalPrice}
                </span>
            </div>
        );
    }

    return (
        <div className="mt-3 flex min-h-[30px] items-baseline justify-center gap-2">
            {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                    PKR {product.price}
                </span>
            )}

            <span className="text-lg font-bold tracking-tight text-[#001B08]">
                PKR {finalPrice}
            </span>
        </div>
    );
}