/**
 * Core type definitions for MetaScan
 */

export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface MetaScanUIState {
  position: Corner;
  isOpen: boolean;
  theme: string;
  extractedAt: string;
  lastEnableDisable?: boolean; // User's last manual setting
}

export interface MetaScanOptions extends Partial<MetaScanUIState> {
  /**
   * Enable/disable scanning
   * @default true
   */
  enabled?: boolean;
  autoUpdate?: boolean;

  /**
   * Position of the toggle button
   * @default 'bottom-right'
   */
  position?: Corner;

  /**
   * Theme mode
   * @default 'auto'
   */
  theme?: "auto" | "light" | "dark";

  /**
   * Enable/disable the tap feature (5-tap to toggle MetaScan)
   * @default false
   */
  enableTapFeature?: boolean;
}

export type MetadataCategory =
  | "general"
  | "opengraph"
  | "twitter"
  | "technical";

/**
 * Main metadata extraction result
 */
export interface MetadataResult {
  /**
   * Missing metadata tags that should be present
   */
  missing?: MissingMetadata;
  general: GeneralMetadata;
  opengraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
  technical: TechnicalMetadata;
  structured?: StructuredData;
  extractedAt: string;
}

export interface GeneralMetadata {
  "title"?: string;
  "meta:description"?: string;
  "meta:author"?: string;
  "meta:keywords"?: string[];
  "link:favicon"?: string[];
  "meta:theme-color"?: string;
  "link:manifest"?: string;
  [key: string]: string | string[] | undefined;
}

export interface OpenGraphMetadata {
  "og:title"?: string;
  "og:description"?: string;
  "og:image"?: string;
  "og:url"?: string;
  "og:type"?: string;
  "og:site_name"?: string;
  [key: string]: string | undefined;
}

export interface TwitterMetadata {
  "twitter:card"?: string;
  "twitter:site"?: string;
  "twitter:creator"?: string;
  "twitter:title"?: string;
  "twitter:description"?: string;
  "twitter:image"?: string;
  [key: string]: string | undefined;
}

export interface TechnicalMetadata {
  "meta:viewport"?: string;
  "link:canonical"?: string;
  "meta:robots"?: string;
  "html:lang"?: string;
  "meta:charset"?: string;
  "meta:content-security-policy"?: string;
  "header:strict-transport-security"?: string;
  [key: string]: string | undefined;
}

/**
 * Structured data extracted from the page
 */
/**
 * Missing metadata tags with their importance level
 */
export interface MissingMetadata {
  general: MissingTag[];
  opengraph: MissingTag[];
  twitter: MissingTag[];
  technical: MissingTag[];
  hasCritical: boolean; // Whether there are any critical missing tags
}

/**
 * Represents a missing metadata tag
 */
export interface MissingTag {
  key: string;
  importance: 'critical' | 'medium' | 'low';
  description: string;
}

/**
 * Structured data extracted from the page
 */
export interface StructuredData {
  jsonLd: any[];
  microdata: MicrodataItem[];
  // rdfa?: any[]; // Future implementation
}

/**
 * Microdata item extracted from the page
 */
export interface MicrodataItem {
  type: string;
  properties: Record<string, string>;
}

/**
 * Global MetaScan API interface
 */
export interface MetaScanAPI {
  /**
   * Get extracted metadata
   */
  getMetadata: () => MetadataResult;

  /**
   * Export metadata in specified format
   */
  export: (format: "json" | "csv" | "text") => string;

  /**
   * Configure options
   */
  configure: (options: Partial<MetaScanOptions>) => void;

  /**
   * Enable or disable MetaScan
   */
  enableOrDisable: (enabled: boolean) => void;

  /**
   * Internal options object (for internal use)
   */
  options?: MetaScanOptions;

  /**
   * Internal watchers (for internal use)
   */
  _watchers?: any;
}

// Extend global Window interface
declare global {
  interface Window {
    MetaScan: MetaScanAPI;
  }
}
