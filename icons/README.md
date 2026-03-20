# AutoApplyMax Icons

## Design Concept

The icon represents the core functionality:
- 🤖 **Robot head** = Automation
- ⚡ **Lightning bolt** = Fast/Instant
- 📄 **Document lines** = Application forms
- 🔵 **LinkedIn blue** (#0A66C2) = LinkedIn platform
- 💛 **Yellow accent** (#FFC107) = Energy/Action

## Quick Generate

### Option 1: Use the HTML Generator (Easiest)

1. Open `generate-new-icons.html` in your browser
2. Click "📥 Download All Icons"
3. Replace the existing PNG files

### Option 2: Use the SVG

The master `icon.svg` file can be exported at different sizes using:
- Adobe Illustrator
- Inkscape (free)
- Online tools like [SVG to PNG Converter](https://svgtopng.com/)

Export sizes needed:
- 16x16px → `icon16.png`
- 48x48px → `icon48.png`
- 128x128px → `icon128.png`

### Option 3: Use ImageMagick (Command Line)

```bash
# Install ImageMagick first: https://imagemagick.org/

# Generate all sizes from SVG
magick icon.svg -resize 16x16 icon16.png
magick icon.svg -resize 48x48 icon48.png
magick icon.svg -resize 128x128 icon128.png
```

## Current Icons

The existing icons are placeholder LinkedIn-style icons. The new design better represents the automation aspect of AutoApplyMax.

## Icon Checklist

- [ ] Generate icon16.png (16x16)
- [ ] Generate icon48.png (48x48)
- [ ] Generate icon128.png (128x128)
- [ ] Verify icons look good in Chrome toolbar
- [ ] Verify icons look good in chrome://extensions/
- [ ] Commit updated icons to repo

## Design Philosophy

The icon should instantly communicate:
1. **LinkedIn** (blue color scheme)
2. **Automation** (robot element)
3. **Speed** (lightning bolt)
4. **Applications** (form/document elements)

---

**To update icons:** Generate new PNGs and replace the existing files, then reload the extension in Chrome.
