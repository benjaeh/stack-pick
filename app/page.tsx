import Link from "next/link";
import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import NewsletterForm from "@/components/NewsletterForm";
import { generateHomepageMetadata, getWebsiteSchema, getOrganizationSchema } from "@/lib/seo";
import { tools, comparisons, getToolById, getComparisonBySlug } from "@/lib/tools";

export const metadata: Metadata = generateHomepageMetadata();

// ─── POPULAR COMPARISONS (6 featured, ordered by priority) ───────────────────
const FEATURED_COMPARISON_SLUGS = [
  "chatgpt-vs-claude",
  "chatgpt-vs-gemini",
  "notion-vs-clickup",
  "monday-vs-clickup",
  "midjourney-vs-dall-e",
  "grammarly-vs-quillbot",
];

// ─── QUICK PICKS for best-ai-tools-2026 section ──────────────────────────────
const TOP_PICKS = [
  { toolId: "chatgpt", label: "Best overall", reason: "Most versatile — writing, coding, images in one place" },
  { toolId: "claude",  label: "Best for documents", reason: "1M token context — nothing else comes close" },
  { toolId: "midjourney", label: "Best for images", reason: "Still the highest image quality, period" },
];

// ─── START HERE cards (intent-based navigation) ──────────────────────────────
const START_HERE = [
  { icon: "🧠", intent: "I need an AI assistant", href: "/vs/chatgpt-vs-claude", cta: "ChatGPT vs Claude" },
  { icon: "✍️", intent: "I need AI writing help", href: "/best/ai-writing-tools", cta: "Best AI writing tools" },
  { icon: "📋", intent: "I need to manage projects", href: "/best/project-management-tools", cta: "Best PM tools" },
  { icon: "🎨", intent: "I need to create images", href: "/best/ai-image-tools", cta: "Best image AI" },
];

// ─── BEST FOR (persona cards) ────────────────────────────────────────────────
const BEST_FOR = [
  { icon: "💼", persona: "Freelancers", href: "/best/ai-tools-for-freelancers" },
  { icon: "🎓", persona: "Students", href: "/best/ai-tools-for-students" },
  { icon: "✍️", persona: "Writers", href: "/best/ai-writing-tools" },
  { icon: "📋", persona: "Project managers", href: "/best/project-management-tools" },
  { icon: "🎨", persona: "Creatives", href: "/best/ai-image-tools" },
];

export default function HomePage() {
  const featuredComparisons = FEATURED_COMPARISON_SLUGS
    .map((slug) => {
      const comparison = getComparisonBySlug(slug);
      if (!comparison) return null;
      const tool1 = getToolById(comparison.tool1Id);
      const tool2 = getToolById(comparison.tool2Id);
      const winner = comparison.winner === comparison.tool1Id ? tool1 : tool2;
      if (!tool1 || !tool2) return null;
      return { comparison, tool1, tool2, winner };
    })
    .filter(Boolean) as {
      comparison: ReturnType<typeof getComparisonBySlug> & object;
      tool1: NonNullable<ReturnType<typeof getToolById>>;
      tool2: NonNullable<ReturnType<typeof getToolById>>;
      winner: ReturnType<typeof getToolById>;
    }[];

  const topPicks = TOP_PICKS.map((p) => ({
    ...p,
    tool: getToolById(p.toolId),
  }));

  return (
    <>
      <SchemaMarkup schema={[getWebsiteSchema(), getOrganizationSchema()]} />

      {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Stop wasting time testing AI tools.
            <br />
            <span className="text-primary">We show you what works — and what doesn&apos;t.</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Honest comparisons. Real limitations. Clear verdicts.{" "}
            <strong className="text-gray-700">No sponsored rankings — ever.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/best/best-ai-tools-2026"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              See what&apos;s best for you →
            </Link>
            <Link
              href="/vs"
              className="border border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Compare tools →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. TRUST BAR ────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
            <div>
              <span className="text-2xl font-bold text-primary">{tools.length}</span>
              <p className="text-sm text-gray-500">tools compared</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <span className="text-2xl font-bold text-primary">{comparisons.length}</span>
              <p className="text-sm text-gray-500">honest comparisons</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <span className="text-2xl font-bold text-primary">0</span>
              <p className="text-sm text-gray-500">sponsored rankings</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <span className="text-2xl font-bold text-primary">April 2026</span>
              <p className="text-sm text-gray-500">last updated</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. START HERE ───────────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Not sure where to start?
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Tell us what you need — we&apos;ll point you in the right direction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {START_HERE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col gap-3 bg-white border border-gray-200 hover:border-primary hover:shadow-md rounded-xl p-5 transition-all"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors leading-snug">
                  {item.intent}
                </p>
                <span className="text-xs text-primary font-medium">
                  {item.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. BEST AI TOOLS 2026 (anchor section) ──────────────────────── */}
      <section className="py-14 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                Editor&apos;s Choice
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-3">
                Best AI Tools in 2026
              </h2>
              <p className="text-gray-500 mb-6">
                Tested. Ranked. Brutally honest. Every tool that made the list earned it — and we explain exactly why the others didn&apos;t.
              </p>
              <div className="space-y-3 mb-6">
                {topPicks.map((pick) => (
                  <div key={pick.toolId} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-primary bg-primary-light px-2 py-1 rounded-full shrink-0 mt-0.5">
                      {pick.label}
                    </span>
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{pick.tool?.name}</span>
                      <span className="text-gray-500 text-sm"> — {pick.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/best/best-ai-tools-2026"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                See full rankings →
              </Link>
            </div>

            {/* Side stat */}
            <div className="md:w-56 bg-white border border-gray-200 rounded-xl p-6 text-center shrink-0">
              <p className="text-4xl font-bold text-primary mb-1">{tools.length}</p>
              <p className="text-sm text-gray-500 mb-4">tools tested and ranked</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400">
                  Every tool tested by hand. No AI-generated reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. POPULAR COMPARISONS ──────────────────────────────────────── */}
      <section id="comparisons" className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Popular comparisons
          </h2>
          <p className="text-gray-500 text-center mb-10">
            The most-asked questions, answered honestly. No fence-sitting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredComparisons.map(({ comparison, tool1, tool2, winner }) => (
              <Link
                key={comparison!.slug}
                href={`/vs/${comparison!.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {tool1.name}
                  </span>
                  <span className="text-gray-300 text-sm font-medium">vs</span>
                  <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {tool2.name}
                  </span>
                </div>
                {winner && (
                  <div className="mb-2">
                    <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full border border-green-200">
                      Winner: {winner.name}
                    </span>
                  </div>
                )}
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                  {comparison!.winnerReason}
                </p>
                <span className="text-xs text-primary font-semibold group-hover:underline">
                  Read comparison →
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/vs"
              className="text-sm font-semibold text-primary hover:underline"
            >
              See all {comparisons.length} comparisons →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. BEST FOR (persona cards) ──────────────────────────────────── */}
      <section id="categories" className="py-14 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Best tools for your workflow
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Different workflows need different tools. Find what fits yours.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {BEST_FOR.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center text-center gap-2 bg-white border border-gray-200 rounded-xl p-5 hover:border-primary hover:shadow-md transition-all"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                  {item.persona}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/best" className="text-sm font-semibold text-primary hover:underline">
              Browse all categories →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. AI vs AI CALLOUT ────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-primary/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                Exclusive Feature
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
                Same prompt. Different AI.{" "}
                <span className="text-primary">See the difference.</span>
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                We gave ChatGPT, Claude, and Gemini the exact same prompts. The results are side-by-side so you can judge for yourself — before you spend a dollar.
              </p>
              <Link
                href="/compare"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                See real AI outputs →
              </Link>
            </div>
            <div className="shrink-0 hidden md:flex flex-col gap-2 text-sm text-gray-500">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 font-medium text-gray-700">
                🤖 ChatGPT (GPT-5.4)
              </div>
              <div className="bg-primary-light border border-primary/20 rounded-lg px-4 py-2 font-medium text-primary">
                ✦ Claude (Sonnet 4.6)
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 font-medium text-gray-700">
                ◆ Gemini (2.5 Flash)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. NEWSLETTER ──────────────────────────────────────────────── */}
      <section id="newsletter" className="py-16 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Get the honest AI tool verdict every week.
          </h2>
          <p className="text-gray-500 mb-6">
            Every week: what&apos;s worth paying for, what&apos;s overhyped, and what changed.{" "}
            <strong>No spam.</strong>
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
