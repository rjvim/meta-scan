/**
 * Core functionality for metadata extraction
 */
import { logger } from "~/utils/logger";
import type { MetadataResult, StructuredData, MissingMetadata, MissingTag } from "../types";

/**
 * Extract metadata from the current page
 * This is the main function that scans the DOM for metadata
 *
 * @returns The extracted metadata object
 */
/**
 * Schema for expected metadata tags with their importance levels
 */
const METADATA_SCHEMA = {
  general: [
    { key: "title", importance: "critical", description: "Page title" },
    { key: "meta:description", importance: "critical", description: "Page description" },
    { key: "meta:keywords", importance: "medium", description: "Page keywords" },
    { key: "link:favicon", importance: "low", description: "Favicon" },
  ],
  opengraph: [
    { key: "og:title", importance: "critical", description: "OG title" },
    { key: "og:description", importance: "critical", description: "OG description" },
    { key: "og:image", importance: "critical", description: "OG image" },
    { key: "og:url", importance: "medium", description: "OG URL" },
    { key: "og:type", importance: "medium", description: "OG type" },
    { key: "og:site_name", importance: "low", description: "OG site name" },
  ],
  twitter: [
    { key: "twitter:title", importance: "medium", description: "Twitter title" },
    { key: "twitter:description", importance: "medium", description: "Twitter description" },
    { key: "twitter:image", importance: "medium", description: "Twitter image" },
    { key: "twitter:card", importance: "medium", description: "Twitter card type" },
    { key: "twitter:site", importance: "low", description: "Twitter site account" },
    { key: "twitter:creator", importance: "low", description: "Twitter content creator" },
  ],
  technical: [
    { key: "meta:viewport", importance: "critical", description: "Viewport settings" },
    { key: "link:canonical", importance: "medium", description: "Canonical URL" },
    { key: "meta:robots", importance: "medium", description: "Robots directives" },
    { key: "html:lang", importance: "medium", description: "Page language" },
  ]
};

/**
 * Detect missing metadata based on the schema
 */
function detectMissingMetadata(metadata: MetadataResult): MissingMetadata {
  const missing: MissingMetadata = {
    general: [],
    opengraph: [],
    twitter: [],
    technical: [],
    hasCritical: false
  };

  // Check each category against the schema
  Object.keys(METADATA_SCHEMA).forEach((category) => {
    const schema = METADATA_SCHEMA[category as keyof typeof METADATA_SCHEMA];
    const data = metadata[category as keyof typeof METADATA_SCHEMA];

    schema.forEach((item) => {
      // Check if the key exists and has a value
      const value = data[item.key as keyof typeof data];
      if (value === undefined || value === null || value === '' || 
          (Array.isArray(value) && value.length === 0)) {
        const missingTag: MissingTag = {
          key: item.key,
          importance: item.importance as 'critical' | 'medium' | 'low',
          description: item.description
        };
        const categoryArray = missing[category as keyof typeof missing] as MissingTag[];
        categoryArray.push(missingTag);
        
        // Track if there are any critical missing tags
        if (item.importance === 'critical') {
          missing.hasCritical = true;
        }
      }
    });
  });

  return missing;
}

export function extractMetadata(): MetadataResult {
  logger.info("Extracting metadata from page");

  // Extract structured data
  const structuredData = extractStructuredData();

  const metadata: MetadataResult = {
    general: {
      "title": document.title,
      "meta:description": getMetaContent("description"),
      "meta:author": getMetaContent("author"),
      "meta:keywords": getMetaContentAsList("keywords"),
      "link:favicon": extractFavicons(),
      "meta:theme-color": getMetaContent("theme-color"),
    },
    opengraph: {
      "og:title": getMetaProperty("og:title"),
      "og:description": getMetaProperty("og:description"),
      "og:image": getMetaProperty("og:image"),
      "og:url": getMetaProperty("og:url"),
      "og:type": getMetaProperty("og:type"),
      "og:site_name": getMetaProperty("og:site_name"),
    },
    twitter: {
      "twitter:title": getMetaName("twitter:title"),
      "twitter:description": getMetaName("twitter:description"),
      "twitter:image": getMetaName("twitter:image"),
      "twitter:card": getMetaName("twitter:card"),
      "twitter:site": getMetaName("twitter:site"),
      "twitter:creator": getMetaName("twitter:creator"),
    },
    technical: {
      "meta:viewport": getMetaContent("viewport"),
      "meta:charset": document.characterSet,
      "link:canonical": getLinkHref("canonical"),
      "meta:robots": getMetaContent("robots"),
      "html:lang": document.documentElement.lang || undefined,
      "meta:content-security-policy": getMetaHttpEquiv("Content-Security-Policy"),
      "header:strict-transport-security": extractSecurityHeaders(),
    },
    structured: structuredData,
    extractedAt: new Date().toISOString(),
  };
  
  // Detect missing metadata
  metadata.missing = detectMissingMetadata(metadata);

  logger.info("Metadata extracted:", metadata);
  return metadata;
}

/**
 * Helper to get meta tag content as a list (for keywords)
 */
function getMetaContentAsList(name: string): string[] | undefined {
  const content = getMetaContent(name);
  if (!content) return undefined;
  
  // Split by comma and trim whitespace
  return content.split(',').map(item => item.trim()).filter(Boolean);
}

/**
 * Helper to get link href by rel
 */
function getLinkHref(rel: string): string | undefined {
  const link = document.querySelector(`link[rel="${rel}"]`);
  return link ? link.getAttribute("href") || undefined : undefined;
}

/**
 * Helper to get meta http-equiv content
 */
function getMetaHttpEquiv(httpEquiv: string): string | undefined {
  const meta = document.querySelector(`meta[http-equiv="${httpEquiv}"]`);
  return meta ? meta.getAttribute("content") || undefined : undefined;
}

/**
 * Extract all favicon and icon links
 */
function extractFavicons(): string[] | undefined {
  const icons: string[] = [];
  
  try {
    // Standard favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && favicon.getAttribute("href")) {
      const href = favicon.getAttribute("href");
      if (href) icons.push(href);
    }
    
    // Apple touch icons
    const appleIcons = document.querySelectorAll('link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]');
    appleIcons.forEach(icon => {
      const href = icon.getAttribute("href");
      if (href) icons.push(href);
    });
    
    // MS application icons
    const msIcon = document.querySelector('meta[name="msapplication-TileImage"]');
    if (msIcon && msIcon.getAttribute("content")) {
      const content = msIcon.getAttribute("content");
      if (content) icons.push(content);
    }
    
    // Shortcut icon (old favicon specification)
    const shortcutIcon = document.querySelector('link[rel="shortcut icon"]');
    if (shortcutIcon && shortcutIcon.getAttribute("href")) {
      const href = shortcutIcon.getAttribute("href");
      if (href) icons.push(href);
    }
  } catch (error) {
    logger.error('Error extracting favicons:', error);
  }
  
  return icons.length > 0 ? icons : undefined;
}

/**
 * Extract security-related headers
 */
function extractSecurityHeaders(): string | undefined {
  // For client-side, we can only check meta tags
  // Server headers would require a separate API call
  try {
    const hstsTag = document.querySelector('meta[http-equiv="Strict-Transport-Security"]');
    return hstsTag ? hstsTag.getAttribute("content") || undefined : undefined;
  } catch (error) {
    logger.error('Error extracting security headers:', error);
    return undefined;
  }
}

/**
 * Extract structured data (JSON-LD, Microdata)
 */
function extractStructuredData(): StructuredData | undefined {
  try {
    const result: StructuredData = {
      jsonLd: [],
      microdata: [],
    };

    // Extract JSON-LD
    try {
      const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
      if (jsonLdScripts && jsonLdScripts.length > 0) {
        jsonLdScripts.forEach((script, index) => {
          try {
            const content = script.textContent;
            if (content) {
              const parsed = JSON.parse(content);
              result.jsonLd.push(parsed);
            }
          } catch (err) {
            logger.warn(`Failed to parse JSON-LD script #${index + 1}:`, err);
            // Add partial data with error information for debugging
            result.jsonLd.push({
              __error: "Failed to parse JSON-LD",
              __errorMessage: err instanceof Error ? err.message : String(err),
              __rawContent: script.textContent?.substring(0, 150) + (script.textContent && script.textContent.length > 150 ? '...' : '')
            });
          }
        });
      }
    } catch (jsonLdError) {
      logger.error('Error extracting JSON-LD data:', jsonLdError);
    }

    // Basic microdata extraction
    try {
      // This is a simplified implementation - a full implementation would be more complex
      const microdataElements = document.querySelectorAll('[itemscope]');
      if (microdataElements && microdataElements.length > 0) {
        microdataElements.forEach((element, index) => {
          try {
            const itemtype = element.getAttribute('itemtype');
            const props: Record<string, string> = {};
            
            const propElements = element.querySelectorAll('[itemprop]');
            if (propElements && propElements.length > 0) {
              propElements.forEach(propElement => {
                try {
                  const propName = propElement.getAttribute('itemprop');
                  if (!propName) return;
                  
                  // Extract value based on element type
                  let propValue: string | null = null;
                  if (propElement.hasAttribute('content')) {
                    propValue = propElement.getAttribute('content');
                  } else if (propElement.tagName === 'META') {
                    propValue = propElement.getAttribute('content');
                  } else if (propElement.tagName === 'IMG') {
                    propValue = propElement.getAttribute('src');
                  } else if (propElement.tagName === 'A') {
                    propValue = propElement.getAttribute('href');
                  } else if (propElement.tagName === 'TIME') {
                    propValue = propElement.getAttribute('datetime');
                  } else {
                    propValue = propElement.textContent;
                  }
                  
                  if (propValue) {
                    props[propName] = propValue;
                  }
                } catch (propError) {
                  logger.warn(`Error extracting microdata property in item #${index + 1}:`, propError);
                  props[`__error_${Date.now()}`] = `Failed to extract property: ${propError instanceof Error ? propError.message : String(propError)}`;
                }
              });
            }
            
            result.microdata.push({
              type: itemtype || 'Unknown',
              properties: props
            });
          } catch (itemError) {
            logger.warn(`Error processing microdata item #${index + 1}:`, itemError);
            result.microdata.push({
              type: 'Error',
              properties: {
                __error: `Failed to process microdata item: ${itemError instanceof Error ? itemError.message : String(itemError)}`
              }
            });
          }
        });
      }
    } catch (microdataError) {
      logger.error('Error extracting microdata:', microdataError);
    }

    // Only return if we found some structured data
    if (result.jsonLd.length > 0 || result.microdata.length > 0) {
      return result;
    }
    
    return undefined;
  } catch (error) {
    logger.error('Error extracting structured data:', error);
    // Return partial data with error information
    return {
      jsonLd: [{
        __error: "Failed to extract structured data",
        __errorMessage: error instanceof Error ? error.message : String(error),
        __timestamp: new Date().toISOString()
      }],
      microdata: []
    };
  }
}

/**
 * Helper to get meta tag content by name
 */
function getMetaContent(name: string): string | undefined {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta ? meta.getAttribute("content") || undefined : undefined;
}

/**
 * Helper to get meta tag content by property
 */
function getMetaProperty(property: string): string | undefined {
  const meta = document.querySelector(`meta[property="${property}"]`);
  return meta ? meta.getAttribute("content") || undefined : undefined;
}

/**
 * Helper to get meta tag content by name (specifically for Twitter)
 */
function getMetaName(name: string): string | undefined {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta ? meta.getAttribute("content") || undefined : undefined;
}
