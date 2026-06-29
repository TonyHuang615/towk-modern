"use client";

import { motion } from "framer-motion";
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

// 编辑杂志 — History。延续 HomeEditorial / AboutEditorial：象牙底、衬线大标题 +
// 克制无衬线正文、Eyebrow/Rule 母题、居中窄栏 (max-w 720)。大事年表呈现为
// 带年份分栏的 divide-y 编年纪事；历史分期呈现为编号杂志专栏。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HistoryEditorial({ content }: { content: Record<string, any> }) {
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
      {/* ── HERO — centered masthead ── */}
      <section className="px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
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
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      <Rule />

      {/* ── HISTORICAL PERIODS — numbered magazine columns ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div {...fade}>
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("historicalPeriods")}
            </h2>
          </motion.div>

          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {eras.map((e, i) => (
              <motion.div
                key={e.period}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <dt className="flex items-baseline gap-3">
                  <span className="font-display text-sm tabular-nums text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl tracking-tight text-foreground">
                    {e.title}
                  </span>
                </dt>
                <dd className="mt-2 pl-8">
                  <span className="block text-xs uppercase tracking-[0.2em] text-primary/70">
                    {e.period}
                  </span>
                  <span className="mt-1 block leading-relaxed text-muted-foreground">
                    {e.description}
                  </span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <Rule />

      {/* ── MILESTONES — dated chronicle list ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div {...fade}>
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
          </motion.div>

          <ul className="mt-12 divide-y divide-border">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid gap-3 py-8 sm:grid-cols-[6rem_1fr] sm:gap-10"
              >
                <span className="font-display text-2xl tabular-nums text-primary/70 sm:text-3xl">
                  {m.year}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-tight text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{m.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
