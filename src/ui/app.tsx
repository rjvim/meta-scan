/**
 * Main App component for MetaScan
 */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { ToggleButton } from "./toggle-button";
import type { Corner, MetadataResult, MetadataCategory } from "../types";
import { initUIState, saveUIState } from "../utils/storage";

interface AppProps {
  metadata: MetadataResult;
}

export function App({ metadata }: AppProps) {
  const [uiState, setUiState] = useState(() =>
    initUIState({
      position: "bottom-right",
      isOpen: false,
      extractedAt: new Date().toISOString(),
    })
  );

  const [activeTab, setActiveTab] = useState<MetadataCategory>("general");

  useEffect(() => {
    saveUIState(uiState);
  }, [uiState]);

  const togglePanel = () => {
    setUiState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  // const updatePosition = (position: Corner) => {
  //   setUiState((prev) => ({ ...prev, position }));
  // };

  const positionClasses = {
    "top-left": "top-5 left-5",
    "top-right": "top-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "bottom-right": "bottom-5 right-5",
  };

  const MetadataCard = ({
    title,
    value,
  }: {
    title: string;
    value: unknown;
  }) => (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </h3>
      <div className="text-gray-800 dark:text-gray-200 text-sm">
        {Array.isArray(value) ? (
          <ul className="list-disc pl-4 space-y-1">
            {value.map((item, i) => (
              <li key={i}>{String(item)}</li>
            ))}
          </ul>
        ) : typeof value === "object" ? (
          <pre className="text-xs overflow-auto max-h-40">
            {JSON.stringify(value, null, 2)}
          </pre>
        ) : (
          String(value)
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`
      fixed 
      ${positionClasses[uiState.position]} 
      flex flex-col items-end // This ensures toggle and panel align correctly
    `}
    >
      <ToggleButton
        position={uiState.position}
        isOpen={uiState.isOpen}
        onToggle={togglePanel}
      />

      {uiState.isOpen && (
        <div className="w-full max-w-md meta-scan-fade-in bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold text-meta-primary">MetaScan</h1>
            <button
              className="bg-meta-secondary hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded p-1"
              onClick={togglePanel}
            >
              ✕
            </button>
          </header>

          <nav className="flex space-x-2 mb-4 border-b border-gray-100 dark:border-gray-700">
            {["general", "opengraph", "twitter", "technical", "structured"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as MetadataCategory)}
                  className={`px-4 py-2 text-sm font-medium transition-colors
                  ${
                    activeTab === tab
                      ? "text-meta-primary border-b-2 border-meta-primary"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </nav>

          <main className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(metadata[activeTab]).map(([key, value]) => (
                <MetadataCard
                  key={key}
                  title={key.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
                  value={value}
                />
              ))}
            </div>

            {activeTab === "structured" && (
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Structured data detected: {metadata.structured.length} items
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
