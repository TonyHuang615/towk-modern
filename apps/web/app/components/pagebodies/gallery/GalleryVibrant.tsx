"use client";

import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import GalleryLightbox from "./GalleryLightbox";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — Gallery。延续 HomeVibrant/AboutVibrant：明亮橙/青、柔光色块、大圆角
// bento 瀑布流、渐变筛选胶囊、悬停上浮。影相库化作一面缤纷拼贴墙，卡片大小错落。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryVibrant({ content }: { content: Record<string, any> }) {
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

  // Playful masonry spans keyed off the album id so tall/wide tiles stay stable.
  const spanFor = (id: number) =>
    id % 6 === 1
      ? "sm:row-span-2"
      : id % 6 === 4
        ? "lg:col-span-2"
        : "";

  void content;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24">
        {/* ── HERO ── */}
        <motion.div {...fade(0)} className="max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            {t("sectionLabel")}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-6xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        {/* ── FILTER — gradient pills ── */}
        <motion.div {...fade(0.05)} className="mt-8 flex flex-wrap gap-2.5">
          {categoryKeys.map((catKey) => {
            const on = activeCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                data-testid={`gallery-filter-${catKey}`}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  on
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
                    : "bg-card text-muted-foreground hover:-translate-y-0.5 hover:text-foreground"
                }`}
              >
                {catKey === "all" ? t("all") : t(catKey)}
              </button>
            );
          })}
        </motion.div>

        {/* ── BENTO MASONRY ── */}
        <div className="mt-8 grid auto-rows-[14rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((album, i) => (
            <motion.div
              key={album.id}
              {...fade(i * 0.05)}
              onClick={() => setLightbox(album.cover)}
              data-testid={`gallery-album-${album.id}`}
              className={`group relative cursor-pointer overflow-hidden rounded-[1.75rem] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-1 ${spanFor(
                album.id,
              )}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={album.cover}
                alt={album.title}
                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                <ZoomIn className="h-4 w-4 text-white" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-[0.7rem] font-semibold text-primary-foreground">
                  {t(album.categoryKey)} · {album.date}
                </span>
                <h3 className="mt-2 text-lg font-bold leading-tight text-white">{album.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <GalleryLightbox image={lightbox} alt={t("lightboxAlt")} onClose={() => setLightbox(null)} />
    </div>
  );
}
