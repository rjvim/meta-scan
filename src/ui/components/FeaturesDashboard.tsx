/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../utils/cn";
import { SocialPreviewTabs } from "./SocialPreview";
import { CompetitorAnalysis } from "./CompetitorAnalysis";
import { HistoricalTracking } from "./HistoricalTracking";
import { SeoRecommendations } from "./SeoRecommendations";
import { BulkAnalysis } from "./BulkAnalysis";
import { SeoToolIntegrations } from "./SeoToolIntegrations";
import { AdvancedSearch } from "./AdvancedSearch";
import type { MetadataResult, Corner, MetaScanUIState } from "../../types";
import { validateMetadata } from "../../core/validator";
import MetadataLayout from "../MetadataLayout";

interface FeaturesDashboardProps {
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

const tabs = [
  { label: "Social Preview", component: SocialPreviewTabs },
  { label: "Competitor Analysis", component: CompetitorAnalysis },
  { label: "Historical Tracking", component: HistoricalTracking },
  { label: "SEO Recommendations", component: SeoRecommendations },
  { label: "Bulk Analysis", component: BulkAnalysis },
  { label: "SEO Tool Integrations", component: SeoToolIntegrations },
  { label: "Advanced Search", component: AdvancedSearch }
];

export const FeaturesDashboard = (props: FeaturesDashboardProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const { metadata } = props;
  
  // Generate validation results for SEO recommendations
  const validationResults = validateMetadata(metadata);

  const ActiveComponent = tabs.find((tab) => tab.label === activeTab)?.component || null;

  // The MetadataLayout will now handle the header/controls
  // We just need to render the TABS and the ACTIVE COMPONENT
  return (
    <MetadataLayout
      {...props}
      metadata={metadata}
      refreshMetadata={props.refreshMetadata}
      theme={props.theme}
      toggleTheme={props.toggleTheme}
      showSettingsMenu={props.showSettingsMenu}
      toggleSettingsMenu={props.toggleSettingsMenu}
      showPositionMenu={props.showPositionMenu}
      togglePositionMenu={props.togglePositionMenu}
      changePosition={props.changePosition}
      uiState={props.uiState}
      version={props.version}
      isAdvancedMode={props.isAdvancedMode}
      setIsAdvancedMode={props.setIsAdvancedMode}
    >
      <div className="features-dashboard flex flex-col min-h-0 h-full">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-x-auto">
          <nav className="flex space-x-1 px-4 py-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap",
                  activeTab === tab.label
                    ? "bg-purple-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300",
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-0 overflow-auto p-4">
          {ActiveComponent &&
            (activeTab === "SEO Recommendations" ? (
              <div className="max-w-7xl mx-auto">
                <SeoRecommendations
                  validation={validationResults}
                  version={props.version}
                />
              </div>
            ) : activeTab === "Social Preview" ? (
              <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <SocialPreviewTabs metadata={metadata} />
                </div>
              </div>
            ) : activeTab === "Competitor Analysis" ? (
              <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <CompetitorAnalysis currentMetadata={metadata} currentUrl={window.location.href} />
                </div>
              </div>
            ) : activeTab === "Historical Tracking" ? (
              <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <HistoricalTracking currentMetadata={metadata} currentUrl={window.location.href} />
                </div>
              </div>
            ) : activeTab === "Bulk Analysis" ? (
              <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <BulkAnalysis urls={[window.location.href]} />
                </div>
              </div>
            ) : activeTab === "SEO Tool Integrations" ? (
              <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <SeoToolIntegrations onConnect={(tool) => console.log(`Connected to ${tool}`)} />
                </div>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <AdvancedSearch onSearch={(query, mode) => console.log(`Searching for ${query} in ${mode}`)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </MetadataLayout>
  );
};
