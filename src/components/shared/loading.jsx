const Loading = ({
    size = "md",
}) => {
    return (
        <div className="flex items-center justify-center py-10">
            <span
                className={`loading loading-spinner loading-${size}`}
            />
        </div>
    );
};

export default Loading;