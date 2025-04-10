// Import processed CSS
import processedStyles from "../ui/styles.processed.css";
import { logger } from "./logger";

// CSS styles to be inserted into shadow DOM
let cssContent = processedStyles;

/**
 * Creates an isolated container using Shadow DOM
 * @returns The mount point element inside shadow root
 */
export function createIsolatedContainer(): HTMLElement {
  // Create root container with proper stacking context
  const container = document.createElement("div");
  container.id = "meta-scan-root";
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2147483647;
  `;

  // Attach shadow DOM
  const shadowRoot = container.attachShadow({ mode: "open" });

  // Add styles to shadow DOM
  const style = document.createElement("style");
  style.textContent = cssContent; // From bundled CSS
  shadowRoot.appendChild(style);

  // Create mount point for UI
  const mount = document.createElement("div");
  mount.className = "meta-scan-mount";
  shadowRoot.appendChild(mount);

  // Append to document
  document.body.appendChild(container);

  logger.info("Shadow DOM container created");
  return mount;
}

/**
 * Sets the CSS content to be used in the shadow DOM
 * This is called during build process to inject processed CSS
 */
export function setStyleContent(styles: string): void {
  cssContent = styles;
  logger.info("Shadow DOM styles set");
}

/**
 * Removes the container from DOM
 */
export function cleanup(): void {
  const container = document.getElementById("meta-scan-root");
  if (container) {
    container.remove();
    logger.info("Shadow DOM container removed");
  }
}
