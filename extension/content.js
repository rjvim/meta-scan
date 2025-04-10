// Content script for MetaScan Chrome Extension

// Track MetaScan state
let isEnabled = false;

// Function to inject MetaScan script
function injectMetaScan() {
  return new Promise((resolve) => {
    // First check if MetaScan is already available
    if (window.MetaScan) {
      console.log('MetaScan already available');
      resolve();
      return;
    }

    // Then check if script is already injected
    if (document.querySelector('script[src*="metascan.js"]')) {
      console.log('MetaScan script already injected, waiting for initialization...');
      const checkInterval = setInterval(() => {
        if (window.MetaScan) {
          console.log('MetaScan initialized');
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    // If not, inject the script
    console.log('Injecting MetaScan...');
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('metascan.js');
    script.onload = () => {
      console.log('MetaScan script loaded, waiting for initialization...');
      const checkInterval = setInterval(() => {
        if (window.MetaScan) {
          console.log('MetaScan initialized');
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    };
    document.head.appendChild(script);
  });
}

// Function to toggle MetaScan
function toggleMetaScan() {
  const script = document.createElement('script');
  script.textContent = `
    if (window.MetaScan) {
      try {
        const isEnabled = window.MetaScan.isEnabled ? window.MetaScan.isEnabled() : true;
        console.log('Current MetaScan state:', isEnabled);
        
        if (isEnabled) {
          console.log('Disabling MetaScan...');
          window.MetaScan.disable();
        } else {
          console.log('Enabling MetaScan...');
                    window.MetaScan.configure({
            position: 'top-right',
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
          });
          window.MetaScan.enable();
        }
        
        window.postMessage({
          type: 'METASCAN_STATE_UPDATE',
          isEnabled: !isEnabled
        }, '*');
      } catch (err) {
        console.error('Error toggling MetaScan:', err);
        window.postMessage({
          type: 'METASCAN_ERROR',
          error: err.message
        }, '*');
      }
    } else {
      console.error('MetaScan not found');
      window.postMessage({
        type: 'METASCAN_ERROR',
        error: 'MetaScan not found'
      }, '*');
    }
  `;
  document.documentElement.appendChild(script);
  script.remove();
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "toggleMetaScan") {
    try {
      await injectMetaScan();
      toggleMetaScan();
      sendResponse({ status: "success" });
    } catch (error) {
      console.error('Error toggling MetaScan:', error);
      sendResponse({ status: "error", error: error.message });
    }
  }
  return true;
});

// Listen for messages from the page context
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'METASCAN_STATE_UPDATE') {
    console.log('State update received:', event.data.isEnabled);
    isEnabled = event.data.isEnabled;
    chrome.runtime.sendMessage({
      action: 'updateState',
      isEnabled: event.data.isEnabled
    });
  } else if (event.data && event.data.type === 'METASCAN_ERROR') {
    console.error('MetaScan error:', event.data.error);
    chrome.runtime.sendMessage({
      action: 'error',
      error: event.data.error
    });
  }
});

// Initialize MetaScan on page load
injectMetaScan().then(() => {
  console.log('MetaScan initialized');
});
