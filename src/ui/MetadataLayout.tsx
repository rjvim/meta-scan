import { useState, useRef, useEffect } from "preact/hooks";
import { cn } from "../utils/cn";
import type { MetadataResult } from "~/types";
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
  const copyTimeoutRef = useRef<number | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const jsonTextRef = useRef<HTMLPreElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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

  const tabs = [
    { id: "general", label: "General" },
    { id: "opengraph", label: "Open Graph" },
    { id: "twitter", label: "Twitter" },
    { id: "technical", label: "Technical" },
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

  // Fix TypeScript errors by ensuring null instead of undefined for metadata values
  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "general":
        return Object.entries(metadata.general || {}).map(([key, value]) => (
          <MetadataItem key={key} label={key} value={value ?? null} />
        ));
      case "opengraph":
        return (
          <>
            <MetadataImage
              src={metadata.opengraph?.image || null}
              alt={metadata.opengraph?.title || metadata.general?.title || ""}
            />
            {Object.entries(metadata.opengraph || {}).map(([key, value]) => (
              <MetadataItem key={key} label={key} value={value ?? null} />
            ))}
          </>
        );
      case "twitter":
        return (
          <>
            <MetadataImage
              src={metadata.twitter?.image || null}
              alt={metadata.twitter?.title || metadata.general?.title || ""}
            />
            {Object.entries(metadata.twitter || {}).map(([key, value]) => (
              <MetadataItem key={key} label={key} value={value ?? null} />
            ))}
          </>
        );
      case "technical":
        return Object.entries(metadata.technical || {}).map(([key, value]) => (
          <MetadataItem key={key} label={key} value={value ?? null} />
        ));
      default:
        return null;
    }
  };

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
