/**
 * Types for metadata validation system
 */

export interface ValidationRule {
  id: string;
  category: string;
  field: string;
  requirement: "exists" | "length";
  weight: number;
  description: string;
  recommendation: string;
  min?: number;
  max?: number;
}

export interface ValidationRuleResult {
  id: string;
  category: string;
  field: string;
  description: string;
  recommendation: string;
  passed: boolean;
  message: string;
  weight: number;
  score: number;
}

export interface CategoryScore {
  score: number;
  maxScore: number;
  percentage: number;
}

export interface ValidationResult {
  score: number;
  maxScore: number;
  percentage: number;
  passedRules: number;
  totalRules: number;
  categoryScores: {
    general: CategoryScore;
    opengraph: CategoryScore;
    twitter: CategoryScore;
    technical: CategoryScore;
  };
  rules: ValidationRuleResult[];
}

export interface HistoricalEntry {
  id: string;
  timestamp: string;
  metadata: MetadataResult;
  validation?: ValidationResult;
  changeDescription?: string[];
}

export interface CompetitorMetadata {
  url: string;
  domain: string;
  metadata: MetadataResult;
  validation: ValidationResult;
  status: "loading" | "success" | "error";
  error?: string;
}
