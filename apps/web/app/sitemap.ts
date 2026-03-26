import { MetadataRoute } from "next";
import { allNews } from "../lib/newsData";
import { activities } from "../lib/activitiesData";

const BASE_URL = "https://towk.sg";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/about`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/about/structure`, priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/about/board`, priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/history`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/news`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/gallery`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/activities`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/conference`, priority: 0.8, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
  ];

  const newsPages = allNews.map((article) => ({
    url: `${BASE_URL}/news/${article.slug}`,
    lastModified: new Date(article.date),
    priority: 0.7,
    changeFrequency: "yearly" as const,
  }));

  const activityPages = activities.map((activity) => ({
    url: `${BASE_URL}/activities/${activity.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...newsPages, ...activityPages];
}
