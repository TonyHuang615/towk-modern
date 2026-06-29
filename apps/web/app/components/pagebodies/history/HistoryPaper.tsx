"use client";

import { useTranslations } from "next-intl";

// 宣纸书卷 — History。延续 HomePaper / AboutPaper 的版式语言：印章、烫金细线、
// 衬线大标题、米色宣纸底。大事年表呈现为「烫金账册」式编年登录册 (events-card),
// 历史分期呈现为镌刻数字的纪元横栏。渲染于 DesignShell 的 .towk-paper 容器内。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HistoryPaper({ content }: { content: Record<string, any> }) {
  const t = useTranslations("history");

  const milestones = [
    { year: "1876", title: t("milestone1876Title"), description: t("milestone1876Desc") },
    { year: "1923", title: t("milestone1923Title"), description: t("milestone1923Desc") },
    { year: "1943", title: t("milestone1943Title"), description: t("milestone1943Desc") },
    { year: "1946", title: t("milestone1946Title"), description: t("milestone1946Desc") },
    { year: "1972", title: t("milestone1972Title"), description: t("milestone1972Desc") },
    { year: "1992", title: t("milestone1992Title"), description: t("milestone1992Desc") },
    { year: "2003", title: t("milestone2003Title"), description: t("milestone2003Desc") },
    { year: "2019", title: t("milestone2019Title"), description: t("milestone2019Desc") },
  ];

  const eras = [
    { period: t("era1Period"), title: t("era1Title"), description: t("era1Desc") },
    { period: t("era2Period"), title: t("era2Title"), description: t("era2Desc") },
    { period: t("era3Period"), title: t("era3Title"), description: t("era3Desc") },
    { period: t("era4Period"), title: t("era4Title"), description: t("era4Desc") },
  ];

  const Seal = () => (
    <span className="seal" style={{ position: "static", transform: "rotate(-4deg)", width: 64, height: 64, fontSize: 22 }}>
      <span>東</span>
      <span>安</span>
    </span>
  );

  return (
    <>
      {/* HERO — serif masthead with seal + gold rule */}
      <section className="hero">
        <div className="wrap" style={{ maxWidth: 920, textAlign: "center" }}>
          <p className="eyebrow">{t("sectionLabel")}</p>
          <h1 style={{ fontSize: 52 }}>{t("title")}</h1>
          <p className="sub-en" style={{ margin: "18px auto 0", maxWidth: 640 }}>
            {t("subtitle")}
          </p>
          <div className="hero-divider" style={{ justifyContent: "center", marginTop: 30 }}>
            <span className="ln" />
            <Seal />
            <span className="ln" />
          </div>
        </div>
      </section>

      {/* HISTORICAL PERIODS — engraved era band */}
      <section className="stats">
        <div
          className="wrap"
          style={{ display: "grid", gridTemplateColumns: `repeat(${eras.length}, 1fr)` }}
        >
          {eras.map((e) => (
            <div className="stat" key={e.period}>
              <div className="num" style={{ fontSize: 22 }}>{e.period}</div>
              <div className="lab" style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--ink)", marginTop: 6 }}>
                {e.title}
              </div>
              <div className="lab" style={{ marginTop: 6 }}>{e.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MILESTONES — gold-ruled ledger register */}
      <section className="events" style={{ padding: "84px 0 96px" }}>
        <div className="wrap" style={{ maxWidth: 940 }}>
          <div className="sec-head">
            <div>
              <p className="eyebrow">{t("sectionLabel")}</p>
              <h2>{t("title")}</h2>
            </div>
          </div>
          <div className="events-card">
            {milestones.map((m) => (
              <div className="event-row" key={m.year} style={{ alignItems: "flex-start" }}>
                <div className="date-chip">
                  <div className="d">{m.year}</div>
                </div>
                <div className="event-info">
                  <h4>{m.title}</h4>
                  <p style={{ fontSize: "15.5px", color: "var(--body)", lineHeight: 1.6, marginTop: 4 }}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
