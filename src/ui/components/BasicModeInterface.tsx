import { h } from "preact";
import type { MetadataResult, Corner, MetaScanUIState } from "../../types";
import MetadataLayout from "../MetadataLayout";

interface BasicModeInterfaceProps {
  metadata: MetadataResult;
  refreshMetadata: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  showSettingsMenu: boolean;
  toggleSettingsMenu: (e: MouseEvent) => void;
  showPositionMenu: boolean;
  togglePositionMenu: (e: MouseEvent) => void;
  changePosition: (position: Corner) => void;
  uiState: MetaScanUIState;
  version: string;
  isAdvancedMode: boolean;
  setIsAdvancedMode: (mode: boolean) => void;
}

export const BasicModeInterface = (props: BasicModeInterfaceProps) => {
  // Pass all props directly to the original MetadataLayout component
  return <MetadataLayout {...props} />;
};
