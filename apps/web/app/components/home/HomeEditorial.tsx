"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  getLocalizedNews,
  formatDate,
  type NewsArticle,
} from "../../../lib/newsData";
import {
  getLocalizedActivities,
  type Activity,
} from "../../../lib/activitiesData";

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
    <div className="mx-auto max-w-[720px] px-6">
      <div className="border-t border-border" />
    </div>
  );
}

export default function HomeEditorial({ content }: { content: any }) {
  const locale = useLocale();
  const tHero = useTranslations("hero");
  const tAbout = useTranslations("about");
  const tNews = useTranslations("news");
  const tHistory = useTranslations("history");
  const tConf = useTranslations("conference");
  const tAct = useTranslations("activities");

  const slide = content?.hero?.slides?.[0];
  const heroEyebrow = slide?.subtitle || tHero("slide1Subtitle");
  const heroTitle = slide?.title || tHero("slide1Title");
  const heroLede = slide?.description || tHero("slide1Desc");
  const heroImage =
    slide?.image ||
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&q=80";

  const aboutTitle = content?.about?.title || tAbout("defaultTitle");
  const aboutSubtitle = content?.about?.subtitle || tAbout("defaultSubtitle");
  const aboutContent = content?.about?.content || tAbout("defaultContent");
  const aboutStats: Array<{ value: string; label: string }> =
    content?.about?.stats || [
      { value: tAbout("stat1Value"), label: tAbout("stat1Label") },
      { value: tAbout("stat2Value"), label: tAbout("stat2Label") },
      { value: tAbout("stat3Value"), label: tAbout("stat3Label") },
    ];

  const milestones: Array<{
    year: string;
    title: string;
    description: string;
  }> = content?.history?.milestones || [
    {
      year: "1876",
      title: tHistory("compMilestone1Title"),
      description: tHistory("compMilestone1Desc"),
    },
    {
      year: "1923",
      title: tHistory("compMilestone2Title"),
      description: tHistory("compMilestone2Desc"),
    },
    {
      year: "1943",
      title: tHistory("compMilestone3Title"),
      description: tHistory("compMilestone3Desc"),
    },
    {
      year: "1992",
      title: tHistory("compMilestone4Title"),
      description: tHistory("compMilestone4Desc"),
    },
    {
      year: "2003",
      title: tHistory("compMilestone5Title"),
      description: tHistory("compMilestone5Desc"),
    },
  ];

  const confTitle = content?.conference?.title || tConf("title");
  const confDescription =
    content?.conference?.description || tConf("description");

  const news: NewsArticle[] = getLocalizedNews(locale).slice(0, 5);
  const activities: Activity[] = getLocalizedActivities(locale);

  return (
    <main className="bg-background text-foreground">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="px-6 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>{heroEyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-7 text-balance text-[2.6rem] leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.5rem] lg:leading-[1.04]"
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {heroLede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-10"
          >
            <a
              href="#about"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary underline decoration-primary/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-primary"
            >
              {tHero("explore")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* full-width muted image strip below the headline */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-[1100px] overflow-hidden rounded-sm bg-muted sm:mt-20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={heroTitle}
            className="h-[34vh] w-full object-cover grayscale-[0.15] sm:h-[44vh] lg:h-[52vh]"
          />
        </motion.div>
      </section>

      <Rule />

      {/* ── 关于会馆 / About ─────────────────────────────────── */}
      <section id="about" className="px-6 py-20 sm:py-28">
        <motion.div {...fade} className="mx-auto max-w-[720px]">
          <Eyebrow>{tAbout("sectionLabel")}</Eyebrow>
          <h2 className="font-display mt-6 text-3xl leading-tight tracking-tight sm:text-4xl">
            {aboutTitle}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">{aboutSubtitle}</p>

          <div className="mt-8 space-y-6 text-lg leading-[1.9] text-foreground/85">
            <p>{aboutContent}</p>
            <p>{tAbout("intro2")}</p>
          </div>

          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-primary">
            {tAbout("tagline")}
          </p>

          {/* three large numbers in a row */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-12">
            {aboutStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl tracking-tight text-primary sm:text-5xl lg:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Rule />

      {/* ── 最新动态 / Latest News ───────────────────────────── */}
      <section id="news" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div
            {...fade}
            className="flex items-baseline justify-between gap-4"
          >
            <div>
              <Eyebrow>{tNews("sectionLabel")}</Eyebrow>
              <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
                {tNews("title")}
              </h2>
            </div>
            <a
              href="/news"
              className="shrink-0 text-sm font-medium text-primary underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {tNews("viewAll")}
            </a>
          </motion.div>

          <ul className="mt-12 divide-y divide-border">
            {news.map((article, i) => (
              <motion.li
                key={article.id}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <a
                  href={`/news/${article.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <span className="flex-1 text-lg leading-snug text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </span>
                  <time className="shrink-0 text-sm tabular-nums text-muted-foreground">
                    {formatDate(article.date, locale)}
                  </time>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <Rule />

      {/* ── 会馆活动 / Activities ────────────────────────────── */}
      <section id="activities" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div {...fade}>
            <Eyebrow>{tAct("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {tAct("title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {tAct("subtitle")}
            </p>
          </motion.div>

          <dl className="mt-12 space-y-10">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.slug}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid gap-2 sm:grid-cols-[1fr_2fr] sm:gap-8"
              >
                <dt className="font-display text-xl tracking-tight text-foreground">
                  {activity.title}
                </dt>
                <dd className="text-lg leading-relaxed text-muted-foreground">
                  {activity.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <Rule />

      {/* ── 历史传承 / Heritage ──────────────────────────────── */}
      <section id="history" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div {...fade}>
            <Eyebrow>{tHistory("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {tHistory("title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {tHistory("subtitle")}
            </p>
          </motion.div>

          <ul className="mt-12 divide-y divide-border">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid gap-2 py-6 sm:grid-cols-[5rem_1fr] sm:gap-8"
              >
                <span className="font-display text-2xl tabular-nums text-primary/70 sm:text-3xl">
                  {m.year}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-tight text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <Rule />

      {/* ── 世界恳亲大会 / Convention — closing statement ─────── */}
      <section id="conference" className="px-6 py-24 sm:py-36">
        <motion.div {...fade} className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{tConf("sectionLabel")}</Eyebrow>
          <h2 className="font-display mx-auto mt-8 max-w-[36rem] text-balance text-3xl leading-[1.2] tracking-tight sm:text-5xl">
            {confTitle}
          </h2>
          <p className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground">
            {confDescription}
          </p>

          <div className="mt-12 inline-flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-primary">
              {tConf("nextConference")}
            </span>
            <span className="font-display text-xl tracking-tight text-foreground">
              {tConf("nextConferenceInfo")}
            </span>
            <a
              href="#"
              className="mt-4 text-sm font-medium text-primary underline decoration-primary/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-primary"
            >
              {tConf("getUpdates")}
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
