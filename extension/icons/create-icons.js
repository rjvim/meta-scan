// Simple script to create basic icons for the extension
const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a directory if it doesn't exist
if (!fs.existsSync('./icons')) {
  fs.mkdirSync('./icons');
}

// Function to create a simple icon
function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = '#4285F4';
  ctx.fillRect(0, 0, size, size);
  
  // Draw text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size/2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MS', size/2, size/2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`Created ${filename}`);
}

// Create icons of different sizes
createIcon(16, 'icons/icon16.png');
createIcon(48, 'icons/icon48.png');
createIcon(128, 'icons/icon128.png');

console.log('Icon creation complete!');
