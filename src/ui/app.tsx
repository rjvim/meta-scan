import { useState, useEffect } from "preact/hooks";
import type { Corner, MetadataResult, MetaScanUIState } from "../types";
import { extractMetadata } from "../core";
import { cn } from "../utils/cn";
import { cleanup, initDOMWatcher } from "../utils/dom-watcher";
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
  TopLeftIcon,
  TopRightIcon,
  BottomLeftIcon,
  BottomRightIcon,
  CogIcon,
  InfoIcon,
  BugIcon,
  BookIcon,
} from "./icons";
import { logger } from "../utils/logger";
import MetadataLayoutWrapper from "./MetadataLayoutWrapper";
import { stateManager } from "../state";

export function App({ initialMetadata }: { initialMetadata: MetadataResult }) {
  const [uiState, setUiState] = useState<MetaScanUIState>(stateManager.getState());
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = stateManager.subscribe((newState) => {
      setUiState((prev) => ({ ...prev, ...newState }));
    });
    return unsubscribe;
  }, []);

  const [metadata, setMetadata] = useState(initialMetadata);
  const [loading, setLoading] = useState(false);

  // Theme handling
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (uiState.theme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return uiState.theme as "light" | "dark";
  });

  // Watch for system theme changes
  useEffect(() => {
    if (uiState.theme !== "auto") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [uiState.theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setUiState((prev) => ({ ...prev, theme: nextTheme }));
    setTheme(nextTheme);
    stateManager.updateState({ theme: nextTheme });
  };

  const togglePanel = () => {
    setUiState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
    stateManager.updateState({ isOpen: !uiState.isOpen });
  };

  // Toggle settings menu
  const toggleSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setShowSettingsMenu(!showSettingsMenu);
  };

  // Close settings menu when clicking outside
  useEffect(() => {
    if (!showSettingsMenu) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isClickInside = target.closest('.settings-menu') !== null;
      const isClickOnToggle = target.closest('#settings-toggle') !== null;
      
      if (!isClickInside && !isClickOnToggle) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSettingsMenu]);

  const changePosition = (position: Corner) => {
    setUiState((prev) => ({ ...prev, position }));
    stateManager.updateState({ position });
  };

  const refreshMetadata = () => {
    setLoading(true);
    setMetadata(extractMetadata());
    setUiState((prev) => ({
      ...prev,
      extractedAt: new Date().toISOString(),
    }));
    stateManager.updateState({ extractedAt: new Date().toISOString() });
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
      stateManager.updateState({
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
            <MetadataLayoutWrapper
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

          {/* Settings Menu */}
          <div className="relative">
            <button
              id="settings-toggle"
              onClick={toggleSettingsMenu}
              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full"
              title="Settings"
            >
              <CogIcon />
            </button>
            
            {/* Settings Dropdown Menu */}
            {showSettingsMenu && (
              <div className={`absolute w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 settings-menu ${
                uiState.position.startsWith('top') ? 'top-full mt-2' : 'bottom-full mb-2'
              } ${
                uiState.position.endsWith('right') ? 'right-0' : 'left-0'
              }`}>
                <a 
                  href="https://github.com/rjvim/meta-scan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="mr-2">
                    <InfoIcon />
                  </span>
                  About
                </a>
                <a 
                  href="https://github.com/rjvim/meta-scan/issues/new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="mr-2">
                    <BugIcon />
                  </span>
                  Raise an issue
                </a>
                <a 
                  href="https://github.com/rjvim/meta-scan#documentation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="mr-2">
                    <BookIcon />
                  </span>
                  Documentation
                </a>
              </div>
            )}
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
