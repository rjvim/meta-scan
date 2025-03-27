import { useState, useRef, useCallback, useEffect } from "preact/hooks";
import { cn } from "../../utils/cn";
import { debounce } from "../../utils/debounce";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      onSearch(searchValue);
      setIsSearching(false);
    }, 300),
    [onSearch]
  );

  // Handle input change
  const handleChange = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;
    onChange(newValue);
    setIsSearching(true);
    debouncedSearch(newValue);
  };

  // Clear search
  const handleClear = () => {
    onChange("");
    onSearch("");
    setIsSearching(false);
    inputRef.current?.focus();
  };

  // Add keyboard shortcut for search (Ctrl+F or Cmd+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault(); 
        inputRef.current?.focus();
      }
      
      if (e.key === 'Escape' && value) {
        handleClear();
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [value]);

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
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
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
