"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — History。延续 HomeVibrant / AboutVibrant：明亮橙/青、大圆角卡片、
// 柔光色块、年份药丸、悬停上浮。大事年表呈现为彩色时间轴卡片 (交错左右 + 中轴线),
// 历史分期呈现为撞色 bento 卡片。所有文案双语 i18n。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HistoryVibrant({ content }: { content: Record<string, any> }) {
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

  const eraTone = (i: number) =>
    i === 0
      ? "bg-primary text-primary-foreground"
      : i === 1
        ? "bg-card text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)]"
        : i === 2
          ? "bg-accent/15 text-foreground"
          : "bg-gradient-to-br from-primary to-accent text-primary-foreground";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-14 pb-16 sm:pb-24">
        {/* ── HERO card ── */}
        <motion.section
          {...fade(0)}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:p-12 lg:p-16"
        >
          <span className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/10" />
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t("sectionLabel")}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.section>

        {/* ── HISTORICAL PERIODS — color bento cards ── */}
        <motion.div {...fade(0)} className="mt-10 sm:mt-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("sectionLabel")}
          </span>
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
            {t("historicalPeriods")}
          </h2>
        </motion.div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {eras.map((e, i) => (
            <motion.div
              key={e.period}
              {...fade(i * 0.05)}
              className={`flex flex-col rounded-[1.75rem] p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7 ${eraTone(i)}`}
            >
              <span className="text-sm font-semibold opacity-80">{e.period}</span>
              <h3 className="mt-2 text-lg font-bold leading-tight">{e.title}</h3>
              <p
                className={`mt-1 text-sm ${
                  i === 0 || i === 3 ? "text-primary-foreground/85" : "text-muted-foreground"
                }`}
              >
                {e.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── MILESTONES — colorful alternating timeline cards ── */}
        <motion.div {...fade(0)} className="mt-12 sm:mt-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("sectionLabel")}
          </span>
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{t("title")}</h2>
        </motion.div>

        <div className="relative mt-8">
          <div className="pointer-events-none absolute left-6 top-0 h-full w-1 rounded-full bg-gradient-to-b from-primary via-accent to-primary sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-5">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  {...fade(i * 0.04)}
                  className={`relative flex pl-16 sm:w-1/2 sm:pl-0 ${
                    left ? "sm:pr-10" : "sm:ml-auto sm:pl-10"
                  }`}
                >
                  <span
                    className={`absolute left-4 top-6 z-10 h-5 w-5 rounded-full border-4 border-background bg-primary ${
                      left ? "sm:left-auto sm:-right-2.5" : "sm:-left-2.5"
                    }`}
                  />
                  <div className="w-full rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1">
                    <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">
                      {m.year}
                    </span>
                    <h3 className="mt-4 text-lg font-bold leading-tight">{m.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
