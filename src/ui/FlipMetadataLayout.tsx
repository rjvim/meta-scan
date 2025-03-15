import { useState, useRef, useEffect, useCallback } from "preact/hooks";
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

// FLIP animation helper component
const AnimatedSection = ({
  id,
  label,
  active,
  isCard,
  onClick,
  children,
  animating,
  animationIndex,
}: {
  id: TabId;
  label: string;
  active: boolean;
  isCard: boolean;
  onClick: () => void;
  children: React.ReactNode;
  animating: boolean;
  animationIndex: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  // Store current position before animation
  useEffect(() => {
    if (animating && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      positionRef.current = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
    }
  }, [animating]);

  // Apply FLIP animation when layout changes
  useEffect(() => {
    if (animating && elementRef.current && positionRef.current) {
      const element = elementRef.current;
      const prevPos = positionRef.current;
      const newPos = element.getBoundingClientRect();

      // Calculate the transform to apply
      const dx = prevPos.left - newPos.left;
      const dy = prevPos.top - newPos.top;
      const dw = prevPos.width / newPos.width;
      const dh = prevPos.height / newPos.height;

      // Apply initial transform to make it appear in previous position
      element.style.transform = `translate(${dx}px, ${dy}px) scale(${dw}, ${dh})`;
      element.style.transformOrigin = "top left";
      element.style.transition = "none";

      // Force reflow
      void element.offsetWidth;

      // Animate to new position with delay based on index
      const delay = animationIndex * 100;
      element.style.transition = `transform 300ms ease-out ${delay}ms`;
      element.style.transform = "translate(0, 0) scale(1, 1)";

      // Clean up
      const cleanupTimer = setTimeout(() => {
        element.style.transition = "";
        element.style.transform = "";
        element.style.transformOrigin = "";
      }, 500 + delay);

      return () => clearTimeout(cleanupTimer);
    }
  }, [animating, animationIndex]);

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all duration-300",
        isCard
          ? "flex-shrink-0 w-80 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 m-1 overflow-hidden"
          : "border-b border-gray-200 dark:border-gray-700 inline-block",
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

// Main FlipMetadataLayout component
const FlipMetadataLayout = ({
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
  const [animating, setAnimating] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "general" as TabId, label: "General" },
    { id: "opengraph" as TabId, label: "Open Graph" },
    { id: "twitter" as TabId, label: "Twitter" },
    { id: "technical" as TabId, label: "Technical" },
  ];

  // Toggle between layouts with animation
  const toggleLayout = () => {
    if (animating) return;

    setAnimating(true);

    // Apply FLIP animation by keeping both layouts visible during transition
    setTimeout(() => {
      setLayout((prev) => (prev === "tabs" ? "cards" : "tabs"));

      // End animation after transition completes
      setTimeout(() => {
        setAnimating(false);
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

  const shouldShowTabsContainer = layout === "tabs" || animating;
  const shouldShowCardsContainer = layout === "cards" || animating;

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
              disabled={animating}
            />
            <button
              onClick={() => setShowJSON(!showJSON)}
              disabled={animating}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                showJSON
                  ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
                animating && "opacity-50 cursor-not-allowed"
              )}
              title={showJSON ? "Hide JSON" : "Show JSON"}
            >
              <JsonIcon />
            </button>
            <button
              onClick={refreshMetadata}
              disabled={animating}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800",
                animating && "opacity-50 cursor-not-allowed"
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
            ref={tabsContainerRef}
            className={cn(
              "p-3 transition-opacity duration-300",
              shouldShowTabsContainer ? "block" : "hidden",
              layout === "cards" && animating ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="flex overflow-x-auto mb-4 border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab, index) => (
                <AnimatedSection
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  active={activeTab === tab.id}
                  isCard={false}
                  onClick={() => setActiveTab(tab.id)}
                  animating={animating}
                  animationIndex={index}
                >
                  {tab.id === activeTab && renderTabContent(tab.id)}
                </AnimatedSection>
              ))}
            </div>
            {!animating && layout === "tabs" && (
              <div className="tab-content">{renderTabContent(activeTab)}</div>
            )}
          </div>

          {/* Cards layout container */}
          <div
            ref={cardsContainerRef}
            className={cn(
              "p-3 flex gap-4 overflow-x-auto pb-4 transition-opacity duration-300",
              shouldShowCardsContainer ? "block" : "hidden",
              layout === "tabs" && animating ? "opacity-0" : "opacity-100"
            )}
          >
            {tabs.map((tab, index) => (
              <AnimatedSection
                key={tab.id}
                id={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                isCard={true}
                onClick={() => setActiveTab(tab.id)}
                animating={animating}
                animationIndex={index}
              >
                {renderTabContent(tab.id)}
              </AnimatedSection>
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

export default FlipMetadataLayout;
