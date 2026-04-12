import type { Metadata } from "next";
import Link from "next/link";
import CompareFilter from "@/components/CompareFilter";
import { tools } from "@/lib/tools";
import aiOutputsData from "@/data/ai-outputs.json";

export const metadata: Metadata = {
  title: "Same Prompt. Different AI. See the Real Difference. | Stack Pick",
  description:
    "We gave the same prompts to ChatGPT, Claude, and Gemini. Here are the real outputs — so you can see the difference before you pay.",
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

const categories = ["All", "Writing", "Explanation", "Creative", "Email", "Summarization"];

// Build a flat map of toolId → { name, website, affiliateUrl } for the client component
const toolsMap = Object.fromEntries(
  tools.map((t) => [t.id, { id: t.id, name: t.name, website: t.website, affiliateUrl: t.affiliateUrl }])
);

export default function ComparePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        {" → "}
        <span className="text-gray-600">AI vs AI</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
          Real Outputs
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4 mb-4">
          Same Prompt. Different AI.
          <br />
          <span className="text-primary">See the Real Difference.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          We gave the exact same prompts to ChatGPT, Claude, and Gemini. No cherry-picking — these are the actual outputs. Judge for yourself.
        </p>
      </div>

      {/* Filter + outputs — client component handles interactivity */}
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
