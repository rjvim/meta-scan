// Content script for MetaScan Chrome Extension
// This script is injected into every page but doesn't automatically activate MetaScan
// The activation happens when the user clicks the extension icon

// Function to check if MetaScan is loaded and initialize it if needed
function initMetaScan() {
  // Check if MetaScan is already in the window object
  if (!window.MetaScan) {
    console.log('MetaScan not found in window object, attempting to initialize...');
    // Create a script element to load MetaScan
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('metascan.js');
    script.onload = function() {
      console.log('MetaScan script loaded successfully');
      if (window.MetaScan) {
        console.log('MetaScan object found in window after loading');
      } else {
        console.error('MetaScan object not found in window after loading script');
      }
    };
    script.onerror = function() {
      console.error('Failed to load MetaScan script');
    };
    document.head.appendChild(script);
  }
}

// Initialize MetaScan when the content script loads
initMetaScan();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleMetaScan") {
    if (window.MetaScan) {
      if (typeof window.MetaScan.isEnabled === 'function' && window.MetaScan.isEnabled()) {
        console.log('Disabling MetaScan');
        window.MetaScan.disable();
      } else {
        console.log('Enabling MetaScan');
        window.MetaScan.enable();
      }
      sendResponse({ status: "toggled" });
    } else {
      console.error('MetaScan not found in window object');
      // Try to initialize MetaScan again
      initMetaScan();
      sendResponse({ status: "not_loaded" });
    }
  }
  return true;
});
