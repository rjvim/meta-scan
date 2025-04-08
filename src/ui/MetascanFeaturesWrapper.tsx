import { useState } from "preact/hooks";
import { FeaturesDashboard } from "./components/FeaturesDashboard";
import { BasicModeInterface } from "./components/BasicModeInterface";
import type { MetadataResult, Corner, MetaScanUIState } from "../types";


interface MetascanFeaturesWrapperProps {
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
}

export const MetascanFeaturesWrapper = (props: MetascanFeaturesWrapperProps) => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  return (
    <div className="metascan-features-wrapper h-full flex flex-col">
      {isAdvancedMode ? (
        <FeaturesDashboard 
          {...props}
          isAdvancedMode={isAdvancedMode}
          setIsAdvancedMode={setIsAdvancedMode}
        />
      ) : (
        <BasicModeInterface 
          {...props}
          isAdvancedMode={isAdvancedMode}
          setIsAdvancedMode={setIsAdvancedMode}
        />
      )}
    </div>
  );
};
