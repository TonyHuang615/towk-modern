"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Music, Briefcase, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — Activities。延续 HomeVibrant：明亮橙/青、大圆角卡片、柔光色块、
// 悬停上浮。活动以大尺寸彩色圆角卡片网格呈现，图片占满、渐变遮罩、悬浮箭头。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ActivitiesVibrant({ content }: { content: Record<string, any> }) {
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
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-24">
        {/* ── Heading ── */}
        <motion.div {...fade(0)} className="max-w-3xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            {t("sectionLabel")}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            {activities?.title || t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── Big colorful rounded activity cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {items.map((activity, i) => {
            const Icon = activity.icon ?? Sparkles;
            return (
              <motion.div key={activity.slug || activity.title} {...fade(i * 0.06)}>
                <Link
                  href={`/activities/${activity.slug}`}
                  className="group relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1.5"
                >
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />
                  <div className="relative p-7 sm:p-9">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl">
                      {activity.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
                      {activity.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-background/95 px-5 py-2.5 text-sm font-semibold text-foreground transition-transform duration-200 group-hover:translate-x-1">
                      {t("learnMore")}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
