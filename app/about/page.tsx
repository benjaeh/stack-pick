import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Stack Pick — Our Mission & Affiliate Disclosure",
  description:
    "Learn about Stack Pick, how we review AI tools, our editorial standards, and our affiliate disclosure policy.",
  alternates: { canonical: "https://stack-pick.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        {" → "}
        <span className="text-gray-600">About</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">About Stack Pick</h1>
      <p className="text-xl text-gray-500 mb-10">
        Honest AI tool comparisons to help you pick the right software for your workflow.
      </p>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <div className="prose text-gray-600 space-y-4">
          <p>
            Stack Pick was built out of frustration. Every AI tool comparison site either
            pushes sponsored rankings, uses AI to write generic reviews, or just lists
            features without telling you what actually matters.
          </p>
          <p>
            We do things differently. Every tool on Stack Pick has been personally tested.
            Every comparison includes what a tool does NOT do well and who should NOT use it.
            No tool pays to rank higher. No AI writes our reviews.
          </p>
          <p>
            The goal is simple: save you time and money by giving you the honest information
            you need to pick the right tool for your specific workflow.
          </p>
        </div>
      </section>

      {/* How we review */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Review Tools</h2>
        <div className="space-y-4">
          {[
            {
              step: "1",
              title: "We actually use the tools",
              description:
                "Every tool reviewed on Stack Pick has been tested for real-world use cases — not just feature specs scraped from marketing pages.",
            },
            {
              step: "2",
              title: "We highlight limitations honestly",
              description:
                "Every review includes a dedicated section on what the tool does NOT do well and who should NOT use it. This is non-negotiable.",
            },
            {
              step: "3",
              title: "We give a clear verdict",
              description:
                "No wishy-washy 'it depends' answers. We tell you which tool wins and why, with specific use case recommendations.",
            },
            {
              step: "4",
              title: "We keep data updated",
              description:
                "Prices and features change. Every page shows a 'Last Updated' date so you know the information is current.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <span className="text-2xl font-bold text-primary/20 shrink-0">
                {item.step}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Built This</h2>
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-gray-600">
            Stack Pick is built and maintained by{" "}
            <strong className="text-gray-900">Ben Escalante Huber</strong>, a solo founder
            based in Sydney, Australia. It&apos;s a one-person operation — every review,
            every comparison, every line of code is done by Ben.
          </p>
          <p className="text-gray-600 mt-3">
            Questions? Feedback? Found outdated information?{" "}
            <a
              href="mailto:hello@stack-pick.com"
              className="text-primary hover:underline font-medium"
            >
              hello@stack-pick.com
            </a>
          </p>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Affiliate Disclosure
        </h2>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
          <p className="text-gray-700 mb-3">
            <strong>Stack Pick earns a commission when you sign up through our
            affiliate links.</strong> This never influences our ratings, rankings,
            or editorial decisions. We only recommend tools we have personally tested.
          </p>
          <p className="text-gray-700 mb-3">
            Affiliate links are clearly marked throughout the site. If a tool does not
            have an affiliate program, we still review and recommend it if it&apos;s
            genuinely good — our editorial process is independent of monetization.
          </p>
          <p className="text-gray-700">
            This disclosure is in compliance with the FTC&apos;s guidelines on endorsements
            and testimonials, and applicable Australian Consumer Law requirements.
          </p>
        </div>
      </section>

      {/* Editorial standards */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Editorial Standards</h2>
        <ul className="space-y-3">
          {[
            "We never accept payment to change our rankings or ratings",
            "We never publish AI-generated reviews or opinions",
            "We always disclose when links are affiliate links",
            "We always show the 'Last Updated' date on every page",
            "We always include 'What it does NOT do well' in every review",
            "We always include 'Who should NOT use this tool' in every comparison",
          ].map((standard) => (
            <li key={standard} className="flex items-start gap-3">
              <span className="text-primary font-bold shrink-0">✓</span>
              <span className="text-gray-600 text-sm">{standard}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="bg-primary-light border border-primary/20 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Get in Touch</h2>
        <p className="text-gray-600 text-sm mb-4">
          Tool suggestions, corrections, partnership inquiries, or just to say hi.
        </p>
        <a
          href="mailto:hello@stack-pick.com"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
        >
          hello@stack-pick.com
        </a>
      </section>
    </div>
  );
}
