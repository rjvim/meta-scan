#!/bin/bash

# Simple script to create placeholder icons using ImageMagick
# You can replace these with actual icons later

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it or create icons manually."
    exit 1
fi

# Create a simple icon with text "MS" for MetaScan
create_icon() {
    size=$1
    output_file=$2
    
    convert -size ${size}x${size} xc:dodgerblue -fill white -gravity center \
        -pointsize $(($size/2)) -font Arial -annotate 0 "MS" "$output_file"
    
    echo "Created $output_file"
}

# Create icons of different sizes
create_icon 16 "icons/icon16.png"
create_icon 48 "icons/icon48.png"
create_icon 128 "icons/icon128.png"

echo "Icon creation complete!"
