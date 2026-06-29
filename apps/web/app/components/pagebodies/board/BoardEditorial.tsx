"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { boardTerms } from "./boardData";

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
    <div className="mx-auto max-w-[760px] px-6">
      <div className="border-t border-border" />
    </div>
  );
}

// 编辑杂志 — Board。延续 AboutEditorial：象牙底、衬线大标题、Eyebrow/Rule 母题、
// 居中窄栏。理事会名册以杂志刊头 + 职衔/姓名分栏行呈现，行间以细线分隔。
export default function BoardEditorial() {
  const t = useTranslations("board");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* ── HERO — centered masthead ── */}
      <section className="px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-[760px] text-center">
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
            className="font-display mt-7 text-balance text-[2.6rem] leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.25rem] lg:leading-[1.04]"
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

      {/* ── BACK LINK ── */}
      <section className="px-6 pt-10">
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {tCommon("backToAbout")}
          </Link>
        </div>
      </section>

      {/* ── ROSTER — magazine masthead per term ── */}
      {boardTerms.map((term) => (
        <section key={term.termNo} className="px-6 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="mx-auto max-w-[760px]">
            <motion.div {...fade} className="border-b-2 border-foreground pb-5">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl leading-none tracking-tight sm:text-4xl">
                  {t("termLabel", { no: term.termNo })}
                </h2>
                <span className="font-display text-2xl tabular-nums text-primary/70 sm:text-3xl">
                  {term.years}
                </span>
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {t("president")} · {term.president}
              </p>
            </motion.div>

            <dl className="divide-y divide-border">
              {term.members.map((group, i) => (
                <motion.div
                  key={group.key}
                  {...fade}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
                  className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
                >
                  <dt className="flex items-baseline gap-3">
                    <span className="font-display text-xs tabular-nums text-primary/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg tracking-tight text-foreground">
                      {t(`positions.${group.key}`)}
                    </span>
                  </dt>
                  <dd className="font-display text-lg leading-relaxed tracking-[0.04em] text-muted-foreground sm:text-foreground/85">
                    {group.names.join("、")}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>
      ))}

      <Rule />

      <section className="px-6 py-14">
        <p className="mx-auto max-w-[760px] text-center text-sm text-muted-foreground">
          {t("note")}
        </p>
      </section>
    </>
  );
}
