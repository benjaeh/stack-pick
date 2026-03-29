import Link from "next/link";
import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import NewsletterForm from "@/components/NewsletterForm";
import { generateHomepageMetadata, getWebsiteSchema, getOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = generateHomepageMetadata();

const featuredCategories = [
  {
    icon: "✍️",
    title: "AI Writing",
    description:
      "ChatGPT vs Claude, Jasper, Copy.ai, Writesonic and more. Find the best AI writing tool for your workflow.",
    href: "/best/ai-writing-tools",
    comparisons: [
      { label: "ChatGPT vs Claude", href: "/vs/chatgpt-vs-claude" },
      { label: "Jasper vs Copy.ai", href: "/vs/jasper-vs-copy-ai" },
    ],
  },
  {
    icon: "🎨",
    title: "Image AI",
    description:
      "Midjourney, DALL-E 3, Adobe Firefly, Stable Diffusion. Which image generator is worth your money?",
    href: "/best/ai-image-tools",
    comparisons: [
      { label: "Best Image AI Tools", href: "/best/ai-image-tools" },
    ],
  },
  {
    icon: "🧠",
    title: "Productivity",
    description:
      "Notion, Obsidian, Mem, Logseq. Build your ultimate second brain with the right tool.",
    href: "/best/productivity-tools",
    comparisons: [
      { label: "Notion vs Obsidian", href: "/vs/notion-vs-obsidian" },
    ],
  },
];

const moreCategories = [
  { icon: "📋", title: "Project Management", href: "/best/project-management-tools" },
  { icon: "🎬", title: "AI Video", href: "/best/ai-video-tools" },
  { icon: "📊", title: "All Categories", href: "/best" },
];

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={[getWebsiteSchema(), getOrganizationSchema()]} />

      {/* Hero */}
      <section className="bg-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Find the best AI tools
            <br />
            <span className="text-primary">for your workflow.</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Honest comparisons. No sponsored rankings. Updated weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/vs/chatgpt-vs-claude"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Compare tools →
            </Link>
            <a
              href="#categories"
              className="border border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              See all categories ↓
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 border-y border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
            <div>
              <span className="text-2xl font-bold text-primary">25</span>
              <p className="text-sm text-gray-500">tools compared</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <span className="text-2xl font-bold text-primary">0</span>
              <p className="text-sm text-gray-500">sponsored rankings</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div>
              <span className="text-2xl font-bold text-primary">March 2026</span>
              <p className="text-sm text-gray-500">last updated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section id="categories" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Browse by category
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Every tool tested. Every recommendation backed by real usage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.comparisons.map((comp) => (
                    <Link
                      key={comp.href}
                      href={comp.href}
                      className="text-xs bg-primary-light text-primary hover:bg-primary hover:text-white px-2 py-1 rounded-full font-medium transition-colors"
                    >
                      {comp.label}
                    </Link>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More categories */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {moreCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="flex items-center gap-3 bg-gray-50 hover:bg-primary-light border border-gray-100 hover:border-primary rounded-lg px-4 py-3 transition-all group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium text-gray-700 group-hover:text-primary text-sm transition-colors">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured comparison */}
      <section className="py-12 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            Most Popular Comparison
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ChatGPT vs Claude (2026)
          </h2>
          <p className="text-gray-500 mb-6">
            The two most popular AI assistants, honestly compared. Which one is
            actually better for your workflow?
          </p>
          <Link
            href="/vs/chatgpt-vs-claude"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Read the full comparison →
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Stack Pick Weekly Picks
          </h2>
          <p className="text-gray-500 mb-6">
            Every week: 3 tools compared, 1 deal you shouldn&apos;t miss.{" "}
            <strong>No spam.</strong>
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
