"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { allNews, formatDate } from "../../../lib/newsData";
import { useTranslations } from "next-intl";

const categoryMap = [
  { key: "all", dataValue: "" },
  { key: "catAnnouncement", dataValue: "会馆公告" },
  { key: "catCulture", dataValue: "文化活动" },
  { key: "catYouth", dataValue: "青年活动" },
  { key: "catService", dataValue: "社群服务" },
];

export default function NewsPage() {
  const t = useTranslations("news");
  const [activeCategoryKey, setActiveCategoryKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allNews.filter((item) => {
    const catEntry = categoryMap.find((c) => c.key === activeCategoryKey);
    const matchCat = activeCategoryKey === "all" || item.category === catEntry?.dataValue;
    const matchSearch =
      !searchQuery ||
      item.title.includes(searchQuery) ||
      item.excerpt.includes(searchQuery);
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-20 pb-8 md:pt-32 md:pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              {t("sectionLabel")}
            </span>
            <h1 className="mt-3 md:mt-4 text-3xl md:text-5xl lg:text-6xl font-bold">
              {t("title")}
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="news-search"
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categoryMap.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategoryKey(cat.key)}
                  data-testid={`filter-${cat.key}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategoryKey === cat.key
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground/70 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat.key === "all" ? t("all") : t(cat.key)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.date)}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <a
                    href={`/news/${article.slug}`}
                    data-testid={`read-more-${article.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all"
                  >
                    {t("readMore")} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">{t("noResults")}</p>
              <button
                onClick={() => {
                  setActiveCategoryKey("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                {t("clearFilter")}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
