import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://stack-pick.com";
const SITE_NAME = "Stack Pick";

export function generateHomepageMetadata(): Metadata {
  return {
    title: "Stack Pick — Honest AI Tool Comparisons (2026)",
    description:
      "Honest, in-depth comparisons of the best AI tools and software. No sponsored rankings. No AI-generated reviews. Just real-human tested recommendations.",
    openGraph: {
      title: "Stack Pick — Honest AI Tool Comparisons (2026)",
      description:
        "Find the best AI tools for your workflow. Honest comparisons, no sponsored rankings.",
      url: SITE_URL,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Stack Pick — Honest AI Tool Comparisons (2026)",
      description:
        "Find the best AI tools for your workflow. Honest comparisons, no sponsored rankings.",
    },
    alternates: { canonical: SITE_URL },
  };
}

export function generateComparisonMetadata(
  title: string,
  description: string,
  slug: string
): Metadata {
  const url = `${SITE_URL}/vs/${slug}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: url },
  };
}

export function generateBestOfMetadata(
  title: string,
  description: string,
  slug: string
): Metadata {
  const url = `${SITE_URL}/best/${slug}`;
  return {
    title: `${title} — Reviewed & Ranked | ${SITE_NAME}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: url },
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Honest AI tool comparisons to help you pick the right software for your workflow.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: "hello@stack-pick.com",
    description:
      "Honest AI tool comparisons to help you pick the right software for your workflow.",
  };
}
