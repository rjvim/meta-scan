import { h } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../utils/cn";
import type { ValidationResult, ValidationRuleResult } from "../../types";

interface SeoRecommendationsProps {
  validation: ValidationResult;
}

interface RecommendationCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const categories: RecommendationCategory[] = [
  {
    id: "critical",
    label: "Critical Issues",
    description: "High-priority issues that significantly impact SEO",
    icon: "⚠️"
  },
  {
    id: "important",
    label: "Important Improvements",
    description: "Recommended changes to improve SEO performance",
    icon: "⚡"
  },
  {
    id: "optimization",
    label: "Optimizations",
    description: "Optional enhancements for better results",
    icon: "✨"
  }
];

export const SeoRecommendations = ({ validation }: SeoRecommendationsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("critical");
  
  // Categorize recommendations based on weight and status
  const categorizeRecommendations = () => {
    const failed = validation.rules.filter(rule => !rule.passed);
    
    return {
      critical: failed.filter(rule => rule.weight >= 9),
      important: failed.filter(rule => rule.weight >= 7 && rule.weight < 9),
      optimization: failed.filter(rule => rule.weight < 7)
    };
  };
  
  const recommendations = categorizeRecommendations();
  
  // Get recommendations for current category
  const getCurrentRecommendations = () => {
    return recommendations[selectedCategory as keyof typeof recommendations] || [];
  };
  
  // Calculate completion percentage
  const getCompletionPercentage = (categoryId: string): number => {
    const total = validation.rules.filter(rule => {
      if (categoryId === "critical") return rule.weight >= 9;
      if (categoryId === "important") return rule.weight >= 7 && rule.weight < 9;
      return rule.weight < 7;
    }).length;
    
    const completed = total - recommendations[categoryId as keyof typeof recommendations].length;
    
    return total > 0 ? Math.round((completed / total) * 100) : 100;
  };
  
  // Get priority label
  const getPriorityLabel = (weight: number): string => {
    if (weight >= 9) return "High Priority";
    if (weight >= 7) return "Medium Priority";
    return "Low Priority";
  };
  
  // Get priority color
  const getPriorityColor = (weight: number): string => {
    if (weight >= 9) return "text-red-600 dark:text-red-400";
    if (weight >= 7) return "text-yellow-600 dark:text-yellow-400";
    return "text-blue-600 dark:text-blue-400";
  };
  
  const currentRecommendations = getCurrentRecommendations();
  
  return (
    <div className="seo-recommendations">
      {/* Category Tabs */}
      <div className="flex space-x-4 mb-6">
        {categories.map(category => {
          const percentage = getCompletionPercentage(category.id);
          const count = recommendations[category.id as keyof typeof recommendations].length;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex-1 p-4 rounded-lg border transition-all text-left",
                selectedCategory === category.id
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {category.label}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {count} issue{count !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {percentage}%
                  </span>
                  <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                    <div
                      className="h-1 bg-purple-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Recommendations List */}
      <div className="recommendations-list space-y-4">
        {currentRecommendations.length > 0 ? (
          currentRecommendations.map((rule, index) => (
            <div
              key={rule.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {rule.description}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {rule.recommendation}
                  </p>
                  <div className="mt-2">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getPriorityColor(rule.weight)
                    )}>
                      {getPriorityLabel(rule.weight)}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Score Impact
                  </span>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    +{rule.weight}
                  </p>
                </div>
              </div>
              
              {/* Current Status */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Current Status:
                </span>
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {rule.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              All {selectedCategory} issues resolved!
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Great job! Your metadata is looking good for this category.
            </p>
          </div>
        )}
      </div>
      
      {/* Overall Score */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Overall SEO Score
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {validation.passedRules} of {validation.totalRules} checks passed
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {validation.percentage}%
            </span>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full",
                validation.percentage >= 80 ? "bg-green-500" :
                validation.percentage >= 60 ? "bg-yellow-500" :
                "bg-red-500"
              )}
              style={{ width: `${validation.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
