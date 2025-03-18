import type { MetadataResult } from "~/types";
import MetadataLayout from "./MetadataLayout"; // Simple cards/tabs layout

/**
 * Wrapper component to switch between different layout implementations
 */
const MetadataLayoutWrapper = ({
  metadata,
  refreshMetadata,
  theme = "light",
  toggleTheme,
  togglePanel,
  showSettingsMenu,
  toggleSettingsMenu,
  showPositionMenu,
  togglePositionMenu,
  changePosition,
  uiState,
  version,
}: {
  metadata: MetadataResult | null;
  refreshMetadata: () => void;
  theme?: "light" | "dark";
  toggleTheme: () => void;
  togglePanel: () => void;
  showSettingsMenu: boolean;
  toggleSettingsMenu: (e: MouseEvent) => void;
  showPositionMenu: boolean;
  togglePositionMenu: (e: MouseEvent) => void;
  changePosition: (position: any) => void;
  uiState: any;
  version: string;
}) => {
  if (!metadata) return null;

  return (
    <MetadataLayout
      metadata={metadata}
      refreshMetadata={refreshMetadata}
      theme={theme as "light" | "dark"}
      toggleTheme={toggleTheme}
      togglePanel={togglePanel}
      showSettingsMenu={showSettingsMenu}
      toggleSettingsMenu={toggleSettingsMenu}
      showPositionMenu={showPositionMenu}
      togglePositionMenu={togglePositionMenu}
      changePosition={changePosition}
      uiState={uiState}
      version={version}
    />
  );
};

export default MetadataLayoutWrapper;
