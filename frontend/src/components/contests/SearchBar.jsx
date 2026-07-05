import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor="contest-search" className="sr-only">
        Search contests
      </label>
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        id="contest-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search contests..."
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
};

export default SearchBar;
