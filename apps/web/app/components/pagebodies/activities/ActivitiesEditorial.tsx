"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Music, Briefcase, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

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

// 编辑杂志 — Activities。延续 HomeEditorial：象牙底、衬线大标题、Eyebrow 母题、
// 居中窄栏。活动以编号杂志清单呈现：序号 + 横幅图 + 标题/描述，分隔细线。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ActivitiesEditorial({ content }: { content: Record<string, any> }) {
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
            {activities?.title || t("title")}
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

      {/* ── ACTIVITIES — numbered magazine list with alternating image side ── */}
      <section className="px-6 pb-24">
        <ul className="mx-auto max-w-[900px] divide-y divide-border border-t border-border">
          {items.map((activity, i) => (
            <motion.li
              key={activity.slug || activity.title}
              {...fade}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <Link
                href={`/activities/${activity.slug}`}
                className="group grid items-center gap-6 py-10 sm:grid-cols-[7rem_1fr] sm:gap-10 lg:grid-cols-[7rem_22rem_1fr]"
              >
                <span className="font-display text-4xl tabular-nums text-primary/60 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="overflow-hidden rounded-sm bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="h-44 w-full object-cover grayscale-[0.15] transition-transform duration-700 group-hover:scale-105 sm:h-52"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {activity.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    {t("learnMore")}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>
    </>
  );
}
