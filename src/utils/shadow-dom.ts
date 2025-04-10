// Import processed CSS
import processedStyles from "../ui/styles.processed.css";
import { logger } from "./logger";

// Base styles that will always be available
const baseStyles = `
  .meta-scan-mount {
    font-family: system-ui, -apple-system, sans-serif;
    width: 100%;
    max-width: 400px;
    position: fixed;
    box-sizing: border-box;
    z-index: 999999;
    background: white;
    color: black;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .meta-scan-mount.dark {
    background: #1a1a1a;
    color: white;
  }

  .meta-scan-hidden {
    display: none !important;
  }

  .meta-scan-button {
    background: #4a6cf7;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .meta-scan-button:hover {
    background: #3451c6;
  }
`;

// CSS styles to be inserted into shadow DOM
let cssContent = baseStyles + processedStyles;

/**
 * Creates an isolated container using Shadow DOM
 * @returns The mount point element inside shadow root
 */
export function createIsolatedContainer(): HTMLElement {
  try {
    // Create root container
    const container = document.createElement("div");
    container.id = "meta-scan-root";

    // Check for existing container to avoid duplicates
    const existingContainer = document.getElementById("meta-scan-root");
    if (existingContainer) {
      existingContainer.remove();
      logger.info("Removed existing container");
    }

    // Attach shadow DOM
    const shadowRoot = container.attachShadow({ mode: "open" });

    // Add styles to shadow DOM
    const style = document.createElement("style");
    style.textContent = cssContent || ''; // Fallback to empty string if styles not loaded
    shadowRoot.appendChild(style);

    // Create mount point for UI
    const mount = document.createElement("div");
    mount.className = "meta-scan-mount";
    shadowRoot.appendChild(mount);

    // Append to document
    document.body.appendChild(container);

    logger.info("Shadow DOM container created successfully");
    return mount;
  } catch (error) {
    logger.error("Failed to create shadow DOM container:", error);
    throw error;
  }
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
