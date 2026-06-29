"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { getLocalizedNews, formatDate } from "../../../../lib/newsData";
import { useTranslations, useLocale } from "next-intl";

const categoryMap = [
  { key: "all", categoryKey: "" },
  { key: "catAnnouncement", categoryKey: "announcement" },
  { key: "catCulture", categoryKey: "cultural" },
  { key: "catYouth", categoryKey: "youth" },
  { key: "catService", categoryKey: "community" },
];

// 宣纸书卷 — News。延续 HomePaper 的版式语言：衬线报头、烫金细线、
// 印章、米色宣纸底。头条 + 烫金细线登记册（events-card / event-row / date-chip）。
// 渲染于 DesignShell 的 .towk-paper 容器内，复用 globals.css 作用域类。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NewsPaper({ content }: { content: Record<string, any> }) {
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
      {/* MASTHEAD — serif gazette header with gold dateline rule */}
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>
            {t("sectionLabel")}
          </p>
          <h1 style={{ fontSize: 56, letterSpacing: ".03em" }}>{t("title")}</h1>
          <p
            className="sub-en"
            style={{ maxWidth: "34em", margin: "18px auto 0" }}
          >
            {t("subtitle")}
          </p>
          <div
            className="hero-divider"
            style={{ justifyContent: "center", marginTop: 26 }}
          >
            <span className="ln" />
            {t("viewAll")}
            <span className="ln" />
          </div>
        </div>
      </section>

      {/* FILTER BAR — paper chips + inline search */}
      <section style={{ paddingBottom: 28 }}>
        <div
          className="wrap"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            borderTop: "1px solid var(--hairline)",
            borderBottom: "1px solid var(--hairline)",
            padding: "18px 28px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {categoryMap.map((cat) => {
              const active = activeCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategoryKey(cat.key)}
                  data-testid={`filter-${cat.key === "all" ? "all" : cat.categoryKey || cat.key}`}
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 13.5,
                    fontWeight: 600,
                    letterSpacing: ".04em",
                    padding: "7px 16px",
                    borderRadius: 20,
                    cursor: "pointer",
                    transition: "all .18s ease",
                    color: active ? "#fff" : "var(--gold-ink)",
                    background: active ? "var(--vermilion)" : "transparent",
                    border: `1px solid ${active ? "var(--vermilion)" : "var(--hairline-strong)"}`,
                  }}
                >
                  {cat.key === "all" ? t("all") : t(cat.key)}
                </button>
              );
            })}
          </div>
          <div style={{ position: "relative", minWidth: 220 }}>
            <Search
              className="w-4 h-4"
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
              }}
            />
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="news-search"
              style={{
                width: "100%",
                padding: "9px 14px 9px 36px",
                borderRadius: 9,
                fontFamily: "var(--sans)",
                fontSize: 14.5,
                color: "var(--ink)",
                background: "var(--white)",
                border: "1px solid var(--hairline-strong)",
                outline: "none",
              }}
            />
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="events" style={{ paddingBottom: 96 }}>
          <div className="wrap" style={{ textAlign: "center", padding: "60px 28px" }}>
            <p style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--ink)" }}>
              {t("noResults")}
            </p>
            <button
              onClick={() => {
                setActiveCategoryKey("all");
                setSearchQuery("");
              }}
              className="more"
              style={{ marginTop: 16, cursor: "pointer", background: "none", border: "none" }}
            >
              {t("clearFilter")} <span className="arrow">→</span>
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* LEAD STORY — full-width front-page feature */}
          {lead && (
            <section className="about" style={{ paddingTop: 0, paddingBottom: 56 }}>
              <Link href={`/news/${lead.slug}`} data-testid={`read-more-${lead.id}`}>
                <div
                  className="about-grid"
                  style={{ gridTemplateColumns: "1.1fr .9fr", alignItems: "center" }}
                >
                  <div className="frame">
                    <div className="photo" style={{ aspectRatio: "16 / 11" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={lead.image}
                        alt={lead.title}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="cap">
                        <span className="dot" />
                        {lead.category}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: 12 }}>
                      {lead.category} · {formatDate(lead.date, locale)}
                    </p>
                    <h2 style={{ fontSize: 38, lineHeight: 1.18 }}>{lead.title}</h2>
                    <p className="pull" style={{ marginTop: 18 }}>
                      {lead.excerpt}
                    </p>
                    <span className="more" style={{ marginTop: 8 }}>
                      {t("readMore")} <span className="arrow">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* REGISTER — gold-ruled dated column */}
          {rest.length > 0 && (
            <section className="events" style={{ paddingBottom: 96 }}>
              <div className="wrap">
                <div className="sec-head">
                  <div>
                    <p className="eyebrow">{t("sectionLabel")}</p>
                    <h2>{t("viewMore")}</h2>
                  </div>
                </div>
                <div className="events-card">
                  {rest.map((article) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      data-testid={`read-more-${article.id}`}
                      className="event-row"
                    >
                      <div className="date-chip">
                        <div className="d">{new Date(article.date).getFullYear()}</div>
                        <div className="m">{formatDate(article.date, locale)}</div>
                      </div>
                      <div className="event-info">
                        <h4>{article.title}</h4>
                        <div className="meta">{article.excerpt}</div>
                      </div>
                      <span className="event-tag">{article.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
