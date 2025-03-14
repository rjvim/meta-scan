/**
 * Utility to detect DOM changes and page reloads
 * src/utils/dom-watcher.ts
 */
import { debounce } from "./index";
import { logger } from "./logger";

type MetadataChangeCallback = (isReload: boolean) => void;

let observer: MutationObserver | null = null;
let isObserving = false;
let changeCallback: MetadataChangeCallback | null = null;

/**
 * Initialize the DOM watcher to detect changes to metadata
 * @param callback Function to call when metadata might have changed
 */
export function initDOMWatcher(callback: MetadataChangeCallback): void {
  // Already initialized
  if (observer) return;

  changeCallback = callback;

  // Set up page visibility change detection
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Handle page reloads and navigation
  window.addEventListener("beforeunload", () => {
    // Clean up before page unload
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  window.addEventListener("load", () => {
    // Page fully loaded - treat as reload
    if (changeCallback) changeCallback(true);
  });

  // Set up mutation observer for DOM changes
  setupMutationObserver();
}

/**
 * Set up mutation observer to watch for metadata changes in <head>
 */
function setupMutationObserver(): void {
  if (observer) return;

  // Create observer instance
  observer = new MutationObserver(
    // Debounce to avoid multiple rapid calls
    debounce((mutations: MutationRecord[]) => {
      // Only proceed if we have a callback
      if (!changeCallback) return;

      // Check if any mutations affect metadata
      const hasMetadataChanges = mutations.some((mutation) => {
        // Check if changes happened in <head>
        if (mutation.target.nodeName === "HEAD") return true;

        // Check for added/removed meta tags
        if (mutation.type === "childList") {
          return (
            Array.from(mutation.addedNodes).some(
              (node) => node.nodeName === "META" || node.nodeName === "TITLE"
            ) ||
            Array.from(mutation.removedNodes).some(
              (node) => node.nodeName === "META" || node.nodeName === "TITLE"
            )
          );
        }

        // Check for attribute changes on relevant elements
        if (mutation.type === "attributes") {
          const targetNode = mutation.target as Element;
          return (
            targetNode.nodeName === "META" ||
            targetNode.nodeName === "TITLE" ||
            targetNode.nodeName === "LINK"
          );
        }

        return false;
      });

      if (hasMetadataChanges && changeCallback) {
        changeCallback(false);
      }
    }, 500)
  );

  // Start observing
  startObserving();
}

/**
 * Start observing DOM changes
 */
export function startObserving(): void {
  if (!observer || isObserving) return;

  // Focus on head element and its contents
  const headElement = document.head;

  if (headElement) {
    observer.observe(headElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["content", "property", "name", "href"],
    });

    isObserving = true;
    logger.info("MetaScan: Started observing DOM changes");
  }
}

/**
 * Stop observing DOM changes
 */
export function stopObserving(): void {
  if (!observer || !isObserving) return;

  observer.disconnect();
  isObserving = false;
  logger.info("MetaScan: Stopped observing DOM changes");
}

/**
 * Handle visibility change events (tab focus/blur)
 */
function handleVisibilityChange(): void {
  if (document.visibilityState === "visible") {
    // Page became visible again (tab focus) - check for changes
    if (changeCallback) changeCallback(true);
  }
}

/**
 * Clean up observers and event listeners
 */
export function cleanup(): void {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  document.removeEventListener("visibilitychange", handleVisibilityChange);
  isObserving = false;
  changeCallback = null;
}
