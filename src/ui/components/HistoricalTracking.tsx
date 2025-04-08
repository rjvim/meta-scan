import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { cn } from "../../utils/cn";
import type { MetadataResult } from "../../types";
import type { ValidationResult, HistoricalEntry } from "../../types/validation";
import { validateMetadata } from "../../core/validator";

interface HistoricalTrackingProps {
  currentMetadata: MetadataResult;
  currentUrl: string;
}

export const HistoricalTracking = ({ currentMetadata, currentUrl }: HistoricalTrackingProps) => {
  const [history, setHistory] = useState<HistoricalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, [currentUrl]);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would be an API call
      const response = await fetch(`/api/history?url=${encodeURIComponent(currentUrl)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      
      const data = await response.json();
      setHistory(data);
      
      // Set the latest historical entry as selected
      if (data.length > 0) {
        setSelectedEntry(data[0].id);
      }
    } catch (error) {
      setError("Failed to load history. Please try again later.");
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect changes between two metadata objects
  const detectChanges = (
    oldMetadata: MetadataResult, 
    newMetadata: MetadataResult
  ): string[] => {
    const changes: string[] = [];
    
    // Check general metadata
    if (oldMetadata.general?.title !== newMetadata.general?.title) {
      changes.push(`Title changed from "${oldMetadata.general?.title}" to "${newMetadata.general?.title}"`);
    }
    
    if (oldMetadata.general?.["meta:description"] !== newMetadata.general?.["meta:description"]) {
      changes.push("Description was updated");
    }
    
    // Check OpenGraph metadata
    if (oldMetadata.opengraph?.["og:title"] !== newMetadata.opengraph?.["og:title"]) {
      changes.push("Open Graph title was updated");
    }
    
    if (
      (oldMetadata.opengraph?.["og:image"] && !newMetadata.opengraph?.["og:image"]) ||
      (!oldMetadata.opengraph?.["og:image"] && newMetadata.opengraph?.["og:image"])
    ) {
      changes.push(newMetadata.opengraph?.["og:image"] 
        ? "Open Graph image was added" 
        : "Open Graph image was removed");
    }
    
    // Check Twitter metadata
    if (oldMetadata.twitter?.["twitter:card"] !== newMetadata.twitter?.["twitter:card"]) {
      changes.push(`Twitter card type changed from "${oldMetadata.twitter?.["twitter:card"] || 'none'}" to "${newMetadata.twitter?.["twitter:card"] || 'none'}"`);
    }
    
    // If no specific changes detected
    if (changes.length === 0) {
      changes.push("Minor updates to metadata");
    }
    
    return changes;
  };
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get the selected history entry
  const getSelectedEntry = (): HistoricalEntry | null => {
    if (!selectedEntry) return null;
    return history.find(entry => entry.id === selectedEntry) || null;
  };
  
  // Compare current metadata with selected historical entry
  const compareWithCurrent = (entry: HistoricalEntry | null): string[] => {
    if (!entry) return [];
    return detectChanges(entry.metadata, currentMetadata);
  };
  
  const selected = getSelectedEntry();
  const currentChanges = compareWithCurrent(selected);

  if (isLoading) {
    return (
      <div className="historical-tracking h-full flex flex-col overflow-hidden">
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={fetchHistory}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (history.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        <p>No historical data available yet.</p>
        <p className="text-sm mt-2">MetaScan will start tracking changes from now on.</p>
      </div>
    );
  }
  
  return (
    <div className="historical-tracking h-full flex flex-col overflow-hidden">
      <div className="flex-shrink-0 py-3 px-4 mb-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium">Historical Metadata Changes</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-6 p-4 flex-1 overflow-auto">
        {/* Timeline */}
        <div className="md:w-1/3">
          <h3 className="text-sm font-medium mb-3">History Timeline</h3>
          
          <div className="space-y-3">
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-all",
                  selectedEntry === entry.id
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-sm"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {formatDate(entry.timestamp)}
                  </span>
                  {selectedEntry === entry.id && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Selected
                    </span>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {entry.changeDescription && entry.changeDescription.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {entry.changeDescription.slice(0, 2).map((change, i) => (
                        <li key={i}>{change}</li>
                      ))}
                      {entry.changeDescription.length > 2 && (
                        <li>...and {entry.changeDescription.length - 2} more changes</li>
                      )}
                    </ul>
                  ) : (
                    <p>No significant changes</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Comparison View */}
        <div className="md:w-2/3">
          {selected ? (
            <div>
              <h3 className="text-sm font-medium mb-3">
                Comparing Current with {formatDate(selected.timestamp)}
              </h3>
              
              {/* Changes since selected version */}
              <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Changes since this version
                </h4>
                {currentChanges.length > 0 ? (
                  <ul className="space-y-2">
                    {currentChanges.map((change, index) => (
                      <li 
                        key={index}
                        className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                      >
                        <span className="mr-2">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No changes detected
                  </p>
                )}
              </div>
              
              {/* Metadata Comparison */}
              <div className="space-y-6">
                {/* General Metadata */}
                <div>
                  <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-3">
                    General Metadata
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Previous Title</span>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {selected.metadata.general?.title || "Not set"}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Current Title</span>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {currentMetadata.general?.title || "Not set"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Previous Description</span>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {selected.metadata.general?.["meta:description"] || "Not set"}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Current Description</span>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {currentMetadata.general?.["meta:description"] || "Not set"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Score Comparison */}
                {selected.validation && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-3">
                      Score Comparison
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Previous Score</span>
                        <div className="mt-1">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${selected.validation.percentage}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                              {selected.validation.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Current Score</span>
                        <div className="mt-1">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${validateMetadata(currentMetadata).percentage}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                              {validateMetadata(currentMetadata).percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p>Select a historical entry to compare</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
