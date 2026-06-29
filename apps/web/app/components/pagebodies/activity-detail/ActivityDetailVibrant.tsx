"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Music,
  Briefcase,
  Users,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { getActivityBySlug } from "../../../../lib/activitiesData";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const iconMap: Record<string, typeof Music> = {
  Music,
  Briefcase,
  Users,
  Sparkles,
};

// 活力鲜明 — Activity detail. 延续 HomeVibrant：明亮橙/青、大圆角卡片、柔光色块、
// 渐变 CTA、悬停上浮。大尺寸圆角 hero 卡片 + 彩色亮点 chip。
export default function ActivityDetailVibrant() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const activity = getActivityBySlug(slug, locale);
  const t = useTranslations("activities");

  if (!activity) {
    return (
      <div className="px-6 py-32 text-center">
        <h1 className="text-3xl font-bold">{t("notFound")}</h1>
        <Link
          href="/activities"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToActivities")}
        </Link>
      </div>
    );
  }

  const Icon = iconMap[activity.icon] ?? Sparkles;
  const paras = activity.content.trim().split("\n\n");

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 sm:pb-24">
        <motion.div {...fade(0)} className="mb-6">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToActivities")}
          </Link>
        </motion.div>

        {/* ── HERO — big rounded image card ── */}
        <motion.section
          {...fade(0.05)}
          className="group relative flex min-h-[56vh] flex-col justify-end overflow-hidden rounded-[2.5rem] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] lg:min-h-[32rem]"
        >
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="relative p-6 sm:p-10 lg:p-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="h-7 w-7" />
            </span>
            <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-background/95 px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground">
              {activity.subtitle}
            </span>
            <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {activity.title}
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">
              {activity.description}
            </p>
          </div>
        </motion.section>

        {/* ── BODY + HIGHLIGHTS ── */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
          <motion.section
            {...fade(0)}
            className="col-span-1 rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-8 lg:col-span-7"
          >
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              {paras.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.section>

          <motion.aside
            {...fade(0.08)}
            className="col-span-1 rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-8 lg:col-span-5"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {t("highlights")}
            </span>
            <ul className="mt-5 flex flex-col gap-3">
              {activity.highlights.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 rounded-2xl px-4 py-3 ${
                    i % 2 === 1 ? "bg-accent/10" : "bg-primary/5"
                  }`}
                >
                  <CheckCircle
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      i % 2 === 1 ? "text-accent" : "text-primary"
                    }`}
                  />
                  <span className="text-sm leading-snug text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              {t("contactMore")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.aside>
        </div>

        {/* ── FOOT ── */}
        <motion.div {...fade(0)} className="mt-10">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("viewAll")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
