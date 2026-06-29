"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { boardTerms } from "./boardData";

// 宣纸书卷 — Board。延续 AboutPaper 的版式语言：印章、烫金细线、衬线大标题、
// 米色宣纸底。理事会名册以衬线名录呈现：朱红印章标届次、金线分隔职衔行。
// 渲染于 DesignShell 的 .towk-paper 容器内，复用 globals.css 的作用域类。
export default function BoardPaper() {
  const t = useTranslations("board");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* HERO — serif masthead */}
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 820 }}>
          <p className="eyebrow">{t("sectionLabel")}</p>
          <h1 style={{ letterSpacing: ".03em" }}>{t("title")}</h1>
          <p className="sub-en" style={{ marginInline: "auto" }}>
            {t("subtitle")}
          </p>
          <div
            className="hero-divider"
            style={{ justifyContent: "center", marginTop: 26 }}
          >
            <span className="ln" />
            <span className="seal" style={{ width: 34, height: 34, fontSize: 13 }}>
              <span>東</span>
              <span>安</span>
            </span>
            <span className="ln" />
          </div>
        </div>
      </section>

      {/* BACK LINK */}
      <section className="events" style={{ padding: "0 0 20px" }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <Link href="/about" className="more">
            <ArrowLeft className="w-4 h-4" />
            {tCommon("backToAbout")}
          </Link>
        </div>
      </section>

      {/* ROSTER — serif name register, one ledger per term */}
      <section className="events" style={{ paddingBottom: 70 }}>
        <div
          className="wrap"
          style={{ maxWidth: 920, display: "flex", flexDirection: "column", gap: 40 }}
        >
          {boardTerms.map((term) => (
            <article key={term.termNo} className="events-card" style={{ overflow: "visible" }}>
              {/* register head: seal numeral + term meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "26px 30px",
                  borderBottom: "1px solid var(--gold)",
                  background: "var(--paper)",
                }}
              >
                <span
                  className="seal"
                  style={{ width: 58, height: 58, fontSize: 20, borderRadius: 9 }}
                >
                  <span>{term.termNo}</span>
                </span>
                <div>
                  <h3 style={{ fontSize: 26 }}>{t("termLabel", { no: term.termNo })}</h3>
                  <p
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: 14,
                      color: "var(--muted)",
                      marginTop: 4,
                      letterSpacing: ".04em",
                    }}
                  >
                    {term.years} · {t("president")}：{term.president}
                  </p>
                </div>
              </div>

              {/* gold-ruled position rows */}
              <div>
                {term.members.map((group) => (
                  <div
                    key={group.key}
                    className="event-row"
                    style={{ alignItems: "baseline", gap: 30 }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: 150,
                        fontFamily: "var(--display)",
                        fontSize: 17,
                        color: "var(--vermilion-deep)",
                        borderRight: "1px solid var(--gold)",
                        paddingRight: 22,
                      }}
                    >
                      {t(`positions.${group.key}`)}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        fontFamily: "var(--display)",
                        fontSize: 18,
                        color: "var(--ink)",
                        letterSpacing: ".05em",
                        lineHeight: 1.6,
                      }}
                    >
                      {group.names.join("、")}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}

          <p
            style={{
              textAlign: "center",
              fontSize: 14.5,
              color: "var(--muted)",
              marginTop: 6,
            }}
          >
            {t("note")}
          </p>
        </div>
      </section>
    </>
  );
}
