"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import GalleryLightbox from "./GalleryLightbox";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.35em] text-primary">
      {children}
    </span>
  );
}

function Rule() {
  return (
    <div className="mx-auto max-w-[1100px] px-6">
      <div className="border-t border-border" />
    </div>
  );
}

// 编辑杂志 — Gallery。延续 HomeEditorial/AboutEditorial：象牙底、衬线大标题、
// Eyebrow/Rule 母题、克制无衬线说明。影相库化作一组杂志图版 —— 不规则瀑布流、
// 细线分栏、编号图注。文字切换式分类筛选。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryEditorial({ content }: { content: Record<string, any> }) {
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
      {/* ── HERO — centered masthead ── */}
      <section className="px-6 pt-20 pb-12 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-7 text-balance text-[2.6rem] leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.5rem] lg:leading-[1.04]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      <Rule />

      {/* ── FILTER — underlined text toggles ── */}
      <section className="px-6 pt-10 pb-2">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {categoryKeys.map((catKey) => {
            const on = activeCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                data-testid={`gallery-filter-${catKey}`}
                className={`border-b pb-1 text-sm uppercase tracking-[0.18em] transition-colors ${
                  on
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {catKey === "all" ? t("all") : t(catKey)}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── MASONRY — magazine plates with numbered captions ── */}
      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-[1100px] [column-fill:_balance] gap-8 sm:columns-2 lg:columns-3">
          {filtered.map((album, i) => (
            <motion.figure
              key={album.id}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setLightbox(album.cover)}
              data-testid={`gallery-album-${album.id}`}
              className="group mb-8 block w-full cursor-pointer break-inside-avoid"
            >
              <div className="overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full object-cover grayscale-[0.15] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-4 border-t border-border pt-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm tabular-nums text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {album.title}
                  </h3>
                </div>
                <p className="mt-1 pl-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t(album.categoryKey)} · {album.date}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <GalleryLightbox image={lightbox} alt={t("lightboxAlt")} onClose={() => setLightbox(null)} />
    </>
  );
}
