"use client";

import Link from "next/link";
import { Heart, Target, Eye, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

// 宣纸书卷 — About。延续 HomePaper 的版式语言：印章、烫金细线、衬线大标题、
// 米色宣纸底。渲染于 DesignShell 的 .towk-paper 容器内，复用 globals.css 中
// .towk-paper 作用域类（.wrap / .eyebrow / .stats / .pull / .seal / .events-card …）。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutPaper({ content }: { content: Record<string, any> }) {
  const t = useTranslations("about");
  const about = content.about || {};

  const aboutImg = "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=900&q=80";

  const stats: Array<{ value: string; label: string }> = about?.stats || [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  const values = [
    { icon: Heart, title: t("value1Title"), description: t("value1Desc") },
    { icon: Target, title: t("value2Title"), description: t("value2Desc") },
    { icon: Eye, title: t("value3Title"), description: t("value3Desc") },
    { icon: Shield, title: t("value4Title"), description: t("value4Desc") },
  ];

  const milestones = [
    { year: "1876", event: t("milestone1876") },
    { year: "1923", event: t("milestone1923") },
    { year: "1943", event: t("milestone1943") },
    { year: "1946", event: t("milestone1946") },
    { year: "1972", event: t("milestone1972") },
    { year: "1992", event: t("milestone1992") },
    { year: "2003", event: t("milestone2003") },
  ].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const Seal = () => (
    <span className="seal">
      <span>東</span>
      <span>安</span>
    </span>
  );

  return (
    <>
      {/* HERO — serif masthead + framed plate with seal */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t("sectionLabel")}</p>
            <h1>{about?.title || t("pageTitle")}</h1>
            <p className="sub-en">{about?.subtitle || t("defaultSubtitle")}</p>
            <p className="lede">{about?.content || t("storyP1")}</p>
            <div className="hero-divider">
              <span className="ln" />
              {t("milestones")}
            </div>
          </div>
          <div className="hero-visual">
            <div className="frame">
              <div className="photo" style={{ aspectRatio: "4 / 4.6" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aboutImg}
                  alt={t("altImage")}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="cap">
                  <span className="dot" />
                  {t("altImage")}
                </div>
              </div>
              <Seal />
            </div>
          </div>
        </div>
      </section>

      {/* STATS band — engraved figures */}
      <section className="stats">
        <div
          className="wrap"
          style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
        >
          {stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="num">{s.value}</div>
              <div className="lab">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY — chronicle two-column with pull quote */}
      <section className="about">
        <div className="wrap about-grid">
          <div>
            <p className="eyebrow">{t("sectionLabel")}</p>
            <h2>{t("ourStory")}</h2>
            <p className="kicker-cn">{about?.subtitle || t("defaultSubtitle")}</p>
          </div>
          <div>
            <p className="pull">{about?.content || t("storyP1")}</p>
            <p>{t("storyP2")}</p>
            <p>{t("storyP3")}</p>
          </div>
        </div>
      </section>

      {/* VALUES — four gold-ruled paper cards */}
      <section className="activities" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">{t("sectionLabel")}</p>
              <h2>{t("ourValues")}</h2>
            </div>
            <p className="sub">{t("valuesSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <article
                key={v.title}
                className="card"
                style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 14 }}
              >
                <span
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--vermilion-deep)",
                    background: "var(--paper)",
                    border: "1px solid var(--gold)",
                  }}
                >
                  <v.icon className="w-6 h-6" />
                </span>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--ink)" }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: "15.5px", color: "var(--body)", lineHeight: 1.6 }}>
                  {v.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUB-PAGE LINKS — bordered ledger cards */}
      <section className="events" style={{ paddingBottom: 70 }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { href: "/about/structure", title: t("structure"), desc: t("structureDesc") },
              { href: "/about/board", title: t("board"), desc: t("boardDesc") },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="card"
                style={{ padding: "26px 28px", display: "flex", flexDirection: "column", gap: 6 }}
              >
                <h3 style={{ fontFamily: "var(--display)", fontSize: 23, color: "var(--ink)" }}>
                  {l.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--muted)" }}>{l.desc}</p>
                <span className="more" style={{ marginTop: 12 }}>
                  {t("milestones")} <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES — gold-ruled register with year chips */}
      <section className="events" style={{ paddingBottom: 96 }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <div className="sec-head">
            <div>
              <p className="eyebrow">{t("sectionLabel")}</p>
              <h2>{t("milestones")}</h2>
            </div>
          </div>
          <div className="events-card">
            {milestones.map((m) => (
              <div className="event-row" key={m.year}>
                <div className="date-chip">
                  <div className="d">{m.year}</div>
                </div>
                <div className="event-info">
                  <h4>{m.event}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
