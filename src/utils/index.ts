/**
 * Utility functions for MetaScan
 */

export * from "./shadow-dom";

/**
 * Safely parse JSON with fallback
 */
export function safeJsonParse(str: string, fallback: any = {}): any {
  try {
    return JSON.parse(str);
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return fallback;
  }
}

/**
 * Check if we're running in a browser environment
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Detect dark mode preference
 */
export function prefersDarkMode(): boolean {
  if (!isBrowser) return false;
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Simple debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
