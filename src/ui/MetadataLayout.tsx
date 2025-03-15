import { useState, useRef, useEffect } from "preact/hooks";
import { cn } from "../utils/cn";
import type { MetadataResult } from "~/types";
import { CheckIcon, CopyIcon, JsonIcon, RefreshIcon } from "./icons";
import { type ComponentChildren } from "preact";

type LayoutType = "tabs" | "cards";

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
    <div className="mb-2 border-b border-gray-200 dark:border-gray-700 pb-2 group">
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

// Tabs component for tab layout
const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}) => {
  return (
    <div className="flex overflow-x-auto mb-4 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-3 py-2 text-xs whitespace-nowrap transition-colors",
            activeTab === tab.id
              ? "border-b-2 border-purple-600 dark:border-purple-400 text-purple-700 dark:text-purple-400"
              : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Card component for card layout
const Card = ({
  title,
  active,
  onClick,
  children,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
  children: ComponentChildren;
}) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-[350px] rounded-lg overflow-hidden shadow-md transition-all duration-300 transform",
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
        active ? "ring-2 ring-purple-500" : "hover:shadow-lg"
      )}
    >
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onClick}
          className="w-full text-left text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          {title}
        </button>
      </div>
      <div className="p-3 overflow-y-auto max-h-[60vh]">{children}</div>
    </div>
  );
};

// Layout toggle button
const LayoutToggle = ({
  layout,
  onToggle,
}: {
  layout: LayoutType;
  onToggle: () => void;
}) => {
  return (
    <button
      onClick={onToggle}
      className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      Switch to {layout === "tabs" ? "cards" : "tabs"}
    </button>
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
  const [activeTab, setActiveTab] = useState("general");
  const [showJSON, setShowJSON] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("cards");
  const [animating, setAnimating] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "general", label: "General" },
    { id: "opengraph", label: "Open Graph" },
    { id: "twitter", label: "Twitter" },
    { id: "technical", label: "Technical" },
  ];

  // Toggle between layouts with animation
  const toggleLayout = () => {
    setAnimating(true);
    setTimeout(() => {
      setLayout(layout === "cards" ? "tabs" : "cards");
      setTimeout(() => {
        setAnimating(false);
      }, 500); // Wait for animation to complete
    }, 10);
  };

  // Handle horizontal scrolling for cards
  // useEffect(() => {
  //   const container = cardsContainerRef.current;
  //   if (!container || layout !== "cards") return;

  //   const handleWheel = (e: WheelEvent) => {
  //     if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
  //     e.preventDefault();
  //     container.scrollLeft += e.deltaY;
  //   };

  //   container.addEventListener("wheel", handleWheel, { passive: false });
  //   return () => {
  //     container.removeEventListener("wheel", handleWheel);
  //   };
  // }, [layout, cardsContainerRef.current]);

  if (!metadata) return null;

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "general":
        return Object.entries(metadata.general || {}).map(([key, value]) => (
          <MetadataItem key={key} label={key} value={value} />
        ));
      case "opengraph":
        return (
          <>
            <MetadataImage
              src={metadata.opengraph?.image}
              alt={metadata.opengraph?.title || metadata.general?.title}
            />
            {Object.entries(metadata.opengraph || {}).map(([key, value]) => (
              <MetadataItem key={key} label={key} value={value} />
            ))}
          </>
        );
      case "twitter":
        return (
          <>
            <MetadataImage
              src={metadata.twitter?.image}
              alt={metadata.twitter?.title || metadata.general?.title}
            />
            {Object.entries(metadata.twitter || {}).map(([key, value]) => (
              <MetadataItem key={key} label={key} value={value} />
            ))}
          </>
        );
      case "technical":
        return Object.entries(metadata.technical || {}).map(([key, value]) => (
          <MetadataItem key={key} label={key} value={value} />
        ));
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden max-h-[80vh]", // Changed to overflow-hidden since cards have their own scroll
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
            <LayoutToggle layout={layout} onToggle={toggleLayout} />
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
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto text-xs">
            <pre>{JSON.stringify(metadata, null, 2)}</pre>
          </div>
        </div>
      ) : layout === "tabs" ? (
        <div
          className={cn(
            "p-3",
            animating ? "animate-fade-out" : "animate-fade-in"
          )}
        >
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="tab-content">{renderTabContent(activeTab)}</div>
        </div>
      ) : (
        <div
          ref={cardsContainerRef}
          className={cn(
            "p-3 flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",
            animating ? "animate-fade-out" : "animate-fade-in"
          )}
          style={{ scrollbarWidth: "thin" }}
        >
          {tabs.map((tab) => (
            <Card
              key={tab.id}
              title={tab.label}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
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
