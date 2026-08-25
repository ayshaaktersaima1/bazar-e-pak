const EmptyState = ({
    message = "No data found.",
}) => {
    return (
        <div className="flex min-h-40 items-center justify-center text-sm text-base-content/60">
            {message}
        </div>
    );
};

export default EmptyState;