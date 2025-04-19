/**
 * Main entry point for the MetaScan library
 */
import type { MetaScanAPI, MetaScanOptions, MetadataResult } from "./types";
import { cleanup, initDOMWatcher } from "./utils/dom-watcher";
import { renderUI } from "./ui";
import { logger } from "./utils/logger";
import { extractMetadata } from "./core";
import { stateManager } from "./state";
import { initTapDetector } from "./utils/tap-detector";

// Default options
const defaultOptions: MetaScanOptions = {
  enabled: true,
  position: "top-right",
  theme: "auto",
};

let options = { ...defaultOptions };

// In src/index.ts
// let isEnabled = true;

/**
 * Enable or disable MetaScan
 */
export function enableOrDisable(enabled: boolean): void {
  stateManager.setEnableDisable(enabled);
  // isEnabled = enabled;
  logger.info(`MetaScan ${enabled ? "enabled" : "disabled"}`);

  if (typeof window === "undefined") return;

  const container = document.getElementById("meta-scan-root");

  if (enabled) {
    // Re-enable functionality
    if (!container) {
      // If container doesn't exist, render UI
      renderUI();
    } else {
      // If container exists but is hidden, show it
      container.style.display = "";
    }

    // Re-initialize DOM watcher if it was disabled
    if (window.MetaScan._watchers?.domWatcher) {
      initDOMWatcher((isReload) => {
        // Handler code for DOM changes...
        logger.info(
          `MetaScan: Detected ${isReload ? "page reload" : "DOM changes"}`
        );
        // Update metadata...
      });
    }
  } else {
    // Disable functionality
    if (container) {
      // Hide UI
      container.style.display = "none";
      
      // Also update the UI state to close the panel
      stateManager.updateState({ isOpen: false });
    }

    // Clean up DOM watcher
    cleanup();
  }
}

/**
 * Initialize MetaScan with options
 */
export function init(userOptions?: Partial<MetaScanOptions>): void {
  if (userOptions) {
    options = { ...options, ...userOptions };
  }

  logger.info("MetaScan initialized with options:", options);
  
  // Initialize the tap detector for mobile usage
  initTapDetector();
}

/**
 * Get extracted metadata
 */
export function getMetadata(): MetadataResult {
  logger.info("Getting metadata");
  return extractMetadata();
}

/**
 * Export metadata in specified format
 */
export function exportData(format: "json" | "csv" | "text"): string {
  const data = getMetadata();
  logger.info(`Exporting metadata as ${format}`);

  if (format === "json") {
    return JSON.stringify(data, null, 2);
  } else if (format === "csv") {
    // Simple CSV conversion for demonstration
    let csv = "Category,Key,Value\n";
    for (const [category, values] of Object.entries(data)) {
      for (const [key, value] of Object.entries(values)) {
        if (value) {
          csv += `${category},${key},"${String(value).replace(/"/g, '""')}"\n`;
        }
      }
    }
    return csv;
  } else {
    // Plain text format
    let text = "MetaScan Metadata Report\n\n";
    for (const [category, values] of Object.entries(data)) {
      text += `== ${category.toUpperCase()} ==\n`;
      for (const [key, value] of Object.entries(values)) {
        if (value) {
          text += `${key}: ${value}\n`;
        }
      }
      text += "\n";
    }
    return text;
  }
}

/**
 * Configure options
 */
export function configure(newOptions: Partial<MetaScanOptions>): void {
  options = { ...options, ...newOptions };
  logger.info("MetaScan reconfigured with options:", options);
}

// Create the public API
export const MetaScan: MetaScanAPI = {
  getMetadata,
  export: exportData,
  configure,
  enableOrDisable,
  _watchers: {}, // For internal use
};
