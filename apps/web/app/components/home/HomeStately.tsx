"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Globe, Users, Calendar } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  getLocalizedNews,
  formatDate as formatNewsDate,
} from "../../../lib/newsData";
import { getLocalizedActivities } from "../../../lib/activitiesData";

/* ── 庄重典藏 / Stately Archive ──────────────────────────────────────
   A dark museum / 典藏展厅 reading of the homepage. Distinctiveness lives in
   the layout: a double gold-hairline hero frame, sections presented as
   numbered 展陈 exhibits (Ⅰ–Ⅴ) each opened by a roman numeral + gold rule +
   wide-tracked serif heading, engraved stat figures, a solemn gold-ruled
   chronicle, restrained plaque cards, and a dated archival list.
   Colour comes entirely from the global semantic tokens (dark in this theme).
──────────────────────────────────────────────────────────────────── */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ExhibitHeader({
  numeral,
  eyebrow,
  title,
  lede,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
      className="mx-auto max-w-3xl text-center"
    >
      <div
        className="font-display text-5xl md:text-6xl text-primary/40 leading-none select-none"
        aria-hidden
      >
        {numeral}
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-primary/50" />
      <p className="mt-6 text-[0.7rem] uppercase tracking-[0.42em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.08em]">
        {title}
      </h2>
      {lede ? (
        <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
          {lede}
        </p>
      ) : null}
    </motion.div>
  );
}

export default function HomeStately({ content }: { content: any }) {
  const locale = useLocale();
  const tHero = useTranslations("hero");
  const tAbout = useTranslations("about");
  const tNews = useTranslations("news");
  const tHistory = useTranslations("history");
  const tConference = useTranslations("conference");
  const tActivities = useTranslations("activities");

  /* ── Hero (text from i18n; images from content.json) ──── */
  const slide0 = content?.hero?.slides?.[0];
  const siteTitle = tAbout("defaultTitle");
  const siteSubtitle = tAbout("defaultSubtitle");
  const heroDesc = tHero("slide1Desc");
  const heroCaption = tHero("slide1Title");
  const heroImage =
    slide0?.image ||
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&q=80";

  /* ── About + stats ────────────────────────────────────── */
  const aboutContent = tAbout("defaultContent");
  const stats: Array<{ value: string; label: string }> = [
    { value: tAbout("stat1Value"), label: tAbout("stat1Label") },
    { value: tAbout("stat2Value"), label: tAbout("stat2Label") },
    { value: tAbout("stat3Value"), label: tAbout("stat3Label") },
  ];

  /* ── History chronicle ────────────────────────────────── */
  const milestoneYears = ["1876", "1923", "1943", "1992", "2003"];
  const milestones: Array<{
    year: string;
    title: string;
    description: string;
  }> = milestoneYears.map((year) => ({
    year,
    title: tHistory(`milestone${year}Title`),
    description: tHistory(`milestone${year}Desc`),
  }));

  /* ── Conference ───────────────────────────────────────── */
  const confIcons = [Globe, Users, Calendar];
  const confFeatures: Array<{ title: string; description: string }> = [
    {
      title: tConference("feature1Title"),
      description: tConference("feature1Desc"),
    },
    {
      title: tConference("feature2Title"),
      description: tConference("feature2Desc"),
    },
    {
      title: tConference("feature3Title"),
      description: tConference("feature3Desc"),
    },
  ];
  const pastConferences: Array<{
    year: string;
    location: string;
    theme: string;
  }> = [
    {
      year: "2019",
      location: tConference("locSingapore"),
      theme: tConference("conf11"),
    },
    {
      year: "2017",
      location: tConference("locHongKong"),
      theme: tConference("conf10"),
    },
    {
      year: "2015",
      location: tConference("locDongguan"),
      theme: tConference("conf9"),
    },
  ];

  /* ── Activities + News from data accessors ────────────── */
  const activities = getLocalizedActivities(locale);
  const news = getLocalizedNews(locale).slice(0, 5);

  return (
    <main className="bg-background text-foreground">
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24">
        {/* faint engraved corner motif lines */}
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
          {/* double hairline frame */}
          <div className="border border-primary/50 p-2 sm:p-3">
            <div className="border border-accent/40 px-6 py-14 text-center sm:px-12 sm:py-20">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {tHero("slide1Subtitle")}
              </p>
              <p className="mt-5 text-xs tracking-[0.4em] text-muted-foreground">
                {locale === "en" ? "Established · 1876" : "创立于 · 1876"}
              </p>

              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {siteTitle}
              </h1>

              {/* centered gold divider rule with diamond */}
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>

              <p className="mt-7 text-base tracking-[0.18em] text-accent sm:text-lg">
                {siteSubtitle}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {heroDesc}
              </p>

              <a
                href="#exhibit-about"
                className="mt-10 inline-flex items-center gap-2 border border-primary/60 px-7 py-3 text-xs uppercase tracking-[0.32em] text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                {tHero("explore")}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ Dignified wide plate with caption ════════ */}
      <section className="px-6 pb-20">
        <motion.figure
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="relative mx-auto aspect-[21/9] max-w-6xl overflow-hidden border border-border"
        >
          <Image
            src={heroImage}
            alt={heroCaption}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-10">
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-accent">
              {locale === "en" ? "Collection · Archive" : "典藏 · Archive"}
            </span>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-bold tracking-[0.08em] text-white sm:text-2xl">
              {heroCaption}
            </p>
          </figcaption>
        </motion.figure>
      </section>

      {/* ════════ Ⅰ — 关于会馆 ════════ */}
      <section
        id="exhibit-about"
        className="border-t border-border px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <ExhibitHeader
            numeral={ROMAN[0]}
            eyebrow={tAbout("sectionLabel")}
            title={tAbout("pageTitle")}
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* formal two-column body */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-7"
            >
              <h3 className="text-2xl font-bold tracking-[0.06em]">
                {siteTitle}
              </h3>
              <p className="mt-2 text-sm tracking-[0.2em] text-accent">
                {siteSubtitle}
              </p>
              <div className="mt-8 space-y-6 text-base leading-loose text-muted-foreground md:columns-2 md:gap-10 [&>p]:break-inside-avoid">
                <p>{aboutContent}</p>
                <p>{tAbout("intro2")}</p>
              </div>
              <p className="mt-8 border-l-2 border-primary/60 pl-4 text-sm tracking-[0.18em] text-foreground">
                {tAbout("tagline")}
              </p>
            </motion.div>

            {/* engraved stat figures */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="lg:col-span-5"
            >
              <div className="divide-y divide-border border border-border bg-card">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between gap-6 px-7 py-7"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="font-display text-4xl font-bold text-primary md:text-5xl">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ Ⅱ — 历史传承 (solemn gold-ruled chronicle) ════════ */}
      <section className="border-t border-border bg-card/40 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader
            numeral={ROMAN[1]}
            eyebrow={tHistory("sectionLabel")}
            title={tHistory("title")}
            lede={tHistory("subtitle")}
          />

          <div className="relative mt-16 pl-8 sm:pl-12">
            {/* vertical gold rule */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent sm:left-1" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year + m.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease }}
                  className="relative"
                >
                  {/* node marker on the rule */}
                  <span className="absolute -left-8 top-2 h-2 w-2 rotate-45 bg-primary sm:-left-[2.85rem]" />
                  <div className="font-display text-2xl font-bold tracking-[0.1em] text-primary">
                    {m.year}
                  </div>
                  <h3 className="mt-1 text-xl font-bold tracking-[0.05em]">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ Ⅲ — 世界东安恳亲大会 (plaque cards) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ExhibitHeader
            numeral={ROMAN[2]}
            eyebrow={tConference("sectionLabel")}
            title={tConference("title")}
            lede={tConference("description")}
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {confFeatures.map((f, i) => {
              const Icon = confIcons[i] || Globe;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="border border-primary/30 bg-card p-8 text-center"
                >
                  <Icon className="mx-auto h-7 w-7 text-primary" />
                  <h3 className="mt-5 text-lg font-bold tracking-[0.06em]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* past conferences as an engraved register */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-10 border border-border bg-card"
          >
            <div className="border-b border-border px-7 py-5 text-center text-xs uppercase tracking-[0.35em] text-primary">
              {tConference("pastConferences")}
            </div>
            <div className="divide-y divide-border">
              {pastConferences.map((c) => (
                <div
                  key={c.year}
                  className="flex flex-col gap-1 px-7 py-5 sm:flex-row sm:items-center sm:gap-8"
                >
                  <span className="font-display text-2xl font-bold text-primary/70 sm:w-24">
                    {c.year}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold tracking-[0.04em]">{c.theme}</h4>
                    <p className="text-sm text-muted-foreground">
                      {c.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ Ⅳ — 会馆活动 (plaque cards) ════════ */}
      <section className="border-t border-border bg-card/40 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ExhibitHeader
            numeral={ROMAN[3]}
            eyebrow={tActivities("sectionLabel")}
            title={tActivities("title")}
            lede={tActivities("subtitle")}
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {activities.map((a, i) => (
              <motion.article
                key={a.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="group flex flex-col border border-primary/30 bg-card sm:flex-row"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:w-44 sm:flex-shrink-0">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover grayscale-[0.2] transition-all duration-500 group-hover:grayscale-0"
                    sizes="(max-width: 640px) 100vw, 11rem"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <span className="text-[0.65rem] uppercase tracking-[0.32em] text-accent">
                    {a.subtitle}
                  </span>
                  <h3 className="mt-2 text-xl font-bold tracking-[0.05em]">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ Ⅴ — 最新动态 (restrained dated list) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader
            numeral={ROMAN[4]}
            eyebrow={tNews("sectionLabel")}
            title={tNews("title")}
            lede={tNews("subtitle")}
          />

          <div className="mt-16 divide-y divide-border border-y border-border">
            {news.map((article, i) => (
              <motion.a
                key={article.id}
                href={`/news/${article.slug}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }}
                className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div className="sm:w-44 sm:flex-shrink-0">
                  <time className="font-display text-sm tracking-[0.12em] text-primary">
                    {formatNewsDate(article.date, locale)}
                  </time>
                  <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {article.category}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold leading-snug tracking-[0.04em] transition-colors duration-200 group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                </div>
                <ArrowUpRight className="hidden h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary sm:block" />
              </motion.a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/news"
              className="inline-flex items-center gap-2 border border-primary/60 px-7 py-3 text-xs uppercase tracking-[0.32em] text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {tNews("viewAll")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
