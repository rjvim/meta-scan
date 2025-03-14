import { useState, useEffect, useRef } from "preact/hooks";
import type { Corner, MetadataResult, MetadataCategory } from "../types";
import { initUIState, saveUIState } from "../utils/storage";
import { extractMetadata } from "../core";
import { cn } from "../utils/cn";
import { cleanup, initDOMWatcher } from "../utils/dom-watcher";

// Placeholder for icons (replace with actual imports)
const RefreshCw = () => <svg>refresh icon</svg>;
const X = () => <svg>close icon</svg>;

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12h16" />
    <path d="M4 6h16" />
    <path d="M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export function App({
  initialMetadata = {
    general: {},
    opengraph: {},
    twitter: {},
    technical: {},
    structured: [],
    extractedAt: new Date().toISOString(),
  },
}: {
  initialMetadata: MetadataResult;
}) {
  const [uiState, setUiState] = useState(() =>
    initUIState({
      position: "bottom-right",
      isOpen: false,
      theme: "auto",
      extractedAt: new Date().toISOString(),
    })
  );

  const [metadata, setMetadata] = useState(initialMetadata);
  const [loading, setLoading] = useState(false);

  // Theme handling
  const [theme, setTheme] = useState(() => {
    if (uiState.theme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return uiState.theme;
  });

  // Watch for system theme changes
  useEffect(() => {
    if (uiState.theme !== "auto") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [uiState.theme]);

  const toggleTheme = () => {
    const themes = ["light", "dark", "auto"];
    const currentIndex = themes.indexOf(uiState.theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setUiState((prev) => ({ ...prev, theme: nextTheme }));

    if (nextTheme === "auto") {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      setTheme(nextTheme);
    }

    saveUIState({ ...uiState, theme: nextTheme });
  };

  const [activeTab, setActiveTab] = useState<MetadataCategory>("general");

  // Watch for metadata changes
  useEffect(() => {
    // You might want to log or trigger some UI update when metadata changes
    console.log("Metadata updated:", metadata);
  }, [metadata]);
  const panelRef = useRef<HTMLDivElement>(null);

  const togglePanel = () => {
    setUiState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const refreshMetadata = () => {
    setLoading(true);
    const freshMetadata = extractMetadata();
    setMetadata(freshMetadata);
    setUiState((prev) => ({
      ...prev,
      extractedAt: new Date().toISOString(),
    }));
    saveUIState({ ...uiState, extractedAt: new Date().toISOString() });
    setLoading(false);
  };

  // Position classes
  const getContainerPositionClasses = () => {
    const positionMap = {
      "top-left": "top-4 left-4",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-right": "bottom-4 right-4",
    };
    return positionMap[uiState.position];
  };

  const getPanelPositionClasses = () => {
    const isTop = uiState.position.startsWith("top");
    return cn(
      "absolute w-[500px] max-w-[90vw]",
      isTop ? "top-full mt-2" : "bottom-full mb-2",
      uiState.position.endsWith("right") ? "right-0" : "left-0"
    );
  };

  const MetadataCard = ({
    title,
    value,
  }: {
    title: string;
    value: unknown;
  }) => (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="text-white">
        {typeof value === "object" ? (
          <pre className="text-xs overflow-auto">
            {JSON.stringify(value, null, 2)}
          </pre>
        ) : (
          String(value)
        )}
      </div>
    </div>
  );

  // Monitor for DOM changes that might affect metadata
  useEffect(() => {
    // Initialize watcher that updates metadata on changes
    initDOMWatcher((isReload) => {
      console.log(
        `MetaScan: Detected ${isReload ? "page reload" : "DOM changes"}`
      );

      // Extract fresh metadata and update state
      const freshMetadata = extractMetadata();
      setMetadata(freshMetadata);

      // Update extraction timestamp
      setUiState((prev) => ({
        ...prev,
        extractedAt: new Date().toISOString(),
      }));

      // Save updated state to storage
      saveUIState({
        ...uiState,
        extractedAt: new Date().toISOString(),
      });
    });

    // Cleanup on component unmount
    return () => {
      cleanup(); // Import the cleanup function from dom-watcher
    };
  }, []); // Empty dependency array - run once on mount

  const LoadingIndicator = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-lg z-10">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center space-x-3">
        <div className="h-5 w-5 border-2 border-t-transparent border-purple-600 dark:border-purple-400 rounded-full animate-spin"></div>
        <span className="text-sm">Refreshing metadata...</span>
      </div>
    </div>
  );

  return (
    <div
      ref={panelRef}
      className={cn("fixed z-50", getContainerPositionClasses())}
    >
      {uiState.isOpen && (
        <div
          className={cn(
            "bg-black text-white rounded-lg shadow-xl overflow-hidden",
            "transition-all duration-300 ease-in-out",
            getPanelPositionClasses(),
            uiState.isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          )}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-lg font-mono">MetaScan</h2>
            <button
              onClick={togglePanel}
              className="text-gray-400 hover:text-white"
            >
              <X />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-[180px] border-r border-gray-800 p-4">
              <div className="flex flex-col space-y-2">
                {/* Position Switcher */}
                <div className="bg-gray-800 rounded p-2">
                  <label className="text-sm text-gray-400 mb-1 block">
                    Position
                  </label>
                  <select
                    value={uiState.position}
                    onChange={(e) => {
                      const newPosition = e.target.value as Corner;
                      setUiState((prev) => ({
                        ...prev,
                        position: newPosition,
                      }));
                      saveUIState({ ...uiState, position: newPosition });
                    }}
                    className="w-full bg-black text-white p-1 rounded"
                  >
                    {[
                      "top-left",
                      "top-right",
                      "bottom-left",
                      "bottom-right",
                    ].map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Extraction Time */}
                <div className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                  <span className="text-sm">Extracted</span>
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded">
                    {new Date(metadata.extractedAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <nav className="flex space-x-2 mb-4 border-b border-gray-700">
                {(
                  [
                    "general",
                    "opengraph",
                    "twitter",
                    "technical",
                  ] as MetadataCategory[]
                ).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 text-sm transition-colors",
                      activeTab === tab
                        ? "text-purple-400 border-b-2 border-purple-400"
                        : "text-gray-500 hover:text-white"
                    )}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(metadata[activeTab] || {}).map(
                  ([key, value]) => (
                    <MetadataCard
                      key={key}
                      title={key
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .toUpperCase()}
                      value={value}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Bar */}
      <div className="flex items-center gap-2 bg-black text-white p-2 rounded-lg shadow-lg">
        {uiState.isOpen && (
          <button
            onClick={refreshMetadata}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <RefreshCw />
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={togglePanel}
            className="w-8 h-4 bg-gray-700 rounded-full p-0.5 flex items-center"
          >
            <div
              className={cn(
                "w-3 h-3 rounded-full transition-transform",
                uiState.isOpen ? "bg-white translate-x-4" : "bg-gray-400"
              )}
            />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-purple-400 font-mono">
            {new Date(metadata.extractedAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
