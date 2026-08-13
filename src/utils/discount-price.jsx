export function discountPrice(price, discount) {
    if (typeof price !== "number" || typeof discount !== "number") {
        return 0;
    }

    return price - (price * discount) / 100;
}

export default function DiscountPrice({ product }) {
    return (
        <div className="mt-3 flex flex-col items-center justify-center">
            <div className="flex min-h-[26px] items-center justify-center gap-2">
                {product.discount ? (
                    <>
                        <del className="text-sm font-medium text-gray-400">
                            PKR {product.price}
                        </del>

                        <span className="rounded-full bg-[#E8BB44] px-2 py-0.5 text-xs font-bold text-[#001B08]">
                            {product.discount}% OFF
                        </span>
                    </>
                ) : null}
            </div>

            <p className="mt-1 text-xl font-bold text-[#001B08]">
                PKR{" "}
                {product.discount
                    ? discountPrice(product.price, product.discount)
                    : product.price}
            </p>
        </div>
    );
}