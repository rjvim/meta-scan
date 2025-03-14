/**
 * Shadow DOM integration utilities
 * Creates an isolated container with shadow DOM to prevent style conflicts
 */

// CSS styles to be inserted into shadow DOM
let cssContent = "";

/**
 * Creates an isolated container using Shadow DOM
 * @returns The mount point element inside shadow root
 */
export function createIsolatedContainer(): HTMLElement {
  // Create root container
  const container = document.createElement("div");
  container.id = "meta-scan-root";

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

  console.log("Shadow DOM container created");
  return mount;
}

/**
 * Sets the CSS content to be used in the shadow DOM
 * This is called during build process to inject processed CSS
 */
export function setStyleContent(styles: string): void {
  cssContent = styles;
  console.log("Shadow DOM styles set");
}

/**
 * Removes the container from DOM
 */
export function cleanup(): void {
  const container = document.getElementById("meta-scan-root");
  if (container) {
    container.remove();
    console.log("Shadow DOM container removed");
  }
}
