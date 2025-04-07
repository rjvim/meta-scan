import { h } from "preact";
import { useState } from "preact/hooks";
import { FeaturesDashboard } from "./components/FeaturesDashboard";

export const MetascanFeaturesWrapper = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  return (
    <div className="metascan-features-wrapper">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          MetaScan
        </h1>
        <button
          onClick={() => setIsAdvancedMode(!isAdvancedMode)}
          className="px-4 py-2 text-sm font-medium rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {isAdvancedMode ? "Switch to Basic Mode" : "Switch to Advanced Mode"}
        </button>
      </div>

      {isAdvancedMode ? <FeaturesDashboard /> : <p>Basic Mode Content Here</p>}
    </div>
  );
};
