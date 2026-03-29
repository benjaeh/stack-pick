import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h2>
      <p className="text-gray-500 mb-8">
        This page doesn&apos;t exist. It may have moved or been removed.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        ← Back to Stack Pick
      </Link>
    </div>
  );
}
