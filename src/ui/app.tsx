import { useState, useEffect, useRef } from "preact/hooks";
import type { Corner, MetadataResult, MetadataCategory } from "../types";
import { initUIState, saveUIState } from "../utils/storage";
import { extractMetadata } from "../core";
import { cn } from "../utils/cn";
import { cleanup, initDOMWatcher } from "../utils/dom-watcher";
import MetadataPanel from "./MetadataPanel";

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
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-square-mouse-pointer"
  >
    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
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
    <div className={cn("fixed z-50", getContainerPositionClasses())}>
      <div className={cn("flex flex-col", theme === "dark" ? "dark" : "")}>
        {uiState.isOpen && (
          <div
            className={cn(
              "relative rounded-lg shadow-xl overflow-hidden",
              "transition-all duration-300 ease-in-out",
              getPanelPositionClasses()
            )}
          >
            {loading && <LoadingIndicator />}

            <MetadataPanel
              metadata={metadata}
              refreshMetadata={refreshMetadata}
              theme={theme}
            />
          </div>
        )}

        {/* Control Bar */}
        <div
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg shadow-lg self-end",
            "bg-white dark:bg-gray-800",
            "text-gray-800 dark:text-gray-200",
            "transition-colors duration-200"
          )}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full"
            title={`Current theme: ${uiState.theme}. Click to toggle.`}
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>

          {/* Panel Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePanel}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full",
                "transition-colors duration-200",
                uiState.isOpen
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              )}
              title={uiState.isOpen ? "Close panel" : "Open panel"}
            >
              {uiState.isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Extraction Timestamp */}
          {uiState.isOpen && (
            <div className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {new Date(metadata.extractedAt).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
