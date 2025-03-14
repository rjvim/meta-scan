import { useState, useEffect, useRef } from "preact/hooks";
import type { Corner, MetadataResult, MetadataCategory } from "../types";
import { initUIState, saveUIState } from "../utils/storage";
import { extractMetadata } from "../core";
import { cn } from "../utils/cn";
import { cleanup, initDOMWatcher } from "../utils/dom-watcher";
import MetadataPanel from "./MetadataPanel";
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
  TopLeftIcon,
  TopRightIcon,
  BottomLeftIcon,
  BottomRightIcon,
} from "./icons";
import { logger } from "~/utils/logger";

export function App({
  initialMetadata = {
    general: {},
    opengraph: {},
    twitter: {},
    technical: {},
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
    const nextTheme = theme === "dark" ? "light" : "dark";

    setUiState((prev) => ({ ...prev, theme: nextTheme }));
    setTheme(nextTheme);
    saveUIState({ ...uiState, theme: nextTheme });
  };

  const panelRef = useRef<HTMLDivElement>(null);

  const togglePanel = () => {
    setUiState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const changePosition = (position: Corner) => {
    setUiState((prev) => ({ ...prev, position }));
    saveUIState({ ...uiState, position });
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
    setTimeout(() => setLoading(false), 300); // Add a small delay for visual feedback
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
      "absolute w-[400px] max-w-[90vw]",
      isTop ? "top-full mt-2" : "bottom-full mb-2",
      uiState.position.endsWith("right") ? "right-0" : "left-0"
    );
  };

  // Monitor for DOM changes that might affect metadata
  useEffect(() => {
    // Initialize watcher that updates metadata on changes
    initDOMWatcher((isReload) => {
      logger.info(
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
      cleanup();
    };
  }, []);

  const LoadingIndicator = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded z-10">
      <div className="p-2 bg-white dark:bg-gray-800 rounded shadow-lg flex items-center space-x-2">
        <div className="h-4 w-4 border-2 border-t-transparent border-purple-600 dark:border-purple-400 rounded-full animate-spin"></div>
        <span className="text-xs">Refreshing...</span>
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
            "flex items-center gap-2 p-1.5 rounded-lg shadow-lg self-end",
            "bg-white dark:bg-gray-800",
            "text-gray-800 dark:text-gray-200",
            "transition-colors duration-200"
          )}
        >
          {/* Position Controls */}
          <div className="flex gap-1">
            <button
              onClick={() => changePosition("top-left")}
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded-full",
                "transition-colors duration-200",
                uiState.position === "top-left"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              )}
              title="Position top left"
            >
              <TopLeftIcon />
            </button>
            <button
              onClick={() => changePosition("top-right")}
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded-full",
                "transition-colors duration-200",
                uiState.position === "top-right"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              )}
              title="Position top right"
            >
              <TopRightIcon />
            </button>
            <button
              onClick={() => changePosition("bottom-left")}
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded-full",
                "transition-colors duration-200",
                uiState.position === "bottom-left"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              )}
              title="Position bottom left"
            >
              <BottomLeftIcon />
            </button>
            <button
              onClick={() => changePosition("bottom-right")}
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded-full",
                "transition-colors duration-200",
                uiState.position === "bottom-right"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              )}
              title="Position bottom right"
            >
              <BottomRightIcon />
            </button>
          </div>

          {/* Separator */}
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full"
            title={`Theme: ${uiState.theme}`}
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Separator */}
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>

          {/* Panel Toggle */}
          <button
            onClick={togglePanel}
            className={cn(
              "w-6 h-6 flex items-center justify-center rounded-full",
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
      </div>
    </div>
  );
}
