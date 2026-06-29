"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { getLocalizedNews, formatDate } from "../../../../lib/newsData";
import { useTranslations, useLocale } from "next-intl";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.35em] text-primary">
      {children}
    </span>
  );
}

function Rule() {
  return (
    <div className="mx-auto max-w-[720px] px-6">
      <div className="border-t border-border" />
    </div>
  );
}

const categoryMap = [
  { key: "all", categoryKey: "" },
  { key: "catAnnouncement", categoryKey: "announcement" },
  { key: "catCulture", categoryKey: "cultural" },
  { key: "catYouth", categoryKey: "youth" },
  { key: "catService", categoryKey: "community" },
];

// 编辑杂志 — News。延续 HomeEditorial：象牙底、衬线大标题 + 克制无衬线正文、
// Eyebrow/Rule 母题、居中窄栏 (max-w 720)。报道以分隔线日期标题列表呈现。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NewsEditorial({ content }: { content: Record<string, any> }) {
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

  return (
    <>
      {/* ── HERO — centered masthead ── */}
      <section className="px-6 pt-20 pb-14 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-7 text-balance text-[2.6rem] leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.5rem] lg:leading-[1.04]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      <Rule />

      {/* ── FILTER — understated text toggles + search ── */}
      <section className="px-6 pt-10 pb-4">
        <div className="mx-auto flex max-w-[720px] flex-col gap-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {categoryMap.map((cat) => {
              const active = activeCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategoryKey(cat.key)}
                  data-testid={`filter-${cat.key === "all" ? "all" : cat.categoryKey || cat.key}`}
                  className={`text-sm tracking-wide transition-colors ${
                    active
                      ? "text-foreground underline decoration-primary decoration-2 underline-offset-[6px]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.key === "all" ? t("all") : t(cat.key)}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="news-search"
            className="w-full max-w-sm border-0 border-b border-border bg-transparent pb-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </section>

      {/* ── DATED CHRONICLE LIST ── */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-[720px]">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-foreground">{t("noResults")}</p>
              <button
                onClick={() => {
                  setActiveCategoryKey("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-sm text-primary underline underline-offset-4"
              >
                {t("clearFilter")}
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((article, i) => (
                <motion.li
                  key={article.id}
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link
                    href={`/news/${article.slug}`}
                    data-testid={`read-more-${article.id}`}
                    className="group grid gap-3 py-10 sm:grid-cols-[8rem_1fr] sm:gap-10"
                  >
                    <div className="sm:text-right">
                      <span className="font-display text-sm tabular-nums text-primary/70">
                        {formatDate(article.date, locale)}
                      </span>
                      <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
                        {article.category}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display text-2xl leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                        {article.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {t("readMore")}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
