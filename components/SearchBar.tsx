"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Comparison, Tool, BestOf } from "@/lib/tools";

interface SearchResult {
  type: "comparison" | "tool" | "bestof";
  title: string;
  href: string;
  subtitle: string;
}

interface SearchBarProps {
  comparisons: Comparison[];
  tools: Tool[];
  bestofs: BestOf[];
}

function search(
  query: string,
  comparisons: Comparison[],
  tools: Tool[],
  bestofs: BestOf[]
): SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  comparisons
    .filter(
      (c) => c.title.toLowerCase().includes(q) || c.slug.includes(q)
    )
    .slice(0, 3)
    .forEach((c) =>
      results.push({
        type: "comparison",
        title: c.title,
        href: `/vs/${c.slug}`,
        subtitle: "Comparison",
      })
    );

  tools
    .filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.includes(q) ||
        t.tagline.toLowerCase().includes(q)
    )
    .slice(0, 2)
    .forEach((t) =>
      results.push({
        type: "tool",
        title: t.name,
        href: `/best/${t.category}`,
        subtitle: t.tagline,
      })
    );

  bestofs
    .filter((b) => b.title.toLowerCase().includes(q))
    .slice(0, 2)
    .forEach((b) =>
      results.push({
        type: "bestof",
        title: b.title,
        href: `/best/${b.slug}`,
        subtitle: "Best Of",
      })
    );

  return results.slice(0, 6);
}

const SUGGESTED_SEARCHES = [
  { label: "ChatGPT vs Claude", href: "/vs/chatgpt-vs-claude" },
  { label: "Best AI tools 2026", href: "/best/best-ai-tools-2026" },
  { label: "Monday vs ClickUp", href: "/vs/monday-vs-clickup" },
  { label: "Best AI writing tools", href: "/best/ai-writing-tools" },
];

const typeIcon: Record<string, string> = {
  comparison: "🆚",
  bestof: "📋",
  tool: "🛠️",
};

const typeLabel: Record<string, string> = {
  comparison: "VS",
  bestof: "Best Of",
  tool: "Tool",
};

export default function SearchBar({ comparisons, tools, bestofs }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const res = search(query, comparisons, tools, bestofs);
    setResults(res);
  }, [query, comparisons, tools, bestofs]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(href: string) {
    setQuery("");
    setFocused(false);
    router.push(href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setFocused(false);
      setQuery("");
    }
  }

  const showSuggestions = focused && query.length === 0;
  const showResults = results.length > 0 && query.length >= 2;

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          placeholder="Search tools..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      {(showSuggestions || showResults) && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {showSuggestions && (
            <>
              <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Try searching
              </p>
              {SUGGESTED_SEARCHES.map((s) => (
                <button
                  key={s.href}
                  onClick={() => handleSelect(s.href)}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-300 text-sm">→</span>
                  <span className="text-sm text-gray-700">{s.label}</span>
                </button>
              ))}
            </>
          )}
          {showResults &&
            results.map((result, i) => (
              <button
                key={i}
                onClick={() => handleSelect(result.href)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{typeIcon[result.type]}</span>
                  <span className="text-xs bg-primary-light text-primary px-1.5 py-0.5 rounded font-medium shrink-0">
                    {typeLabel[result.type]}
                  </span>
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {result.title}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate pl-6">
                  {result.subtitle}
                </p>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
