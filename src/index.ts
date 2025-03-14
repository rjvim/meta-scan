/**
 * Main entry point for the MetaScan library
 */
import type { MetaScanAPI, MetaScanOptions, MetadataResult } from "./types";
import { extractMetadata } from "./core";
import { renderUI, destroyUI } from "./ui";

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
    renderUI();
    initialized = true;
  }
  console.log("MetaScan panel shown");
}

/**
 * Hide the metadata panel
 */
export function hide(): void {
  console.log("MetaScan panel hidden");
}

/**
 * Toggle visibility of the metadata panel
 */
export function toggle(): void {
  if (!initialized) {
    show();
  } else {
    console.log("MetaScan panel toggled");
  }
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
  return JSON.stringify(data);
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
  toggle,
  getMetadata,
  export: exportData,
  configure,
};
