// This script will be injected directly into the page context
// It will load MetaScan and enable it immediately with enhanced styling

(function() {
  // Function to check if MetaScan is already loaded
  function isMetaScanLoaded() {
    return typeof window.MetaScan !== 'undefined';
  }
  
  // Function to enable MetaScan
  function enableMetaScan() {
    if (isMetaScanLoaded() && typeof window.MetaScan.enable === 'function') {
      console.log('Enabling MetaScan...');
      
      // Apply custom configuration if possible
      if (typeof window.MetaScan.configure === 'function') {
        window.MetaScan.configure({
          position: 'top-right', // Default position
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
          // Add any other configuration options here
        });
      }
      
      window.MetaScan.enable();
      
      // Notify that MetaScan has been activated so styles can be applied
      setTimeout(() => {
        chrome.runtime.sendMessage({ action: 'metascanActivated' });
      }, 100);
      
      return true;
    }
    return false;
  }
  
  // Function to inject custom styles
  function injectCustomStyles() {
    // Check if styles are already injected
    if (document.getElementById('metascan-extension-styles')) {
      return;
    }

    // Create style element
    const styleElement = document.createElement('style');
    styleElement.id = 'metascan-extension-styles';
    
    // Fetch and inject custom styles
    fetch(chrome.runtime.getURL('extension-styles.css'))
      .then(response => response.text())
      .then(css => {
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
        console.log('MetaScan custom styles injected');
      })
      .catch(error => {
        console.error('Failed to inject MetaScan styles:', error);
      });
  }
  
  // Inject custom styles first
  injectCustomStyles();
  
  // If MetaScan is already loaded, just enable it
  if (enableMetaScan()) {
    console.log('MetaScan was already loaded and has been enabled');
    return;
  }
  
  console.log('MetaScan not found, injecting script...');
  
  // Create a script element to load MetaScan
  const script = document.createElement('script');
  script.setAttribute('data-auto-enable', 'false'); // We'll enable it manually after loading
  script.onload = function() {
    console.log('MetaScan script loaded successfully');
    // Give it a moment to initialize
    setTimeout(() => {
      if (enableMetaScan()) {
        console.log('MetaScan enabled successfully');
        
        // Set up a mutation observer to watch for MetaScan UI elements
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
              for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && 
                    (node.classList.contains('fixed') || 
                     node.getAttribute('data-metascan') || 
                     node.querySelector('[data-metascan]'))) {
                  // Apply custom classes to enhance UI
                  applyCustomClasses(node);
                  return;
                }
              }
            }
          }
        });
        
        // Start observing the document
        observer.observe(document.body, { childList: true, subtree: true });
      } else {
        console.error('Failed to enable MetaScan after loading');
      }
    }, 200);
  };
  script.onerror = function() {
    console.error('Failed to load MetaScan script');
  };
  
  // Set the script source to our local copy
  script.src = chrome.runtime.getURL('metascan.js');
  document.head.appendChild(script);
  
  // Function to apply custom classes to MetaScan elements
  function applyCustomClasses(rootElement) {
    // If no specific element is provided, look for MetaScan panel
    const panel = rootElement || document.querySelector('[data-metascan], .fixed');
    if (!panel) return;
    
    console.log('Applying custom classes to MetaScan UI');
    
    // Add panel class
    panel.classList.add('metascan-panel');
    
    // Apply classes to header
    const header = panel.querySelector('header, [data-metascan-header]');
    if (header) {
      header.classList.add('metascan-header');
      
      // Style the title/logo
      const title = header.querySelector('h1, h2, .text-lg');
      if (title) {
        title.style.fontWeight = '600';
        title.style.letterSpacing = '0.5px';
      }
    }
    
    // Apply classes to search input
    const searchInput = panel.querySelector('input[type="search"], input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.classList.add('metascan-search');
    }
    
    // Apply classes to cards
    const cards = panel.querySelectorAll('.card, [data-metascan-card]');
    cards.forEach(card => {
      card.classList.add('metascan-card');
    });
    
    // Apply classes to metadata items
    const items = panel.querySelectorAll('.mb-4, [data-metascan-item]');
    items.forEach(item => {
      item.classList.add('metascan-item');
      
      // Find and style label
      const label = item.querySelector('.text-xs, .font-semibold');
      if (label) {
        label.classList.add('metascan-item-label');
      }
      
      // Find and style value
      const value = item.querySelector('.text-sm, pre');
      if (value) {
        value.classList.add('metascan-item-value');
      }
      
      // Find and style copy button
      const copyButton = item.querySelector('button');
      if (copyButton) {
        copyButton.classList.add('metascan-copy-button');
      }
    });
    
    // Add animation class
    panel.classList.add('metascan-fade-in');
    
    // Apply dark mode class if needed
    if (document.documentElement.classList.contains('dark') || 
        panel.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      panel.classList.add('metascan-dark');
    }
    
    console.log('MetaScan UI enhancement complete');
  }
})();
