"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Music, Briefcase, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

/* 庄重典藏 / Stately Archive — Activities。延续 HomeStately：暗色展厅、罗马数字
   展陈编号、烫金细线、双线框、展签式说明。活动以编号展品图卡呈现。 */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ"];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ActivitiesStately({ content }: { content: Record<string, any> }) {
  const locale = useLocale();
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
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="relative z-10 w-full max-w-4xl"
        >
          <div className="border border-primary/50 p-2 sm:p-3">
            <div className="border border-accent/40 px-6 py-14 text-center sm:px-12 sm:py-20">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("sectionLabel")}
              </p>
              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {activities?.title || t("title")}
              </h1>
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ EXHIBIT TILES — numbered collection plates ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
          {items.map((activity, i) => (
            <motion.div
              key={activity.slug || activity.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
            >
              <Link
                href={`/activities/${activity.slug}`}
                className="group block border border-border bg-card transition-colors duration-200 hover:border-primary/50"
              >
                <figure className="relative aspect-[16/10] overflow-hidden border-b border-border">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <figcaption className="absolute left-5 top-5 font-display text-3xl text-primary/80 select-none">
                    {ROMAN[i] ?? String(i + 1)}
                  </figcaption>
                </figure>
                <div className="p-7 sm:p-8">
                  <span className="text-[0.65rem] uppercase tracking-[0.4em] text-accent">
                    {locale === "en" ? "Collection · Exhibit" : "典藏 · 展品"}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold tracking-[0.06em] transition-colors duration-200 group-hover:text-primary">
                    {activity.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary">
                    {t("learnMore")}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
