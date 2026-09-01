const ReviewSummary = ({
    total = 0,
    averageRating = 0,
}) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#D9A928]/15 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Total Reviews
                </p>

                <p className="mt-2 text-2xl font-bold text-[#002B12]">
                    {total}
                </p>
            </div>

            <div className="rounded-xl border border-[#D9A928]/15 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Average Rating
                </p>

                <p className="mt-2 text-2xl font-bold text-[#002B12]">
                    {Number(averageRating).toFixed(1)}
                </p>
            </div>
        </div>
    );
};

export default ReviewSummary;