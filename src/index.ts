/**
 * Main entry point for the MetaScan library
 */
import type { MetaScanAPI, MetaScanOptions, MetadataResult } from "./types";
import { extractMetadata } from "./core";
import { renderUI, showUI, hideUI, destroyUI } from "./ui";

// Default options
const defaultOptions: MetaScanOptions = {
  enabled: true,
  position: "bottom-right",
  autoOpen: false,
  theme: "auto",
  showPreview: true,
  tabs: ["general", "opengraph", "twitter", "technical", "structured"],
};

let options = { ...defaultOptions };
let initialized = false;

/**
 * Initialize MetaScan with options
 */
export function init(userOptions?: Partial<MetaScanOptions>): void {
  if (userOptions) {
    options = { ...options, ...userOptions };
  }

  console.log("MetaScan initialized with options:", options);
}

/**
 * Show the metadata panel
 */
export function show(): void {
  if (!initialized) {
    renderUI({ position: options.position || "bottom-right" });
    initialized = true;
  } else {
    showUI();
  }
  console.log("MetaScan panel shown");
}

/**
 * Hide the metadata panel
 */
export function hide(): void {
  hideUI();
  console.log("MetaScan panel hidden");
}

/**
 * Get extracted metadata
 */
export function getMetadata(): MetadataResult {
  console.log("Getting metadata");
  return extractMetadata();
}

/**
 * Export metadata in specified format
 */
export function exportData(format: "json" | "csv" | "text"): string {
  const data = getMetadata();
  console.log(`Exporting metadata as ${format}`);

  if (format === "json") {
    return JSON.stringify(data, null, 2);
  } else if (format === "csv") {
    // Simple CSV conversion for demonstration
    let csv = "Category,Key,Value\n";
    for (const [category, values] of Object.entries(data)) {
      if (category === "structured") continue; // Skip complex structured data

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
      if (category === "structured") continue;

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
  console.log("MetaScan reconfigured with options:", options);
}

/**
 * Clean up resources
 */
export function cleanup(): void {
  destroyUI();
  initialized = false;
  console.log("MetaScan cleaned up");
}

// Create the public API
export const MetaScan: MetaScanAPI = {
  show,
  hide,
  getMetadata,
  export: exportData,
  configure,
};
