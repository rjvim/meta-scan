import { h } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../utils/cn";
import type { MetadataResult, ValidationResult } from "../../types";
import { validateMetadata } from "../../core/validator";

interface BulkAnalysisProps {
  urls: string[];
}

export const BulkAnalysis = ({ urls }: BulkAnalysisProps) => {
  const [results, setResults] = useState<{ url: string; validation: ValidationResult }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeUrls = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const analysisResults = await Promise.all(urls.map(async (url) => {
        try {
          const response = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch metadata for ${url}`);
          }
          
          const metadata: MetadataResult = await response.json();
          const validation = validateMetadata(metadata);
          return { url, validation };
        } catch (fetchError) {
          console.error(`Error fetching metadata for ${url}:`, fetchError);
          return { url, validation: { percentage: 0, passedRules: 0, totalRules: 0, categoryScores: { general: { score: 0, maxScore: 0, percentage: 0 }, opengraph: { score: 0, maxScore: 0, percentage: 0 }, twitter: { score: 0, maxScore: 0, percentage: 0 }, technical: { score: 0, maxScore: 0, percentage: 0 } }, rules: [] } };
        }
      }));
      
      setResults(analysisResults);
    } catch (error) {
      setError("Failed to complete bulk analysis. Please try again later.");
      console.error("Bulk analysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="bulk-analysis">
      <button
        onClick={analyzeUrls}
        disabled={isLoading}
        className={cn(
          "px-4 py-2 mb-4 text-sm font-medium rounded-md",
          "bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isLoading ? "Analyzing..." : "Start Bulk Analysis"}
      </button>
      
      {error && (
        <div className="text-red-600 dark:text-red-400 mb-4">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                URL
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                General
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Open Graph
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Twitter
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Technical
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {results.map(({ url, validation }) => (
              <tr key={url}>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {url}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`text-sm font-medium ${getScoreColor(validation.percentage)}`}>
                      {validation.percentage}%
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${validation.categoryScores.general.percentage >= 80 ? 'bg-green-500' : validation.categoryScores.general.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${validation.categoryScores.general.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{validation.categoryScores.general.percentage}%</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${validation.categoryScores.opengraph.percentage >= 80 ? 'bg-green-500' : validation.categoryScores.opengraph.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${validation.categoryScores.opengraph.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{validation.categoryScores.opengraph.percentage}%</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${validation.categoryScores.twitter.percentage >= 80 ? 'bg-green-500' : validation.categoryScores.twitter.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${validation.categoryScores.twitter.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{validation.categoryScores.twitter.percentage}%</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${validation.categoryScores.technical.percentage >= 80 ? 'bg-green-500' : validation.categoryScores.technical.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${validation.categoryScores.technical.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{validation.categoryScores.technical.percentage}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {results.length === 0 && !isLoading && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <p>No analysis results yet. Click "Start Bulk Analysis" to begin.</p>
        </div>
      )}
    </div>
  );
};
