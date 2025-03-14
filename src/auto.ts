/**
 * Auto initialization script - used for script tag inclusion
 * This file is the entry point when including via CDN:
 * <script src="//unpkg.com/meta-scan/dist/auto.global.js"></script>
 */
import { MetaScan, init } from "./index";
import { renderUI } from "./ui";
import type { MetaScanOptions, Corner } from "./types";

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

      if (scriptTag.dataset.theme) {
        options.theme = scriptTag.dataset.theme as any;
      }

      // Initialize with extracted options
      init(options);

      // Always render the UI with toggle button
      renderUI();

      console.log("MetaScan auto-initialized from script tag");
    } else {
      // Default initialization
      init();
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
