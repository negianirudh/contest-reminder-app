const Spinner = ({ label = "Loading" }) => {
  return (
    <div
      className="flex items-center justify-center py-20"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600 dark:border-gray-700 dark:border-t-brand-500" />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Spinner;
