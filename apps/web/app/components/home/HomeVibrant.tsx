"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Heart,
  Globe,
  Calendar,
  Music,
  Briefcase,
  Users,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedNews, formatDate } from "../../../lib/newsData";
import { getLocalizedActivities } from "../../../lib/activitiesData";

const activityIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = { Music, Briefcase, Users, Sparkles };

const HERO_FALLBACK =
  "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&q=80";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HomeVibrant({ content }: { content: any }) {
  const locale = useLocale();
  const tHero = useTranslations("hero");
  const tAbout = useTranslations("about");
  const tNews = useTranslations("news");
  const tActs = useTranslations("activities");
  const tHist = useTranslations("history");
  const tConf = useTranslations("conference");

  // ── Hero ──────────────────────────────────────────────────
  const heroSlide = content?.hero?.slides?.[0] ?? {};
  const heroImage: string = heroSlide.image || HERO_FALLBACK;
  const heroTitle: string = heroSlide.title || tHero("slide1Title");
  const heroSubtitle: string = heroSlide.subtitle || tHero("slide1Subtitle");
  const siteName = tAbout("defaultTitle");

  // ── About + stats ─────────────────────────────────────────
  const aboutContent: string = content?.about?.content || tAbout("defaultContent");
  const stats: Array<{ value: string; label: string }> =
    content?.about?.stats || [
      { value: tAbout("stat1Value"), label: tAbout("stat1Label") },
      { value: tAbout("stat2Value"), label: tAbout("stat2Label") },
      { value: tAbout("stat3Value"), label: tAbout("stat3Label") },
    ];

  // ── News ──────────────────────────────────────────────────
  const news = getLocalizedNews(locale);
  const newsFeature = news[0];
  const newsRest = news.slice(1, 3);

  // ── Activities ────────────────────────────────────────────
  const activities = getLocalizedActivities(locale).slice(0, 4);

  // ── History ───────────────────────────────────────────────
  const milestones: Array<{ year: string; title: string; description: string }> =
    content?.history?.milestones || [
      { year: "1876", title: tHist("compMilestone1Title"), description: tHist("compMilestone1Desc") },
      { year: "1923", title: tHist("compMilestone2Title"), description: tHist("compMilestone2Desc") },
      { year: "1943", title: tHist("compMilestone3Title"), description: tHist("compMilestone3Desc") },
      { year: "1992", title: tHist("compMilestone4Title"), description: tHist("compMilestone4Desc") },
      { year: "2003", title: tHist("compMilestone5Title"), description: tHist("compMilestone5Desc") },
    ];
  const historyTop = milestones.slice(0, 4);

  // ── Conference ────────────────────────────────────────────
  const confTitle: string = content?.conference?.title || tConf("title");
  const confDesc: string = content?.conference?.description || tConf("description");

  const statTone = (i: number) =>
    i === 0
      ? "bg-primary text-primary-foreground"
      : i === 1
        ? "bg-card text-card-foreground"
        : "bg-accent/15 text-foreground";

  const statNumber = (i: number) =>
    i === 0 ? "text-primary-foreground" : i === 1 ? "text-primary" : "text-accent";

  return (
    <div className="bg-background">
      {/* signature motif: oversized soft color blobs behind the bento */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-14 pb-16 sm:pb-24">
          {/* ── BAND 1 · Hero + About ───────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12 lg:auto-rows-[230px]">
            {/* Hero card */}
            <motion.section
              id="hero"
              {...fade(0)}
              className="group relative col-span-1 min-h-[62vh] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] lg:col-span-8 lg:row-span-2 lg:min-h-0"
            >
              <Image
                src={heroImage}
                alt={heroTitle}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                  {siteName} {"·"} 1876
                </span>
                <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                  {heroTitle}
                </h1>
                <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">
                  {heroSubtitle}
                </p>
                <a
                  href="#about"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {tHero("explore")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.section>

            {/* About intro card */}
            <motion.section
              id="about"
              {...fade(0.08)}
              className="col-span-1 flex flex-col justify-between rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-8 lg:col-span-4 lg:row-span-2"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {tAbout("sectionLabel")}
                </span>
                <h2 className="mt-3 text-2xl font-bold leading-tight lg:text-3xl">
                  {siteName}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tAbout("defaultSubtitle")}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground line-clamp-6 lg:line-clamp-[7]">
                  {aboutContent}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-primary/5 px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-4 w-4 text-primary" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {tAbout("tagline")}
                </span>
              </div>
            </motion.section>
          </div>

          {/* ── BAND 2 · Bento ──────────────────────────────── */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-5 lg:grid-cols-6 lg:auto-rows-[220px] lg:grid-flow-row-dense">
            {/* Stat cards */}
            {stats.slice(0, 3).map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fade(i * 0.05)}
                className={`col-span-1 flex flex-col justify-center rounded-[1.75rem] p-5 lg:col-span-2 lg:row-span-1 ${statTone(
                  i,
                )}`}
              >
                <div className={`text-4xl font-bold lg:text-5xl ${statNumber(i)}`}>
                  {stat.value}
                </div>
                <div
                  className={`mt-1 text-sm ${i === 0 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}

            {/* Conference CTA — gradient signature card */}
            <motion.section
              id="conference"
              {...fade(0.05)}
              className="relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground sm:p-8 lg:col-span-3 lg:row-span-2"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary-foreground/10" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-primary-foreground/10" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold tracking-wide">
                  <Globe className="h-3.5 w-3.5" />
                  {tConf("sectionLabel")}
                </span>
                <h2 className="mt-4 text-2xl font-bold leading-tight lg:text-3xl">
                  {confTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85 line-clamp-3 lg:line-clamp-4">
                  {confDesc}
                </p>
              </div>
              <div className="relative mt-6">
                <p className="text-sm font-medium text-primary-foreground/90">
                  {tConf("nextConferenceInfo")}
                </p>
                <a
                  href="#conference"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {tConf("getUpdates")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.section>

            {/* News — featured image card */}
            {newsFeature && (
              <motion.article
                id="news"
                {...fade(0.1)}
                className="group relative col-span-2 min-h-[300px] overflow-hidden rounded-[2rem] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)] lg:col-span-3 lg:row-span-2 lg:min-h-0"
              >
                <Image
                  src={newsFeature.image}
                  alt={newsFeature.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {newsFeature.category}
                  </span>
                  <div>
                    <span className="flex items-center gap-1.5 text-xs text-white/75">
                      <Calendar className="h-3 w-3" />
                      {formatDate(newsFeature.date, locale)}
                    </span>
                    <h3 className="mt-2 text-xl font-bold leading-snug text-white lg:text-2xl">
                      {newsFeature.title}
                    </h3>
                    <a
                      href={`/news/${newsFeature.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:gap-2.5 transition-all"
                    >
                      {tNews("readMore")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Activity cards */}
            {activities.map((act, i) => {
              const Icon = activityIcons[act.icon] || Sparkles;
              const accentTone = i % 2 === 1;
              return (
                <motion.a
                  key={act.slug}
                  href="#activities"
                  {...fade(i * 0.05)}
                  className="group col-span-1 flex flex-col justify-between rounded-[1.75rem] bg-card p-5 text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1 lg:col-span-2 lg:row-span-1"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      accentTone ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="mt-4">
                    <h3 className="text-base font-bold leading-tight">{act.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {act.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* History highlight — tall card */}
            <motion.section
              id="history"
              {...fade(0.1)}
              className="col-span-2 flex flex-col rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-7 lg:col-span-2 lg:row-span-2"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {tHist("sectionLabel")}
              </span>
              <h2 className="mt-3 text-2xl font-bold leading-tight">
                {content?.history?.title || tHist("title")}
              </h2>
              <ul className="mt-5 space-y-4 border-l border-border pl-5">
                {historyTop.map((m) => (
                  <li key={m.year} className="relative">
                    <span className="absolute -left-[1.6rem] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-card" />
                    <div className="text-sm font-bold text-primary">{m.year}</div>
                    <div className="text-sm font-semibold leading-snug">{m.title}</div>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Remaining news cards */}
            {newsRest.map((article, i) => (
              <motion.article
                key={article.id}
                {...fade(i * 0.06)}
                className="group col-span-2 flex items-center gap-4 rounded-[1.75rem] bg-card p-4 text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1 sm:gap-5 sm:p-5 lg:col-span-3 lg:row-span-1"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {article.category}
                  </span>
                  <h3 className="mt-2 text-sm font-bold leading-snug line-clamp-2 sm:text-base">
                    {article.title}
                  </h3>
                  <a
                    href={`/news/${article.slug}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    {tNews("readMore")}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </motion.article>
            ))}

            {/* Activities footer link card */}
            <motion.a
              id="activities"
              href="#activities"
              {...fade(0.05)}
              className="col-span-2 flex items-center justify-between rounded-[1.75rem] bg-primary p-6 text-primary-foreground transition-transform duration-200 hover:-translate-y-1 lg:col-span-6 lg:row-span-1"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
                  {tActs("sectionLabel")}
                </span>
                <h2 className="mt-2 text-xl font-bold leading-tight sm:text-2xl">
                  {content?.activities?.title || tActs("title")}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-primary-foreground/85 line-clamp-2">
                  {tActs("subtitle")}
                </p>
              </div>
              <span className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background text-foreground">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
