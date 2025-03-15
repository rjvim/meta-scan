import { useState, useRef, useEffect } from "preact/hooks";
import { cn } from "../utils/cn";
import type { MetadataResult } from "../types";
import { CheckIcon, CopyIcon, JsonIcon, RefreshIcon } from "./icons";

type LayoutType = "tabs" | "cards";
type TabId = "general" | "opengraph" | "twitter" | "technical";

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

// A single tab that can transition to/from a card
const TransitionableSection = ({
  id,
  label,
  active,
  layout,
  transitioning,
  transitionDirection,
  onClick,
  children,
  order,
}: {
  id: TabId;
  label: string;
  active: boolean;
  layout: LayoutType;
  transitioning: boolean;
  transitionDirection: "to-cards" | "to-tabs" | null;
  onClick: () => void;
  children: React.ReactNode;
  order: number;
}) => {
  const isCard = layout === "cards";
  const isTransitioning =
    transitioning &&
    (transitionDirection === "to-cards" || transitionDirection === "to-tabs");

  // Dynamic styles for transition animations
  const getTransitionStyles = () => {
    // Base styles
    let styles = "transition-all duration-500 ease-in-out";

    if (!isTransitioning) {
      return styles;
    }

    if (transitionDirection === "to-cards") {
      // Transform from tab to card
      if (order === 0) {
        // First tab stays mostly in place, just resizing
        return `${styles} transform origin-top-left`;
      } else {
        // Other tabs fly out to their card positions
        const delay = order * 100;
        return `${styles} transform delay-[${delay}ms]`;
      }
    } else if (transitionDirection === "to-tabs") {
      // Transform from card to tab
      if (order === 0) {
        // First card stays mostly in place
        return `${styles} transform origin-top-left`;
      } else {
        // Cards fly in to become tabs in sequence (last card first)
        const delay = (4 - order) * 100;
        return `${styles} transform delay-[${delay}ms]`;
      }
    }

    return styles;
  };

  return (
    <div
      className={cn(
        getTransitionStyles(),
        isCard
          ? "flex-shrink-0 w-80 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 m-1 overflow-hidden"
          : "border-b border-gray-200 dark:border-gray-700",
        active && isCard && "ring-2 ring-purple-500",
        "bg-white dark:bg-gray-900"
      )}
    >
      {/* Header - either tab or card title */}
      <div
        className={cn(
          isCard
            ? "p-3 border-b border-gray-200 dark:border-gray-700"
            : "inline-block"
        )}
      >
        <button
          onClick={onClick}
          className={cn(
            "text-left",
            isCard
              ? "w-full text-sm font-semibold text-gray-700 dark:text-gray-200"
              : cn(
                  "px-3 py-2 text-xs whitespace-nowrap transition-colors",
                  active
                    ? "border-b-2 border-purple-600 dark:border-purple-400 text-purple-700 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                )
          )}
        >
          {label}
        </button>
      </div>

      {/* Content - only shown for active tab or all cards */}
      {(active || isCard) && (
        <div className={cn(isCard ? "p-3 overflow-y-auto max-h-80" : "p-3")}>
          {children}
        </div>
      )}
    </div>
  );
};

// Layout toggle button
const LayoutToggle = ({
  layout,
  onToggle,
  disabled,
}: {
  layout: LayoutType;
  onToggle: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "px-2 py-1 text-xs rounded transition-colors",
        disabled
          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      )}
    >
      Switch to {layout === "tabs" ? "cards" : "tabs"}
    </button>
  );
};

// Main TransitionMetadataLayout component
const TransitionMetadataLayout = ({
  metadata,
  refreshMetadata,
  theme = "light",
}: {
  metadata: MetadataResult | null;
  refreshMetadata: () => void;
  theme?: "light" | "dark";
}) => {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [showJSON, setShowJSON] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("tabs");
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "to-cards" | "to-tabs" | null
  >(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "general" as TabId, label: "General" },
    { id: "opengraph" as TabId, label: "Open Graph" },
    { id: "twitter" as TabId, label: "Twitter" },
    { id: "technical" as TabId, label: "Technical" },
  ];

  // Toggle between layouts with animation
  const toggleLayout = () => {
    if (transitioning) return;

    setTransitioning(true);
    setTransitionDirection(layout === "tabs" ? "to-cards" : "to-tabs");

    setTimeout(() => {
      setLayout(layout === "tabs" ? "cards" : "tabs");

      // Wait for animation to complete
      setTimeout(() => {
        setTransitioning(false);
        setTransitionDirection(null);
      }, 600);
    }, 50);
  };

  // Handle horizontal scrolling for cards
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container || layout !== "cards") return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [layout, cardsContainerRef.current]);

  if (!metadata) return null;

  const renderTabContent = (tabId: TabId) => {
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
        "overflow-y-auto max-h-[70vh] scrollbar-thin",
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
            <LayoutToggle
              layout={layout}
              onToggle={toggleLayout}
              disabled={transitioning}
            />
            <button
              onClick={() => setShowJSON(!showJSON)}
              disabled={transitioning}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                showJSON
                  ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
                transitioning && "opacity-50 cursor-not-allowed"
              )}
              title={showJSON ? "Hide JSON" : "Show JSON"}
            >
              <JsonIcon />
            </button>
            <button
              onClick={refreshMetadata}
              disabled={transitioning}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800",
                transitioning && "opacity-50 cursor-not-allowed"
              )}
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
      ) : (
        <div className="relative">
          {/* Tabs layout container */}
          <div
            className={cn(
              "p-3",
              layout === "tabs" ? "block" : "hidden",
              layout === "tabs" &&
                transitioning &&
                "transform transition-transform duration-500"
            )}
          >
            <div className="flex overflow-x-auto mb-4 border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab, index) => (
                <TransitionableSection
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  active={activeTab === tab.id}
                  layout={layout}
                  transitioning={transitioning}
                  transitionDirection={transitionDirection}
                  onClick={() => setActiveTab(tab.id)}
                  order={index}
                >
                  {activeTab === tab.id && renderTabContent(tab.id)}
                </TransitionableSection>
              ))}
            </div>
            <div className="tab-content">{renderTabContent(activeTab)}</div>
          </div>

          {/* Cards layout container */}
          <div
            ref={cardsContainerRef}
            className={cn(
              "p-3 flex space-x-4 overflow-x-auto pb-4",
              layout === "cards" ? "block" : "hidden",
              "transition-opacity duration-500",
              transitioning && "opacity-100"
            )}
          >
            {tabs.map((tab, index) => (
              <TransitionableSection
                key={tab.id}
                id={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                layout={layout}
                transitioning={transitioning}
                transitionDirection={transitionDirection}
                onClick={() => setActiveTab(tab.id)}
                order={index}
              >
                {renderTabContent(tab.id)}
              </TransitionableSection>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center">
        Data extracted at {new Date(metadata.extractedAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default TransitionMetadataLayout;
