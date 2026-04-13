import Link from "next/link";
import type { Metadata } from "next";
import { bestofs } from "@/lib/tools";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Best AI Tools by Category (2026) — Honest Reviews | Stack Pick",
  description:
    "Every AI tool category reviewed and ranked honestly. AI Writing, Image AI, Productivity, Project Management, AI Video — with clear verdicts and real pros and cons.",
  openGraph: {
    title: "Best AI Tools by Category (2026) — Stack Pick",
    description:
      "Every tool tested. Clear verdicts. No fluff. Find the best AI tools for your workflow.",
    url: "https://stack-pick.com/best",
  },
};

// ── Thematic grouping ────────────────────────────────────────────────────────
const ANCHOR_SLUG = "best-ai-tools-2026";

const RANKED_LISTS = [
  "ai-writing-tools",
  "ai-image-tools",
  "ai-video-tools",
  "productivity-tools",
  "project-management-tools",
  "best-free-ai-image-generators",
  "free-ai-writing-tools",
  "best-ai-video-tools-youtube",
];

const BY_AUDIENCE = [
  "ai-tools-for-freelancers",
  "ai-tools-for-students",
  "best-ai-tools-for-marketing",
  "best-ai-tools-for-content-creators",
  "best-ai-tools-for-bloggers",
  "best-tools-for-remote-teams",
];

const ALTERNATIVES = [
  "notion-alternatives",
  "chatgpt-alternatives",
  "clickup-alternatives",
  "asana-alternatives",
  "monday-alternatives",
  "jasper-alternatives",
  "grammarly-alternatives",
  "midjourney-alternatives",
];

const categoryMeta: Record<string, { icon: string; label: string }> = {
  "ai-writing":         { icon: "✍️",  label: "AI Writing" },
  "image-ai":           { icon: "🎨",  label: "Image AI" },
  "productivity":       { icon: "🧠",  label: "Productivity" },
  "project-management": { icon: "📋",  label: "Project Management" },
  "ai-video":           { icon: "🎬",  label: "AI Video" },
};

function getPage(slug: string) {
  return bestofs.find((b) => b.slug === slug);
}

interface BestOfCardProps {
  slug: string;
  size?: "normal" | "small";
}

function BestOfCard({ slug, size = "normal" }: BestOfCardProps) {
  const page = getPage(slug);
  if (!page) return null;
  const meta = categoryMeta[page.category] ?? { icon: "🛠️", label: page.category };
  const isAlternatives = slug.endsWith("-alternatives");

  if (size === "small") {
    return (
      <Link
        href={`/best/${slug}`}
        className="group flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 hover:border-primary hover:shadow-sm transition-all bg-white"
      >
        <span className="text-xl shrink-0">{isAlternatives ? "🔄" : meta.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors truncate">
            {page.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{page.toolIds.length} tools</p>
        </div>
        <span className="text-primary text-xs font-medium shrink-0">→</span>
      </Link>
    );
  }

  return (
    <Link
      href={`/best/${slug}`}
      className="group border border-gray-200 rounded-xl p-5 hover:border-primary hover:shadow-md transition-all bg-white flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{isAlternatives ? "🔄" : meta.icon}</span>
        <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
          {meta.label}
        </span>
      </div>
      <h2 className="font-bold text-gray-900 text-base mb-2 group-hover:text-primary transition-colors leading-snug flex-1">
        {page.title}
      </h2>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-400">{page.toolIds.length} tools reviewed</span>
        <span className="text-xs text-primary font-semibold group-hover:underline">See rankings →</span>
      </div>
    </Link>
  );
}

export default function BestIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stack-pick.com" },
      { "@type": "ListItem", position: 2, name: "Best Tools", item: "https://stack-pick.com/best" },
    ],
  };

  const anchorPage = getPage(ANCHOR_SLUG);

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {" → "}
          <span className="text-gray-600">Best Tools</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              {bestofs.length} lists
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Best AI Tools by Category (2026)
          </h1>
          <p className="text-lg text-gray-500">
            Every tool tested. Clear verdicts. No fluff. Find the right tool for your workflow — without wasting money on the wrong one.
          </p>
        </div>

        {/* ── ANCHOR PAGE ───────────────────────────────────────────────── */}
        {anchorPage && (
          <section className="mb-12">
            <Link
              href={`/best/${ANCHOR_SLUG}`}
              className="group block bg-primary-light border border-primary/20 rounded-2xl p-7 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">
                    Editor&apos;s Choice
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-2 group-hover:text-primary transition-colors">
                    {anchorPage.title}
                  </h2>
                  <p className="text-gray-600 text-sm max-w-xl leading-relaxed">
                    {anchorPage.intro.slice(0, 160)}…
                  </p>
                </div>
                <div className="shrink-0 text-center hidden sm:block">
                  <p className="text-3xl font-bold text-primary">{anchorPage.toolIds.length}</p>
                  <p className="text-xs text-gray-500 mt-0.5">tools reviewed</p>
                </div>
              </div>
              <span className="inline-block mt-5 text-sm font-bold text-primary group-hover:underline">
                See the full ranked list →
              </span>
            </Link>
          </section>
        )}

        {/* ── RANKED LISTS ──────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-gray-900">Best tools by category</h2>
            <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
              {RANKED_LISTS.length} lists
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {RANKED_LISTS.map((slug) => (
              <BestOfCard key={slug} slug={slug} />
            ))}
          </div>
        </section>

        {/* ── BY AUDIENCE ───────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-gray-900">Best tools for your workflow</h2>
            <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
              {BY_AUDIENCE.length} lists
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BY_AUDIENCE.map((slug) => (
              <BestOfCard key={slug} slug={slug} />
            ))}
          </div>
        </section>

        {/* ── ALTERNATIVES ──────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-gray-900">Looking for alternatives?</h2>
            <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
              {ALTERNATIVES.length} guides
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            If a specific tool isn&apos;t working for you, here&apos;s what to switch to — with honest reasons why.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALTERNATIVES.map((slug) => (
              <BestOfCard key={slug} slug={slug} size="small" />
            ))}
          </div>
        </section>

        {/* Trust bar */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-400">
            Every ranking is based on real testing. No paid placements. No AI-generated reviews.{" "}
            <Link href="/about" className="text-primary hover:underline">
              Learn about our process →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
