"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Target, Eye, Shield, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

/* 庄重典藏 / Stately Archive — About。延续 HomeStately：暗色展厅、罗马数字
   展陈编号、烫金细线、双线框、展签式说明、镌刻数字、金线编年。 */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"];
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
      <p className="mt-6 text-[0.7rem] uppercase tracking-[0.42em] text-primary">{eyebrow}</p>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutStately({ content }: { content: Record<string, any> }) {
  const locale = useLocale();
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

  return (
    <>
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden px-6 py-24">
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
              <p className="mt-5 text-xs tracking-[0.4em] text-muted-foreground">
                {locale === "en" ? "Established · 1876" : "创立于 · 1876"}
              </p>

              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {about?.title || t("pageTitle")}
              </h1>

              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>

              <p className="mt-7 text-base tracking-[0.18em] text-accent sm:text-lg">
                {about?.subtitle || t("defaultSubtitle")}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {about?.content || t("storyP1")}
              </p>
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
            alt={t("altImage")}
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
              {t("altImage")}
            </p>
          </figcaption>
        </motion.figure>
      </section>

      {/* ════════ Ⅰ — 本会沿革 / Our Story ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ExhibitHeader numeral={ROMAN[0]} eyebrow={t("sectionLabel")} title={t("ourStory")} />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-7"
            >
              <h3 className="text-2xl font-bold tracking-[0.06em]">
                {about?.title || t("pageTitle")}
              </h3>
              <p className="mt-2 text-sm tracking-[0.2em] text-accent">
                {about?.subtitle || t("defaultSubtitle")}
              </p>
              <div className="mt-8 space-y-6 text-base leading-loose text-muted-foreground md:columns-2 md:gap-10 [&>p]:break-inside-avoid">
                <p>{about?.content || t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>
            </motion.div>

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

      {/* ════════ Ⅱ — 会馆精神 / Our Values (plaque cards) ════════ */}
      <section className="border-t border-border bg-card/40 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ExhibitHeader
            numeral={ROMAN[1]}
            eyebrow={t("sectionLabel")}
            title={t("ourValues")}
            lede={t("valuesSubtitle")}
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="border border-primary/30 bg-card p-8 text-center"
              >
                <v.icon className="mx-auto h-7 w-7 text-primary" />
                <h3 className="mt-5 text-lg font-bold tracking-[0.06em]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ Ⅲ — 大事记 / Milestones (gold-ruled chronicle) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader numeral={ROMAN[2]} eyebrow={t("sectionLabel")} title={t("milestones")} />

          <div className="relative mt-16 pl-8 sm:pl-12">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent sm:left-1" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease }}
                  className="relative"
                >
                  <span className="absolute -left-8 top-2 h-2 w-2 rotate-45 bg-primary sm:-left-[2.85rem]" />
                  <div className="font-display text-2xl font-bold tracking-[0.1em] text-primary">
                    {m.year}
                  </div>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {m.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ Ⅳ — 延伸典藏 / Explore (engraved register) ════════ */}
      <section className="border-t border-border bg-card/40 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader numeral={ROMAN[3]} eyebrow={t("sectionLabel")} title={t("structure")} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-16 border border-border bg-card"
          >
            <div className="divide-y divide-border">
              {[
                { href: "/about/structure", title: t("structure"), desc: t("structureDesc") },
                { href: "/about/board", title: t("board"), desc: t("boardDesc") },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-6 px-7 py-7 transition-colors duration-200 hover:bg-primary/5"
                >
                  <div>
                    <h4 className="text-lg font-bold tracking-[0.05em] transition-colors duration-200 group-hover:text-primary">
                      {l.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
