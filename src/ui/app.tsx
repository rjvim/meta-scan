import { useState, useEffect, useRef } from "preact/hooks";
import type { Corner, MetadataResult, MetaScanUIState } from "../types";
import { extractMetadata } from "../core";
import { cn } from "../utils/cn";
import { cleanup, initDOMWatcher } from "../utils/dom-watcher";
import { MenuIcon, CloseIcon } from "./icons";
import { logger } from "../utils/logger";
import MetadataLayout from "./MetadataLayout";
import { stateManager } from "../state";
import { version } from '../../package.json';
import "./animations.css";

export function App({ initialMetadata }: { initialMetadata: MetadataResult }) {
  const [uiState, setUiState] = useState<MetaScanUIState>(
    stateManager.getState()
  );
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showPositionMenu, setShowPositionMenu] = useState(false);

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

  const panelRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const togglePanel = () => {
    if (uiState.isOpen) {
      // If panel is open, start closing animation
      setIsClosing(true);
      // Wait for animation to complete before updating state
      setTimeout(() => {
        setUiState((prev) => ({ ...prev, isOpen: false }));
        stateManager.updateState({ isOpen: false });
        setIsClosing(false);
      }, 300); // Match animation duration
    } else {
      // If panel is closed, open immediately
      setUiState((prev) => ({ ...prev, isOpen: true }));
      stateManager.updateState({ isOpen: true });
    }
  };

  // Toggle settings menu
  const toggleSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setShowPositionMenu(false); // Close position menu when settings menu is toggled
    setShowSettingsMenu(!showSettingsMenu);
  };

  // Toggle position menu
  const togglePositionMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setShowSettingsMenu(false); // Close settings menu when position menu is toggled
    setShowPositionMenu(!showPositionMenu);
  };

  // Close settings menu when clicking outside
  useEffect(() => {
    if (!showSettingsMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isClickInside = target.closest(".settings-menu") !== null;
      const isClickOnToggle = target.closest("#settings-toggle") !== null;

      if (!isClickInside && !isClickOnToggle) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSettingsMenu]);

  // Close position menu when clicking outside
  useEffect(() => {
    if (!showPositionMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isClickInside = target.closest(".position-menu") !== null;
      const isClickOnToggle = target.closest("#position-toggle") !== null;

      if (!isClickInside && !isClickOnToggle) {
        setShowPositionMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPositionMenu]);

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
  
  // Get transform origin based on position
  const getTransformOrigin = () => {
    const positionMap = {
      "top-left": "top left",
      "top-right": "top right",
      "bottom-left": "bottom left",
      "bottom-right": "bottom right",
    };
    return positionMap[uiState.position];
  };

  const getPanelPositionClasses = () => {
    const isTop = uiState.position.startsWith("top");
    return cn(
      "absolute w-[400px] max-w-[90vw]",
      isTop ? "top-full" : "bottom-full mb-2",
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
      <div className={cn("flex flex-col theme-transition-container", theme === "dark" ? "dark" : "")}>
        {(uiState.isOpen || isClosing) && (
          <div
            ref={panelRef}
            className={cn(
              "relative rounded-lg shadow-xl overflow-hidden",
              isClosing ? "panel-exit panel-exit-active" : "panel-enter panel-enter-active",
              getPanelPositionClasses()
            )}
            style={{
              animationName: isClosing ? 'panel-exit' : 'panel-enter',
              animationDuration: '300ms',
              animationFillMode: 'forwards',
              transformOrigin: getTransformOrigin()
            }}
          >
            {loading && <LoadingIndicator />}
            <MetadataLayout
              metadata={metadata}
              refreshMetadata={refreshMetadata}
              theme={theme}
              toggleTheme={toggleTheme}
              showSettingsMenu={showSettingsMenu}
              toggleSettingsMenu={toggleSettingsMenu}
              showPositionMenu={showPositionMenu}
              togglePositionMenu={togglePositionMenu}
              changePosition={changePosition}
              uiState={uiState}
              version={version}
            />
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={togglePanel}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full",
            "transition-colors duration-200 shadow-lg",
            "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400",
            uiState.isOpen ? "bg-purple-600 text-white hover:bg-purple-700" : ""
          )}
          title={uiState.isOpen ? "Close MetaScan panel" : "Open MetaScan panel"}
        >
          {uiState.isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </div>
  );
}