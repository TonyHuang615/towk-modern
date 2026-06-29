"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

/* 庄重典藏 / Stately Archive — History。延续 HomeStately / AboutStately：暗色展厅、
   罗马数字展陈编号、烫金细线、双线框、镌刻数字、金线编年。大事年表呈现为罗马数字
   编号的展陈编年时间轴；历史分期呈现为镌刻纪元登录册。 */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ"];
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
export default function HistoryStately({ content }: { content: Record<string, any> }) {
  const locale = useLocale();
  const t = useTranslations("history");

  const milestoneYears = ["1876", "1923", "1943", "1946", "1972", "1992", "2003", "2019"] as const;
  const milestones = milestoneYears.map((year) => ({
    year,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    title: t(`milestone${year}Title` as any),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description: t(`milestone${year}Desc` as any),
  }));

  const eras = [
    { period: t("era1Period"), title: t("era1Title"), description: t("era1Desc") },
    { period: t("era2Period"), title: t("era2Title"), description: t("era2Desc") },
    { period: t("era3Period"), title: t("era3Title"), description: t("era3Desc") },
    { period: t("era4Period"), title: t("era4Title"), description: t("era4Desc") },
  ];

  return (
    <>
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6 py-24">
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
                {locale === "en" ? "Chronicle · Since 1876" : "编年 · 始于 1876"}
              </p>

              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {t("title")}
              </h1>

              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ Ⅰ — 历史分期 / Historical Periods (engraved register) ════════ */}
      <section className="border-t border-border bg-card/40 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <ExhibitHeader
            numeral={ROMAN[0]}
            eyebrow={t("sectionLabel")}
            title={t("historicalPeriods")}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-16 border border-border bg-card"
          >
            <div className="divide-y divide-border">
              {eras.map((e) => (
                <div
                  key={e.period}
                  className="grid gap-3 px-7 py-7 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8"
                >
                  <span className="font-display text-xl font-bold tracking-[0.1em] text-primary">
                    {e.period}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-[0.06em]">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {e.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ Ⅱ — 大事记 / Milestones (Roman-numeral exhibit timeline) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader numeral={ROMAN[1]} eyebrow={t("sectionLabel")} title={t("title")} />

          <div className="relative mt-16 pl-10 sm:pl-16">
            <div className="absolute left-1 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent sm:left-3" />
            <div className="space-y-14">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease }}
                  className="relative"
                >
                  <span
                    className="absolute -left-10 top-1 font-display text-lg text-primary/50 select-none sm:-left-16"
                    aria-hidden
                  >
                    {ROMAN[i]}
                  </span>
                  <span className="absolute -left-[2.05rem] top-2 h-2 w-2 rotate-45 bg-primary sm:-left-[3.4rem]" />
                  <div className="font-display text-2xl font-bold tracking-[0.1em] text-primary">
                    {m.year}
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-[0.05em]">{m.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
