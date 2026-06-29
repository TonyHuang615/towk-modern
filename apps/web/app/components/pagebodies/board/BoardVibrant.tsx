"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import { boardTerms } from "./boardData";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — Board。延续 AboutVibrant：明亮橙/青、大圆角卡片、柔光色块、悬停上浮。
// 理事会名册以彩色圆角成员卡片网格呈现，职衔为彩色胶囊，主席卡突出渐变。
export default function BoardVibrant() {
  const t = useTranslations("board");
  const tCommon = useTranslations("common");

  const chipTone = (i: number) =>
    i % 3 === 0
      ? "bg-primary/10 text-primary"
      : i % 3 === 1
        ? "bg-accent/15 text-accent"
        : "bg-foreground/5 text-foreground/70";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24">
        {/* ── HERO card ── */}
        <motion.section
          {...fade(0)}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground sm:p-12"
        >
          <span className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/10" />
          <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-background/20 px-4 py-1.5 text-xs font-semibold tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            {t("sectionLabel")}
          </span>
          <h1 className="relative mt-5 text-3xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="relative mt-3 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.section>

        {/* ── BACK LINK ── */}
        <motion.div {...fade(0.05)} className="mt-6">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {tCommon("backToAbout")}
          </Link>
        </motion.div>

        {/* ── ROSTER — colorful member cards per term ── */}
        {boardTerms.map((term) => (
          <section key={term.termNo} className="mt-10 sm:mt-14">
            <motion.div
              {...fade(0)}
              className="flex flex-wrap items-end justify-between gap-3"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  {term.years}
                </span>
                <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">
                  {t("termLabel", { no: term.termNo })}
                </h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                <Crown className="h-4 w-4" />
                {t("president")} · {term.president}
              </span>
            </motion.div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {term.members.map((group, i) => (
                <motion.div
                  key={group.key}
                  {...fade(Math.min(i * 0.04, 0.3))}
                  className="flex flex-col rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${chipTone(i)}`}
                  >
                    {t(`positions.${group.key}`)}
                  </span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.names.map((name) => (
                      <span
                        key={name}
                        className="rounded-xl bg-primary/5 px-3 py-1.5 text-sm font-medium text-foreground"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        <p className="mt-12 text-center text-sm text-muted-foreground">{t("note")}</p>
      </div>
    </div>
  );
}
