import Link from "next/link";
import type { Metadata } from "next";
import { comparisons, getToolById } from "@/lib/tools";
import SchemaMarkup from "@/components/SchemaMarkup";
import VSFilter from "@/components/VSFilter";

export const metadata: Metadata = {
  title: "AI Tool Comparisons (2026) — Honest Side-by-Side Reviews | Stack Pick",
  description:
    "Honest, in-depth comparisons of the most popular AI tools and software. No sponsored rankings. Real pros, cons, and clear verdicts.",
  openGraph: {
    title: "AI Tool Comparisons (2026) — Stack Pick",
    description:
      "Honest side-by-side comparisons of the best AI tools. Find out which tool actually fits your workflow.",
    url: "https://stack-pick.com/vs",
  },
};

const FEATURED_SLUGS = [
  "chatgpt-vs-claude",
  "chatgpt-vs-gemini",
  "notion-vs-clickup",
  "monday-vs-clickup",
  "midjourney-vs-dall-e",
  "grammarly-vs-quillbot",
];

const CATEGORIES = [
  { id: "ai-assistants",    label: "AI Assistants",      icon: "🤖" },
  { id: "writing",          label: "Writing",             icon: "✍️" },
  { id: "project-management", label: "Project Management", icon: "📋" },
  { id: "image-ai",         label: "Image AI",            icon: "🎨" },
  { id: "video-audio",      label: "Video & Audio",       icon: "🎬" },
];

export default function VSIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stack-pick.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://stack-pick.com/vs" },
    ],
  };

  // Build serialisable cards for the client component
  type CardType = {
    slug: string; title: string; tool1Name: string; tool2Name: string;
    winnerName: string | null; winnerReason: string; vsCategory: string; isFeatured: boolean;
  };
  const cards: CardType[] = comparisons
    .map((c): CardType | null => {
      const tool1 = getToolById(c.tool1Id);
      const tool2 = getToolById(c.tool2Id);
      if (!tool1 || !tool2) return null;
      const winner = c.winner === c.tool1Id ? tool1 : tool2;
      return {
        slug: c.slug,
        title: c.title,
        tool1Name: tool1.name,
        tool2Name: tool2.name,
        winnerName: winner?.name ?? null,
        winnerReason: c.winnerReason,
        vsCategory: c.vsCategory ?? "other",
        isFeatured: FEATURED_SLUGS.includes(c.slug),
      };
    })
    .filter((c): c is CardType => c !== null);

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema]} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {" → "}
          <span className="text-gray-600">Compare</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              {comparisons.length} comparisons
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            AI Tool Comparisons (2026)
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Honest, side-by-side comparisons. No sponsored rankings. Clear verdicts on which tool actually fits your workflow.
          </p>
        </div>

        {/* Category stat pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {CATEGORIES.map((cat) => {
            const count = comparisons.filter((c) => c.vsCategory === cat.id).length;
            return (
              <div
                key={cat.id}
                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-center"
              >
                <span className="text-xl block mb-1">{cat.icon}</span>
                <p className="text-xs font-semibold text-gray-700 leading-tight">{cat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{count} comparisons</p>
              </div>
            );
          })}
        </div>

        {/* Filter + grid — client component */}
        <VSFilter
          comparisons={cards}
          categories={CATEGORIES}
          featuredSlugs={FEATURED_SLUGS}
        />

        {/* Trust bar */}
        <div className="border-t border-gray-100 pt-8 mt-12 text-center">
          <p className="text-sm text-gray-400">
            Every comparison is written by a human. No sponsored rankings. No AI-generated verdicts.{" "}
            <Link href="/about" className="text-primary hover:underline">
              Learn about our process →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
