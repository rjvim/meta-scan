import { useState } from "preact/hooks";
import { type Ref } from "preact";
import { cn } from "../../utils/cn";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ref,
}: SearchInputProps & { ref?: Ref<HTMLInputElement> }) => {
  const [isSearching, setIsSearching] = useState(false);

  // Handle input change
  const handleChange = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;
    onChange(newValue);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 300);
  };

  // Clear search
  const handleClear = () => {
    onChange("");
    setIsSearching(false);
    if (ref && 'current' in ref && ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800",
          "border border-gray-200 dark:border-gray-700 rounded-md",
          "focus:outline-none focus:ring-1 focus:ring-purple-500 dark:focus:ring-purple-400",
          value ? "pr-16" : ""
        )}
      />
      
      {isSearching && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1"
          title="Clear search"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
          >
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};
