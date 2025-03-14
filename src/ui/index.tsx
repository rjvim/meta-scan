/**
 * UI components for MetaScan
 */
import { render } from "preact";
import { createIsolatedContainer } from "../utils/shadow-dom";
import { extractMetadata } from "../core";
import { App } from "./app";
import "./styles.css";
import type { Corner } from "~/types";

let container: HTMLElement | null = null;
let isInitialized = false;

/**
 * Render the UI into the shadow DOM
 */
export function renderUI(options: { position: Corner }): void {
  if (!container) {
    container = createIsolatedContainer();
    const metadata = extractMetadata();

    render(
      <App
        position={options.position}
        metadata={metadata}
        onClose={() => {
          hideUI();
        }}
      />,
      container
    );

    isInitialized = true;
    console.log("UI rendered");
  }
}

/**
 * Hide the UI
 */
export function hideUI(): void {
  // This doesn't destroy the component, just hides it
  if (container) {
    container.classList.add("meta-scan-hidden");
  }
}
