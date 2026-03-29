import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getBestOfBySlug, getToolById, getComparisonBySlug, bestofs } from "@/lib/tools";
import { generateBestOfMetadata } from "@/lib/seo";
import SchemaMarkup from "@/components/SchemaMarkup";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bestofs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bestof = getBestOfBySlug(slug);
  if (!bestof) return {};
  return generateBestOfMetadata(bestof.title, bestof.metaDescription, slug);
}

export default async function BestOfPage({ params }: Props) {
  const { slug } = await params;
  const bestof = getBestOfBySlug(slug);
  if (!bestof) notFound();

  const tools = bestof.toolIds.map((id) => getToolById(id)).filter(Boolean);
  const relatedComparisons = (bestof.relatedComparisons || [])
    .map((slug) => getComparisonBySlug(slug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bestof.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stack-pick.com" },
      { "@type": "ListItem", position: 2, name: "Best Tools", item: "https://stack-pick.com/best" },
      { "@type": "ListItem", position: 3, name: bestof.title },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {" → "}
          <Link href="/best" className="hover:text-primary transition-colors">Best Tools</Link>
          {" → "}
          <span className="text-gray-600">{bestof.title}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              Ranked & Reviewed
            </span>
            <span className="text-xs text-gray-400">Updated {bestof.lastUpdated}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {bestof.title}
          </h1>
          <p className="text-lg text-gray-500">{bestof.intro}</p>
        </div>

        {/* Quick picks */}
        <section className="mb-12">
          <div className="bg-primary-light border border-primary/20 rounded-xl p-6">
            <p className="text-xs font-bold text-primary uppercase tracking-wide mb-4">
              Quick Picks — Best For Each Use Case
            </p>
            <div className="space-y-3">
              {bestof.quickPicks.map((pick) => {
                const tool = getToolById(pick.toolId);
                return (
                  <div key={pick.useCase} className="flex items-start gap-3">
                    <span className="text-primary font-bold text-sm shrink-0 min-w-[120px]">
                      {pick.useCase}:
                    </span>
                    <span className="text-gray-700 text-sm">
                      <strong>{tool?.name}</strong> — {pick.reason}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tool cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Tools Reviewed
          </h2>
          <div className="space-y-6">
            {tools.map((tool, index) => {
              if (!tool) return null;
              return (
                <div
                  key={tool.id}
                  className="border border-gray-200 rounded-xl p-6 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-200">
                        #{index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-gray-500">{tool.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{tool.rating}</span>
                      <span className="text-gray-400 text-sm">/10</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Pros</p>
                      <ul className="space-y-1">
                        {tool.pros.slice(0, 3).map((pro) => (
                          <li key={pro} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-green-500 shrink-0">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Cons</p>
                      <ul className="space-y-1">
                        {tool.cons.slice(0, 3).map((con) => (
                          <li key={con} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-red-400 shrink-0">✗</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{tool.pricing}</span>
                      {tool.hasFree && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                          Free tier
                        </span>
                      )}
                    </div>
                    <a
                      href={tool.affiliateUrl || tool.website}
                      target="_blank"
                      rel={tool.affiliateUrl ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                      className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Try {tool.hasFree ? "free" : "now"} →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Who should NOT use these */}
        <section className="mb-12">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">
              Honest Warning
            </p>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Who should NOT use these tools
            </h2>
            <p className="text-gray-700 text-sm">{bestof.whoShouldNotUseThese}</p>
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Verdict</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">{bestof.verdict}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {bestof.faq.map((item) => (
              <div key={item.question} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compare these tools head-to-head */}
        {relatedComparisons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Compare These Tools Head-to-Head
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedComparisons.map((c) => {
                if (!c) return null;
                const t1 = getToolById(c.tool1Id);
                const t2 = getToolById(c.tool2Id);
                const winner = getToolById(c.winner);
                return (
                  <Link
                    key={c.slug}
                    href={`/vs/${c.slug}`}
                    className="group border border-gray-200 rounded-xl p-5 hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {t1?.name}
                      </span>
                      <span className="text-gray-300">vs</span>
                      <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {t2?.name}
                      </span>
                    </div>
                    {winner && (
                      <p className="text-xs text-gray-400 mb-3">
                        Our pick: <span className="text-primary font-semibold">{winner.name}</span>
                      </p>
                    )}
                    <span className="text-primary text-sm font-medium group-hover:underline">
                      Read comparison →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
