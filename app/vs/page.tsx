import Link from "next/link";
import type { Metadata } from "next";
import { comparisons, getToolById } from "@/lib/tools";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "AI Tool Comparisons (2026) — Honest Side-by-Side Reviews",
  description:
    "Honest, in-depth AI tool comparisons. No sponsored rankings. Real pros, cons, and clear verdicts on which tool wins for your specific use case.",
  alternates: { canonical: "https://stack-pick.com/vs" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://stack-pick.com" },
    { "@type": "ListItem", position: 2, name: "Compare", item: "https://stack-pick.com/vs" },
  ],
};

export default function VSIndexPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {" → "}
          <span className="text-gray-600">Compare</span>
        </nav>

        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            AI Tool Comparisons (2026)
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Honest, side-by-side comparisons. No sponsored rankings. Clear verdicts on which tool wins — and why.
          </p>
        </div>

        {/* Comparisons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {comparisons.map((comparison) => {
            const tool1 = getToolById(comparison.tool1Id);
            const tool2 = getToolById(comparison.tool2Id);
            const winner = getToolById(comparison.winner);

            return (
              <Link
                key={comparison.slug}
                href={`/vs/${comparison.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-md transition-all"
              >
                {/* Tools */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                    {tool1?.name}
                  </span>
                  <span className="text-gray-300 font-light text-xl">vs</span>
                  <span className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                    {tool2?.name}
                  </span>
                </div>

                {/* Winner badge */}
                {winner && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-400">Our pick:</span>
                    <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-0.5 rounded-full">
                      {winner.name}
                    </span>
                  </div>
                )}

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {comparison.intro.split(".")[0]}.
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Updated {comparison.lastUpdated}</span>
                  <span className="text-primary text-sm font-medium group-hover:underline">
                    Read comparison →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            More coming soon
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Want a specific comparison?
          </h2>
          <p className="text-gray-500 mb-5">
            We add new comparisons every week. Request one or get notified when it&apos;s live.
          </p>
          <a
            href="mailto:hello@stack-pick.com?subject=Comparison Request"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Request a comparison →
          </a>
        </div>
      </div>
    </>
  );
}
