// Script to inject custom styles for MetaScan
(function() {
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
        
        // Apply custom classes to MetaScan elements
        applyCustomClasses();
      })
      .catch(error => {
        console.error('Failed to inject MetaScan styles:', error);
      });
  }
  
  // Function to apply custom classes to MetaScan elements
  function applyCustomClasses() {
    // Wait for MetaScan to be fully rendered
    const applyClasses = () => {
      // Find the MetaScan panel
      const panel = document.querySelector('[data-metascan-panel]');
      if (!panel) {
        // If panel not found, try again after a short delay
        setTimeout(applyClasses, 100);
        return;
      }
      
      // Add custom classes
      panel.classList.add('metascan-panel');
      
      // Apply classes to header
      const header = panel.querySelector('[data-metascan-header]') || panel.querySelector('header');
      if (header) {
        header.classList.add('metascan-header');
      }
      
      // Apply classes to search input
      const searchInput = panel.querySelector('input[type="search"], input[placeholder*="Search"]');
      if (searchInput) {
        searchInput.classList.add('metascan-search');
      }
      
      // Apply classes to cards
      const cards = panel.querySelectorAll('[data-metascan-card]') || panel.querySelectorAll('.card');
      cards.forEach(card => {
        card.classList.add('metascan-card');
      });
      
      // Apply classes to metadata items
      const items = panel.querySelectorAll('[data-metascan-item]') || panel.querySelectorAll('.mb-4');
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
      
      // Apply classes to buttons
      const buttons = panel.querySelectorAll('button');
      buttons.forEach(button => {
        button.classList.add('metascan-button');
      });
      
      // Apply classes to images
      const images = panel.querySelectorAll('img');
      images.forEach(img => {
        img.classList.add('metascan-image');
      });
      
      // Apply classes to scrollable containers
      const scrollables = panel.querySelectorAll('[style*="overflow"]');
      scrollables.forEach(scrollable => {
        scrollable.classList.add('metascan-scrollable');
      });
      
      // Apply dark mode class if needed
      if (document.documentElement.classList.contains('dark') || 
          panel.classList.contains('dark') ||
          window.matchMedia('(prefers-color-scheme: dark)').matches) {
        panel.classList.add('metascan-dark');
      }
      
      // Add animation class
      panel.classList.add('metascan-fade-in');
      
      // Apply classes to JSON view if present
      const jsonView = panel.querySelector('pre');
      if (jsonView) {
        jsonView.classList.add('metascan-json');
      }
      
      // Handle favicon lists specially
      const faviconContainers = panel.querySelectorAll('div:has(> img[src*="favicon"])');
      faviconContainers.forEach(container => {
        container.classList.add('metascan-favicon-list');
        const favicons = container.querySelectorAll('img');
        favicons.forEach(favicon => {
          favicon.classList.add('metascan-favicon');
        });
      });
      
      console.log('MetaScan custom classes applied');
    };
    
    // Start applying classes
    applyClasses();
  }
  
  // Watch for MetaScan activation
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if this might be the MetaScan panel
            if (node.getAttribute('data-metascan-panel') || 
                (node.classList && node.classList.contains('fixed')) ||
                (node.querySelector && node.querySelector('[data-metascan]'))) {
              injectCustomStyles();
              return;
            }
          }
        }
      }
    }
  });
  
  // Start observing
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Also try to inject styles if MetaScan is already active
  if (document.querySelector('[data-metascan-panel]') || 
      document.querySelector('[data-metascan]')) {
    injectCustomStyles();
  }
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'metascanActivated') {
      injectCustomStyles();
    }
  });
})();
