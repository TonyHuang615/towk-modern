"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, Calendar } from "lucide-react";
import { useState } from "react";
import { getLocalizedNews, formatDate } from "../../../../lib/newsData";
import { useTranslations, useLocale } from "next-intl";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const categoryMap = [
  { key: "all", categoryKey: "" },
  { key: "catAnnouncement", categoryKey: "announcement" },
  { key: "catCulture", categoryKey: "cultural" },
  { key: "catYouth", categoryKey: "youth" },
  { key: "catService", categoryKey: "community" },
];

// 活力鲜明 — News。延续 HomeVibrant：明亮橙/青、大圆角卡片、柔光色块、
// 悬停上浮。头条大卡 + 彩色圆角新闻卡网格。文案双语 i18n，图片沿用数据源。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NewsVibrant({ content }: { content: Record<string, any> }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const allNews = getLocalizedNews(locale);
  const [activeCategoryKey, setActiveCategoryKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allNews.filter((item) => {
    const catEntry = categoryMap.find((c) => c.key === activeCategoryKey);
    const matchCat =
      activeCategoryKey === "all" || item.categoryKey === catEntry?.categoryKey;
    const matchSearch =
      !searchQuery ||
      item.title.includes(searchQuery) ||
      item.excerpt.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const lead = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-24">
        {/* ── HEADER ── */}
        <motion.div {...fade(0)} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            {t("sectionLabel")}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── FILTER PILLS + SEARCH ── */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2.5">
            {categoryMap.map((cat) => {
              const active = activeCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategoryKey(cat.key)}
                  data-testid={`filter-${cat.key === "all" ? "all" : cat.categoryKey || cat.key}`}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
                      : "bg-card text-muted-foreground hover:-translate-y-0.5 hover:text-foreground"
                  }`}
                >
                  {cat.key === "all" ? t("all") : t(cat.key)}
                </button>
              );
            })}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="news-search"
              className="w-full rounded-full border border-transparent bg-card py-3 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-[2rem] bg-card p-16 text-center text-muted-foreground">
            <p className="text-lg font-semibold">{t("noResults")}</p>
            <button
              onClick={() => {
                setActiveCategoryKey("all");
                setSearchQuery("");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              {t("clearFilter")}
            </button>
          </div>
        ) : (
          <>
            {/* ── LEAD CARD — gradient feature ── */}
            {lead && (
              <motion.div {...fade(0)} className="mt-10">
                <Link
                  href={`/news/${lead.slug}`}
                  data-testid={`read-more-${lead.id}`}
                  className="group relative grid min-h-[22rem] grid-cols-1 overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] lg:grid-cols-2"
                >
                  <div className="relative min-h-[16rem] overflow-hidden">
                    <Image
                      src={lead.image}
                      alt={lead.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground sm:p-12">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                      {lead.category}
                    </span>
                    <h2 className="mt-5 text-2xl font-bold leading-tight sm:text-4xl">
                      {lead.title}
                    </h2>
                    <p className="mt-3 max-w-lg text-sm text-primary-foreground/85 sm:text-base">
                      {lead.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      <span className="flex items-center gap-1.5 text-primary-foreground/70">
                        <Calendar className="h-4 w-4" />
                        {formatDate(lead.date, locale)}
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* ── NEWS CARD GRID ── */}
            {rest.length > 0 && (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article, i) => {
                  const accentTone = i % 3 === 1;
                  return (
                    <motion.div key={article.id} {...fade(i * 0.05)}>
                      <Link
                        href={`/news/${article.slug}`}
                        data-testid={`read-more-${article.id}`}
                        className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-card text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-center gap-3">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                accentTone
                                  ? "bg-accent/15 text-accent"
                                  : "bg-primary/10 text-primary"
                              }`}
                            >
                              {article.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {formatDate(article.date, locale)}
                            </span>
                          </div>
                          <h3 className="mt-3 text-lg font-bold leading-snug">
                            {article.title}
                          </h3>
                          <p className="mt-2 flex-1 text-sm text-muted-foreground">
                            {article.excerpt}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                            {t("readMore")}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
