import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { cn } from "../../utils/cn";
import type { MetadataResult, ValidationResult, CompetitorMetadata } from "../../types";
import { validateMetadata, getScoreGrade } from "../../core/validator";

interface CompetitorAnalysisProps {
  currentMetadata: MetadataResult;
  currentUrl: string;
}

export const CompetitorAnalysis = ({ currentMetadata, currentUrl }: CompetitorAnalysisProps) => {
  const [competitors, setCompetitors] = useState<CompetitorMetadata[]>([]);
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Validation for current site
  const currentValidation = validateMetadata(currentMetadata);
  
  // Extract domain from URL
  const extractDomain = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  };
  
  const currentDomain = extractDomain(currentUrl);
  
  // Add a new competitor
  const addCompetitor = async () => {
    // Basic validation
    if (!competitorUrl) {
      setError("Please enter a URL");
      return;
    }
    
    let formattedUrl = competitorUrl;
    if (!formattedUrl.startsWith("http")) {
      formattedUrl = `https://${formattedUrl}`;
    }
    
    try {
      // Validate URL
      new URL(formattedUrl);
      
      // Check if already in the list
      const domain = extractDomain(formattedUrl);
      if (competitors.some(c => c.domain === domain) || domain === currentDomain) {
        setError("This competitor is already in the list");
        return;
      }
      
      // Add placeholder while loading
      const newCompetitor: CompetitorMetadata = {
        url: formattedUrl,
        domain,
        metadata: {} as MetadataResult,
        validation: {} as ValidationResult,
        status: "loading"
      };
      
      setCompetitors([...competitors, newCompetitor]);
      setCompetitorUrl("");
      setError(null);
      setIsLoading(true);
      
      try {
        // Fetch metadata from the competitor's URL
        const response = await fetch(`/api/analyze?url=${encodeURIComponent(formattedUrl)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }
        
        const metadata = await response.json();
        const validation = validateMetadata(metadata);
        
        // Update the competitor with fetched data
        setCompetitors(prev => 
          prev.map(comp => 
            comp.url === formattedUrl 
              ? { ...comp, metadata, validation, status: "success" }
              : comp
          )
        );
      } catch (fetchError) {
        // Update competitor with error state
        setCompetitors(prev => 
          prev.map(comp => 
            comp.url === formattedUrl 
              ? { ...comp, status: "error", error: "Failed to fetch metadata" }
              : comp
          )
        );
      } finally {
        setIsLoading(false);
      }
    } catch (urlError) {
      setError("Please enter a valid URL");
    }
  };
  
  // Remove a competitor
  const removeCompetitor = (url: string) => {
    setCompetitors(competitors.filter(c => c.url !== url));
  };
  
  // Handle key press in input
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addCompetitor();
    }
  };
  
  // Generate table data
  const getComparisonData = () => {
    // Start with current site data
    const data = [
      {
        domain: currentDomain,
        url: currentUrl,
        score: currentValidation.percentage,
        grade: getScoreGrade(currentValidation.percentage),
        general: currentValidation.categoryScores.general.percentage,
        opengraph: currentValidation.categoryScores.opengraph.percentage,
        twitter: currentValidation.categoryScores.twitter.percentage,
        technical: currentValidation.categoryScores.technical.percentage,
        isCurrent: true
      }
    ];
    
    // Add competitor data
    competitors.forEach(competitor => {
      if (competitor.status === "success") {
        data.push({
          domain: competitor.domain,
          url: competitor.url,
          score: competitor.validation.percentage,
          grade: getScoreGrade(competitor.validation.percentage),
          general: competitor.validation.categoryScores.general.percentage,
          opengraph: competitor.validation.categoryScores.opengraph.percentage,
          twitter: competitor.validation.categoryScores.twitter.percentage,
          technical: competitor.validation.categoryScores.technical.percentage,
          isCurrent: false
        });
      }
    });
    
    // Sort by overall score (highest first)
    return data.sort((a, b) => b.score - a.score);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };
  
  const tableData = getComparisonData();
  
  return (
    <div className="competitor-analysis">
      {/* Add competitor form */}
      <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Add Competitor</h3>
        <div className="flex gap-2">
          <div className="flex-grow">
            <input
              type="text"
              value={competitorUrl}
              onInput={(e) => setCompetitorUrl((e.target as HTMLInputElement).value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter competitor URL (e.g., example.com)"
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              disabled={isLoading}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button
            onClick={addCompetitor}
            disabled={isLoading}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md",
              "bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
      
      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Domain
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Overall Score
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
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {tableData.map((site) => (
              <tr key={site.url} className={site.isCurrent ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {site.domain}
                      {site.isCurrent && (
                        <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(current)</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`text-sm font-medium ${getScoreColor(site.score)}`}>
                      {site.score}% ({site.grade})
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${site.general >= 80 ? 'bg-green-500' : site.general >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${site.general}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{site.general}%</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${site.opengraph >= 80 ? 'bg-green-500' : site.opengraph >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${site.opengraph}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{site.opengraph}%</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${site.twitter >= 80 ? 'bg-green-500' : site.twitter >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${site.twitter}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{site.twitter}%</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${site.technical >= 80 ? 'bg-green-500' : site.technical >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${site.technical}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{site.technical}%</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {!site.isCurrent && (
                    <button
                      onClick={() => removeCompetitor(site.url)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
            
            {/* Loading rows for competitors being added */}
            {competitors.filter(c => c.status === "loading").map(comp => (
              <tr key={comp.url} className="animate-pulse">
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </td>
              </tr>
            ))}
            
            {/* Error rows */}
            {competitors.filter(c => c.status === "error").map(comp => (
              <tr key={comp.url} className="bg-red-50 dark:bg-red-900/20">
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {comp.domain}
                    <span className="ml-2 text-xs text-red-600 dark:text-red-400">(error)</span>
                  </div>
                </td>
                <td colSpan={5} className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600 dark:text-red-400">{comp.error || "Failed to fetch data"}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <button
                    onClick={() => removeCompetitor(comp.url)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {competitors.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <p>Add competitor URLs to compare their metadata with your site.</p>
        </div>
      )}
    </div>
  );
};
