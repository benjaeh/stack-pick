import Link from "next/link";
import type { Metadata } from "next";
import { comparisons, getToolById } from "@/lib/tools";
import SchemaMarkup from "@/components/SchemaMarkup";

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

export default function VSIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stack-pick.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://stack-pick.com/vs" },
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
          <span className="text-gray-600">Compare</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              Comparisons
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            AI Tool Comparisons (2026)
          </h1>
          <p className="text-lg text-gray-500">
            Honest, side-by-side comparisons. No sponsored rankings. Clear verdicts on which tool actually fits your workflow.
          </p>
        </div>

        {/* Comparisons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {comparisons.map((comparison) => {
            const tool1 = getToolById(comparison.tool1Id);
            const tool2 = getToolById(comparison.tool2Id);
            const winner = comparison.winner === comparison.tool1Id ? tool1 : tool2;
            if (!tool1 || !tool2) return null;

            return (
              <Link
                key={comparison.slug}
                href={`/vs/${comparison.slug}`}
                className="group border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-md transition-all bg-white"
              >
                {/* Tools */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold text-gray-900 text-lg group-hover:text-primary transition-colors">
                    {tool1.name}
                  </span>
                  <span className="text-gray-400 font-medium">vs</span>
                  <span className="font-semibold text-gray-900 text-lg group-hover:text-primary transition-colors">
                    {tool2.name}
                  </span>
                </div>

                {/* Winner badge */}
                {winner && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full border border-green-200">
                      Winner: {winner.name}
                    </span>
                  </div>
                )}

                {/* Winner reason */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {comparison.winnerReason}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                  Read comparison
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="border-t border-gray-100 pt-8 text-center">
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
