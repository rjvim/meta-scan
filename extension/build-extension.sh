#!/bin/bash

# Build script for MetaScan Chrome Extension

# Ensure we're in the project root
cd "$(dirname "$0")/.."

# Build the MetaScan library
echo "Building MetaScan library..."
npm run build

# Copy the built library to the extension directory
echo "Copying MetaScan library to extension directory..."
cp dist/auto.global.js extension/metascan.js

# Create placeholder icons if they don't exist
echo "Creating placeholder icons..."
if [ ! -f "extension/icons/icon16.png" ]; then
  # You can replace this with actual icon creation or copying from assets
  echo "Please add icon16.png to extension/icons/"
fi

if [ ! -f "extension/icons/icon48.png" ]; then
  echo "Please add icon48.png to extension/icons/"
fi

if [ ! -f "extension/icons/icon128.png" ]; then
  echo "Please add icon128.png to extension/icons/"
fi

echo "Extension build complete!"
echo "To load the extension in Chrome:"
echo "1. Open Chrome and navigate to chrome://extensions/"
echo "2. Enable 'Developer mode' (toggle in the top-right corner)"
echo "3. Click 'Load unpacked' and select the 'extension' folder"
