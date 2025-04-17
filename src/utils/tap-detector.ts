/**
 * Utility to detect multiple taps for enabling/disabling MetaScan
 */
import { stateManager } from "../state";
import { logger } from "./logger";

// Configuration
const TAP_COUNT_THRESHOLD = 5;
const TAP_TIMEOUT_MS = 3000; // 3 seconds to complete the sequence

// State
let tapCount = 0;
let lastTapTime = 0;
let tapTimeoutId: number | null = null;
let isTapFeatureEnabled = false;

/**
 * Check if the tap feature is enabled via the data-enable-tap-feature attribute
 */
function checkTapFeatureEnabled(): boolean {
  if (typeof document === 'undefined' || typeof window === 'undefined') return false;
  
  // First check if it was passed as an option
  if (window.MetaScan && window.MetaScan._options && window.MetaScan._options.enableTapFeature === true) {
    logger.info('MetaScan: Tap feature enabled via options');
    return true;
  }
  
  // Then check for the attribute on any script tag
  const metaScanScripts = document.querySelectorAll('script');
  logger.info(`MetaScan: Found ${metaScanScripts.length} script tags`);
  
  for (let i = 0; i < metaScanScripts.length; i++) {
    const script = metaScanScripts[i];
    if (script.hasAttribute('data-enable-tap-feature')) {
      const enableTapFeature = script.getAttribute('data-enable-tap-feature');
      logger.info(`MetaScan: Found script with data-enable-tap-feature="${enableTapFeature}"`);
      if (enableTapFeature === 'true' || enableTapFeature === '') {
        logger.info('MetaScan: Tap feature enabled via script attribute');
        return true;
      }
    }
  }
  
  logger.info('MetaScan: Tap feature not enabled');
  return false;
}

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
 * Handle a tap event
 * @returns {boolean} Whether the tap sequence was completed
 */
export function handleTap(): boolean {
  // Check if tap feature is enabled
  if (!isTapFeatureEnabled) {
    logger.info('MetaScan: Tap feature is disabled, ignoring tap');
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
  
  logger.info(`MetaScan: Tap detected, count: ${tapCount}/${TAP_COUNT_THRESHOLD}`);
  
  // Set a timeout to reset the counter if the sequence isn't completed
  if (tapTimeoutId === null) {
    tapTimeoutId = window.setTimeout(() => {
      resetTapCounter();
    }, TAP_TIMEOUT_MS);
  }
  
  // Check if we've reached the threshold
  if (tapCount >= TAP_COUNT_THRESHOLD) {
    // Toggle the enabled state but don't open the panel
    const currentState = stateManager.getEnableDisable();
    const newState = !currentState;
    
    // Log the action
    logger.info(`MetaScan: 5-tap sequence detected, ${newState ? 'enabling' : 'disabling'} MetaScan (icon only)`);
    
    // Reset the counter
    resetTapCounter();
    
    try {
      // Only update the enabled state, don't open the panel
      stateManager.setEnableDisable(newState);
      
      // Direct DOM manipulation to ensure panel doesn't open
      if (typeof document !== 'undefined') {
        if (newState) {
          // If enabling, make sure the container is visible but panel is closed
          const container = document.getElementById("meta-scan-root");
          if (container) {
            container.style.display = "";
            logger.info('MetaScan: Container made visible');
          } else {
            logger.info('MetaScan: Container not found');
          }
          
          // Ensure the panel is closed by directly updating state
          stateManager.updateState({ isOpen: false });
          logger.info('MetaScan: Panel state set to closed');
        } else {
          // If disabling, hide the container
          const container = document.getElementById("meta-scan-root");
          if (container) {
            container.style.display = "none";
            logger.info('MetaScan: Container hidden');
          } else {
            logger.info('MetaScan: Container not found');
          }
        }
      }
    } catch (error) {
      logger.error('MetaScan: Error toggling state:', error);
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
  
  // Debug info about the script tags
  if (typeof document !== 'undefined') {
    const scripts = document.querySelectorAll('script');
    logger.info(`MetaScan: Found ${scripts.length} script tags`);
    
    scripts.forEach((script, index) => {
      if (script.hasAttribute('data-enable-tap-feature')) {
        const value = script.getAttribute('data-enable-tap-feature');
        logger.info(`MetaScan: Script #${index} has data-enable-tap-feature="${value}"`);
      }
    });
    
    // Also check if it's in the options
    if (window.MetaScan && window.MetaScan._options) {
      logger.info(`MetaScan: Options: ${JSON.stringify(window.MetaScan._options)}`);
    }
  }
  
  // Check if the tap feature is enabled via the data-enable-tap-feature attribute
  isTapFeatureEnabled = checkTapFeatureEnabled();
  
  logger.info(`MetaScan: Tap feature ${isTapFeatureEnabled ? 'ENABLED' : 'DISABLED'}`);
  
  if (!isTapFeatureEnabled) {
    logger.info('MetaScan: Tap detector disabled (opt-in required via data-enable-tap-feature="true")');
    return;
  }
  
  // Add a click event listener to the document
  document.addEventListener('click', () => {
    // Process all clicks, not just those on the document body
    // This makes the feature more reliable, especially on mobile
    handleTap();
    
    // Log for debugging
    if (tapCount > 0) {
      logger.info('MetaScan: Tap detected, count: ' + tapCount);
    }
  });
  
  logger.info('MetaScan: Tap detector initialized and active');
}
