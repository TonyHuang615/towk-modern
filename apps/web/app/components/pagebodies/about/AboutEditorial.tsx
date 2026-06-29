"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

function Rule() {
  return (
    <div className="mx-auto max-w-[720px] px-6">
      <div className="border-t border-border" />
    </div>
  );
}

// 编辑杂志 — About。延续 HomeEditorial：象牙底、衬线大标题 + 克制无衬线正文、
// Eyebrow/Rule 母题、居中窄栏 (max-w 720) 与杂志分栏。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutEditorial({ content }: { content: Record<string, any> }) {
  const t = useTranslations("about");
  const about = content.about || {};

  const heroImage = "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=900&q=80";

  const stats: Array<{ value: string; label: string }> = about?.stats || [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  const values = [
    { title: t("value1Title"), description: t("value1Desc") },
    { title: t("value2Title"), description: t("value2Desc") },
    { title: t("value3Title"), description: t("value3Desc") },
    { title: t("value4Title"), description: t("value4Desc") },
  ];

  const milestoneYears = ["1876", "1923", "1943", "1946", "1972", "1992", "2003"] as const;
  const milestones = milestoneYears.map((year) => ({
    year,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: t(`milestone${year}` as any),
  }));

  return (
    <>
      {/* ── HERO — centered masthead + wide image strip ── */}
      <section className="px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
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
            {about?.title || t("pageTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {about?.subtitle || t("defaultSubtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-[1100px] overflow-hidden rounded-sm bg-muted sm:mt-20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={t("altImage")}
            className="h-[34vh] w-full object-cover grayscale-[0.15] sm:h-[44vh] lg:h-[52vh]"
          />
        </motion.div>
      </section>

      <Rule />

      {/* ── OUR STORY — narrow column + big numbers ── */}
      <section className="px-6 py-20 sm:py-28">
        <motion.div {...fade} className="mx-auto max-w-[720px]">
          <Eyebrow>{t("sectionLabel")}</Eyebrow>
          <h2 className="font-display mt-6 text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("ourStory")}
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-[1.9] text-foreground/85">
            <p>{about?.content || t("storyP1")}</p>
            <p>{t("storyP2")}</p>
            <p>{t("storyP3")}</p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-12">
            {stats.map((stat, i) => (
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

      {/* ── OUR VALUES — numbered magazine columns ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div {...fade}>
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("ourValues")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("valuesSubtitle")}</p>
          </motion.div>

          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <dt className="flex items-baseline gap-3">
                  <span className="font-display text-sm tabular-nums text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl tracking-tight text-foreground">
                    {v.title}
                  </span>
                </dt>
                <dd className="mt-2 pl-8 leading-relaxed text-muted-foreground">
                  {v.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <Rule />

      {/* ── EXPLORE FURTHER — underlined editorial links ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <ul className="divide-y divide-border">
            {[
              { href: "/about/structure", title: t("structure"), desc: t("structureDesc") },
              { href: "/about/board", title: t("board"), desc: t("boardDesc") },
            ].map((l, i) => (
              <motion.li
                key={l.href}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={l.href}
                  className="group flex items-baseline justify-between gap-6 py-6"
                >
                  <span className="flex-1">
                    <span className="font-display text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {l.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {l.desc}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <Rule />

      {/* ── MILESTONES — dated chronicle list ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div {...fade}>
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("milestones")}
            </h2>
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
                <p className="leading-relaxed text-muted-foreground">{m.event}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
