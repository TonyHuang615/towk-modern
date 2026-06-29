"use client";

import { motion } from "framer-motion";
import { Globe, Users, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — Conference。延续 HomeVibrant：明亮橙/青、大圆角 bento 卡片、柔光色块、
// 渐变 CTA、悬停上浮；旗舰世界恳亲大会以满幅图片英雄卡承托。所有文案双语 i18n，
// 图片沿用 shared 的 Unsplash 图。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ConferenceVibrant({ content }: { content: Record<string, any> }) {
  const t = useTranslations("conference");
  const conference = content.conference || {};

  const heroImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80";

  const features = [
    { icon: Globe, title: t("feature1Title"), description: t("feature1Desc") },
    { icon: Users, title: t("feature2Title"), description: t("feature2Desc") },
    { icon: Calendar, title: t("feature3Title"), description: t("feature3Desc") },
  ];

  const pastConferences = conference?.pastConferences || [
    { year: "2019", location: t("locSingapore"), theme: t("conf11") },
    { year: "2017", location: t("locHongKong"), theme: t("conf10") },
    { year: "2015", location: t("locMalaysia"), theme: t("conf9") },
    { year: "2012", location: t("locHongKong"), theme: t("conf8") },
    { year: "2008", location: t("locKuching"), theme: t("conf7") },
    { year: "2005", location: t("locSingapore"), theme: t("conf6") },
  ];

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
              alt={t("altConference")}
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
                {conference?.title || t("title")}
              </h1>
              <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">
                {conference?.description || t("description")}
              </p>
            </div>
          </motion.section>

          <motion.section
            {...fade(0.08)}
            className="col-span-1 flex flex-col justify-between rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-8 lg:col-span-5"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {t("aboutTitle")}
              </span>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>{t("aboutP1")}</p>
                <p>{t("aboutP2")}</p>
                <p>{t("aboutP3")}</p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* ── BAND 2 · Feature cards ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-3 lg:mt-5">
          {features.map((f, i) => {
            const accentTone = i % 2 === 1;
            return (
              <motion.div
                key={f.title}
                {...fade(i * 0.05)}
                className="flex flex-col rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1 sm:p-7"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    accentTone ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"
                  }`}
                >
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold leading-tight">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── BAND 3 · Past conventions card ── */}
        <motion.section
          {...fade(0)}
          className="mt-10 rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-8 lg:mt-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("pastConferences")}
          </span>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {pastConferences.map((c: { year: string; location: string; theme: string }, i: number) => (
              <motion.div
                key={c.year}
                {...fade(i * 0.04)}
                className="flex items-start gap-4 rounded-2xl bg-primary/5 px-4 py-3"
              >
                <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  {c.year}
                </span>
                <div>
                  <p className="text-sm font-semibold leading-snug text-foreground">{c.theme}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── BAND 4 · Next convention gradient CTA ── */}
        <motion.section
          {...fade(0)}
          className="relative mt-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground sm:p-12 lg:mt-14"
        >
          <span className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/10" />
          <span className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-primary-foreground/5" />
          <div className="relative max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
              {t("nextConference")}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {t("nextConferenceInfo")}
            </h2>
            <p className="mt-3 text-base text-primary-foreground/85 sm:text-lg">
              {t("nextConferenceLocation")}
            </p>
            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5">
              {t("getUpdates")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
