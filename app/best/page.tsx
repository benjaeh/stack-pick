import Link from "next/link";
import type { Metadata } from "next";
import { bestofs } from "@/lib/tools";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Best AI Tools by Category (2026) — Ranked & Reviewed",
  description:
    "The best AI tools in every category, honestly ranked and reviewed. No sponsored rankings. Real pros, cons, and clear verdicts.",
  alternates: { canonical: "https://stack-pick.com/best" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://stack-pick.com" },
    { "@type": "ListItem", position: 2, name: "Best Tools", item: "https://stack-pick.com/best" },
  ],
};

const categoryMeta: Record<string, { icon: string; label: string }> = {
  "ai-writing": { icon: "✍️", label: "AI Writing" },
  "image-ai": { icon: "🎨", label: "Image AI" },
  "productivity": { icon: "🧠", label: "Productivity" },
  "project-management": { icon: "📋", label: "Project Management" },
  "ai-video": { icon: "🎬", label: "AI Video" },
};

export default function BestIndexPage() {
  // Group bestofs by category
  const grouped = bestofs.reduce<Record<string, typeof bestofs>>((acc, b) => {
    if (!acc[b.category]) acc[b.category] = [];
    acc[b.category].push(b);
    return acc;
  }, {});

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {" → "}
          <span className="text-gray-600">Best Tools</span>
        </nav>

        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Best AI Tools by Category (2026)
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Every tool tested. Every recommendation backed by real usage. No sponsored rankings.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {Object.entries(grouped).map(([category, pages]) => {
            const meta = categoryMeta[category] || { icon: "🛠️", label: category };
            return (
              <section key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{meta.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{meta.label}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/best/${page.slug}`}
                      className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-primary hover:shadow-md transition-all"
                    >
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {page.intro.split(".")[0]}.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {page.quickPicks.slice(0, 3).map((pick) => (
                            <span
                              key={pick.toolId}
                              className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                            >
                              {pick.toolId.replace(/-/g, " ")}
                            </span>
                          ))}
                        </div>
                        <span className="text-primary text-sm font-medium group-hover:underline">
                          See rankings →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-primary-light border border-primary/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-gray-500 mb-5">
            We add new categories and rankings every week. Request a category or comparison.
          </p>
          <a
            href="mailto:hello@stack-pick.com?subject=Category Request"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Request a category →
          </a>
        </div>
      </div>
    </>
  );
}
