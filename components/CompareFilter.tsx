"use client";

import { useState } from "react";
import OutputCard from "@/components/OutputCard";

interface ToolOutput {
  toolId: string;
  model: string;
  output: string;
  generatedAt: string;
}

interface AiOutput {
  id: string;
  promptText: string;
  category: string;
  tools: ToolOutput[];
}

interface ToolMeta {
  id: string;
  name: string;
  website: string;
  affiliateUrl: string;
}

interface CompareFilterProps {
  aiOutputs: AiOutput[];
  toolsMap: Record<string, ToolMeta>;
  categories: string[];
}

export default function CompareFilter({ aiOutputs, toolsMap, categories }: CompareFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? aiOutputs
      : aiOutputs.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
              activeCategory === cat
                ? "bg-primary text-white border-primary"
                : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompts + Outputs */}
      <div className="space-y-16">
        {filtered.map((prompt) => (
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
                const tool = toolsMap[toolOutput.toolId];
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
        ))}
      </div>
    </>
  );
}
