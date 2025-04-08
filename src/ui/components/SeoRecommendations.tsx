/** @jsx h */
// @ts-ignore - h is used by JSX
import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../utils/cn";
import type { ValidationResult, ValidationRuleResult } from "../../types/validation"; // Correct import path

// Define local types based on usage
type CategoryId = 'critical' | 'important' | 'optimization';
interface CategoryRecommendations {
  critical: ValidationRuleResult[];
  important: ValidationRuleResult[];
  optimization: ValidationRuleResult[];
}

export interface SeoRecommendationsProps {
  validation: ValidationResult;
  version?: string;
}

export const SeoRecommendations = ({
  validation,
  version
}: SeoRecommendationsProps): JSX.Element => {
  if (!validation) {
    return <div>No validation data available</div>;
  }

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('critical');

  // Categorize recommendations based on failed rules (use ValidationRuleResult)
  const categorizeRecommendations = (): CategoryRecommendations => {
    if (!validation.rules) return { critical: [], important: [], optimization: [] }; 
    const failedRules = validation.rules.filter((rule) => !rule.passed);
    return {
      critical: failedRules.filter((rule) => rule.weight >= 9),
      important: failedRules.filter((rule) => rule.weight >= 7 && rule.weight < 9),
      optimization: failedRules.filter((rule) => rule.weight < 7)
    };
  };

  const recommendations = categorizeRecommendations();

  const getCurrentRecommendations = (): ValidationRuleResult[] => {
    return recommendations[selectedCategory] || [];
  };

  const getPriorityColor = (weight: number): string => {
    if (weight >= 9) return 'text-red-500';
    if (weight >= 7) return 'text-yellow-500';
    return 'text-blue-500';
  };

  const getPriorityLabel = (weight: number): string => {
    if (weight >= 9) return 'Critical';
    if (weight >= 7) return 'Important';
    return 'Optimization';
  };

  return (
    <div className="seo-recommendations h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">SEO Recommendations</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Improve your website's SEO score</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {Object.entries(recommendations).map(([category, rules]) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as CategoryId)}
            className={cn(
              'flex-1 py-3 px-4 text-sm font-medium',
              selectedCategory === category
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            )}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
            <span className="ml-2 text-gray-400 dark:text-gray-500">{rules.length}</span>
          </button>
        ))}
      </div>

      {/* Recommendations List */}
      <div className="flex-1 overflow-auto p-4">
        {getCurrentRecommendations().length > 0 ? (
          <div className="space-y-4">
            {getCurrentRecommendations().map((rule: ValidationRuleResult) => (
              <div key={rule.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{rule.id}</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{rule.message}</p>
                  </div>
                  <span className={cn('text-sm font-medium', getPriorityColor(rule.weight))}>
                    {getPriorityLabel(rule.weight)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No {selectedCategory} issues found</p>
          </div>
        )}
      </div>

      {/* Overall Score */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 flex-shrink-0 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Overall SEO Score</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {validation.passedRules || 0} of {validation.totalRules || 0} checks passed
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{validation.percentage || 0}%</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={cn(
                'h-2 rounded-full',
                (validation.percentage || 0) >= 80 ? 'bg-green-500' :
                (validation.percentage || 0) >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              )}
              style={{ width: `${validation.percentage || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {version && (
        <div className="p-2 text-xs text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-700">
          Version {version}
        </div>
      )}
    </div>
  );
}
