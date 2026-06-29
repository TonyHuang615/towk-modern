"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Users, Calendar } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

/* 庄重典藏 / Stately Archive — Conference。延续 HomeStately：暗色展厅、罗马数字
   展陈编号、烫金细线、双线框、展签式说明、镌刻数字、金线编年；旗舰世界恳亲大会
   以双金线框英雄与宽幅展板呈现。 */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ"];
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
export default function ConferenceStately({ content }: { content: Record<string, any> }) {
  const locale = useLocale();
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
                {t("nextConferenceInfo")}
              </p>

              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {conference?.title || t("title")}
              </h1>

              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>

              <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {conference?.description || t("description")}
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
            alt={t("altConference")}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-10">
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-accent">
              {locale === "en" ? "Convention · Archive" : "恳亲 · Archive"}
            </span>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-bold tracking-[0.08em] text-white sm:text-2xl">
              {t("altConference")}
            </p>
          </figcaption>
        </motion.figure>
      </section>

      {/* ════════ Ⅰ — 大会简介 / About (two-column + plaque pillars) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ExhibitHeader numeral={ROMAN[0]} eyebrow={t("sectionLabel")} title={t("aboutTitle")} />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-7"
            >
              <h3 className="text-2xl font-bold tracking-[0.06em]">
                {conference?.title || t("title")}
              </h3>
              <p className="mt-2 text-sm tracking-[0.2em] text-accent">
                {t("nextConferenceInfo")}
              </p>
              <div className="mt-8 space-y-6 text-base leading-loose text-muted-foreground md:columns-2 md:gap-10 [&>p]:break-inside-avoid">
                <p>{t("aboutP1")}</p>
                <p>{t("aboutP2")}</p>
                <p>{t("aboutP3")}</p>
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
                {features.map((f) => (
                  <div key={f.title} className="flex items-start gap-5 px-7 py-7">
                    <f.icon className="mt-1 h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h4 className="text-base font-bold tracking-[0.05em]">{f.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ Ⅱ — 历届大会 / Past Conventions (gold-ruled chronicle) ════════ */}
      <section className="border-t border-border bg-card/40 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader numeral={ROMAN[1]} eyebrow={t("sectionLabel")} title={t("pastConferences")} />

          <div className="relative mt-16 pl-8 sm:pl-12">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent sm:left-1" />
            <div className="space-y-12">
              {pastConferences.map((c: { year: string; location: string; theme: string }, i: number) => (
                <motion.div
                  key={c.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease }}
                  className="relative"
                >
                  <span className="absolute -left-8 top-2 h-2 w-2 rotate-45 bg-primary sm:-left-[2.85rem]" />
                  <div className="font-display text-2xl font-bold tracking-[0.1em] text-primary">
                    {c.year}
                  </div>
                  <p className="mt-2 max-w-2xl font-bold leading-relaxed tracking-[0.04em]">
                    {c.theme}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    {c.location}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ Ⅲ — 下届大会 / Next Convention (engraved frame) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader
            numeral={ROMAN[2]}
            eyebrow={t("nextConference")}
            title={t("nextConferenceInfo")}
            lede={t("nextConferenceLocation")}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-14 flex justify-center"
          >
            <button className="border border-primary/60 px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-primary transition-colors duration-200 hover:bg-primary/10">
              {t("getUpdates")}
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
