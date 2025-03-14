/**
 * Modified auto.ts to include auto-update configuration
 */
import { MetaScan, init } from "./index";
import { renderUI } from "./ui";
import type { MetaScanOptions, Corner } from "./types";

// Update the MetaScanOptions type in src/types/index.ts to include:
// autoUpdate?: boolean; // Whether to automatically update on DOM changes

// Set up global object
if (typeof window !== "undefined") {
  window.MetaScan = MetaScan;

  // Auto initialize from script tag data attributes if present
  const autoInitialize = () => {
    const scriptTags = document.querySelectorAll('script[src*="meta-scan"]');

    if (scriptTags.length > 0) {
      const scriptTag = scriptTags[0] as HTMLElement;

      const options: Partial<MetaScanOptions> = {};

      // Parse data attributes
      if (scriptTag.dataset.position) {
        options.position = scriptTag.dataset.position as Corner;
      }

      if (scriptTag.dataset.autoOpen === "true") {
        options.autoOpen = true;
      }

      // Add support for auto-update configuration
      // Default to true - auto update enabled
      options.autoUpdate = scriptTag.dataset.autoUpdate !== "false";

      if (scriptTag.dataset.theme) {
        options.theme = scriptTag.dataset.theme as any;
      }

      // Initialize with extracted options
      init(options);

      // Always render the UI with toggle button
      renderUI();

      console.log("MetaScan auto-initialized from script tag", options);
    } else {
      // Default initialization with auto-update enabled
      init({ autoUpdate: true });
      renderUI();
      console.log("MetaScan auto-initialized with defaults");
    }
  };

  // Run auto-init when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInitialize);
  } else {
    setTimeout(autoInitialize, 0);
  }
}

export * from "./index";
