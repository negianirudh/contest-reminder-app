const EmptyState = ({
  title = "Nothing here yet",
  message = "Check back later.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-20 text-center dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyState;
