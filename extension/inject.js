// Direct injection script for MetaScan
// This script is executed directly in the page context

// Function to load and activate MetaScan
function loadAndActivateMetaScan() {
  // Check if MetaScan is already loaded
  if (window.MetaScan) {
    console.log('MetaScan already loaded, activating...');
    window.MetaScan.enable();
    return;
  }

  console.log('Loading MetaScan...');
  
  // Create a script element to load the MetaScan library
  const script = document.createElement('script');
  script.textContent = METASCAN_CODE; // This will be replaced with the actual code
  
  // Add the script to the page
  document.head.appendChild(script);
  
  // Check if MetaScan was successfully loaded
  if (window.MetaScan) {
    console.log('MetaScan loaded successfully, activating...');
    window.MetaScan.enable();
  } else {
    console.error('Failed to load MetaScan');
  }
}

// Execute the function
loadAndActivateMetaScan();
