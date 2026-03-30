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

const categoryMeta: Record<string, { icon: string; label: string }> = {
  "ai-writing": { icon: "✍️", label: "AI Writing" },
  "image-ai": { icon: "🎨", label: "Image AI" },
  productivity: { icon: "🧠", label: "Productivity" },
  "project-management": { icon: "📋", label: "Project Management" },
  "ai-video": { icon: "🎬", label: "AI Video" },
};

export default function BestIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stack-pick.com" },
      { "@type": "ListItem", position: 2, name: "Best Tools", item: "https://stack-pick.com/best" },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema]} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          {" → "}
          <span className="text-gray-600">Best Tools</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              Best Of
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Best AI Tools by Category (2026)
          </h1>
          <p className="text-lg text-gray-500">
            Every tool tested. Clear verdicts. No fluff. Find the right tool for your workflow — without wasting money on the wrong one.
          </p>
        </div>

        {/* Best Of Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {bestofs.map((page) => {
            const meta = categoryMeta[page.category] ?? { icon: "🛠️", label: page.category };

            return (
              <Link
                key={page.slug}
                href={`/best/${page.slug}`}
                className="group border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-md transition-all bg-white"
              >
                {/* Category icon + label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{meta.icon}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
                    {meta.label}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors">
                  {page.title}
                </h2>

                {/* Intro snippet */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {page.intro}
                </p>

                {/* Tool count + CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {page.toolIds.length} tools reviewed
                  </span>
                  <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                    See rankings
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

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
