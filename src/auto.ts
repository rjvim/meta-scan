/**
 * Modified auto.ts to include auto-enable configuration
 */
import { MetaScan, init, enableOrDisable } from "./index";
import { renderUI } from "./ui";
import type { MetaScanOptions, Corner } from "./types";
import { logger } from "./utils/logger";
import { stateManager } from "./state";

// Set up global object
if (typeof window !== "undefined") {
  window.MetaScan = MetaScan;

  // Auto initialize from script tag data attributes if present
  const autoInitialize = () => {
    const scriptTags = document.querySelectorAll('script[src*="meta-scan"]');
    let shouldEnable = true;

    if (scriptTags.length > 0) {
      const scriptTag = scriptTags[0] as HTMLElement;

      // Check for data-auto-enable attribute
      if (scriptTag.dataset.autoEnable === "false") {
        // Check if the property exists in saved state at all
        const state = stateManager.getState();
        const hasExplicitUserPreference = Object.prototype.hasOwnProperty.call(
          state,
          "lastEnableDisable"
        );

        shouldEnable = hasExplicitUserPreference
          ? Boolean(state.lastEnableDisable)
          : false;
      }

      const options: Partial<MetaScanOptions> = {
        enabled: shouldEnable,
      };

      // Parse other data attributes
      if (scriptTag.dataset.position) {
        options.position = scriptTag.dataset.position as Corner;
      }

      if (scriptTag.dataset.autoUpdate !== "false") {
        options.autoUpdate = true;
      }

      if (scriptTag.dataset.theme) {
        options.theme = scriptTag.dataset.theme as any;
      }

      // Initialize with extracted options
      init(options);

      // Only render UI if enabled
      if (shouldEnable) {
        renderUI();
        logger.info("MetaScan auto-initialized and enabled");
      } else {
        enableOrDisable(false);
        logger.info(
          "MetaScan initialized but disabled (user preference or auto-enable: false)"
        );
      }
    } else {
      // Default initialization with auto-update enabled
      init({
        autoUpdate: true,
        enabled: shouldEnable,
      });

      if (shouldEnable) {
        renderUI();
        logger.info("MetaScan auto-initialized with defaults");
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
