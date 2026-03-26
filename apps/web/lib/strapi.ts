/**
 * Strapi API client for Next.js frontend
 *
 * Fetches data from Strapi CMS with fallback to local JSON data.
 * In development, Strapi runs at http://localhost:1337.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiItem {
  id: number;
  documentId: string;
  [key: string]: any;
}

async function strapiRequest<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T | null> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value),
    );
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (STRAPI_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
    }

    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ── Articles (News) ──

export async function getArticles(locale = "zh") {
  const res = await strapiRequest<StrapiResponse<StrapiItem[]>>("/articles", {
    "sort[0]": "date:desc",
    "populate": "*",
    "locale": locale,
    "pagination[pageSize]": "50",
  });
  return res?.data || null;
}

export async function getArticleBySlug(slug: string, locale = "zh") {
  const res = await strapiRequest<StrapiResponse<StrapiItem[]>>("/articles", {
    "filters[slug][$eq]": slug,
    "populate": "*",
    "locale": locale,
  });
  return res?.data?.[0] || null;
}

// ── Activities ──

export async function getActivities(locale = "zh") {
  const res = await strapiRequest<StrapiResponse<StrapiItem[]>>("/activities", {
    "populate": "*",
    "locale": locale,
  });
  return res?.data || null;
}

export async function getActivityBySlug(slug: string, locale = "zh") {
  const res = await strapiRequest<StrapiResponse<StrapiItem[]>>("/activities", {
    "filters[slug][$eq]": slug,
    "populate": "*",
    "locale": locale,
  });
  return res?.data?.[0] || null;
}

// ── Albums (Gallery) ──

export async function getAlbums() {
  const res = await strapiRequest<StrapiResponse<StrapiItem[]>>("/albums", {
    "populate": "*",
    "sort[0]": "date:desc",
  });
  return res?.data || null;
}

// ── Page Content (Single Type) ──

export async function getPageContent(locale = "zh") {
  const res = await strapiRequest<StrapiResponse<StrapiItem>>("/page-content", {
    "populate": "*",
    "locale": locale,
  });
  return res?.data || null;
}

// ── Site Config (Single Type) ──

export async function getSiteConfig() {
  const res = await strapiRequest<StrapiResponse<StrapiItem>>("/site-config", {
    "populate": "*",
  });
  return res?.data || null;
}

// ── Utility: Get Strapi media URL ──

export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
