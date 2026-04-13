"use client";

import { useState } from "react";
import Link from "next/link";

interface ComparisonCard {
  slug: string;
  title: string;
  tool1Name: string;
  tool2Name: string;
  winnerName: string | null;
  winnerReason: string;
  vsCategory: string;
  isFeatured: boolean;
}

interface VSFilterProps {
  comparisons: ComparisonCard[];
  categories: { id: string; label: string; icon: string }[];
  featuredSlugs: string[];
}

export default function VSFilter({ comparisons, categories, featuredSlugs }: VSFilterProps) {
  const [active, setActive] = useState("all");

  const featured = comparisons.filter((c) => featuredSlugs.includes(c.slug));

  const filtered =
    active === "all"
      ? comparisons
      : comparisons.filter((c) => c.vsCategory === active);

  // When a specific category is active, group is just the filtered list
  // When "all" is active, show featured first then the rest
  const nonFeatured = filtered.filter((c) => !featuredSlugs.includes(c.slug));

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActive("all")}
          className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
            active === "all"
              ? "bg-primary text-white border-primary"
              : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
          }`}
        >
          All ({comparisons.length})
        </button>
        {categories.map((cat) => {
          const count = comparisons.filter((c) => c.vsCategory === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
                active === cat.id
                  ? "bg-primary text-white border-primary"
                  : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {cat.icon} {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Featured — only when "all" is active */}
      {active === "all" && featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
            Most Popular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((c) => (
              <CompCard key={c.slug} c={c} />
            ))}
          </div>
        </section>
      )}

      {/* Category sections — "all" mode */}
      {active === "all" && (
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
            All Comparisons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nonFeatured.map((c) => (
              <CompCard key={c.slug} c={c} />
            ))}
          </div>
        </section>
      )}

      {/* Filtered category mode */}
      {active !== "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <CompCard key={c.slug} c={c} />
          ))}
        </div>
      )}
    </>
  );
}

function CompCard({ c }: { c: ComparisonCard }) {
  return (
    <Link
      href={`/vs/${c.slug}`}
      className="group border border-gray-200 rounded-xl p-5 hover:border-primary hover:shadow-md transition-all bg-white flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
          {c.tool1Name}
        </span>
        <span className="text-gray-300 text-sm font-medium">vs</span>
        <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
          {c.tool2Name}
        </span>
      </div>

      {c.winnerName && (
        <div className="mb-2">
          <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full border border-green-100">
            Winner: {c.winnerName}
          </span>
        </div>
      )}

      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">
        {c.winnerReason}
      </p>

      <span className="text-xs text-primary font-semibold group-hover:underline">
        Read comparison →
      </span>
    </Link>
  );
}
