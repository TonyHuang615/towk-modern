"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Target, Eye, Shield, ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — About。延续 HomeVibrant：明亮橙/青、大圆角 bento 卡片、柔光色块、
// 渐变 CTA、悬停上浮。所有文案双语 i18n，图片沿用 shared 的 Unsplash 图。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutVibrant({ content }: { content: Record<string, any> }) {
  const t = useTranslations("about");
  const about = content.about || {};

  const heroImage = "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=900&q=80";

  const stats: Array<{ value: string; label: string }> = about?.stats || [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  const values = [
    { icon: Heart, title: t("value1Title"), description: t("value1Desc") },
    { icon: Target, title: t("value2Title"), description: t("value2Desc") },
    { icon: Eye, title: t("value3Title"), description: t("value3Desc") },
    { icon: Shield, title: t("value4Title"), description: t("value4Desc") },
  ];

  const milestoneYears = ["1876", "1923", "1943", "1946", "1972", "1992", "2003"] as const;
  const milestones = milestoneYears.map((year) => ({
    year,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: t(`milestone${year}` as any),
  }));

  const statTone = (i: number) =>
    i === 0
      ? "bg-primary text-primary-foreground"
      : i === 1
        ? "bg-card text-card-foreground"
        : "bg-accent/15 text-foreground";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-14 pb-16 sm:pb-24">
        {/* ── BAND 1 · Hero image card + About card ── */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
          <motion.section
            {...fade(0)}
            className="group relative col-span-1 min-h-[60vh] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] lg:col-span-7 lg:min-h-[34rem]"
          >
            <Image
              src={heroImage}
              alt={t("altImage")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                {t("sectionLabel")}
              </span>
              <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                {about?.title || t("pageTitle")}
              </h1>
              <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">
                {about?.subtitle || t("defaultSubtitle")}
              </p>
            </div>
          </motion.section>

          <motion.section
            {...fade(0.08)}
            className="col-span-1 flex flex-col justify-between rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-8 lg:col-span-5"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {t("ourStory")}
              </span>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>{about?.content || t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* ── BAND 2 · Stat cards ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-3 lg:mt-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fade(i * 0.05)}
              className={`flex flex-col justify-center rounded-[1.75rem] p-6 sm:p-7 ${statTone(i)}`}
            >
              <div className="text-4xl font-bold lg:text-5xl">{stat.value}</div>
              <div
                className={`mt-1 text-sm ${
                  i === 0 ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── BAND 3 · Values as playful color cards ── */}
        <motion.div {...fade(0)} className="mt-10 sm:mt-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("ourValues")}
          </span>
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
            {t("valuesSubtitle")}
          </h2>
        </motion.div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const accentTone = i % 2 === 1;
            return (
              <motion.div
                key={v.title}
                {...fade(i * 0.05)}
                className="flex flex-col rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    accentTone ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"
                  }`}
                >
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold leading-tight">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── BAND 4 · Sub-page link cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:mt-14">
          {[
            { href: "/about/structure", title: t("structure"), desc: t("structureDesc"), gradient: true },
            { href: "/about/board", title: t("board"), desc: t("boardDesc"), gradient: false },
          ].map((l, i) => (
            <motion.div key={l.href} {...fade(i * 0.06)}>
              <Link
                href={l.href}
                className={`group relative flex items-center justify-between overflow-hidden rounded-[2rem] p-7 transition-transform duration-200 hover:-translate-y-1 sm:p-8 ${
                  l.gradient
                    ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                    : "bg-card text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)]"
                }`}
              >
                {l.gradient && (
                  <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/10" />
                )}
                <div className="relative">
                  <h3 className="text-xl font-bold leading-tight sm:text-2xl">{l.title}</h3>
                  <p
                    className={`mt-1 max-w-md text-sm ${
                      l.gradient ? "text-primary-foreground/85" : "text-muted-foreground"
                    }`}
                  >
                    {l.desc}
                  </p>
                </div>
                <span
                  className={`relative ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                    l.gradient ? "bg-background text-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── BAND 5 · Milestones card ── */}
        <motion.section
          {...fade(0)}
          className="mt-10 rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-8 lg:mt-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("milestones")}
          </span>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                {...fade(i * 0.04)}
                className="flex items-start gap-4 rounded-2xl bg-primary/5 px-4 py-3"
              >
                <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  {m.year}
                </span>
                <p className="text-sm leading-snug text-foreground">{m.event}</p>
              </motion.div>
            ))}
          </div>
          <Link
            href="/about/board"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            {t("board")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
