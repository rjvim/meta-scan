import { h } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../utils/cn";

interface AdvancedSearchProps {
  onSearch: (query: string, mode: string) => void;
}

const searchModes = [
  { label: "All Metadata", value: "all" },
  { label: "General", value: "general" },
  { label: "Open Graph", value: "opengraph" },
  { label: "Twitter", value: "twitter" },
  { label: "Technical", value: "technical" }
];

export const AdvancedSearch = ({ onSearch }: AdvancedSearchProps) => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("all");

  const handleSearch = () => {
    onSearch(query, mode);
  };

  return (
    <div className="advanced-search p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Advanced Search
      </h3>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Enter search query"
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <select
          value={mode}
          onChange={(e) => setMode((e.target as HTMLSelectElement).value)}
          className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          {searchModes.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Search
        </button>
      </div>
    </div>
  );
};
