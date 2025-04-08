import { useState, useRef, useEffect } from "preact/hooks";
import { cn } from "../utils/cn";
import type { MetadataResult, StructuredData, MicrodataItem, Corner, MetaScanUIState } from "~/types";
import { 
  CheckIcon, 
  CopyIcon, 
  JsonIcon, 
  RefreshIcon
} from "./icons";
import { type ComponentChildren } from "preact";
import { SettingsMenu } from "./header/SettingsMenu";
import { ThemeToggle } from "./header/ThemeToggle";
import { PositionControl } from "./header/PositionControl";
import { SearchInput } from "./components/SearchInput";
import { SearchHighlighter } from "./components/SearchHighlighter";
import { useCallback } from "preact/hooks";

// Define the order of fields for each category
const fieldOrder = {
  general: ["title", "meta:description", "meta:author", "meta:keywords", "meta:theme-color", "link:favicon"],
  opengraph: ["og:title", "og:description", "og:image", "og:url", "og:type", "og:site_name"],
  twitter: ["twitter:title", "twitter:description", "twitter:image", "twitter:card", "twitter:site", "twitter:creator"],
  technical: ["meta:viewport", "meta:charset", "link:canonical", "meta:robots", "html:lang", "meta:content-security-policy", "header:strict-transport-security"]
};

// Helper to format display labels from standardized keys
const formatKeyForDisplay = (key: string): string => {
  try {
    // Handle null or undefined keys
    if (!key) return '';
    
    // Remove prefixes for display
    let displayKey = key;
    const prefixes = ['meta:', 'link:', 'html:', 'header:', 'og:', 'twitter:'];
    
    for (const prefix of prefixes) {
      if (displayKey.startsWith(prefix)) {
        displayKey = displayKey.replace(prefix, '');
        break; // Stop after first match to avoid multiple replacements
      }
    }
    
    // Format remaining text: capitalize first letter of each word, replace hyphens with spaces
    return displayKey
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (error) {
    console.warn(`Error formatting key: ${key}`, error);
    return key; // Return original key if formatting fails
  }
};

// Helper to sort metadata entries according to predefined order
const sortMetadataEntries = (entries: [string, any][], category: keyof typeof fieldOrder): [string, any][] => {
  return [...entries].sort((a, b) => {
    const orderA = fieldOrder[category].indexOf(a[0]);
    const orderB = fieldOrder[category].indexOf(b[0]);
    
    // If both keys are in the predefined order, sort by that order
    if (orderA !== -1 && orderB !== -1) {
      return orderA - orderB;
    }
    
    // If only one key is in the predefined order, prioritize it
    if (orderA !== -1) return -1;
    if (orderB !== -1) return 1;
    
    // For keys not in the predefined order, sort alphabetically
    return a[0].localeCompare(b[0]);
  });
};

// Component for metadata item display
const MetadataItem = ({
  label,
  value,
  copyable = true,
  searchTerm = "",
}: {
  label: string;
  value: string | number | object | null;
  copyable?: boolean;
  searchTerm?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!value) return null;

  return (
    <div className="mb-4 last:mb-0 group">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {searchTerm ? (
            <SearchHighlighter 
              text={label} 
              searchTerm={searchTerm} 
            />
          ) : label}
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
            aria-label={`Copy ${label}`}
            title="Copy to clipboard"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        )}
      </div>
      <div className="text-xs break-words text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
        {typeof value === "object" ? (
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(value, null, 2)}
          </pre>
        ) : searchTerm ? (
          <SearchHighlighter 
            text={String(value)} 
            searchTerm={searchTerm} 
            className="whitespace-pre-wrap"
          />
        ) : (
          String(value)
        )}
      </div>
    </div>
  );
};

// Component for metadata preview image
const MetadataImage = ({ src, alt }: { src: string | null; alt?: string }) => {
  const [error, setError] = useState(false);

  if (!src || error) return null;

  return (
    <div className="mb-3">
      <div className="bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
        <div className="relative aspect-video flex items-center justify-center p-2">
          <img
            src={src}
            alt={alt || "Preview Image"}
            className="max-h-full max-w-full object-contain"
            onError={() => setError(true)}
          />
        </div>
      </div>
      <p className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
        Preview Image
      </p>
    </div>
  );
};

// Card component for card layout
const Card = ({
  title,
  children,
}: {
  title: string | ComponentChildren;
  children: ComponentChildren;
}) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-[350px] rounded-lg overflow-hidden shadow-md transition-all duration-300",
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
        "hover:shadow-lg"
      )}
    >
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="w-full text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
          {title}
        </div>
      </div>
      <div className="p-3 overflow-y-auto max-h-[60vh]">{children}</div>
    </div>
  );
};

// Component for search results display
const SearchResults = ({
  searchTerm,
  metadata,
  filterMetadataItems,
  getJsonLdType,
  getTypeFromUrl,
}: {
  searchTerm: string;
  metadata: MetadataResult;
  filterMetadataItems: (items: [string, any][], section?: string) => [string, any][];
  getJsonLdType: (item: any) => string;
  getTypeFromUrl: (type: string) => string;
}) => {
  if (!searchTerm) return null;

  // Get filtered results from each section and sort them consistently
  const generalResults = sortMetadataEntries(
    filterMetadataItems(Object.entries(metadata.general || {})),
    "general"
  );
  const ogResults = sortMetadataEntries(
    filterMetadataItems(Object.entries(metadata.opengraph || {})),
    "opengraph"
  );
  const twitterResults = sortMetadataEntries(
    filterMetadataItems(Object.entries(metadata.twitter || {})),
    "twitter"
  );
  const technicalResults = sortMetadataEntries(
    filterMetadataItems(Object.entries(metadata.technical || {})),
    "technical"
  );
  
  // Get structured data results
  const structuredData: StructuredData = metadata.structured || { jsonLd: [], microdata: [] };
  const jsonLdResults = !structuredData.jsonLd ? [] : structuredData.jsonLd.filter(item => {
    return JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const microdataResults = !structuredData.microdata ? [] : structuredData.microdata.filter(item => {
    return (
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      JSON.stringify(item.properties).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const hasResults = generalResults.length > 0 || 
                    ogResults.length > 0 || 
                    twitterResults.length > 0 || 
                    technicalResults.length > 0 || 
                    jsonLdResults.length > 0 || 
                    microdataResults.length > 0;

  if (!hasResults) {
    return (
      <div className="w-full text-center py-8">
        <div className="text-gray-500 dark:text-gray-400">
          No results found for "{searchTerm}"
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Search results for "{searchTerm}"
      </div>

      {generalResults.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">General</h3>
          <div className="space-y-2">
            {generalResults.map(([key, value]) => (
              <MetadataItem key={`general-${key}`} label={formatKeyForDisplay(key)} value={value ?? null} searchTerm={searchTerm} />
            ))}
          </div>
        </div>
      )}

      {ogResults.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">Open Graph</h3>
          <div className="space-y-2">
            {ogResults.map(([key, value]) => (
              <MetadataItem key={`og-${key}`} label={formatKeyForDisplay(key)} value={value ?? null} searchTerm={searchTerm} />
            ))}
          </div>
        </div>
      )}

      {twitterResults.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">Twitter</h3>
          <div className="space-y-2">
            {twitterResults.map(([key, value]) => (
              <MetadataItem key={`twitter-${key}`} label={formatKeyForDisplay(key)} value={value ?? null} searchTerm={searchTerm} />
            ))}
          </div>
        </div>
      )}

      {technicalResults.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">Technical</h3>
          <div className="space-y-2">
            {technicalResults.map(([key, value]) => (
              <MetadataItem key={`technical-${key}`} label={formatKeyForDisplay(key)} value={value ?? null} searchTerm={searchTerm} />
            ))}
          </div>
        </div>
      )}

      {(jsonLdResults.length > 0 || microdataResults.length > 0) && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">Structured Data</h3>
          
          {jsonLdResults.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-300">JSON-LD</h4>
              {jsonLdResults.map((item: any, index: number) => {
                if (!item) return null;
                return (
                  <MetadataItem 
                    key={`search-jsonld-${index}`}
                    label={`JSON-LD ${index + 1} (${getJsonLdType(item)})`}
                    value={item}
                    searchTerm={searchTerm}
                  />
                );
              })}
            </div>
          )}
          
          {microdataResults.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-300">Microdata</h4>
              {microdataResults.map((item: MicrodataItem, index: number) => {
                if (!item) return null;
                return (
                  <MetadataItem 
                    key={`search-microdata-${index}`}
                    label={`Microdata ${index + 1} (${getTypeFromUrl(item.type)})`}
                    value={item.properties}
                    searchTerm={searchTerm}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main MetadataLayout component
const MetadataLayout = ({
  metadata,
  refreshMetadata,
  theme = "light",
  toggleTheme,
  showSettingsMenu,
  toggleSettingsMenu,
  showPositionMenu,
  togglePositionMenu,
  changePosition,
  uiState,
  version,
}: {
  metadata: MetadataResult | null;
  refreshMetadata: () => void;
  theme?: "light" | "dark";
  toggleTheme: () => void;
  showSettingsMenu: boolean;
  toggleSettingsMenu: (e: MouseEvent) => void;
  showPositionMenu: boolean;
  togglePositionMenu: (e: MouseEvent) => void;
  changePosition: (position: Corner) => void;
  uiState: MetaScanUIState;
  version: string;
}) => {
  if (!metadata) return null;

  const [showJSON, setShowJSON] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const copyTimeoutRef = useRef<number | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const jsonTextRef = useRef<HTMLPreElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      if (errorTimeoutRef.current) {
        window.clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  // Add keyboard shortcut for search (Ctrl+F or Cmd+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Ctrl+F or Cmd+F is pressed
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault(); // Prevent browser's default search
        searchInputRef.current?.focus();
      }
      
      // Clear search on Escape
      if (e.key === 'Escape' && searchTerm) {
        setSearchTerm('');
        searchInputRef.current?.blur();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchTerm]);

  // Add debounce effect for search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const tabs = [
    { id: "general", label: "General" },
    { id: "opengraph", label: "Open Graph" },
    { id: "twitter", label: "Twitter" },
    { id: "technical", label: "Technical" },
    { id: "structured", label: "Structured Data" },
    { id: "missing", label: "Missing Tags", badge: metadata.missing?.hasCritical ? "critical" : undefined },
  ];
  


  const fallbackCopyTextToClipboard = (text: string): boolean => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback: Could not copy text: ', err);
      return false;
    }
  };

  const handleCopyJSON = async () => {
    if (!metadata || jsonCopied) return;
    
    // Format metadata with proper prefixes before copying
    const formattedMetadata = formatMetadataForJSON(metadata);
    const jsonString = JSON.stringify(formattedMetadata, null, 2);
    
    try {
      // Try using the Clipboard API first
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(jsonString);
      } else {
        // Fall back to execCommand if Clipboard API is not available
        const success = fallbackCopyTextToClipboard(jsonString);
        if (!success) throw new Error("Fallback copy method failed");
      }
      
      setJsonCopied(true);
      setCopyError(false);
      setCopyMessage("JSON copied to clipboard");
      
      // Clear any existing timeout
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      
      // Set new timeout
      copyTimeoutRef.current = window.setTimeout(() => {
        setJsonCopied(false);
        setCopyMessage("");
        copyTimeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy JSON:", err);
      setCopyError(true);
      setCopyMessage("Failed to copy");
      
      // Clear any existing error timeout
      if (errorTimeoutRef.current) {
        window.clearTimeout(errorTimeoutRef.current);
      }
      
      // Clear error after 2 seconds
      errorTimeoutRef.current = window.setTimeout(() => {
        setCopyError(false);
        setCopyMessage("");
        errorTimeoutRef.current = null;
      }, 2000);
    }
  };

  // Format metadata for JSON export
  const formatMetadataForJSON = (metadata: MetadataResult) => {
    // Create a deep copy to avoid modifying the original
    const formattedMetadata = JSON.parse(JSON.stringify(metadata));
    
    // Keys are already standardized, so we don't need to add prefixes anymore
    return formattedMetadata;
  };

  // Filter metadata items based on search term
  const filterMetadataItems = useCallback((items: [string, any][]): [string, any][] => {
    if (!debouncedSearchTerm) return items;
    
    const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
    return items.filter(([key, value]) => {
      // Search in the original key
      if (key.toLowerCase().includes(lowerSearchTerm)) return true;
      
      // Search in the display key (without prefix)
      const displayKey = formatKeyForDisplay(key);
      if (displayKey.toLowerCase().includes(lowerSearchTerm)) return true;
      
      // Search in string values
      if (typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)) return true;
      
      // Search in array values
      if (Array.isArray(value) && value.some(item => 
        typeof item === 'string' && item.toLowerCase().includes(lowerSearchTerm)
      )) return true;
      
      // Search in object values (basic level)
      if (value && typeof value === 'object') {
        const stringified = JSON.stringify(value).toLowerCase();
        return stringified.includes(lowerSearchTerm);
      }
      
      return false;
    });
  }, [debouncedSearchTerm, formatKeyForDisplay]);



  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "general":
        const generalEntries = sortMetadataEntries(
          filterMetadataItems(Object.entries(metadata.general || {})), 
          "general"
        );
        return (
          <>
            {generalEntries.map(([key, value]) => (
              <MetadataItem key={key} label={formatKeyForDisplay(key)} value={value ?? null} searchTerm={debouncedSearchTerm} />
            ))}
            {generalEntries.length === 0 && debouncedSearchTerm && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No matching general metadata found
              </div>
            )}
          </>
        );
      case "opengraph":
        const ogEntries = sortMetadataEntries(
          filterMetadataItems(Object.entries(metadata.opengraph || {})),
          "opengraph"
        );
        return (
          <>
            {!debouncedSearchTerm && metadata.opengraph?.["og:image"] && (
              <MetadataImage
                src={metadata.opengraph["og:image"] || null}
                alt={metadata.opengraph["og:title"] || metadata.general?.title || ""}
              />
            )}
            {ogEntries.map(([key, value]) => (
              <MetadataItem key={key} label={formatKeyForDisplay(key)} value={value ?? null} searchTerm={debouncedSearchTerm} />
            ))}
            {ogEntries.length === 0 && debouncedSearchTerm && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No matching Open Graph metadata found
              </div>
            )}
          </>
        );
      case "twitter":
        const twitterEntries = sortMetadataEntries(
          filterMetadataItems(Object.entries(metadata.twitter || {})),
          "twitter"
        );
        return (
          <>
            {!debouncedSearchTerm && metadata.twitter?.["twitter:image"] && (
              <MetadataImage
                src={metadata.twitter["twitter:image"] || null}
                alt={metadata.twitter["twitter:title"] || metadata.general?.title || ""}
              />
            )}
            {twitterEntries.map(([key, value]) => (
              <MetadataItem key={key} label={formatKeyForDisplay(key)} value={value ?? null} searchTerm={debouncedSearchTerm} />
            ))}
            {twitterEntries.length === 0 && debouncedSearchTerm && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No matching Twitter metadata found
              </div>
            )}
          </>
        );
      case "technical":
        const technicalEntries = sortMetadataEntries(
          filterMetadataItems(Object.entries(metadata.technical || {})),
          "technical"
        );
        return (
          <>
            {technicalEntries.map(([key, value]) => (
              <MetadataItem key={key} label={formatKeyForDisplay(key)} value={value ?? null} searchTerm={debouncedSearchTerm} />
            ))}
            {technicalEntries.length === 0 && debouncedSearchTerm && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No matching technical metadata found
              </div>
            )}
          </>
        );
      case "structured":
        if (!metadata.structured) {
          return (
            <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
              No structured data found
            </div>
          );
        }
        
        const structuredData: StructuredData = metadata.structured;
        const hasJsonLd = structuredData.jsonLd && structuredData.jsonLd.length > 0;
        const hasMicrodata = structuredData.microdata && structuredData.microdata.length > 0;
        
        // Filter JSON-LD data
        const filteredJsonLd = !debouncedSearchTerm ? structuredData.jsonLd : structuredData.jsonLd.filter(item => {
          return JSON.stringify(item).toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        });
        
        // Filter Microdata
        const filteredMicrodata = !debouncedSearchTerm ? structuredData.microdata : structuredData.microdata.filter(item => {
          return (
            item.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            JSON.stringify(item.properties).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        });
        
        const noResults = debouncedSearchTerm && filteredJsonLd.length === 0 && filteredMicrodata.length === 0;
        
        return (
          <>
            {hasJsonLd && filteredJsonLd.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">JSON-LD</h3>
                {filteredJsonLd.map((item: any, index: number) => {
                  if (!item) return null;
                  return (
                    <MetadataItem 
                      key={`jsonld-${index}`}
                      label={`JSON-LD ${index + 1} (${getJsonLdType(item)})`}
                      value={item}
                      searchTerm={debouncedSearchTerm}
                    />
                  );
                })}
              </div>
            )}
            
            {hasMicrodata && filteredMicrodata.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Microdata</h3>
                {filteredMicrodata.map((item: MicrodataItem, index: number) => {
                  if (!item) return null;
                  return (
                    <MetadataItem 
                      key={`microdata-${index}`}
                      label={`Microdata ${index + 1} (${getTypeFromUrl(item.type)})`}
                      value={item.properties}
                      searchTerm={debouncedSearchTerm}
                    />
                  );
                })}
              </div>
            )}
            
            {noResults && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No matching structured data found
              </div>
            )}
          </>
        );
      case "missing":
        if (!metadata.missing || 
            (metadata.missing.general.length === 0 && 
             metadata.missing.opengraph.length === 0 && 
             metadata.missing.twitter.length === 0 && 
             metadata.missing.technical.length === 0)) {
          return (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                No missing metadata tags detected.
              </div>
            </div>
          );
        }

        // Collect all missing tags from all categories
        const allMissingTags = [
          ...metadata.missing.general,
          ...metadata.missing.opengraph,
          ...metadata.missing.twitter,
          ...metadata.missing.technical
        ];
        
        // Group by importance
        const criticalTags = allMissingTags.filter(tag => tag.importance === 'critical');
        const mediumTags = allMissingTags.filter(tag => tag.importance === 'medium');
        const lowTags = allMissingTags.filter(tag => tag.importance === 'low');

        return (
          <>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                This panel shows metadata tags that are missing from the page but are recommended for better SEO and sharing.
              </p>
            </div>
            
            {metadata.missing.hasCritical && (
              <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md mb-4 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-700 dark:text-red-300 font-medium">
                  Critical tags are missing! These tags are essential for proper SEO and social sharing.  
                </p>
              </div>
            )}
            
            {criticalTags.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">Critical Priority</h3>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-3 border-l-2 border-red-500">
                  <ul className="list-disc pl-5 space-y-2">
                    {criticalTags.map((tag, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        {tag.key}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {mediumTags.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Medium Priority</h3>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-md p-3 border-l-2 border-yellow-500">
                  <ul className="list-disc pl-5 space-y-2">
                    {mediumTags.map((tag, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        {tag.key}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {lowTags.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">Low Priority</h3>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 border-l-2 border-blue-500">
                  <ul className="list-disc pl-5 space-y-2">
                    {lowTags.map((tag, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        {tag.key}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {criticalTags.length === 0 && mediumTags.length === 0 && lowTags.length === 0 && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No missing metadata tags found matching your search.
              </div>
            )}
          </>
        );
        
      default:
        return null;
    }
  };
  


  // Helper function to get a clean type name from JSON-LD
  function getJsonLdType(item: any): string {
    if (!item) return 'Unknown';
    
    // Handle arrays of types
    if (item['@type']) {
      const type = Array.isArray(item['@type']) 
        ? item['@type'][0] 
        : item['@type'];
      
      return getTypeFromUrl(type);
    }
    
    // For graph structures
    if (item['@graph'] && Array.isArray(item['@graph']) && item['@graph'][0]?.['@type']) {
      return `Graph (${getTypeFromUrl(item['@graph'][0]['@type'])})`;
    }
    
    return 'Generic';
  }

  // Helper function to get clean type from URL
  function getTypeFromUrl(type: string): string {
    if (!type) return 'Unknown';
    
    // Extract the last part of the URL or schema
    // e.g., http://schema.org/Person -> Person, schema:Person -> Person
    const parts = type.split(/[/#:]/);
    return parts[parts.length - 1];
  }

  return (
    <div
      className={cn(
        "overflow-hidden max-h-[80vh] flex flex-col", // Added flex layout
        "bg-white dark:bg-gray-900",
        "text-black dark:text-white",
        "transition-colors duration-200",
        "theme-transition-container",
        theme === "dark" ? "dark" : ""
      )}
    >
      {/* Header - Fixed at top with flex-shrink-0 */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-50 space-y-4 flex-shrink-0">
        {/* Top row with logo and controls */}
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold">MetaScan</h2>
          <div className="flex items-center space-x-3">
            {/* Position Controls */}
            <div className="relative">
              <PositionControl 
                showPositionMenu={showPositionMenu}
                togglePositionMenu={togglePositionMenu}
                changePosition={changePosition}
                uiState={uiState}
              />
            </div>

            {/* Settings Menu */}
            <SettingsMenu 
              showSettingsMenu={showSettingsMenu}
              toggleSettingsMenu={toggleSettingsMenu}
              version={version}
            />

            {/* Theme Toggle */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* JSON Toggle */}
            <button
              onClick={() => setShowJSON(!showJSON)}
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                showJSON
                  ? "bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-400"
                  : "text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-600 bg-gray-100 dark:bg-gray-700"
              }`}
              title={showJSON ? "Hide JSON" : "Show JSON"}
            >
              <JsonIcon />
            </button>

            {/* Refresh Button */}
            <button
              onClick={refreshMetadata}
              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-600 bg-gray-100 dark:bg-gray-700 rounded-full"
              title="Refresh metadata"
            >
              <RefreshIcon />
            </button>
          </div>
        </div>

        {/* Search row */}
        <div className="relative">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search metadata... (Ctrl+F)"
            className="w-full"
            ref={searchInputRef}
          />
        </div>
      </div>

      {/* Content area - Scrollable with flex-grow */}
      <div className="flex-1 overflow-auto min-h-0">
      {showJSON ? (
        <div className="p-3 overflow-y-auto">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto text-xs relative group">
            <button
              onClick={handleCopyJSON}
              className={cn(
                "absolute top-2 right-2 transition-opacity bg-gray-200 dark:bg-gray-700 p-1.5 rounded-full",
                "text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600",
                "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",
                "sm:opacity-0 sm:group-hover:opacity-100",
                copyError ? "bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300" : ""
              )}
              aria-label="Copy JSON"
              title={copyError ? "Failed to copy" : "Copy JSON to clipboard"}
              tabIndex={0}
            >
              {copyError ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : jsonCopied ? (
                <CheckIcon />
              ) : (
                <CopyIcon />
              )}
            </button>
            {copyMessage && (
              <div 
                className="sr-only" 
                role="status" 
                aria-live="polite"
              >
                {copyMessage}
              </div>
            )}
            <pre ref={jsonTextRef} className="pt-8">{JSON.stringify(formatMetadataForJSON(metadata), null, 2)}</pre>
          </div>
        </div>
      ) : debouncedSearchTerm ? (
        <div className="p-3 overflow-y-auto">
          <SearchResults 
            searchTerm={debouncedSearchTerm}
            metadata={metadata}
            filterMetadataItems={filterMetadataItems}
            getJsonLdType={getJsonLdType}
            getTypeFromUrl={getTypeFromUrl}
          />
        </div>
      ) : (
        <div
          ref={cardsContainerRef}
          className={cn(
            "p-3 flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
          )}
          style={{ scrollbarWidth: "thin" }}
        >
          {tabs.map((tab) => (
            <Card 
              key={tab.id} 
              title={
                <div className="flex items-center">
                  {tab.label}
                  {tab.badge === "critical" && (
                    <span className="ml-2 w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                  )}
                </div>
              }
            >
              {renderTabContent(tab.id)}
            </Card>
          ))}
        </div>
      )}
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center flex-shrink-0 bg-white dark:bg-gray-900">
        Data extracted at {new Date(metadata.extractedAt).toLocaleTimeString()}
        {metadata.missing?.hasCritical && (
          <span className="ml-2 text-red-500 dark:text-red-400 font-medium">
            • Critical tags missing
          </span>
        )}
      </div>
    </div>
  );
};

export default MetadataLayout;
