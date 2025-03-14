/**
 * UI components for MetaScan
 */
import { render, h } from "preact";
import { createIsolatedContainer, cleanup } from "../utils/shadow-dom";
import "./styles.css";

/**
 * Main App component
 */
function App() {
  return (
    <div className="meta-scan-app bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-meta-primary">MetaScan</h1>
        <button
          className="bg-meta-secondary hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded p-1"
          onClick={() => console.log("Close button clicked")}
        >
          ✕
        </button>
      </header>
      <main>
        <p className="text-gray-800 dark:text-gray-200">
          Hello World! This is a test message from MetaScan.
        </p>
        <div className="mt-4 p-3 bg-meta-secondary dark:bg-gray-700 rounded">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This panel is rendered in a Shadow DOM to prevent style conflicts.
          </p>
        </div>
      </main>
    </div>
  );
}

let container: HTMLElement | null = null;

/**
 * Render the UI into the shadow DOM
 */
export function renderUI(): void {
  if (!container) {
    container = createIsolatedContainer();
    render(<App />, container);
    console.log("UI rendered");
  }
}

/**
 * Destroy the UI
 */
export function destroyUI(): void {
  if (container) {
    render(null, container);
    cleanup();
    container = null;
    console.log("UI destroyed");
  }
}
