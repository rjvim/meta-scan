/**
 * Core functionality for metadata extraction
 */
import { logger } from "~/utils/logger";
import type { MetadataResult, StructuredData } from "../types";

/**
 * Extract metadata from the current page
 * This is the main function that scans the DOM for metadata
 *
 * @returns The extracted metadata object
 */
export function extractMetadata(): MetadataResult {
  logger.info("Extracting metadata from page");

  // Extract structured data
  const structuredData = extractStructuredData();

  const metadata: MetadataResult = {
    general: {
      title: document.title,
      description: getMetaContent("description"),
      author: getMetaContent("author"),
      keywords: getMetaContentAsList("keywords"),
      favicons: extractFavicons(),
      themeColor: getMetaContent("theme-color"),
    },
    opengraph: {
      title: getMetaProperty("og:title"),
      description: getMetaProperty("og:description"),
      image: getMetaProperty("og:image"),
      url: getMetaProperty("og:url"),
      type: getMetaProperty("og:type"),
      siteName: getMetaProperty("og:site_name"),
    },
    twitter: {
      card: getMetaName("twitter:card"),
      site: getMetaName("twitter:site"),
      creator: getMetaName("twitter:creator"),
      title: getMetaName("twitter:title"),
      description: getMetaName("twitter:description"),
      image: getMetaName("twitter:image"),
    },
    technical: {
      viewport: getMetaContent("viewport"),
      charset: document.characterSet,
      canonical: getLinkHref("canonical"),
      robots: getMetaContent("robots"),
      language: document.documentElement.lang || undefined,
      contentSecurityPolicy: getMetaHttpEquiv("Content-Security-Policy"),
      strictTransportSecurity: extractSecurityHeaders(),
    },
    structured: structuredData,
    extractedAt: new Date().toISOString(),
  };

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
