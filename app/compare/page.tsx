import type { Metadata } from "next";
import Link from "next/link";
import OutputCard from "@/components/OutputCard";
import { getToolById } from "@/lib/tools";
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
          Live Outputs
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

      {/* Category filter labels — static display (no JS filter needed for SSG) */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <span
            key={cat}
            className="text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Prompts + Outputs */}
      <div className="space-y-16">
        {aiOutputs.map((prompt) => {
          return (
            <section key={prompt.id}>
              {/* Prompt */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-0.5 rounded-full">
                    {prompt.category}
                  </span>
                  <span className="text-xs text-gray-400">Prompt</span>
                </div>
                <p className="text-gray-900 font-medium">&ldquo;{prompt.promptText}&rdquo;</p>
              </div>

              {/* Outputs grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {prompt.tools.map((toolOutput) => {
                  const tool = getToolById(toolOutput.toolId);
                  if (!tool) return null;
                  return (
                    <OutputCard
                      key={toolOutput.toolId}
                      toolName={tool.name}
                      model={toolOutput.model}
                      output={toolOutput.output}
                      generatedAt={toolOutput.generatedAt}
                      websiteUrl={tool.website}
                      affiliateUrl={tool.affiliateUrl}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

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
