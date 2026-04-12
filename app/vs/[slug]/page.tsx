import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getComparisonBySlug, getToolById, comparisons, getRelatedBestOfs } from "@/lib/tools";
import { generateComparisonMetadata } from "@/lib/seo";
import SchemaMarkup from "@/components/SchemaMarkup";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};
  return generateComparisonMetadata(
    comparison.title,
    comparison.metaDescription,
    slug
  );
}

export default async function VSPage({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const tool1 = getToolById(comparison.tool1Id);
  const tool2 = getToolById(comparison.tool2Id);
  if (!tool1 || !tool2) notFound();

  const winner = comparison.winner === tool1.id ? tool1 : tool2;

  // Prefer comparisons that share a tool with the current page
  const sameToolComparisons = comparisons.filter(
    (c) =>
      c.slug !== slug &&
      (c.tool1Id === comparison.tool1Id ||
        c.tool2Id === comparison.tool1Id ||
        c.tool1Id === comparison.tool2Id ||
        c.tool2Id === comparison.tool2Id)
  );
  const otherComparisons =
    sameToolComparisons.length >= 2
      ? sameToolComparisons.slice(0, 3)
      : [
          ...sameToolComparisons,
          ...comparisons
            .filter(
              (c) => c.slug !== slug && !sameToolComparisons.includes(c)
            )
            .slice(0, 3 - sameToolComparisons.length),
        ];
  const relatedBestOfs = getRelatedBestOfs(comparison.tool1Id, comparison.tool2Id);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faq.map((item) => ({
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
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://stack-pick.com/vs" },
      { "@type": "ListItem", position: 3, name: comparison.title },
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
          <Link href="/vs" className="hover:text-primary transition-colors">Compare</Link>
          {" → "}
          <span className="text-gray-600">{tool1.name} vs {tool2.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              Comparison
            </span>
            <span className="text-xs text-gray-400">Updated {comparison.lastUpdated}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {comparison.title}
          </h1>
          <p className="text-lg text-gray-500 mb-6">{comparison.intro}</p>

          {/* Tool CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            {tool1.affiliateUrl ? (
              <a
                href={tool1.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 text-center border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-semibold px-4 py-3 rounded-lg transition-all text-sm"
              >
                Try {tool1.name} →
              </a>
            ) : (
              <a
                href={tool1.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-semibold px-4 py-3 rounded-lg transition-all text-sm"
              >
                Visit {tool1.name} →
              </a>
            )}
            {tool2.affiliateUrl ? (
              <a
                href={tool2.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-3 rounded-lg transition-colors text-sm"
              >
                Try {tool2.name} →
              </a>
            ) : (
              <a
                href={tool2.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-3 rounded-lg transition-colors text-sm"
              >
                Visit {tool2.name} →
              </a>
            )}
          </div>
        </div>

        {/* Quick verdict box */}
        <div className="bg-primary-light border border-primary/20 rounded-xl p-6 mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
            Our Verdict
          </p>
          <p className="text-lg font-semibold text-gray-900 mb-1">
            Winner: <span className="text-primary">{winner.name}</span>
          </p>
          <p className="text-gray-600">{comparison.winnerReason}</p>
        </div>

        {/* Comparison table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {tool1.name} vs {tool2.name}: Quick Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 w-1/3">Feature</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">{tool1.name}</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">{tool2.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-500 font-medium">Pricing</td>
                  <td className="px-4 py-3 text-gray-700">{tool1.pricing}</td>
                  <td className="px-4 py-3 text-gray-700">{tool2.pricing}</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-500 font-medium">Free Tier</td>
                  <td className="px-4 py-3">{tool1.hasFree ? <span className="text-green-600 font-medium">✓ Yes</span> : <span className="text-red-500">✗ No</span>}</td>
                  <td className="px-4 py-3">{tool2.hasFree ? <span className="text-green-600 font-medium">✓ Yes</span> : <span className="text-red-500">✗ No</span>}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-500 font-medium">Rating</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">{tool1.rating}/10</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">{tool2.rating}/10</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-500 font-medium">Best For</td>
                  <td className="px-4 py-3 text-gray-700">{tool1.bestFor}</td>
                  <td className="px-4 py-3 text-gray-700">{tool2.bestFor}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool 1 */}
            <div className={`border rounded-xl p-5 ${comparison.winner === tool1.id ? 'border-primary/30 bg-primary-light/30' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold text-gray-900 text-lg">{tool1.name}</h3>
                {comparison.winner === tool1.id && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-semibold">Winner</span>
                )}
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Pros</p>
                <ul className="space-y-1">
                  {comparison.tool1Pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Cons</p>
                <ul className="space-y-1">
                  {comparison.tool1Cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tool 2 */}
            <div className={`border rounded-xl p-5 ${comparison.winner === tool2.id ? 'border-primary/30 bg-primary-light/30' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold text-gray-900 text-lg">{tool2.name}</h3>
                {comparison.winner === tool2.id && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-semibold">Winner</span>
                )}
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Pros</p>
                <ul className="space-y-1">
                  {comparison.tool2Pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Cons</p>
                <ul className="space-y-1">
                  {comparison.tool2Cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5 mb-12">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Our pick: <span className="text-primary">{winner.name}</span>
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {winner.hasFree ? "Free tier available — no credit card required" : `Plans from $${winner.startingPrice}/mo`}
            </p>
          </div>
          <a
            href={winner.affiliateUrl || winner.website}
            target="_blank"
            rel={winner.affiliateUrl ? "noopener noreferrer sponsored" : "noopener noreferrer"}
            className="shrink-0 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            Try {winner.name} {winner.hasFree ? "free" : "now"} →
          </a>
        </div>

        {/* What it does NOT do well — Radical Honesty */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Honest Limitations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">
                What {tool1.name} does NOT do well
              </p>
              <p className="text-gray-700 text-sm">{comparison.tool1NotGoodAt}</p>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">
                What {tool2.name} does NOT do well
              </p>
              <p className="text-gray-700 text-sm">{comparison.tool2NotGoodAt}</p>
            </div>
          </div>
        </section>

        {/* Who should NOT use each tool */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Who Should NOT Use Each Tool
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">
                Don&apos;t use {tool1.name} if...
              </p>
              <p className="text-gray-700 text-sm">{comparison.whoShouldNotUseTool1}</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">
                Don&apos;t use {tool2.name} if...
              </p>
              <p className="text-gray-700 text-sm">{comparison.whoShouldNotUseTool2}</p>
            </div>
          </div>
        </section>

        {/* /compare callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary/20 bg-primary-light/30 rounded-xl px-5 py-4 mb-12">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">New</p>
            <p className="text-sm text-gray-700">
              Want to see <strong>{tool1.name}</strong> and <strong>{tool2.name}</strong> answer the exact same prompt?
            </p>
          </div>
          <Link
            href="/compare"
            className="shrink-0 border border-primary text-primary font-semibold text-sm px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
          >
            See real outputs →
          </Link>
        </div>

        {/* Use cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best For: Use Case Breakdown
          </h2>
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Use Case</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Winner</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Why</th>
                </tr>
              </thead>
              <tbody>
                {comparison.useCases.map((uc, i) => {
                  const winnerTool = uc.winner === tool1.id ? tool1 : tool2;
                  return (
                    <tr key={uc.useCase} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 text-gray-700 font-medium">{uc.useCase}</td>
                      <td className="px-4 py-3">
                        <span className="text-primary font-semibold">{winnerTool.name}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{uc.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Full verdict */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Verdict: {tool1.name} vs {tool2.name}
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">{comparison.verdict}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {comparison.faq.map((item) => (
              <div key={item.question} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tool profile links */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href={`/tools/${tool1.slug}`}
            className="text-sm text-gray-500 hover:text-primary hover:underline transition-colors"
          >
            Full {tool1.name} review →
          </Link>
          <span className="text-gray-200">·</span>
          <Link
            href={`/tools/${tool2.slug}`}
            className="text-sm text-gray-500 hover:text-primary hover:underline transition-colors"
          >
            Full {tool2.name} review →
          </Link>
        </div>

        {/* Cross-links */}
        {(otherComparisons.length > 0 || relatedBestOfs.length > 0) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherComparisons.map((c) => {
                const t1 = getToolById(c.tool1Id);
                const t2 = getToolById(c.tool2Id);
                return (
                  <Link
                    key={c.slug}
                    href={`/vs/${c.slug}`}
                    className="group border border-gray-200 rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all"
                  >
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Comparison</p>
                    <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {t1?.name} vs {t2?.name} →
                    </p>
                  </Link>
                );
              })}
              {relatedBestOfs.map((b) => (
                <Link
                  key={b.slug}
                  href={`/best/${b.slug}`}
                  className="group border border-gray-200 rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all"
                >
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Best Of</p>
                  <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {b.title} →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="bg-primary-light border border-primary/20 rounded-xl p-8 text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            Our Recommendation
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to try {winner.name}?
          </h2>
          <p className="text-gray-600 mb-5">
            Based on our testing, {winner.name} is the better choice for most users.{" "}
            {winner.hasFree ? "Start free — no credit card required." : `Plans start at $${winner.startingPrice}/mo.`}
          </p>
          <a
            href={winner.affiliateUrl || winner.website}
            target="_blank"
            rel={winner.affiliateUrl ? "noopener noreferrer sponsored" : "noopener noreferrer"}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Try {winner.name} {winner.hasFree ? "for free" : "now"} →
          </a>
          {winner.affiliateUrl && (
            <p className="text-xs text-gray-400 mt-3">
              We earn a commission if you sign up. This doesn&apos;t affect our verdict.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
