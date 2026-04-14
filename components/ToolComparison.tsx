"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ToolData {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  pricing: string;
  hasFree: boolean;
  startingPrice: number;
  rating: number;
  bestFor: string;
  pros: string[];
  cons: string[];
  notGoodAt: string;
  whoShouldNotUse?: string;
}

interface ComparisonData {
  slug: string;
  tool1Id: string;
  tool2Id: string;
  title: string;
  winner: string;
  winnerReason: string;
}

interface ToolComparisonProps {
  tools: ToolData[];
  comparisons: ComparisonData[];
}

// ── Category meta ─────────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  "ai-writing":         { label: "AI Writing",          icon: "✍️" },
  "image-ai":           { label: "Image AI",             icon: "🎨" },
  "productivity":       { label: "Productivity",         icon: "🧠" },
  "project-management": { label: "Project Management",   icon: "📋" },
  "ai-video":           { label: "Video & Audio",        icon: "🎬" },
};

function catMeta(category: string) {
  return CATEGORY_META[category] ?? { label: category, icon: "🛠️" };
}

// ── VS pair lookup ─────────────────────────────────────────────────────────────

function findComparison(id1: string, id2: string, comparisons: ComparisonData[]) {
  return comparisons.find(
    (c) =>
      (c.tool1Id === id1 && c.tool2Id === id2) ||
      (c.tool1Id === id2 && c.tool2Id === id1)
  ) ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function ToolComparison({ tools, comparisons }: ToolComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery]             = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef    = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = tools.filter(
    (t) =>
      !selectedIds.includes(t.id) &&
      (query.length === 0 ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase()) ||
        t.tagline.toLowerCase().includes(query.toLowerCase()))
  );

  const selected = selectedIds
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as ToolData[];

  const handleSelect = (id: string) => {
    if (selectedIds.length >= 3) return;
    setSelectedIds((prev) => [...prev, id]);
    setQuery("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  };

  const handleRemove = (id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  // Close dropdown on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (
        dropdownRef.current?.contains(e.target as Node) ||
        inputRef.current?.contains(e.target as Node)
      ) return;
      setDropdownOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div className="mb-20">
      {/* Section header */}
      <div className="text-center mb-8">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
          Build Your Comparison
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Compare Any AI Tools Side-by-Side
        </h2>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          Select 2–3 tools. See an honest, structured breakdown. No winner declared — just the data you need to decide.
        </p>
      </div>

      {/* ── Tool Picker ───────────────────────────────────────────────────── */}
      <div className="max-w-xl mx-auto mb-10">
        {/* Selected chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selected.map((tool) => {
              const m = catMeta(tool.category);
              return (
                <span
                  key={tool.id}
                  className="inline-flex items-center gap-1.5 bg-primary-light text-primary border border-primary/20 text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  <span className="text-base leading-none">{m.icon}</span>
                  {tool.name}
                  <button
                    onClick={() => handleRemove(tool.id)}
                    className="ml-1 text-primary/50 hover:text-primary transition-colors text-base leading-none"
                    aria-label={`Remove ${tool.name}`}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Search input */}
        {selectedIds.length < 3 ? (
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setDropdownOpen(true); }}
              onFocus={() => setDropdownOpen(true)}
              placeholder={
                selectedIds.length === 0
                  ? "Search for an AI tool to compare (e.g. ChatGPT, Notion…)"
                  : "Add another tool…"
              }
              className="w-full pl-9 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-gray-400"
            />

            {/* Dropdown */}
            {dropdownOpen && filtered.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-64 overflow-y-auto"
              >
                {filtered.map((tool) => {
                  const m = catMeta(tool.category);
                  return (
                    <button
                      key={tool.id}
                      onMouseDown={() => handleSelect(tool.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                    >
                      <span className="text-xl shrink-0">{m.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">{tool.name}</p>
                        <p className="text-xs text-gray-400 truncate">{tool.tagline}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-400 text-center py-2">
            Maximum 3 tools selected — remove one to add another.
          </p>
        )}

        {selected.length === 1 && (
          <p className="text-xs text-gray-400 text-center mt-2">
            Add at least one more tool to see the comparison.
          </p>
        )}
      </div>

      {/* ── Comparison table + insights ───────────────────────────────────── */}
      {selected.length >= 2 && (
        <>
          <ComparisonTable tools={selected} />
          <SmartInsights tools={selected} comparisons={comparisons} />
        </>
      )}

      {/* Empty state */}
      {selected.length === 0 && (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
          <p className="text-3xl mb-3">🔍</p>
          <p className="text-sm text-gray-500">
            Search above to start comparing tools.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["ChatGPT", "Claude", "Notion", "Midjourney"].map((name) => {
              const t = tools.find((x) => x.name === name);
              if (!t) return null;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  + {t.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Comparison Table
// ─────────────────────────────────────────────────────────────────────────────

function ComparisonTable({ tools }: { tools: ToolData[] }) {
  const cols = tools.length;

  type Row = { label: string; render: (t: ToolData) => React.ReactNode };

  const rows: Row[] = [
    {
      label: "Category",
      render: (t) => {
        const m = catMeta(t.category);
        return <span className="text-sm text-gray-700">{m.icon} {m.label}</span>;
      },
    },
    {
      label: "Rating",
      render: (t) => (
        <span className="font-bold text-primary">
          {t.rating}
          <span className="text-gray-400 font-normal text-xs">/10</span>
        </span>
      ),
    },
    {
      label: "Pricing",
      render: (t) => <span className="text-sm text-gray-700">{t.pricing}</span>,
    },
    {
      label: "Free tier",
      render: (t) => (
        <span className={`text-sm font-semibold ${t.hasFree ? "text-green-600" : "text-gray-400"}`}>
          {t.hasFree ? "✅ Yes" : "❌ No"}
        </span>
      ),
    },
    {
      label: "Best for",
      render: (t) => <span className="text-sm text-gray-700">{t.bestFor}</span>,
    },
    {
      label: "Strengths",
      render: (t) => (
        <ul className="space-y-1.5">
          {t.pros.slice(0, 3).map((p, i) => (
            <li key={i} className="text-xs text-gray-600 flex gap-1.5 items-start">
              <span className="text-green-500 shrink-0 font-bold mt-0.5">+</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Weaknesses",
      render: (t) => (
        <ul className="space-y-1.5">
          {t.cons.slice(0, 3).map((c, i) => (
            <li key={i} className="text-xs text-gray-600 flex gap-1.5 items-start">
              <span className="text-red-400 shrink-0 font-bold mt-0.5">−</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Not good at",
      render: (t) => (
        <p className="text-xs text-gray-600 leading-relaxed">{t.notGoodAt}</p>
      ),
    },
    {
      label: "Avoid if",
      render: (t) =>
        t.whoShouldNotUse ? (
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.whoShouldNotUse.length > 180
              ? t.whoShouldNotUse.slice(0, 180) + "…"
              : t.whoShouldNotUse}
          </p>
        ) : (
          <span className="text-xs text-gray-300">—</span>
        ),
    },
  ];

  const gridCols = `160px repeat(${cols}, 1fr)`;

  return (
    <div className="overflow-x-auto mb-12 rounded-2xl border border-gray-200 shadow-sm">
      <div className="min-w-[560px]">
        {/* Tool header row */}
        <div
          className="grid bg-white border-b border-gray-100"
          style={{ gridTemplateColumns: gridCols }}
        >
          <div className="px-4 py-4 bg-gray-50 rounded-tl-2xl" />
          {tools.map((t, i) => {
            const m = catMeta(t.category);
            return (
              <div
                key={t.id}
                className={`px-4 py-4 text-center border-l border-gray-100 ${
                  i === tools.length - 1 ? "rounded-tr-2xl" : ""
                }`}
              >
                <p className="text-2xl mb-1">{m.icon}</p>
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{t.tagline}</p>
              </div>
            );
          })}
        </div>

        {/* Data rows */}
        {rows.map((row, rowIdx) => (
          <div
            key={row.label}
            className={`grid ${rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50/60"} ${
              rowIdx === rows.length - 1 ? "rounded-b-2xl" : "border-b border-gray-100"
            }`}
            style={{ gridTemplateColumns: gridCols }}
          >
            <div className="px-4 py-4 flex items-start bg-gray-50/80 border-r border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight">
                {row.label}
              </span>
            </div>
            {tools.map((t) => (
              <div key={t.id} className="px-4 py-4 border-l border-gray-100">
                {row.render(t)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Smart Insights
// ─────────────────────────────────────────────────────────────────────────────

function SmartInsights({
  tools,
  comparisons,
}: {
  tools: ToolData[];
  comparisons: ComparisonData[];
}) {
  const categories = [...new Set(tools.map((t) => t.category))];
  const crossCategory = categories.length > 1;

  // Find existing VS pages for all pairs
  const vsPairs: { c: ComparisonData; t1: ToolData; t2: ToolData }[] = [];
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      const match = findComparison(tools[i].id, tools[j].id, comparisons);
      if (match) vsPairs.push({ c: match, t1: tools[i], t2: tools[j] });
    }
  }

  // Possible pairs count
  const possiblePairs = (tools.length * (tools.length - 1)) / 2;
  const missingPairs = possiblePairs - vsPairs.length;

  return (
    <div className="space-y-6">
      {/* Cross-category notice */}
      {crossCategory && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> These tools serve different purposes and may not be directly comparable. The table above shows their individual characteristics — weigh them against your specific workflow needs.
          </p>
        </div>
      )}

      {/* Key differences */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Key Differences &amp; When to Choose Each
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4"
            >
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                Best for
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-1">→ {tool.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{tool.bestFor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Avoid if */}
      {tools.some((t) => t.whoShouldNotUse) && (
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3">Avoid if you need…</h4>
          <div className="space-y-2">
            {tools
              .filter((t) => t.whoShouldNotUse)
              .map((tool) => {
                const firstSentence = tool.whoShouldNotUse!.split(/\.\s/)[0] + ".";
                return (
                  <div key={tool.id} className="flex gap-3 items-start">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{tool.name}: </span>
                      {firstSentence}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Trade-offs */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 mb-3">Trade-offs</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tools.map((tool) => {
            const weaknessFirstSentence = tool.notGoodAt.split(/\.\s/)[0] + ".";
            return (
              <div key={tool.id} className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-sm mb-3">{tool.name}</p>
                <p className="text-xs text-green-700 mb-2 leading-relaxed">
                  <span className="font-semibold">Strong at: </span>
                  {tool.pros[0]}
                </p>
                <p className="text-xs text-orange-700 leading-relaxed">
                  <span className="font-semibold">Weak at: </span>
                  {weaknessFirstSentence}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curated VS pages */}
      {vsPairs.length > 0 && (
        <div className="bg-primary-light border border-primary/20 rounded-xl px-5 py-4">
          <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3">
            Curated Comparisons Available
          </p>
          <div className="space-y-2">
            {vsPairs.map(({ c, t1, t2 }) => (
              <Link
                key={c.slug}
                href={`/vs/${c.slug}`}
                className="flex items-center justify-between group"
              >
                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                  {t1.name} vs {t2.name} — full human-written comparison
                </span>
                <span className="text-primary text-sm font-semibold group-hover:underline shrink-0 ml-4">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Suggest CTA — only when some pairs don't have a VS page */}
      {missingPairs > 0 && (
        <div className="text-center py-5 border border-dashed border-gray-200 rounded-xl">
          <p className="text-sm text-gray-500 mb-2">
            {vsPairs.length === 0
              ? "We haven't written a curated comparison for this combination yet."
              : "Some tool pairs in this selection don't have a curated comparison yet."}
          </p>
          <a
            href="mailto:hello@stack-pick.com?subject=Comparison%20Request"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Suggest this comparison →
          </a>
        </div>
      )}
    </div>
  );
}
