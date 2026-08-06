import Image from "next/image";
import Link from "next/link";
import { FaEye, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
    return (
        <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-sm">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-[#FAFAFA]">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-contain p-3 transition duration-500 hover:scale-105"
                />
            </div>

            {/* Product Information */}
            <div className="flex flex-1 flex-col px-2 pb-2 pt-5 text-center">
                <h3 className="text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
                    {product.name}
                </h3>

                <p className="mt-3 text-xl font-bold text-[#001B08] lg:text-lg xl:text-xl">
                    {product.price}
                </p>

                <div className="mt-auto flex flex-col gap-2 pt-5">
                    <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-[#001B08] px-4 py-2.5 font-semibold text-[#001B08] transition duration-300 hover:bg-[#001B08] hover:text-white"
                    >

                        View Details
                    </Link>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
                    >
                        <FaShoppingCart />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;