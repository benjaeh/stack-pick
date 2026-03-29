import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-primary">
              Stack Pick
            </Link>
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              Honest AI tool comparisons to help you pick the right software for
              your workflow.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3">
              Compare
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/vs/chatgpt-vs-claude"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  ChatGPT vs Claude
                </Link>
              </li>
              <li>
                <Link
                  href="/vs/notion-vs-obsidian"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Notion vs Obsidian
                </Link>
              </li>
              <li>
                <Link
                  href="/vs/jasper-vs-copy-ai"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Jasper vs Copy.ai
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3">
              Best Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/best/ai-writing-tools"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Best AI Writing Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/best/ai-tools-for-freelancers"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Best Tools for Freelancers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  About & Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-400 mb-2">
            <strong className="text-gray-500">Affiliate Disclosure:</strong>{" "}
            Stack Pick earns a commission when you sign up through our affiliate
            links. This never influences our ratings, rankings, or editorial
            decisions. We only recommend tools we have personally tested.
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Stack Pick. All rights reserved.{" "}
            <Link
              href="mailto:hello@stack-pick.com"
              className="hover:text-primary transition-colors"
            >
              hello@stack-pick.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
