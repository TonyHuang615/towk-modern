"use client";

import Link from "next/link";
import { getArticleBySlug, formatDate } from "../../../../lib/newsData";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import ShareButtons from "../../ShareButtons";

// 宣纸书卷 — News article。延续 HomePaper/NewsPaper 版式语言：衬线报头、
// 烫金细线、印章、米色宣纸底，单栏铅印长文 + 首字下沉。渲染于 DesignShell
// 的 .towk-paper 容器内，复用 globals.css 作用域类（wrap / eyebrow / frame /
// photo / cap / seal / more / arrow …）。自取数据：useParams + getArticleBySlug。
export default function NewsArticlePaper() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const article = getArticleBySlug(slug, locale);
  const t = useTranslations("news");

  if (!article) {
    return (
      <section className="hero" style={{ textAlign: "center", paddingBottom: 120 }}>
        <div className="wrap">
          <h1 style={{ fontSize: 44 }}>{t("notFound")}</h1>
          <Link href="/news" className="more" style={{ marginTop: 20 }}>
            {t("backToNews")} <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    );
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <article className="about" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <div className="wrap" style={{ maxWidth: 800 }}>
        {/* back to gazette */}
        <Link href="/news" className="more" style={{ marginBottom: 28 }}>
          <span className="arrow" style={{ transform: "rotate(180deg)" }}>→</span>{" "}
          {t("backToNews")}
        </Link>

        {/* dateline + serif masthead headline */}
        <p className="eyebrow" style={{ marginTop: 26, marginBottom: 14 }}>
          {article.category} · {formatDate(article.date, locale)}
        </p>
        <h1 style={{ fontSize: 46, lineHeight: 1.16, letterSpacing: ".02em" }}>
          {article.title}
        </h1>

        <div className="hero-divider" style={{ marginTop: 22 }}>
          <span className="ln" />
          {t("sectionLabel")}
        </div>

        {/* framed plate with seal */}
        <div className="frame" style={{ marginTop: 36, marginBottom: 44 }}>
          <div className="photo" style={{ aspectRatio: "16 / 9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
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
              {article.category}
            </div>
          </div>
          <span className="seal">
            <span>東</span>
            <span>安</span>
          </span>
        </div>

        {/* letterpress body with drop-cap first paragraph */}
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: "18.5px",
            lineHeight: 1.85,
            color: "var(--body)",
          }}
        >
          {paragraphs.map((para, i) => {
            if (i === 0) {
              return (
                <p key={i} style={{ marginBottom: 22 }}>
                  <span
                    style={{
                      float: "left",
                      fontFamily: "var(--display)",
                      fontWeight: 700,
                      fontSize: 68,
                      lineHeight: 0.82,
                      color: "var(--vermilion-deep)",
                      marginRight: 14,
                      marginTop: 6,
                    }}
                  >
                    {para.slice(0, 1)}
                  </span>
                  {para.slice(1)}
                </p>
              );
            }
            return (
              <p key={i} style={{ marginBottom: 22 }}>
                {para}
              </p>
            );
          })}
        </div>

        {/* gold-ruled colophon: more link + share */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 28,
            borderTop: "1px solid var(--hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 18,
          }}
        >
          <Link href="/news" className="more">
            {t("viewMore")} <span className="arrow">→</span>
          </Link>
          <ShareButtons title={article.title} />
        </div>
      </div>
    </article>
  );
}
