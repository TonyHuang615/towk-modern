"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import GalleryLightbox from "./GalleryLightbox";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// 庄重典藏 / Stately Archive — Gallery。延续 HomeStately/AboutStately：暗色展厅、
// 烫金细线、双线框、展签式说明、镌刻编号。影相库化作一面博物馆展墙，每帧配金线
// 双框与馆藏编号展签。分类筛选作衬线疏排切换。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryStately({ content }: { content: Record<string, any> }) {
  const locale = useLocale();
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
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex items-center justify-center overflow-hidden px-6 pt-24 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="relative z-10 w-full max-w-4xl"
        >
          <div className="border border-primary/50 p-2 sm:p-3">
            <div className="border border-accent/40 px-6 py-12 text-center sm:px-12 sm:py-16">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("sectionLabel")}
              </p>
              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl">
                {t("title")}
              </h1>
              <div className="mx-auto mt-7 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ FILTER — serif tracked toggles ════════ */}
      <section className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {categoryKeys.map((catKey) => {
            const on = activeCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                data-testid={`gallery-filter-${catKey}`}
                className={`text-xs uppercase tracking-[0.3em] transition-colors ${
                  on ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {catKey === "all" ? t("all") : t(catKey)}
              </button>
            );
          })}
        </div>
      </section>

      {/* ════════ EXHIBIT WALL — gold-hairline double frames + accession plaques ════════ */}
      <section className="border-t border-border px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((album, i) => (
            <motion.figure
              key={album.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              onClick={() => setLightbox(album.cover)}
              data-testid={`gallery-album-${album.id}`}
              className="group cursor-pointer"
            >
              <div className="border border-primary/40 p-2">
                <div className="relative aspect-[4/3] overflow-hidden border border-accent/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </div>
              </div>
              <figcaption className="mt-5 flex items-start gap-4">
                <span className="font-display text-sm tabular-nums tracking-[0.1em] text-primary/70">
                  {locale === "en" ? "No." : "藏"} {String(i + 1).padStart(2, "0")}
                </span>
                <div className="border-l border-border pl-4">
                  <h3 className="text-base font-bold leading-snug tracking-[0.05em] transition-colors group-hover:text-primary">
                    {album.title}
                  </h3>
                  <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
                    {t(album.categoryKey)} · {album.date}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <GalleryLightbox image={lightbox} alt={t("lightboxAlt")} onClose={() => setLightbox(null)} />
    </>
  );
}
