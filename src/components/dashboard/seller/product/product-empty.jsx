import { Store } from "lucide-react";

const ProductEmpty = ({ onCreate }) => {
    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#002B12]/5">
                    <Store
                        size={24}
                        className="text-[#D9A928]"
                    />
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#002B12]">
                    Create your shop first
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#667085]">
                    You need a shop before
                    you can create and manage
                    products.
                </p>

                {onCreate && (
                    <button
                        type="button"
                        onClick={onCreate}
                        className="mt-6 h-10 rounded-lg bg-[#002B12] px-5 text-sm font-semibold text-white hover:bg-[#00451E]"
                    >
                        Manage Shop
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductEmpty;