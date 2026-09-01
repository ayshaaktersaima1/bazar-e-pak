const EmptyState = ({ message = "No data found." }) => {
  return (
    <div className="flex min-h-40 items-center justify-center border-t border-[#EAECF0] bg-white text-sm text-[#667085]">
      {message}
    </div>
  );
};

export default EmptyState;
