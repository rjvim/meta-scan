import { useState, useRef, useEffect } from "preact/hooks";
import { cn } from "../utils/cn";
import type { MetadataResult, StructuredData, MicrodataItem } from "~/types";
import { CheckIcon, CopyIcon, JsonIcon, RefreshIcon } from "./icons";
import { type ComponentChildren } from "preact";

// Component for metadata item display
const MetadataItem = ({
  label,
  value,
  copyable = true,
}: {
  label: string;
  value: string | number | object | null;
  copyable?: boolean;
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
    <div className=" pb-2 group">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {label}
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
  title: string;
  children: ComponentChildren;
}) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-[350px] rounded-lg overflow-hidden shadow-md transition-all duration-300 transform",
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

// Main MetadataLayout component
const MetadataLayout = ({
  metadata,
  refreshMetadata,
  theme = "light",
}: {
  metadata: MetadataResult | null;
  refreshMetadata: () => void;
  theme?: "light" | "dark";
}) => {
  const [showJSON, setShowJSON] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  const tabs = [
    { id: "general", label: "General" },
    { id: "opengraph", label: "Open Graph" },
    { id: "twitter", label: "Twitter" },
    { id: "technical", label: "Technical" },
    { id: "structured", label: "Structured Data" },
  ];

  if (!metadata) return null;

  // Fallback copy method using document.execCommand
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
    
    // For very large JSON, truncate it for display purposes but copy the full version
    const jsonString = JSON.stringify(metadata, null, 2);
    
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

  // Filter metadata items based on search term
  const filterMetadataItems = (items: [string, any][]): [string, any][] => {
    if (!searchTerm) return items;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter(([key, value]) => {
      // Search in keys
      if (key.toLowerCase().includes(lowerSearchTerm)) return true;
      
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
  };

  // Fix TypeScript errors by ensuring null instead of undefined for metadata values
  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "general":
        return filterMetadataItems(Object.entries(metadata.general || {})).map(([key, value]) => (
          <MetadataItem key={key} label={key} value={value ?? null} />
        ));
      case "opengraph":
        const filteredOgItems = filterMetadataItems(Object.entries(metadata.opengraph || {}));
        return (
          <>
            {!searchTerm && metadata.opengraph?.image && (
              <MetadataImage
                src={metadata.opengraph.image || null}
                alt={metadata.opengraph.title || metadata.general?.title || ""}
              />
            )}
            {filteredOgItems.map(([key, value]) => (
              <MetadataItem key={key} label={`og:${key}`} value={value ?? null} />
            ))}
            {filteredOgItems.length === 0 && searchTerm && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No matching Open Graph metadata found
              </div>
            )}
          </>
        );
      case "twitter":
        const filteredTwitterItems = filterMetadataItems(Object.entries(metadata.twitter || {}));
        return (
          <>
            {!searchTerm && metadata.twitter?.image && (
              <MetadataImage
                src={metadata.twitter.image || null}
                alt={metadata.twitter.title || metadata.general?.title || ""}
              />
            )}
            {filteredTwitterItems.map(([key, value]) => (
              <MetadataItem key={key} label={`twitter:${key}`} value={value ?? null} />
            ))}
            {filteredTwitterItems.length === 0 && searchTerm && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                No matching Twitter metadata found
              </div>
            )}
          </>
        );
      case "technical":
        const filteredTechItems = filterMetadataItems(Object.entries(metadata.technical || {}));
        return (
          <>
            {filteredTechItems.map(([key, value]) => (
              <MetadataItem key={key} label={key} value={value ?? null} />
            ))}
            {filteredTechItems.length === 0 && searchTerm && (
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
        const filteredJsonLd = !searchTerm ? structuredData.jsonLd : structuredData.jsonLd.filter(item => {
          return JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase());
        });
        
        // Filter Microdata
        const filteredMicrodata = !searchTerm ? structuredData.microdata : structuredData.microdata.filter(item => {
          return (
            item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            JSON.stringify(item.properties).toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        
        const noResults = searchTerm && filteredJsonLd.length === 0 && filteredMicrodata.length === 0;
        
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
        "overflow-hidden max-h-[80vh]",
        "bg-white dark:bg-gray-900",
        "text-black dark:text-white",
        "transition-colors duration-200",
        theme === "dark" ? "dark" : ""
      )}
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold">MetaScan</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowJSON(!showJSON)}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                showJSON
                  ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
              title={showJSON ? "Hide JSON" : "Show JSON"}
            >
              <JsonIcon />
            </button>
            <button
              onClick={refreshMetadata}
              className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              aria-label="Refresh Metadata"
              title="Refresh Metadata"
            >
              <RefreshIcon />
            </button>
          </div>
        </div>
        
        {/* Search input */}
        <div className="mt-2 relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
            placeholder="Search metadata... (Ctrl+F)"
            className={cn(
              "w-full px-3 py-1.5 text-sm rounded-md",
              "bg-gray-100 dark:bg-gray-800",
              "text-gray-800 dark:text-gray-200",
              "placeholder-gray-500 dark:placeholder-gray-400",
              "border border-gray-200 dark:border-gray-700",
              "focus:outline-none focus:ring-1 focus:ring-purple-500 dark:focus:ring-purple-400"
            )}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              title="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {showJSON ? (
        <div className="p-3">
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
            {/* Accessible status message for screen readers */}
            {copyMessage && (
              <div 
                className="sr-only" 
                role="status" 
                aria-live="polite"
              >
                {copyMessage}
              </div>
            )}
            <pre ref={jsonTextRef} className="pt-8">{JSON.stringify(metadata, null, 2)}</pre>
          </div>
        </div>
      ) : (
        <div
          ref={cardsContainerRef}
          className={cn(
            "p-3 flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
          )}
          style={{ scrollbarWidth: "thin" }}
        >
          {tabs.map((tab) => (
            <Card key={tab.id} title={tab.label}>
              {renderTabContent(tab.id)}
            </Card>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center">
        Data extracted at {new Date(metadata.extractedAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default MetadataLayout;
