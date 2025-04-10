// Background script for MetaScan Chrome Extension

// Keep track of MetaScan state per tab
let tabStates = new Map();

// Function to update icon
function updateIcon(tabId, isEnabled) {
  chrome.action.setIcon({
    tabId,
    path: isEnabled ? {
      16: 'icons/icon16-active.png',
      48: 'icons/icon48-active.png',
      128: 'icons/icon128-active.png'
    } : {
      16: 'icons/icon16.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png'
    }
  });
}

// Listen for extension icon clicks
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Try to send toggle message first
    await chrome.tabs.sendMessage(tab.id, { action: 'toggleMetaScan' });
  } catch (err) {
    console.error('Error toggling MetaScan:', err);
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'updateState' && sender.tab) {
    const tabId = sender.tab.id;
    tabStates.set(tabId, message.isEnabled);
    updateIcon(tabId, message.isEnabled);
  } else if (message.action === 'error' && sender.tab) {
    console.error('MetaScan error:', message.error);
  }
});

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('MetaScan extension installed');
});

