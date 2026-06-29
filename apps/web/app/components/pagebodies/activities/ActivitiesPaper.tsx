"use client";

import Link from "next/link";
import { Music, Briefcase, Users, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

// 宣纸书卷 — Activities。延续 HomePaper 的版式语言：衬线大标题、烫金细线、
// 米色宣纸底、印章式编号。活动以宣纸卡片网格呈现（.card / .card-photo /
// .badge / .more），渲染于 DesignShell 的 .towk-paper 容器内。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ActivitiesPaper({ content }: { content: Record<string, any> }) {
  const t = useTranslations("activities");
  const activities = content.activities || {};

  const defaultActivities = [
    {
      icon: Music,
      slug: "cantonese-opera",
      title: t("act1Title"),
      description: t("pageAct1Desc"),
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    },
    {
      icon: Briefcase,
      slug: "business",
      title: t("act2Title"),
      description: t("pageAct2Desc"),
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    },
    {
      icon: Users,
      slug: "youth",
      title: t("act3Title"),
      description: t("pageAct3Desc"),
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    },
    {
      icon: Sparkles,
      slug: "traditions",
      title: t("pageAct4Title"),
      description: t("pageAct4Desc"),
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: any[] = activities?.items || defaultActivities;

  return (
    <>
      {/* HERO — serif masthead with gold rule */}
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="wrap" style={{ maxWidth: 880, textAlign: "center" }}>
          <p className="eyebrow">{t("sectionLabel")}</p>
          <h1 style={{ fontSize: 56, letterSpacing: ".03em" }}>
            {activities?.title || t("title")}
          </h1>
          <p
            className="sub-en"
            style={{ margin: "20px auto 0", maxWidth: "34em" }}
          >
            {t("subtitle")}
          </p>
          <div
            className="hero-divider"
            style={{ justifyContent: "center", marginTop: 26 }}
          >
            <span className="ln" />
            {t("sectionLabel")}
            <span className="ln" />
          </div>
        </div>
      </section>

      {/* ACTIVITIES — gold-ruled serif card grid */}
      <section className="activities">
        <div className="wrap">
          <div className="cards">
            {items.map((activity, index) => (
              <Link
                key={activity.slug || activity.title}
                href={`/activities/${activity.slug}`}
                className="card"
              >
                <div className="card-photo">
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
                  <span className="badge">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="card-body">
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <span className="more">
                    {t("learnMore")} <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
