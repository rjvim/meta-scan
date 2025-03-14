/**
 * Core type definitions for MetaScan
 */

export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface MetaScanUIState {
  position: Corner;
  isOpen: boolean;
  extractedAt: string;
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
   * Auto open on load
   * @default false
   */
  autoOpen?: boolean;

  /**
   * Theme mode
   * @default 'auto'
   */
  theme?: "auto" | "light" | "dark";

  /**
   * Show image previews
   * @default true
   */
  showPreview?: boolean;

  /**
   * Visible tabs
   * @default ['general', 'opengraph', 'twitter', 'technical', 'structured']
   */
  tabs?: Array<MetadataCategory>;
}

export type MetadataCategory =
  | "general"
  | "opengraph"
  | "twitter"
  | "technical"
  | "structured";

/**
 * Main metadata extraction result
 */
export interface MetadataResult {
  general: GeneralMetadata;
  opengraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
  technical: TechnicalMetadata;
  structured: StructuredData[];
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

export type StructuredData = Record<string, unknown>;

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
}

// Extend global Window interface
declare global {
  interface Window {
    MetaScan: MetaScanAPI;
  }
}
