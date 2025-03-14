/**
 * Main App component for MetaScan
 */
import { h } from "preact";
import { useState } from "preact/hooks";
import { ToggleButton } from "./toggle-button";
import type { Corner, MetadataResult } from "../types";

interface AppProps {
  position: Corner;
  metadata: MetadataResult;
  onClose: () => void;
}

export function App({ position, metadata, onClose }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <ToggleButton position={position} isOpen={isOpen} onClick={togglePanel} />

      {isOpen && (
        <div
          className={`meta-scan-app meta-scan-position-${position} meta-scan-fade-in bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md`}
        >
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold text-meta-primary">MetaScan</h1>
            <button
              className="bg-meta-secondary hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded p-1"
              onClick={onClose}
            >
              ✕
            </button>
          </header>
          <main>
            <p className="text-gray-800 dark:text-gray-200">
              Metadata extracted from the page
            </p>
            {/* Placeholder for metadata display */}
            <div className="mt-4 p-3 bg-meta-secondary dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Title: {metadata.general.title || "No title found"}
              </p>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
