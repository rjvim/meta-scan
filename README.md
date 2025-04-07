# MetaScan: Lightweight Webpage Metadata Extraction Tool

MetaScan is a lightweight (31.2 kB) client-side JavaScript tool that extracts and visualizes metadata from any webpage via a simple script tag. It provides an intuitive UI with standardized metadata formatting to analyze and offer insights into basic meta tags, Open Graph, Twitter Cards, technical metadata, and structured data.

## Why Choose MetaScan?

✨ **Immediate Visibility** - Get instant access to all webpage metadata without leaving your site  
⚡ **Fast Performance** - Minimal footprint (31.2 kB) with zero dependencies  
🛠️ **Developer Friendly** - Perfect for debugging, testing, and validating metadata implementations  
🔄 **SEO Insights** - Identify and fix metadata issues that impact search rankings  
🌗 **Clean UI** - Modern interface with dark/light mode  
🔒 **Client-Side Only** - No data sent to servers, works offline and respects privacy  
🔍 **Enhanced Search** - Powerful search functionality across all metadata categories with prefix support (og:, twitter:, meta:)

## Features

- 🚀 Zero-dependency with minimal footprint
- 🔌 Simple installation with a single script tag
- 🔍 Comprehensive metadata extraction with standardized keys and missing tag detection
- 🎨 Clean, modern UI with dark/light mode support and smooth theme transition animations
- 🎛️ Configurable positioning on any corner of the screen with improved dropdown positioning
- 📋 Copy functionality for metadata values with standardized formatting
- 🧩 Structured data extraction (JSON-LD and Microdata)
- 🔎 Advanced search with prefix support and dedicated results view
- 📱 Mobile-friendly with 5-tap toggle feature and improved animations
- 🔄 Integrated UI controls with enhanced component structure
- ✨ Smooth animations for panel opening/closing and theme switching with improved transitions

## Who Is MetaScan For?

MetaScan is designed to serve the needs of various professionals working with web content:

### Web Developers
- **Verify Metadata Implementation** - Instantly check metadata implementation during development
- **Solve Structured Data Issues** - Resolve structured data problems without external tools
- **Implement Open Graph and Twitter Card Tags** - Ensure correct implementation of Open Graph and Twitter Card tags
- **Test Responsive Behavior** - Test metadata responsiveness across all devices

### SEO Specialists
- **Audit Metadata** - Get complete visibility into metadata completeness and accuracy
- **Verify Structured Data** - Check JSON-LD and Microdata implementation with a single click
- **Optimize Social Sharing** - Improve Open Graph and Twitter Card implementations for better engagement
- **Protect Search Rankings** - Identify metadata issues that could harm search rankings

### Content Managers
- **Preview Social Sharing** - See how content will appear when shared on social platforms
- **Ensure Proper Metadata** - Check metadata before content goes live
- **Maintain Brand Consistency** - Verify metadata consistency across the website
- **Document Metadata** - Copy metadata for reporting and collaboration

### Technical Marketers
- **Optimize Landing Pages** - Fine-tune landing pages for better social sharing and SEO impact
- **Verify Campaign Parameters** - Check campaign tracking parameters and metadata
- **Ensure Brand Consistency** - Maintain brand consistency across digital properties
- **Test Metadata Changes** - Validate metadata changes without developer assistance

### QA Testers
- **Validate Metadata** - Easily validate metadata against project requirements
- **Detect Errors** - Catch structured data implementation errors before they reach production
- **Verify Consistency** - Check metadata consistency across different page templates
- **Streamline Testing** - Integrate metadata validation into existing testing workflows

## Installation

Add the script tag to your HTML using unpkg or jsdelivr:

### Using jsdelivr

```html
<script
  crossorigin="anonymous"
  src="//cdn.jsdelivr.net/npm/meta-scan@<latest-version>/dist/auto.global.js"
  data-auto-enable="true"
></script>
```

### Using unpkg

```html
<script
  crossorigin="anonymous"
  src="//unpkg.com/meta-scan/dist/auto.global.js"
  data-auto-enable="true"
></script>
```

### Configuration Options

You can control whether MetaScan is enabled on page load with the `data-auto-enable` attribute:

```html
<script
  crossorigin="anonymous"
  src="//cdn.jsdelivr.net/npm/meta-scan@<latest-version>/dist/auto.global.js"
  data-auto-enable="false"
></script>
```

When `data-auto-enable` is set to "false", the tool won't run automatically, but can be enabled later by opening the browser console and running:

```javascript
window.MetaScan.enableOrDisable(true);
```

## Programmatic Control

```javascript
// Enable or disable MetaScan
window.MetaScan.enableOrDisable(true);

// Get metadata as an object
const metadata = window.MetaScan.getMetadata();
console.log(metadata);
```

You can also enable or disable MetaScan without JavaScript by using the 5-tap feature described in the [Mobile-Friendly Features](#mobile-friendly-features) section.

## Mobile-Friendly Features

### 5-Tap Toggle

MetaScan can be enabled or disabled by tapping anywhere on the page 5 times in quick succession (within 3 seconds). This is particularly useful on mobile devices where accessing the console is not practical.

As you tap, a subtle indicator will show your progress toward the 5 taps required to toggle the state. When the sequence is completed, a toast notification will confirm that MetaScan has been enabled or disabled.

#### How to Use the 5-Tap Feature:

1. **Tap anywhere on the page** 5 times within 3 seconds
2. After every other tap, you'll see a toast notification showing your progress
3. After the 5th tap, MetaScan will toggle between enabled and disabled states
4. A confirmation toast will appear showing "MetaScan enabled" or "MetaScan disabled"

#### Troubleshooting:

- Make sure to complete all 5 taps within the 3-second window
- Tap on any part of the page (not just the document body)
- If you're having trouble, try tapping on empty areas of the page
- Check your browser console for log messages (useful for developers)

This feature works as a toggle - if MetaScan is currently enabled, the 5-tap sequence will disable it, and vice versa.

## Search Functionality

MetaScan provides a powerful search feature that helps you quickly find metadata across all categories:

#### Prefix Support
- Use `og:` to search OpenGraph metadata (e.g., `og:title`, `og:image`)
- Use `twitter:` to search Twitter Card metadata (e.g., `twitter:card`)
- Use `meta:` to search technical metadata (e.g., `meta:viewport`)

#### Search Features
- Case-insensitive search across all metadata categories
- Search by prefix, key, or value
- Real-time results with debounced updates
- Keyboard shortcuts (Ctrl+F/Cmd+F to focus, Esc to clear)
- Clear visual feedback with loading indicators

## Missing Metadata Tags

MetaScan helps identify missing metadata with an enhanced priority-based display:

#### Tag Display Features
- Priority-based organization (Critical, Medium, Low) for better focus on important issues
- Clean, visual design with color-coded sections and left border accents
- Bullet-point lists for improved readability
- Standardized tag names (e.g., `og:title`, `meta:description`)
- Visual indicators for each priority level
- Consistent styling with the rest of the UI

#### Missing Tag Detection
- Identifies missing required metadata based on best practices
- Shows standardized key names for easy implementation
- Provides clear descriptions of why each tag is important
- Helps maintain metadata consistency across pages

## Extracted Metadata

MetaScan extracts the following metadata categories based on these interfaces:

```typescript
export interface MetadataResult {
  general: GeneralMetadata;
  opengraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
  technical: TechnicalMetadata;
  structured?: StructuredData;
  extractedAt: string;
}

export interface GeneralMetadata {
  title?: string;
  description?: string;
  author?: string;
  keywords?: string[];
  favicons?: string[];
  themeColor?: string;
  manifestUrl?: string;
  [key: string]: string | string[] | undefined;
}

export interface OpenGraphMetadata {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  [key: string]: string | undefined;
}

export interface TwitterMetadata {
  card?: string;
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  [key: string]: string | undefined;
}

export interface TechnicalMetadata {
  viewport?: string;
  canonical?: string;
  robots?: string;
  language?: string;
  charset?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  [key: string]: string | undefined;
}

export interface StructuredData {
  jsonLd: any[];
  microdata: MicrodataItem[];
}

export interface MicrodataItem {
  type: string;
  properties: Record<string, string>;
}
```

## Structured Data Extraction

MetaScan extracts structured data from webpages, including:

1. **JSON-LD**: Extracts all JSON-LD scripts from the page, which are commonly used for rich search results.

2. **Microdata**: Extracts HTML microdata annotations, providing insights into how search engines interpret your content.

This makes MetaScan an invaluable tool for SEO professionals and developers who need to debug structured data implementations.

## UI Improvements

The MetaScan interface has been redesigned for better usability:

- **Integrated Header Controls**: All controls (position, settings, theme toggle, JSON view) are now in a single header with improved Button and Dropdown components
- **Simplified Layout**: Cleaner component structure with logical separation of concerns and standardized metadata display
- **Enhanced Missing Tags Panel**: Reorganized missing tags by priority level with visual improvements and color-coded sections
- **Improved Dropdown Positioning**: Enhanced dropdown positioning with better panel location awareness
- **Enhanced Error Handling**: Robust error handling for structured data extraction with detailed logging
- **Dedicated Search Results View**: When searching, the UI shows only matching results across all categories
- **Improved Search Experience**: Search highlighting and keyboard shortcuts for better usability
- **Streamlined Component Structure**: Modular code organization with reusable Button and Dropdown components
- **Smooth Animations**: Polished animations with improved theme toggle transitions
- **Adaptive Animations**: Position-aware animations that adapt to the panel's corner position with enhanced transitions

## Code Architecture

MetaScan has been refactored for better maintainability and extensibility:

- **Modular Components**: UI elements split into logical, reusable components:
  - Base UI components (Button, Dropdown, MetadataItem, MetadataImage, Card)
  - Tab content components (GeneralTab, OpenGraphTab, TwitterTab, etc.)
  - Header components (MetadataHeader, PositionControl, SettingsMenu)
  - Search components with keyboard shortcuts
- **Separation of Concerns**: Clear distinction between UI components, utility functions, and business logic
- **Improved Error Handling**: Comprehensive try/catch blocks with detailed error logging and fallback behavior
- **Enhanced Type Safety**: Proper TypeScript annotations throughout the codebase
- **Optimized Search**: Efficient search implementation with debouncing for better performance
- **Standardized Metadata**: 
  - Consistent key prefixes (meta:, og:, twitter:) across all categories
  - Standardized field ordering and display formatting
  - Improved missing tags detection with standardized keys
  - Enhanced metadata extraction with better error handling
- **Animation System**:
  - Improved theme toggle transitions
  - Enhanced dropdown positioning and animations
  - Position-aware panel animations

## License

MIT
