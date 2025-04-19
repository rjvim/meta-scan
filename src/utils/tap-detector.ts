/**
 * Utility to detect multiple taps for enabling/disabling MetaScan
 */
import { MetaScan } from "..";
import { stateManager } from "../state";
import { logger } from "./logger";

// Configuration
const TAP_COUNT_THRESHOLD = 5;
const TAP_TIMEOUT_MS = 3000; // 3 seconds to complete the sequence

// State
let tapCount = 0;
let lastTapTime = 0;
let tapTimeoutId: number | null = null;

/**
 * Reset the tap counter
 */
function resetTapCounter() {
  tapCount = 0;
  if (tapTimeoutId !== null) {
    window.clearTimeout(tapTimeoutId);
    tapTimeoutId = null;
  }
}

/**
 * Check if the tap feature is enabled
 * @returns {boolean} Whether the tap feature is enabled
 */
export function checkTapFeatureEnabled(): boolean {
  // Check if the tap feature is enabled in options
  const options = (MetaScan as any).options;
  if (options && options.enableTapFeature === true) {
    logger.info('MetaScan: Tap feature enabled via options');
    return true;
  }

  // Check if the tap feature is enabled via script tag attribute
  if (typeof document !== 'undefined') {
    const scriptTags = document.querySelectorAll('script[src*="meta-scan"]');
    if (scriptTags.length > 0) {
      const scriptTag = scriptTags[0] as HTMLElement;
      if (scriptTag.dataset.enableTapFeature === 'true') {
        logger.info('MetaScan: Tap feature enabled via script tag attribute');
        return true;
      }
    }
  }

  logger.info('MetaScan: Tap feature is disabled');
  return false;
}

/**
 * Handle a tap event
 * @returns {boolean} Whether the tap sequence was completed
 */
export function handleTap(): boolean {
  // First check if the tap feature is enabled
  if (!checkTapFeatureEnabled()) {
    return false;
  }

  const now = Date.now();
  
  // If it's been too long since the last tap, reset the counter
  if (now - lastTapTime > TAP_TIMEOUT_MS && tapCount > 0) {
    resetTapCounter();
  }
  
  // Update last tap time
  lastTapTime = now;
  
  // Increment tap count
  tapCount++;
  
  // Set a timeout to reset the counter if the sequence isn't completed
  if (tapTimeoutId === null) {
    tapTimeoutId = window.setTimeout(() => {
      resetTapCounter();
    }, TAP_TIMEOUT_MS);
  }
  
  // Check if we've reached the threshold
  if (tapCount >= TAP_COUNT_THRESHOLD) {
    // Toggle the enabled state
    const currentState = stateManager.getEnableDisable();
    const newState = !currentState;
    
    // Log the action
    logger.info(`MetaScan: 5-tap sequence detected, ${newState ? 'enabling' : 'disabling'} MetaScan`);
    
    // Reset the counter
    resetTapCounter();
    
    // Instead of using enableOrDisable which might open the panel,
    // use stateManager.setEnableDisable to just toggle the visibility
    stateManager.setEnableDisable(newState);
    
    // Update the UI without opening the panel
    const container = document.getElementById("meta-scan-root");
    if (container) {
      container.style.display = newState ? "" : "none";
      // Make sure the panel stays closed
      stateManager.updateState({ isOpen: false });
    }

    // Return true to indicate the sequence was completed
    return true;
  }
  
  return false;
}

/**
 * Initialize the tap detector
 */
export function initTapDetector() {
  // Only initialize in browser environment
  if (typeof window === 'undefined') return;
  
  // Add a click event listener to the document
  document.addEventListener('click', () => {
    // Only process taps if the feature is enabled
    if (checkTapFeatureEnabled()) {
      // Process all clicks, not just those on the document body
      // This makes the feature more reliable, especially on mobile
      const result = handleTap();
      
      // Only log if the tap feature is enabled
      logger.info('MetaScan: Tap detected, count: ' + tapCount);
      
      // If the tap threshold was reached, prevent default behavior
      if (result) {
        logger.info('MetaScan: Tap threshold reached, toggling visibility');
      }
    }
  });
  
  logger.info('MetaScan: Tap detector initialized');
}
