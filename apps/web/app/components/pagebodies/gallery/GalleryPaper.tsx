"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import GalleryLightbox from "./GalleryLightbox";

// 宣纸相册 — Gallery。延续 HomePaper/AboutPaper 的版式语言：米色宣纸底、烫金细
// 线相框、印章、衬线说明。影相库化作一本贴在册页上的老相片，每张配金框与朱印。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryPaper({ content }: { content: Record<string, any> }) {
  const t = useTranslations("gallery");

  const categoryKeys = [
    "all",
    "catConference",
    "catCulture",
    "catYouth",
    "catFestival",
    "catBusiness",
    "catHall",
  ] as const;

  const albums = [
    {
      id: 1,
      categoryKey: "catConference" as const,
      title: t("album1Title"),
      date: "2019",
      cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    },
    {
      id: 2,
      categoryKey: "catCulture" as const,
      title: t("album2Title"),
      date: "2025",
      cover: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
    },
    {
      id: 3,
      categoryKey: "catYouth" as const,
      title: t("album3Title"),
      date: "2026",
      cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    },
    {
      id: 4,
      categoryKey: "catFestival" as const,
      title: t("album4Title"),
      date: "2025",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    },
    {
      id: 5,
      categoryKey: "catBusiness" as const,
      title: t("album5Title"),
      date: "2025",
      cover: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    },
    {
      id: 6,
      categoryKey: "catHall" as const,
      title: t("album6Title"),
      date: "2024",
      cover: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=600&q=80",
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? albums
      : albums.filter((a) => a.categoryKey === activeCategory);

  void content;

  return (
    <>
      {/* HERO — serif masthead */}
      <section className="hero" style={{ paddingBottom: 36 }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>
            {t("sectionLabel")}
          </p>
          <h1 style={{ fontSize: 56, letterSpacing: ".03em" }}>{t("title")}</h1>
          <p
            className="sub-en"
            style={{ margin: "20px auto 0", maxWidth: "30em", fontStyle: "italic" }}
          >
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* FILTER — paper chips, gold-ruled when active */}
      <section className="events" style={{ padding: "0 0 36px" }}>
        <div className="wrap">
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}
          >
            {categoryKeys.map((catKey) => {
              const on = activeCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  data-testid={`gallery-filter-${catKey}`}
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 13.5,
                    fontWeight: 600,
                    letterSpacing: ".05em",
                    padding: "8px 18px",
                    borderRadius: 22,
                    cursor: "pointer",
                    transition: "all .18s ease",
                    color: on ? "#fff" : "var(--gold-ink)",
                    background: on ? "var(--vermilion)" : "transparent",
                    border: `1px solid ${on ? "var(--vermilion)" : "var(--hairline-strong)"}`,
                  }}
                >
                  {catKey === "all" ? t("all") : t(catKey)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALBUM PLATES — gold-framed photo plates with seal + serif caption */}
      <section className="events" style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {filtered.map((album) => (
              <figure
                key={album.id}
                data-testid={`gallery-album-${album.id}`}
                style={{ margin: 0 }}
              >
                <div className="frame" style={{ cursor: "pointer" }} onClick={() => setLightbox(album.cover)}>
                  <div className="photo" style={{ aspectRatio: "4 / 3.4" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={album.cover}
                      alt={album.title}
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
                      {t(album.categoryKey)} · {album.date}
                    </div>
                  </div>
                  <span className="seal">
                    <span>東</span>
                    <span>安</span>
                  </span>
                </div>
                <figcaption style={{ marginTop: 30, paddingRight: 8 }}>
                  <h3
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: 22,
                      color: "var(--ink)",
                      lineHeight: 1.3,
                    }}
                  >
                    {album.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: 13.5,
                      color: "var(--muted)",
                      letterSpacing: ".06em",
                      marginTop: 8,
                    }}
                  >
                    {t(album.categoryKey)} · {album.date}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <GalleryLightbox image={lightbox} alt={t("lightboxAlt")} onClose={() => setLightbox(null)} />
    </>
  );
}
