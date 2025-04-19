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
    logger.info("Starting autoInitialize function");
    const scriptTags = document.querySelectorAll('script[src*="meta-scan"]');
    logger.info(`Found ${scriptTags.length} meta-scan script tags`);
    let shouldEnable = true;

    if (scriptTags.length > 0) {
      const scriptTag = scriptTags[0] as HTMLElement;
      logger.info("Processing first script tag", scriptTag);

      // Check for data-auto-enable attribute
      logger.info(`data-auto-enable value: "${scriptTag.dataset.autoEnable}"`);
      if (scriptTag.dataset.autoEnable === "false") {
        logger.info("data-auto-enable is set to false, checking saved state");
        // Check if the property exists in saved state at all
        const state = stateManager.getState();
        logger.info("Current state:", state);
        const hasExplicitUserPreference = Object.prototype.hasOwnProperty.call(
          state,
          "lastEnableDisable"
        );
        logger.info(
          `Has explicit user preference: ${hasExplicitUserPreference}`
        );

        shouldEnable = hasExplicitUserPreference
          ? Boolean(state.lastEnableDisable)
          : false;
        logger.info(
          `Determined shouldEnable=${shouldEnable} based on user preference`
        );
      }

      const options: Partial<MetaScanOptions> = {
        enabled: shouldEnable,
      };
      logger.info("Creating initial options object", options);

      // Parse other data attributes
      if (scriptTag.dataset.position) {
        options.position = scriptTag.dataset.position as Corner;
        logger.info(`Setting position to ${options.position}`);
      }

      if (scriptTag.dataset.autoUpdate !== "false") {
        options.autoUpdate = true;
        logger.info("Auto-update enabled");
      }

      if (scriptTag.dataset.theme) {
        options.theme = scriptTag.dataset.theme as any;
        logger.info(`Setting theme to ${options.theme}`);
      }
      
      // Check for tap feature enablement
      if (scriptTag.dataset.enableTapFeature === "true") {
        options.enableTapFeature = true;
        logger.info("Tap feature explicitly enabled via script attribute");
      } else {
        options.enableTapFeature = false;
        logger.info("Tap feature disabled (default or explicitly set to false)");
      }

      // Initialize with extracted options
      logger.info("Initializing with options", options);
      init(options);

      // Only render UI if enabled
      if (shouldEnable) {
        logger.info("shouldEnable is true, rendering UI");
        renderUI();
        logger.info("MetaScan auto-initialized and enabled");
      } else {
        logger.info("shouldEnable is false, explicitly disabling");
        enableOrDisable(false);
        logger.info(
          "MetaScan initialized but disabled (user preference or auto-enable: false)"
        );
      }
    } else {
      logger.info(
        "No meta-scan script tags found, using default initialization"
      );
      // Default initialization with auto-update enabled
      const defaultOptions = {
        autoUpdate: true,
        enabled: shouldEnable,
      };
      logger.info("Using default options", defaultOptions);
      init(defaultOptions);

      if (shouldEnable) {
        logger.info("shouldEnable is true, rendering UI with defaults");
        renderUI();
        logger.info("MetaScan auto-initialized with defaults");
      } else {
        logger.info("shouldEnable is false with defaults, skipping UI render");
      }
    }
    logger.info("autoInitialize function completed");
  };

  // Run auto-init when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInitialize);
  } else {
    setTimeout(autoInitialize, 0);
  }
}

export * from "./index";
