import { useState } from "preact/hooks";
import { cn } from "../utils/cn";
import type { MetadataResult } from "../types";

// Import all layout components
import MetadataPanel from "./MetadataPanel"; // Original layout
import MetadataLayout from "./MetadataLayout"; // Simple cards/tabs layout
import TransitionMetadataLayout from "./TransitionMetadataLayout"; // Animated transition layout
import FlipMetadataLayout from "./FlipMetadataLayout"; // FLIP animation layout

type LayoutVariant = "original" | "simple" | "transition" | "flip";

/**
 * Wrapper component to switch between different layout implementations
 */
const MetadataLayoutWrapper = ({
  metadata,
  refreshMetadata,
  theme = "light",
}: {
  metadata: MetadataResult | null;
  refreshMetadata: () => void;
  theme?: "light" | "dark";
}) => {
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>("original");

  if (!metadata) return null;

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* Layout selector */}
      <div className="p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 z-20">
        <div className="text-xs text-gray-500 dark:text-gray-400">Layout:</div>
        <div className="flex gap-2">
          {[
            { id: "original", label: "Original" },
            { id: "simple", label: "Simple" },
            { id: "transition", label: "Transition" },
            { id: "flip", label: "FLIP" },
          ].map((variant) => (
            <button
              key={variant.id}
              onClick={() => setLayoutVariant(variant.id as LayoutVariant)}
              className={cn(
                "px-2 py-1 text-xs rounded transition-colors",
                layoutVariant === variant.id
                  ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {variant.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render the selected layout */}
      {layoutVariant === "original" && (
        <MetadataPanel
          metadata={metadata}
          refreshMetadata={refreshMetadata}
          theme={theme as "light" | "dark"}
        />
      )}

      {layoutVariant === "simple" && (
        <MetadataLayout
          metadata={metadata}
          refreshMetadata={refreshMetadata}
          theme={theme as "light" | "dark"}
        />
      )}

      {layoutVariant === "transition" && (
        <TransitionMetadataLayout
          metadata={metadata}
          refreshMetadata={refreshMetadata}
          theme={theme as "light" | "dark"}
        />
      )}

      {layoutVariant === "flip" && (
        <FlipMetadataLayout
          metadata={metadata}
          refreshMetadata={refreshMetadata}
          theme={theme as "light" | "dark"}
        />
      )}
    </div>
  );
};

export default MetadataLayoutWrapper;
