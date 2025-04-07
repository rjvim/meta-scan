import type { MetadataResult, ValidationResult, ValidationRule } from "../types";
import { logger } from "../utils/logger";

// Validation rules with weights and requirements
const VALIDATION_RULES: ValidationRule[] = [
  // General metadata
  {
    id: "title",
    category: "general",
    field: "title",
    requirement: "exists",
    weight: 10,
    description: "Page title is present",
    recommendation: "Add a descriptive page title"
  },
  {
    id: "title-length",
    category: "general",
    field: "title",
    requirement: "length",
    min: 10,
    max: 60,
    weight: 8,
    description: "Title length is optimal (10-60 characters)",
    recommendation: "Adjust title length to be between 10-60 characters for optimal display in search results"
  },
  {
    id: "description",
    category: "general",
    field: "meta:description",
    requirement: "exists",
    weight: 9,
    description: "Meta description is present",
    recommendation: "Add a meta description tag"
  },
  {
    id: "description-length",
    category: "general",
    field: "meta:description",
    requirement: "length",
    min: 50,
    max: 160,
    weight: 7,
    description: "Description length is optimal (50-160 characters)",
    recommendation: "Adjust description length to be between 50-160 characters for optimal display"
  },
  
  // OpenGraph metadata
  {
    id: "og-title",
    category: "opengraph",
    field: "og:title",
    requirement: "exists",
    weight: 8,
    description: "og:title is present",
    recommendation: "Add an Open Graph title tag for better social sharing"
  },
  {
    id: "og-description",
    category: "opengraph",
    field: "og:description",
    requirement: "exists",
    weight: 7,
    description: "og:description is present",
    recommendation: "Add an Open Graph description for better social sharing"
  },
  {
    id: "og-image",
    category: "opengraph",
    field: "og:image",
    requirement: "exists",
    weight: 9,
    description: "og:image is present",
    recommendation: "Add an Open Graph image for better visual representation when shared"
  },
  
  // Twitter metadata
  {
    id: "twitter-card",
    category: "twitter",
    field: "twitter:card",
    requirement: "exists",
    weight: 7,
    description: "twitter:card is present",
    recommendation: "Add a Twitter card type (summary, summary_large_image, etc.)"
  },
  {
    id: "twitter-image",
    category: "twitter",
    field: "twitter:image",
    requirement: "exists",
    weight: 8,
    description: "twitter:image is present",
    recommendation: "Add a Twitter image for better visual representation when shared"
  },
  
  // Technical metadata
  {
    id: "viewport",
    category: "technical",
    field: "meta:viewport",
    requirement: "exists",
    weight: 9,
    description: "Viewport meta tag is present",
    recommendation: "Add a viewport meta tag for mobile responsiveness"
  },
  {
    id: "canonical",
    category: "technical",
    field: "link:canonical",
    requirement: "exists",
    weight: 8,
    description: "Canonical URL is specified",
    recommendation: "Add a canonical URL to prevent duplicate content issues"
  },
  {
    id: "lang",
    category: "technical",
    field: "html:lang",
    requirement: "exists",
    weight: 6,
    description: "Language is specified",
    recommendation: "Specify the page language with the lang attribute"
  }
];

/**
 * Validates metadata against defined rules
 */
export function validateMetadata(metadata: MetadataResult): ValidationResult {
  logger.info("Validating metadata against rules");
  
  const results = {
    score: 0,
    maxScore: 0,
    percentage: 0,
    passedRules: 0,
    totalRules: VALIDATION_RULES.length,
    categoryScores: {
      general: { score: 0, maxScore: 0, percentage: 0 },
      opengraph: { score: 0, maxScore: 0, percentage: 0 },
      twitter: { score: 0, maxScore: 0, percentage: 0 },
      technical: { score: 0, maxScore: 0, percentage: 0 }
    },
    rules: [] as any[]
  };

  // Process each rule
  VALIDATION_RULES.forEach(rule => {
    const category = rule.category as keyof typeof results.categoryScores;
    const categoryData = metadata[category as keyof MetadataResult];
    const field = rule.field;
    
    // Get the value to validate
    const value = categoryData ? (categoryData as any)[field] : undefined;
    
    // Validation logic based on requirement type
    let passed = false;
    let message = "";
    
    switch (rule.requirement) {
      case "exists":
        passed = value !== undefined && value !== null && value !== "";
        message = passed ? "Present" : "Missing";
        break;
        
      case "length":
        if (value && typeof value === "string") {
          const length = value.length;
          passed = (rule.min === undefined || length >= rule.min) && 
                  (rule.max === undefined || length <= rule.max);
          
          if (!passed) {
            if (rule.min !== undefined && length < rule.min) {
              message = `Too short (${length} chars, min ${rule.min})`;
            } else if (rule.max !== undefined && length > rule.max) {
              message = `Too long (${length} chars, max ${rule.max})`;
            }
          } else {
            message = `Good length (${length} chars)`;
          }
        } else {
          passed = false;
          message = "Not present or not a string";
        }
        break;
    }
    
    // Calculate scores
    const score = passed ? rule.weight : 0;
    results.score += score;
    results.maxScore += rule.weight;
    
    results.categoryScores[category].score += score;
    results.categoryScores[category].maxScore += rule.weight;
    
    if (passed) {
      results.passedRules++;
    }
    
    // Store rule result
    results.rules.push({
      id: rule.id,
      category: rule.category,
      field: rule.field,
      description: rule.description,
      recommendation: rule.recommendation,
      passed,
      message,
      weight: rule.weight,
      score
    });
  });
  
  // Calculate percentages
  if (results.maxScore > 0) {
    results.percentage = Math.round((results.score / results.maxScore) * 100);
    
    // Calculate category percentages
    Object.keys(results.categoryScores).forEach(category => {
      const categoryScore = results.categoryScores[category as keyof typeof results.categoryScores];
      if (categoryScore.maxScore > 0) {
        categoryScore.percentage = Math.round((categoryScore.score / categoryScore.maxScore) * 100);
      }
    });
  }
  
  logger.info(`Validation complete: Score ${results.percentage}% (${results.passedRules}/${results.totalRules} rules passed)`);
  
  return results as ValidationResult;
}

/**
 * Get a grade based on percentage score
 */
export function getScoreGrade(percentage: number): string {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  if (percentage >= 50) return "E";
  return "F";
}
