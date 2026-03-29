import type { Metadata } from "next";
import { PrintButtonTop, PrintButtonBottom } from "./PrintButton";

export const metadata: Metadata = {
  title: "Media Kit — Stack Pick",
  description: "Stack Pick brand assets, guidelines, and press information.",
  robots: { index: false },
};

export default function MediaKitPage() {
  return (
    <>
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          body { background: white !important; }
          .page { box-shadow: none !important; margin: 0 !important; padding: 40px !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <PrintButtonTop />

      {/* Media kit content */}
      <div className="page max-w-4xl mx-auto px-8 py-12 bg-white">

        {/* Header */}
        <div className="flex items-start justify-between mb-16 pb-10 border-b border-gray-100">
          <div>
            {/* Inline logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="220" height="44" className="mb-6">
              <g transform="translate(8,8)">
                <rect x="4" y="8" width="34" height="9" rx="3" fill="#1A6BB5"/>
                <rect x="4" y="21" width="34" height="9" rx="3" fill="#5594CA"/>
                <rect x="4" y="34" width="34" height="9" rx="3" fill="#91BFE4"/>
                <circle cx="52" cy="27" r="11" fill="#1A6BB5"/>
                <path d="M 46 27 L 50 31 L 58 22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <text x="82" y="50" fontFamily="Inter, system-ui, sans-serif" fontSize="30">
                <tspan fontWeight="700" fill="#1A6BB5">Stack</tspan>
                <tspan fontWeight="400" fill="#333333"> Pick</tspan>
              </text>
            </svg>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Honest AI tool comparisons. No sponsored rankings.<br />
              Helping people choose the right tool, fast.
            </p>
          </div>
          <div className="text-right text-sm text-gray-400">
            <p className="font-semibold text-gray-700">Media Kit</p>
            <p>2026</p>
            <p className="mt-2">hello@stack-pick.com</p>
            <p>stack-pick.com</p>
          </div>
        </div>

        {/* About */}
        <section className="mb-14">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">About Stack Pick</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What We Do</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Stack Pick is an independent AI tools comparison platform built on one principle: radical honesty. We test every tool we write about, publish real pros and cons — including what a tool does <em>not</em> do well — and give a clear verdict. No affiliate bias. No sponsored content disguised as editorial.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The AI tool space is flooded with noise: review sites that rank tools based on affiliate commissions, not quality. Stack Pick cuts through that. We help individuals and teams make fast, confident decisions about which tools to use — and which to avoid.
              </p>
            </div>
          </div>
        </section>

        {/* Key stats */}
        <section className="mb-14">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">By the Numbers</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: "25+", label: "Tools reviewed" },
              { value: "6", label: "Categories covered" },
              { value: "0", label: "Sponsored rankings" },
              { value: "Weekly", label: "Update frequency" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-14">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">Categories We Cover</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "✍️", name: "AI Writing", tools: "ChatGPT, Claude, Jasper, Copy.ai" },
              { icon: "🎨", name: "Image AI", tools: "Midjourney, DALL-E 3, Adobe Firefly" },
              { icon: "🧠", name: "Productivity", tools: "Notion, Obsidian, Mem, Logseq" },
              { icon: "📋", name: "Project Management", tools: "ClickUp, Asana, Monday, Linear" },
              { icon: "🎬", name: "AI Video", tools: "Descript, Runway, Synthesia, HeyGen" },
            ].map((cat) => (
              <div key={cat.name} className="border border-gray-100 rounded-lg p-4">
                <p className="text-2xl mb-2">{cat.icon}</p>
                <p className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{cat.tools}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Audience */}
        <section className="mb-14">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">Our Audience</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "Founders & Solopreneurs", desc: "Building lean stacks with AI — need to pick fast, pick right, and avoid tool bloat." },
              { title: "Freelancers", desc: "Every subscription needs to earn its keep. ROI-focused tool decisions." },
              { title: "Marketing & Content Teams", desc: "Evaluating AI writing and video tools for production workflows." },
            ].map((seg) => (
              <div key={seg.title} className="bg-blue-50 rounded-xl p-5">
                <p className="font-bold text-gray-900 text-sm mb-2">{seg.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{seg.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand identity */}
        <section className="mb-14">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">Brand Identity</h2>

          {/* Colors */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-3">Color Palette</p>
            <div className="flex gap-4">
              {[
                { hex: "#1A6BB5", name: "Primary Blue", rgb: "26, 107, 181" },
                { hex: "#155a96", name: "Primary Dark", rgb: "21, 90, 150" },
                { hex: "#5594CA", name: "Mid Blue", rgb: "85, 148, 202" },
                { hex: "#91BFE4", name: "Light Blue", rgb: "145, 191, 228" },
                { hex: "#e8f0fb", name: "Tint", rgb: "232, 240, 251" },
                { hex: "#333333", name: "Text Dark", rgb: "51, 51, 51" },
              ].map((color) => (
                <div key={color.hex} className="flex-1">
                  <div
                    className="w-full h-12 rounded-lg mb-2 border border-gray-100"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-xs font-semibold text-gray-700">{color.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-3">Typography</p>
            <div className="border border-gray-100 rounded-xl p-6">
              <p className="text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>Inter</p>
              <p className="text-sm text-gray-400 mb-4">Primary typeface — all weights</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-bold text-gray-900 mb-1">Bold 700</p>
                  <p className="text-gray-500">Headlines, CTAs</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Semibold 600</p>
                  <p className="text-gray-500">Subheadings</p>
                </div>
                <div>
                  <p className="font-normal text-gray-900 mb-1">Regular 400</p>
                  <p className="text-gray-500">Body copy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo assets */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Logo Assets</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-gray-100 rounded-xl p-5 flex flex-col items-center">
                <div className="bg-white p-3 rounded-lg mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="64" height="64">
                    <rect x="16" y="52" width="106" height="26" rx="8" fill="#1A6BB5"/>
                    <rect x="16" y="87" width="106" height="26" rx="8" fill="#5594CA"/>
                    <rect x="16" y="122" width="106" height="26" rx="8" fill="#91BFE4"/>
                    <circle cx="158" cy="100" r="30" fill="#1A6BB5"/>
                    <path d="M 147 101 L 156 110 L 172 91" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700">Icon</p>
                <p className="text-xs text-gray-400">200 × 200px</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-5 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="160" height="32" className="mb-3">
                  <g transform="translate(8,8)">
                    <rect x="4" y="8" width="34" height="9" rx="3" fill="#1A6BB5"/>
                    <rect x="4" y="21" width="34" height="9" rx="3" fill="#5594CA"/>
                    <rect x="4" y="34" width="34" height="9" rx="3" fill="#91BFE4"/>
                    <circle cx="52" cy="27" r="11" fill="#1A6BB5"/>
                    <path d="M 46 27 L 50 31 L 58 22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <text x="82" y="50" fontFamily="Inter, system-ui, sans-serif" fontSize="30">
                    <tspan fontWeight="700" fill="#1A6BB5">Stack</tspan>
                    <tspan fontWeight="400" fill="#333333"> Pick</tspan>
                  </text>
                </svg>
                <p className="text-xs font-semibold text-gray-700">Horizontal</p>
                <p className="text-xs text-gray-400">400 × 80px</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-5 flex flex-col items-center">
                <div className="bg-gray-100 rounded-lg p-3 mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="40" height="40">
                    <rect width="32" height="32" rx="6" fill="#1A6BB5"/>
                    <text x="16" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="700" fill="white" textAnchor="middle">SP</text>
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700">Favicon</p>
                <p className="text-xs text-gray-400">32 × 32px</p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand voice */}
        <section className="mb-14">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">Brand Voice</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">We are</p>
              <ul className="space-y-2">
                {["Direct and opinionated — we give verdicts, not maybes", "Honest about limitations — every tool has a \"Not good at\" section", "Accessible — written for practitioners, not academics", "Independent — zero sponsored content, ever"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">We are not</p>
              <ul className="space-y-2">
                {["Vague or non-committal", "Promotional or affiliate-driven", "Technical for the sake of it", "Exhaustive listicles with no verdict"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-blue-50 rounded-2xl p-8">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Press & Partnerships</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                For press inquiries, partnership proposals, content collaboration, or affiliate program information, reach out directly.
              </p>
              <p className="font-semibold text-gray-900">hello@stack-pick.com</p>
              <p className="text-sm text-gray-500">stack-pick.com</p>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-2">We&apos;re open to:</p>
              <ul className="space-y-1">
                {["Newsletter sponsorships (clearly labeled)", "Tool vendor data partnerships", "Co-created comparison content", "Speaking & podcast appearances"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <p>Stack Pick — stack-pick.com</p>
          <p>© 2026 Stack Pick. All rights reserved.</p>
        </div>

      </div>

      <PrintButtonBottom />
    </>
  );
}
