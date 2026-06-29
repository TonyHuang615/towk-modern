"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { getLocalizedNews, formatDate } from "../../../../lib/newsData";
import { useTranslations, useLocale } from "next-intl";

/* 庄重典藏 / Stately Archive — News。延续 HomeStately：暗色展厅、烫金细线、
   双线框报头、展签式说明、镌刻数字、金线编年登记册。 */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const categoryMap = [
  { key: "all", categoryKey: "" },
  { key: "catAnnouncement", categoryKey: "announcement" },
  { key: "catCulture", categoryKey: "cultural" },
  { key: "catYouth", categoryKey: "youth" },
  { key: "catService", categoryKey: "community" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NewsStately({ content }: { content: Record<string, any> }) {
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
    <>
      {/* ════════ HERO — double gold-hairline gazette header ════════ */}
      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="relative z-10 w-full max-w-4xl"
        >
          <div className="border border-primary/50 p-2 sm:p-3">
            <div className="border border-accent/40 px-6 py-12 text-center sm:px-12 sm:py-16">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("sectionLabel")}
              </p>
              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {t("title")}
              </h1>
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ FILTER — engraved toggles + search ════════ */}
      <section className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {categoryMap.map((cat) => {
              const active = activeCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategoryKey(cat.key)}
                  data-testid={`filter-${cat.key === "all" ? "all" : cat.categoryKey || cat.key}`}
                  className={`text-xs uppercase tracking-[0.3em] transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.key === "all" ? t("all") : t(cat.key)}
                </button>
              );
            })}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="news-search"
              className="w-full border-0 border-b border-border bg-transparent py-2 pl-7 text-sm tracking-wide text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="border-t border-border px-6 py-28 text-center">
          <p className="text-2xl font-bold tracking-[0.06em]">{t("noResults")}</p>
          <button
            onClick={() => {
              setActiveCategoryKey("all");
              setSearchQuery("");
            }}
            className="mt-5 text-xs uppercase tracking-[0.3em] text-primary"
          >
            {t("clearFilter")}
          </button>
        </section>
      ) : (
        <>
          {/* ════════ FEATURED PLATE — dignified wide image with caption ════════ */}
          {lead && (
            <section className="border-t border-border px-6 py-16">
              <motion.div
                initial={{ opacity: 0, scale: 1.02 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease }}
                className="mx-auto max-w-6xl"
              >
                <Link
                  href={`/news/${lead.slug}`}
                  data-testid={`read-more-${lead.id}`}
                  className="group relative block aspect-[21/9] overflow-hidden border border-border"
                >
                  <Image
                    src={lead.image}
                    alt={lead.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                    <span className="text-[0.65rem] uppercase tracking-[0.4em] text-accent">
                      {lead.category} · {formatDate(lead.date, locale)}
                    </span>
                    <h2 className="mt-3 max-w-3xl text-xl font-bold leading-tight tracking-[0.06em] text-white sm:text-3xl">
                      {lead.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                      {lead.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </section>
          )}

          {/* ════════ ENGRAVED REGISTER — gold-ruled dated ledger ════════ */}
          {rest.length > 0 && (
            <section className="border-t border-border bg-card/40 px-6 py-20 md:py-24">
              <div className="mx-auto max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease }}
                  className="mb-12 text-center"
                >
                  <div className="mx-auto h-px w-16 bg-primary/50" />
                  <h3 className="mt-6 text-2xl font-bold tracking-[0.08em] sm:text-3xl">
                    {t("viewMore")}
                  </h3>
                </motion.div>

                <div className="border border-border bg-card">
                  <div className="divide-y divide-border">
                    {rest.map((article, i) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: i * 0.05, ease }}
                      >
                        <Link
                          href={`/news/${article.slug}`}
                          data-testid={`read-more-${article.id}`}
                          className="group flex items-start gap-5 px-6 py-7 transition-colors duration-200 hover:bg-primary/5 sm:gap-8 sm:px-8"
                        >
                          <span className="mt-2 hidden h-1.5 w-1.5 shrink-0 rotate-45 bg-primary sm:block" />
                          <div className="w-24 shrink-0">
                            <div className="font-display text-xl font-bold tracking-[0.08em] text-primary">
                              {new Date(article.date).getFullYear()}
                            </div>
                            <div className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                              {formatDate(article.date, locale)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                              {article.category}
                            </span>
                            <h4 className="mt-2 text-lg font-bold leading-snug tracking-[0.04em] transition-colors duration-200 group-hover:text-primary">
                              {article.title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {article.excerpt}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
