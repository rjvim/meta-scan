/**
 * Core functionality for metadata extraction
 */
import type { MetadataResult } from "../types";

/**
 * Extract metadata from the current page
 * This is the main function that scans the DOM for metadata
 *
 * @returns The extracted metadata object
 */
export function extractMetadata(): MetadataResult {
  console.log("Extracting metadata from page");

  // Placeholder implementation - will be filled with actual extraction logic
  const metadata: MetadataResult = {
    general: {
      title: document.title,
      description: getMetaContent("description"),
    },
    opengraph: {
      title: getMetaProperty("og:title"),
      description: getMetaProperty("og:description"),
      image: getMetaProperty("og:image"),
    },
    twitter: {
      title: getMetaName("twitter:title"),
      description: getMetaName("twitter:description"),
      image: getMetaName("twitter:image"),
    },
    technical: {
      viewport: getMetaContent("viewport"),
      charset: document.characterSet,
    },
    structured: [],
    extractedAt: new Date().toISOString(), // Always add this
  };

  console.log("Metadata extracted:", metadata);
  return metadata;
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
