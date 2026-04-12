import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  tools,
  getToolBySlug,
  getToolById,
  getComparisonsForTool,
  getBestOfsByToolId,
} from "@/lib/tools";
import SchemaMarkup from "@/components/SchemaMarkup";
import aiOutputsData from "@/data/ai-outputs.json";

interface Props {
  params: Promise<{ slug: string }>;
}

interface AiOutput {
  id: string;
  promptText: string;
  category: string;
  tools: { toolId: string; model: string; output: string; generatedAt: string }[];
}

const aiOutputs: AiOutput[] = aiOutputsData as AiOutput[];

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Review (2026): Is It Worth It? | Stack Pick`,
    description: `Honest ${tool.name} review — pricing, pros, cons, real limitations, and who should NOT use it. Updated ${tool.lastUpdated}.`,
  };
}

export default async function ToolProfilePage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const toolComparisons = getComparisonsForTool(tool.id).slice(0, 6);
  const toolBestOfs = getBestOfsByToolId(tool.id).slice(0, 4);
  const alternativeTools = (tool.alternatives ?? [])
    .map((id) => getToolById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getToolById>>[];

  // /compare snippet: first prompt where this tool appears
  const comparePrompt = aiOutputs.find((p) =>
    p.tools.some((t) => t.toolId === tool.id)
  );
  const compareOutput = comparePrompt?.tools.find((t) => t.toolId === tool.id);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: tool.name,
      url: tool.website,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: tool.rating,
      bestRating: 10,
    },
    author: {
      "@type": "Organization",
      name: "Stack Pick",
    },
    datePublished: tool.lastUpdated,
    reviewBody: tool.notGoodAt,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stack-pick.com" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://stack-pick.com/tools" },
      { "@type": "ListItem", position: 3, name: tool.name },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[reviewSchema, breadcrumbSchema]} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {" → "}
          <Link href="/best/best-ai-tools-2026" className="hover:text-primary transition-colors">Tools</Link>
          {" → "}
          <span className="text-gray-600">{tool.name}</span>
        </nav>

        {/* ─── 1. HERO + QUICK VERDICT ────────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-primary-light text-primary font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              Honest Review
            </span>
            <span className="text-xs text-gray-400">Updated {tool.lastUpdated}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            {tool.name} Review (2026)
          </h1>
          <p className="text-lg text-gray-500 mb-6">{tool.tagline}</p>

          {/* Quick verdict bar */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-center shrink-0">
              <p className="text-4xl font-bold text-primary">{tool.rating}</p>
              <p className="text-xs text-gray-500 mt-0.5">out of 10</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700">{tool.pricing}</span>
                {tool.hasFree && (
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium border border-green-100">
                    Free tier available
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Best for:</span> {tool.bestFor}
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href={tool.affiliateUrl || tool.website}
                target="_blank"
                rel={tool.affiliateUrl ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm text-center whitespace-nowrap"
              >
                Try {tool.hasFree ? "free" : "now"} →
              </a>
              {toolComparisons.length > 0 && (
                <Link
                  href={`/vs/${toolComparisons[0].slug}`}
                  className="border border-gray-200 hover:border-primary text-gray-600 hover:text-primary font-medium px-5 py-2 rounded-lg transition-colors text-sm text-center whitespace-nowrap"
                >
                  Compare alternatives →
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT IS [TOOL]? ─────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is {tool.name}?</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            {tool.tagline}. It&apos;s primarily used for {tool.bestFor.toLowerCase()}.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Pricing starts at {tool.hasFree ? "free" : `$${tool.startingPrice}/mo`}
            {tool.hasFree && tool.startingPrice > 0 ? `, with paid plans from $${tool.startingPrice}/mo` : ""}.
            Our rating: <strong className="text-primary">{tool.rating}/10</strong>.
          </p>
        </section>

        {/* ─── 3. HONEST LIMITATIONS ──────────────────────────────────────── */}
        <section className="mb-12">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">
              Honest Limitations
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Where {tool.name} falls short
            </h2>
            <p className="text-gray-700 leading-relaxed">{tool.notGoodAt}</p>
          </div>
        </section>

        {/* ─── 4. WHO SHOULD NOT USE ──────────────────────────────────────── */}
        {tool.whoShouldNotUse && (
          <section className="mb-12">
            <div className="border-l-4 border-red-300 bg-red-50 rounded-r-xl px-6 py-5">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">
                Don&apos;t Use {tool.name} If…
              </p>
              <p className="text-gray-700 leading-relaxed">{tool.whoShouldNotUse}</p>
            </div>
          </section>
        )}

        {/* ─── 5. PROS & CONS ─────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-green-100 bg-green-50/50 rounded-xl p-5">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-3">Pros</p>
              <ul className="space-y-2">
                {tool.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-red-100 bg-red-50/50 rounded-xl p-5">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-3">Cons</p>
              <ul className="space-y-2">
                {tool.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 6. PRICING ─────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-lg font-semibold text-gray-900">{tool.pricing}</span>
              {tool.hasFree && (
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium border border-green-100">
                  Free tier available
                </span>
              )}
              {!tool.hasFree && (
                <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full font-medium border border-orange-100">
                  No free plan
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Always verify current pricing on the official site — AI tool pricing changes frequently.
            </p>
            <a
              href={tool.affiliateUrl || tool.website}
              target="_blank"
              rel={tool.affiliateUrl ? "noopener noreferrer sponsored" : "noopener noreferrer"}
              className="inline-block mt-4 text-sm font-semibold text-primary hover:underline"
            >
              See current pricing on {tool.name} →
            </a>
          </div>
        </section>

        {/* ─── /COMPARE SNIPPET (chatgpt, claude, gemini only) ────────────── */}
        {comparePrompt && compareOutput && (
          <section className="mb-12">
            <div className="border border-primary/20 bg-primary-light/20 rounded-xl p-6">
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
                {tool.name} In Action
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                See how {tool.name} responds to a real prompt
              </h2>
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-5 py-4 mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Prompt</p>
                <p className="text-sm text-gray-800 font-medium">&ldquo;{comparePrompt.promptText}&rdquo;</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {tool.name} ({compareOutput.model})
                </p>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{compareOutput.output}</p>
              </div>
              <Link
                href="/compare"
                className="text-sm font-semibold text-primary hover:underline"
              >
                See {tool.name} vs ChatGPT vs Claude on the same prompts →
              </Link>
            </div>
          </section>
        )}

        {/* ─── 7. COMPARE WITH ALTERNATIVES ──────────────────────────────── */}
        {toolComparisons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Compare {tool.name} with alternatives
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Not sure {tool.name} is right for you? See how it stacks up head-to-head.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {toolComparisons.map((c) => {
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
                      <span className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm">
                        {t1?.name}
                      </span>
                      <span className="text-gray-300 text-xs">vs</span>
                      <span className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm">
                        {t2?.name}
                      </span>
                    </div>
                    {winner && (
                      <p className="text-xs text-gray-400 mb-2">
                        Our pick: <span className="text-primary font-semibold">{winner.name}</span>
                      </p>
                    )}
                    <span className="text-xs text-primary font-medium group-hover:underline">
                      Read comparison →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── 8. BEST ALTERNATIVES ───────────────────────────────────────── */}
        {(alternativeTools.length > 0 || toolBestOfs.length > 0) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Best alternatives to {tool.name}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              If {tool.name} isn&apos;t the right fit, here&apos;s where to look instead.
            </p>

            {alternativeTools.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {alternativeTools.map((alt) => (
                  <Link
                    key={alt.id}
                    href={`/tools/${alt.slug}`}
                    className="group flex items-start gap-3 border border-gray-200 rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm">
                        {alt.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{alt.tagline}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-bold text-primary">{alt.rating}/10</span>
                        {alt.hasFree && (
                          <span className="text-xs text-green-600 font-medium">Free tier</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {toolBestOfs.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 mb-3">Also see these lists:</p>
                {toolBestOfs.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/best/${b.slug}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <span>→</span>
                    {b.title}
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ─── 9. FINAL CTA ───────────────────────────────────────────────── */}
        <section className="bg-primary-light border border-primary/20 rounded-xl p-8 text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            Stack Pick Verdict
          </p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ready to try {tool.name}?
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            {tool.hasFree
              ? `Start with the free tier — no credit card required.`
              : `Paid plans start at $${tool.startingPrice}/mo.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={tool.affiliateUrl || tool.website}
              target="_blank"
              rel={tool.affiliateUrl ? "noopener noreferrer sponsored" : "noopener noreferrer"}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Try {tool.name} {tool.hasFree ? "for free" : "now"} →
            </a>
            {toolComparisons.length > 0 && (
              <Link
                href={`/vs/${toolComparisons[0].slug}`}
                className="border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Compare with alternatives →
              </Link>
            )}
          </div>
          {tool.affiliateUrl && (
            <p className="text-xs text-gray-400 mt-4">
              Disclosure: We may earn a commission at no extra cost to you.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
