"use client";

import { Globe, Users, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

// 宣纸书卷 — Conference。延续 HomePaper 的版式语言：印章、烫金细线、衬线大标题、
// 米色宣纸底，并复用专属的 .reunion 朱红旗舰横幅承托世界恳亲大会。渲染于
// DesignShell 的 .towk-paper 容器内，复用 globals.css 中 .towk-paper 作用域类。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ConferencePaper({ content }: { content: Record<string, any> }) {
  const t = useTranslations("conference");
  const conference = content.conference || {};

  const confImg = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80";

  const features = conference?.features || [
    { icon: Globe, title: t("feature1Title"), description: t("feature1Desc") },
    { icon: Users, title: t("feature2Title"), description: t("feature2Desc") },
    { icon: Calendar, title: t("feature3Title"), description: t("feature3Desc") },
  ];

  const pastConferences = conference?.pastConferences || [
    { year: "2019", location: t("locSingapore"), theme: t("conf11") },
    { year: "2017", location: t("locHongKong"), theme: t("conf10") },
    { year: "2015", location: t("locMalaysia"), theme: t("conf9") },
    { year: "2012", location: t("locHongKong"), theme: t("conf8") },
    { year: "2008", location: t("locKuching"), theme: t("conf7") },
    { year: "2005", location: t("locSingapore"), theme: t("conf6") },
  ];

  const Seal = () => (
    <span className="seal">
      <span>東</span>
      <span>安</span>
    </span>
  );

  return (
    <>
      {/* HERO — serif masthead */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t("sectionLabel")}</p>
            <h1>{conference?.title || t("title")}</h1>
            <p className="lede">{conference?.description || t("description")}</p>
            <div className="hero-divider">
              <span className="ln" />
              {t("nextConferenceInfo")}
            </div>
          </div>
          <div className="hero-visual">
            <div className="frame">
              <div className="photo" style={{ aspectRatio: "4 / 4.6" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={confImg}
                  alt={t("altConference")}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="cap">
                  <span className="dot" />
                  {t("altConference")}
                </div>
              </div>
              <Seal />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — three gold-ruled paper cards */}
      <section className="activities" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">{t("sectionLabel")}</p>
              <h2>{t("aboutTitle")}</h2>
            </div>
            <p className="sub">{t("description")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map(/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            (f: any) => (
              <article
                key={f.title}
                className="card"
                style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 14 }}
              >
                {f.icon ? (
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
                    <f.icon className="w-6 h-6" />
                  </span>
                ) : null}
                <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--ink)" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "15.5px", color: "var(--body)", lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — chronicle two-column with pull quote */}
      <section className="about">
        <div className="wrap about-grid">
          <div>
            <p className="eyebrow">{t("sectionLabel")}</p>
            <h2>{t("aboutTitle")}</h2>
            <p className="kicker-cn">{t("nextConferenceInfo")}</p>
          </div>
          <div>
            <p className="pull">{t("aboutP1")}</p>
            <p>{t("aboutP2")}</p>
            <p>{t("aboutP3")}</p>
          </div>
        </div>
      </section>

      {/* PAST CONVENTIONS — gold-ruled register with year chips */}
      <section className="events" style={{ paddingTop: 0, paddingBottom: 70 }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <div className="sec-head">
            <div>
              <p className="eyebrow">{t("sectionLabel")}</p>
              <h2>{t("pastConferences")}</h2>
            </div>
          </div>
          <div className="events-card">
            {pastConferences.map((c: { year: string; location: string; theme: string }) => (
              <div className="event-row" key={c.year}>
                <div className="date-chip">
                  <div className="d">{c.year}</div>
                </div>
                <div className="event-info">
                  <h4>{c.theme}</h4>
                  <p className="meta">{c.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT CONVENTION — oxblood reunion flagship banner */}
      <section className="reunion">
        <div className="reunion-inner">
          <div className="wrap reunion-grid">
            <div>
              <p className="eyebrow">{t("nextConference")}</p>
              <h2>{t("nextConferenceInfo")}</h2>
              <p className="r-lede">{t("nextConferenceLocation")}</p>
              <div className="places">
                {pastConferences.map((c: { year: string; location: string; theme: string }) => (
                  <span className="chip" key={`${c.year}-${c.location}`}>
                    {c.location}
                  </span>
                ))}
              </div>
              <div className="r-actions">
                <button className="btn btn-gold">{t("getUpdates")}</button>
                <span style={{ color: "#E2D2BD", fontSize: 14 }}>{t("viewAllConferences")}</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="photo-dark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={confImg}
                  alt={t("altConference")}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
                />
                <div className="cap">
                  <span className="dot" />
                  {t("altConference")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
