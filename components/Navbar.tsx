import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Stack Pick</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/vs"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Compare
            </Link>
            <Link
              href="/best"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Best Tools
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              About
            </Link>
          </div>

          {/* CTA */}
          <Link
            href="/#newsletter"
            className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Get weekly picks →
          </Link>
        </div>
      </div>
    </nav>
  );
}
