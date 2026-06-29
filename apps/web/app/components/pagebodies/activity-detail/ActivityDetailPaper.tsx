"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { getActivityBySlug } from "../../../../lib/activitiesData";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

// 宣纸书卷 — Activity detail. 延续 HomePaper：衬线大标题、烫金细线、米色宣纸底、
// 印章。正文以书卷栏排版，亮点以烫金登记册（events-card / event-row）呈现。
// 渲染于 DesignShell 的 .towk-paper 容器内。
export default function ActivityDetailPaper() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const activity = getActivityBySlug(slug, locale);
  const t = useTranslations("activities");

  if (!activity) {
    return (
      <section className="hero">
        <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
          <h1 style={{ fontSize: 44 }}>{t("notFound")}</h1>
          <Link
            href="/activities"
            className="more"
            style={{ justifyContent: "center", marginTop: 18 }}
          >
            <span className="arrow">←</span> {t("backToActivities")}
          </Link>
        </div>
      </section>
    );
  }

  const paras = activity.content.trim().split("\n\n");

  return (
    <article>
      {/* HERO — serif masthead with gold rule + seal */}
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <Link
            href="/activities"
            className="more"
            style={{ marginBottom: 24 }}
          >
            <span className="arrow">←</span> {t("backToActivities")}
          </Link>
          <p className="eyebrow">{activity.subtitle}</p>
          <h1 style={{ fontSize: 54, letterSpacing: ".03em" }}>{activity.title}</h1>
          <p className="sub-en" style={{ marginTop: 18, maxWidth: "40em" }}>
            {activity.description}
          </p>
          <div className="hero-divider" style={{ marginTop: 26 }}>
            <span className="ln" />
            {t("sectionLabel")}
            <span className="ln" />
          </div>
        </div>
      </section>

      {/* PLATE — framed photo with seal */}
      <section className="hero" style={{ paddingTop: 28, paddingBottom: 0 }}>
        <div className="wrap" style={{ maxWidth: 880 }}>
          <div className="frame">
            <div className="photo" style={{ aspectRatio: "16 / 8" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activity.image}
                alt={activity.title}
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
                {activity.title}
              </div>
            </div>
            <span className="seal">
              <span>東</span>
              <span>安</span>
            </span>
          </div>
        </div>
      </section>

      {/* BODY — chronicle column + gold-ruled highlights register */}
      <section className="about" style={{ paddingTop: 56 }}>
        <div
          className="wrap"
          style={{ maxWidth: 1020, display: "grid", gap: 48, gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1fr)" }}
        >
          <div>
            {paras.map((para, i) =>
              i === 0 ? (
                <p className="pull" key={i}>
                  {para}
                </p>
              ) : (
                <p key={i}>{para}</p>
              ),
            )}
          </div>

          <aside>
            <p className="eyebrow">{t("highlights")}</p>
            <div className="events-card" style={{ marginTop: 16 }}>
              {activity.highlights.map((item, i) => (
                <div className="event-row" key={i} style={{ alignItems: "flex-start" }}>
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: "var(--gold)", flexShrink: 0, marginTop: 3 }}
                  />
                  <div className="event-info">
                    <h4 style={{ fontFamily: "var(--body)", fontWeight: 400 }}>{item}</h4>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="more"
              style={{ marginTop: 22 }}
            >
              {t("contactMore")} <span className="arrow">→</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* FOOT — gold rule + back link */}
      <section className="events" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="wrap" style={{ maxWidth: 1020 }}>
          <div className="hero-divider" style={{ marginBottom: 24 }}>
            <span className="ln" />
          </div>
          <Link href="/activities" className="more">
            <span className="arrow">←</span> {t("viewAll")}
          </Link>
        </div>
      </section>
    </article>
  );
}
