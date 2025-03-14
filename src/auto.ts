/**
 * Modified auto.ts to include auto-enable configuration
 */
import { MetaScan, init, enableOrDisable } from "./index";
import { renderUI } from "./ui";
import type { MetaScanOptions, Corner } from "./types";

// Set up global object
if (typeof window !== "undefined") {
  window.MetaScan = MetaScan;

  // Auto initialize from script tag data attributes if present
  const autoInitialize = () => {
    const scriptTags = document.querySelectorAll('script[src*="meta-scan"]');
    let shouldAutoEnable = true; // Default to enabled

    if (scriptTags.length > 0) {
      const scriptTag = scriptTags[0] as HTMLElement;

      // Check for data-auto-enable attribute
      if (scriptTag.dataset.autoEnable === "false") {
        shouldAutoEnable = false;
      }

      const options: Partial<MetaScanOptions> = {
        enabled: shouldAutoEnable,
      };

      // Parse other data attributes
      if (scriptTag.dataset.position) {
        options.position = scriptTag.dataset.position as Corner;
      }

      if (scriptTag.dataset.autoOpen === "true") {
        options.autoOpen = true;
      }

      if (scriptTag.dataset.autoUpdate !== "false") {
        options.autoUpdate = true;
      }

      if (scriptTag.dataset.theme) {
        options.theme = scriptTag.dataset.theme as any;
      }

      // Initialize with extracted options
      init(options);

      // Only render UI if auto-enable is true
      if (shouldAutoEnable) {
        renderUI();
        console.log("MetaScan auto-initialized and enabled");
      } else {
        enableOrDisable(false);
        console.log("MetaScan initialized but disabled (auto-enable: false)");
      }
    } else {
      // Default initialization with auto-update enabled
      init({
        autoUpdate: true,
        enabled: shouldAutoEnable,
      });

      if (shouldAutoEnable) {
        renderUI();
        console.log("MetaScan auto-initialized with defaults");
      }
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
