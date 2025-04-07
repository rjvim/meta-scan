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

const tabs = [
  { label: "Social Preview", component: SocialPreviewTabs },
  { label: "Competitor Analysis", component: CompetitorAnalysis },
  { label: "Historical Tracking", component: HistoricalTracking },
  { label: "SEO Recommendations", component: SeoRecommendations },
  { label: "Bulk Analysis", component: BulkAnalysis },
  { label: "SEO Tool Integrations", component: SeoToolIntegrations },
  { label: "Advanced Search", component: AdvancedSearch }
];

export const FeaturesDashboard = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const ActiveComponent = tabs.find(tab => tab.label === activeTab)?.component || null;

  return (
    <div className="features-dashboard">
      <nav className="flex space-x-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md",
              activeTab === tab.label
                ? "bg-purple-600 text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="tab-content">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};
