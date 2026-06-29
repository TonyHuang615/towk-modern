"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { boardTerms } from "./boardData";

/* 庄重典藏 / Stately Archive — Board。延续 AboutStately：暗色展厅、罗马数字
   展陈编号、烫金细线、双线框。理事会以「荣誉榜」呈现：每届一方双线金框，
   职衔/姓名以金线展签式名牌罗列。 */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BoardStately() {
  const t = useTranslations("board");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-6 py-24">
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
              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {t("title")}
              </h1>
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mx-auto mt-7 max-w-xl text-base tracking-[0.16em] text-accent sm:text-lg">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ BACK LINK ════════ */}
      <section className="border-t border-border px-6 pt-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {tCommon("backToAbout")}
          </Link>
        </div>
      </section>

      {/* ════════ HONOR BOARD — one framed plate per term ════════ */}
      {boardTerms.map((term, ti) => (
        <section key={term.termNo} className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            {/* exhibit header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease }}
              className="text-center"
            >
              <div
                className="font-display text-5xl text-primary/40 leading-none select-none md:text-6xl"
                aria-hidden
              >
                {ROMAN[ti % ROMAN.length]}
              </div>
              <div className="mx-auto mt-6 h-px w-16 bg-primary/50" />
              <p className="mt-6 text-[0.7rem] uppercase tracking-[0.42em] text-primary">
                {term.years}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-[0.08em] md:text-4xl">
                {t("termLabel", { no: term.termNo })}
              </h2>
              <p className="mt-4 text-sm tracking-[0.2em] text-accent">
                {t("president")} · {term.president}
              </p>
            </motion.div>

            {/* double-framed honor plaque grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="mt-12 border border-primary/40 p-2 sm:p-3"
            >
              <div className="grid gap-px border border-accent/30 bg-border sm:grid-cols-2">
                {term.members.map((group) => (
                  <div
                    key={group.key}
                    className="bg-card px-7 py-6 text-center"
                  >
                    <div className="text-[0.65rem] uppercase tracking-[0.32em] text-primary">
                      {t(`positions.${group.key}`)}
                    </div>
                    <div className="mx-auto mt-3 h-px w-8 bg-primary/40" />
                    <div className="mt-3 font-display text-lg tracking-[0.08em] text-foreground">
                      {group.names.join("、")}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <section className="border-t border-border px-6 py-16">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          {t("note")}
        </p>
      </section>
    </>
  );
}
