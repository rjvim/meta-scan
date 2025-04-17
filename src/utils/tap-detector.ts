/**
 * Utility to detect multiple taps for enabling/disabling MetaScan
 */
import { enableOrDisable } from "..";
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
 * Handle a tap event
 * @returns {boolean} Whether the tap sequence was completed
 */
export function handleTap(): boolean {
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
    // Toggle the state
    enableOrDisable(newState);

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
    // Process all clicks, not just those on the document body
    // This makes the feature more reliable, especially on mobile
    handleTap();
    
    // Log for debugging
    logger.info('MetaScan: Tap detected, count: ' + tapCount);
  });
  
  logger.info('MetaScan: Tap detector initialized');
}
