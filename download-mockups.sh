#!/bin/bash

# Download free mockup images from Unsplash
# These are high-quality, free for commercial use, no attribution required

echo "Downloading free mockup images from Unsplash..."

# Classic Frame - Wooden frame on white wall
curl -L "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=2000&q=80" \
  -o /home/user/artdisplay/public/mockups/frame1.jpg

# Modern Frame - Black frame minimalist
curl -L "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=2000&q=80" \
  -o /home/user/artdisplay/public/mockups/frame2.jpg

# Gallery Wall - White gallery wall
curl -L "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=2000&q=80" \
  -o /home/user/artdisplay/public/mockups/gallery-wall.jpg

echo "✓ Downloaded 3 mockup images"
echo ""
echo "Images saved to:"
echo "  - public/mockups/frame1.jpg"
echo "  - public/mockups/frame2.jpg"
echo "  - public/mockups/gallery-wall.jpg"
echo ""
echo "Restart your dev server to see the new mockup backgrounds!"
