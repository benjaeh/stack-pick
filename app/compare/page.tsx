import type { Metadata } from "next";
import Link from "next/link";
import CompareFilter from "@/components/CompareFilter";
import ToolComparison from "@/components/ToolComparison";
import { tools, comparisons } from "@/lib/tools";
import aiOutputsData from "@/data/ai-outputs.json";

export const metadata: Metadata = {
  title: "Compare AI Tools Side-by-Side | Stack Pick",
  description:
    "Compare any AI tools side-by-side with honest structured data. No winner declared — just clear insights to help you decide. Plus: see the same prompt run through different AI tools.",
};

interface AiOutput {
  id: string;
  promptText: string;
  category: string;
  tools: {
    toolId: string;
    model: string;
    output: string;
    generatedAt: string;
  }[];
}

const aiOutputs: AiOutput[] = aiOutputsData as AiOutput[];

const categories = ["All", "Writing", "Social Media", "Marketing", "Coding", "Email", "Creative", "Explanation", "Summarization"];

// Serialisable slices for client components
const toolsMap = Object.fromEntries(
  tools.map((t) => [t.id, { id: t.id, name: t.name, website: t.website, affiliateUrl: t.affiliateUrl }])
);

const toolsForSelector = tools.map((t) => ({
  id: t.id,
  name: t.name,
  slug: t.slug,
  category: t.category,
  tagline: t.tagline,
  pricing: t.pricing,
  hasFree: t.hasFree,
  startingPrice: t.startingPrice,
  rating: t.rating,
  bestFor: t.bestFor,
  pros: t.pros,
  cons: t.cons,
  notGoodAt: t.notGoodAt,
  whoShouldNotUse: t.whoShouldNotUse ?? "",
}));

const comparisonsForSelector = comparisons.map((c) => ({
  slug: c.slug,
  tool1Id: c.tool1Id,
  tool2Id: c.tool2Id,
  title: c.title,
  winner: c.winner,
  winnerReason: c.winnerReason,
}));

export default function ComparePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        {" → "}
        <span className="text-gray-600">Compare</span>
      </nav>

      {/* Page header */}
      <div className="text-center mb-12">
        <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
          {tools.length} tools · {comparisons.length} comparisons
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4 mb-4">
          Compare AI Tools
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Build your own side-by-side comparison — or see the same prompt run through different AI tools to judge the real output quality.
        </p>
      </div>

      {/* ── SECTION 1: Tool Comparison ────────────────────────────────────── */}
      <ToolComparison tools={toolsForSelector} comparisons={comparisonsForSelector} />

      {/* ── SECTION DIVIDER ───────────────────────────────────────────────── */}
      <div className="relative my-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
            See AI Tools in Action
          </span>
        </div>
      </div>

      {/* ── SECTION 2: Same prompt, different AI ──────────────────────────── */}
      <div className="text-center mb-10">
        <p className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide inline-block mb-4">
          Real Outputs
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Same Prompt. Different AI.
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          We gave the exact same prompts to the top AI tools. No cherry-picking — these are the actual outputs. Judge for yourself.
        </p>
      </div>

      <CompareFilter
        aiOutputs={aiOutputs}
        toolsMap={toolsMap}
        categories={categories}
      />

      {/* Transparency note */}
      <div className="mt-16 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-500">
          <strong className="text-gray-700">Transparency:</strong> All outputs were generated in April 2026 using each tool&apos;s standard interface — no special prompting or cherry-picking. AI outputs vary with each run. These represent one real response per tool, not an average.
        </p>
        <div className="mt-4">
          <Link
            href="/vs"
            className="text-sm text-primary font-semibold hover:underline"
          >
            Read full tool comparisons →
          </Link>
        </div>
      </div>
    </div>
  );
}
