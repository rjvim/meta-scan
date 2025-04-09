// Background script for MetaScan Chrome Extension

// Listen for extension icon clicks
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked, injecting MetaScan...');
  
  // Inject our direct injection script
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['direct-inject.js']
  }).catch(err => {
    console.error('Error injecting MetaScan:', err);
  });
});

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('MetaScan extension installed');
});

