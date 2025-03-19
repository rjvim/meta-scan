# MetaScan: Lightweight Webpage Metadata Extraction Tool

MetaScan is a lightweight (29.9 kB) client-side JavaScript tool that extracts and visualizes metadata from any webpage via a simple script tag. It provides an intuitive UI to analyze metadata including basic meta tags, Open Graph, Twitter Cards, and technical metadata.

## Features

- 🚀 Zero-dependency with minimal footprint
- 🔌 Simple installation with a single script tag
- 🔍 Comprehensive metadata extraction for SEO and debugging
- 🎨 Clean, modern UI with dark/light mode support
- 🎛️ Configurable positioning on any corner of the screen
- 📋 Copy functionality for metadata values
- 🧩 Structured data extraction (JSON-LD and Microdata)
- 📱 Mobile-friendly with 5-tap toggle feature

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

MetaScan now extracts structured data from webpages, including:

1. **JSON-LD**: Extracts all JSON-LD scripts from the page, which are commonly used for rich search results.

2. **Microdata**: Extracts HTML microdata annotations, providing insights into how search engines interpret your content.

This makes MetaScan an invaluable tool for SEO professionals and developers who need to debug structured data implementations.

## License

MIT
