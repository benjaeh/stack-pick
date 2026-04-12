import toolsData from "@/data/tools.json";
import comparisonsData from "@/data/comparisons.json";
import bestofData from "@/data/bestof.json";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  website: string;
  affiliateUrl: string;
  pricing: string;
  hasFree: boolean;
  startingPrice: number;
  rating: number;
  bestFor: string;
  pros: string[];
  cons: string[];
  notGoodAt: string;
  whoShouldNotUse?: string;
  alternatives?: string[];
  lastUpdated: string;
  status: string;
}

export interface Comparison {
  slug: string;
  tool1Id: string;
  tool2Id: string;
  title: string;
  metaDescription: string;
  lastUpdated: string;
  intro: string;
  winner: string;
  winnerReason: string;
  tool1Pros: string[];
  tool1Cons: string[];
  tool2Pros: string[];
  tool2Cons: string[];
  tool1NotGoodAt: string;
  tool2NotGoodAt: string;
  whoShouldNotUseTool1: string;
  whoShouldNotUseTool2: string;
  useCases: { useCase: string; winner: string; reason: string }[];
  verdict: string;
  faq: { question: string; answer: string }[];
}

export interface BestOf {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  lastUpdated: string;
  intro: string;
  toolIds: string[];
  relatedComparisons: string[];
  quickPicks: { useCase: string; toolId: string; reason: string }[];
  whoShouldNotUseThese: string;
  verdict: string;
  faq: { question: string; answer: string }[];
}

export const tools: Tool[] = toolsData as Tool[];
export const comparisons: Comparison[] = comparisonsData as Comparison[];
export const bestofs: BestOf[] = bestofData as BestOf[];

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getBestOfBySlug(slug: string): BestOf | undefined {
  return bestofs.find((b) => b.slug === slug);
}

export function formatRating(rating: number): string {
  return `${rating}/10`;
}

export function getBestOfsByCategory(category: string): BestOf[] {
  return bestofs.filter((b) => b.category === category);
}

export function getRelatedBestOfs(tool1Id: string, tool2Id: string): BestOf[] {
  const tool1 = getToolById(tool1Id);
  const tool2 = getToolById(tool2Id);
  const categories = new Set([tool1?.category, tool2?.category].filter(Boolean));
  return bestofs.filter((b) => categories.has(b.category));
}

export function getComparisonsForTool(toolId: string): Comparison[] {
  return comparisons.filter(
    (c) => c.tool1Id === toolId || c.tool2Id === toolId
  );
}

export function getBestOfsByToolId(toolId: string): BestOf[] {
  const tool = getToolById(toolId);
  const alternativesSlug = tool ? `${tool.slug}-alternatives` : null;
  return bestofs.filter(
    (b) => b.toolIds.includes(toolId) || b.slug === alternativesSlug
  );
}
