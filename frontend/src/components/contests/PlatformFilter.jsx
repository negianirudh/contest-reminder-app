const PLATFORMS = ["All", "Codeforces", "LeetCode", "CodeChef"];

const PlatformFilter = ({ selected, onSelect }) => {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by platform"
    >
      {PLATFORMS.map((platform) => {
        const isActive = selected === platform;
        return (
          <button
            key={platform}
            onClick={() => onSelect(platform)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {platform}
          </button>
        );
      })}
    </div>
  );
};

export default PlatformFilter;
