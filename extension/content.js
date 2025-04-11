// Content script for MetaScan Chrome Extension
// This script is injected into every page but doesn't automatically activate MetaScan
// The activation happens when the user clicks the extension icon

// Track initialization and toggle states
let isInitializing = false;
let lastToggleTime = 0;
const DEBOUNCE_DELAY = 300; // ms

// Function to check if MetaScan is loaded and initialize it if needed
async function initMetaScan() {
  // Prevent multiple simultaneous initialization attempts
  if (isInitializing) {
    console.log('MetaScan initialization already in progress...');
    return;
  }

  // Check if MetaScan is already in the window object
  if (window.MetaScan) {
    console.log('MetaScan already initialized');
    return;
  }

  isInitializing = true;
  console.log('Initializing MetaScan...');

  try {
    // Create a script element to load MetaScan
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('metascan.js');

    // Wrap script loading in a promise
    await new Promise((resolve, reject) => {
      script.onload = () => {
        console.log('MetaScan script loaded successfully');
        if (window.MetaScan) {
          console.log('MetaScan object found in window after loading');
          resolve();
        } else {
          reject(new Error('MetaScan object not found in window after loading script'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load MetaScan script'));
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error('MetaScan initialization failed:', error);
  } finally {
    isInitializing = false;
  }
}

// Initialize MetaScan when the content script loads
initMetaScan();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleMetaScan") {
    // Debounce toggle actions
    const now = Date.now();
    if (now - lastToggleTime < DEBOUNCE_DELAY) {
      console.log('Ignoring toggle request due to debounce');
      sendResponse({ status: "debounced" });
      return true;
    }
    lastToggleTime = now;

    // Handle toggle action
    if (window.MetaScan) {
      try {
        const isEnabled = typeof window.MetaScan.isEnabled === 'function' && window.MetaScan.isEnabled();
        console.log(isEnabled ? 'Disabling MetaScan' : 'Enabling MetaScan');
        isEnabled ? window.MetaScan.disable() : window.MetaScan.enable();
        sendResponse({ status: "toggled", enabled: !isEnabled });
      } catch (error) {
        console.error('Error toggling MetaScan:', error);
        sendResponse({ status: "error", message: error.message });
      }
    } else {
      console.error('MetaScan not found in window object');
      // Try to initialize MetaScan again
      initMetaScan().then(() => {
        if (window.MetaScan) {
          window.MetaScan.enable();
          sendResponse({ status: "initialized_and_enabled" });
        } else {
          sendResponse({ status: "initialization_failed" });
        }
      });
    }
  }
  return true;
});
