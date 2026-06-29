"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

/* 庄重典藏 / Stately Archive — Organization Structure。延续 HomeStately / AboutStately：
   暗色展厅、罗马数字展陈编号、烫金细线、双线框、展签式说明。组织层级呈现为
   一组「展陈编号」的名录：每层级以罗马数字 + 金线起首，职衔以展签式说明牌铺陈。 */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function StructureStately() {
  const t = useTranslations("structure");
  const tCommon = useTranslations("common");

  const orgStructure = [
    {
      level: t("level1"),
      roles: [
        { title: t("role_honoraryLifePresident"), description: t("role_honoraryLifePresidentDesc") },
        { title: t("role_honoraryPresident"), description: t("role_honoraryPresidentDesc") },
        { title: t("role_honoraryChairman"), description: t("role_honoraryChairmanDesc") },
      ],
    },
    {
      level: t("level2"),
      roles: [
        { title: t("role_president"), description: t("role_presidentDesc") },
        { title: t("role_vicePresident"), description: t("role_vicePresidentDesc") },
        { title: t("role_trustee"), description: t("role_trusteeDesc") },
      ],
    },
    {
      level: t("level3"),
      roles: [
        { title: t("role_secretary"), description: t("role_secretaryDesc") },
        { title: t("role_deputySecretary"), description: t("role_deputySecretaryDesc") },
        { title: t("role_treasurer"), description: t("role_treasurerDesc") },
        { title: t("role_deputyTreasurer"), description: t("role_deputyTreasurerDesc") },
        { title: t("role_auditor"), description: t("role_auditorDesc") },
      ],
    },
    {
      level: t("level4"),
      roles: [
        { title: t("role_socialCommittee"), description: t("role_socialCommitteeDesc") },
        { title: t("role_operaGroup"), description: t("role_operaGroupDesc") },
        { title: t("role_womenGroup"), description: t("role_womenGroupDesc") },
        { title: t("role_youthGroup"), description: t("role_youthGroupDesc") },
      ],
    },
    {
      level: t("level5"),
      roles: [
        { title: t("role_businessAdvisor"), description: t("role_businessAdvisorDesc") },
        { title: t("role_legalAdvisor"), description: t("role_legalAdvisorDesc") },
        { title: t("role_medicalAdvisor"), description: t("role_medicalAdvisorDesc") },
      ],
    },
  ];

  return (
    <>
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex items-center justify-center overflow-hidden px-6 py-24 md:py-28">
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
            <div className="border border-accent/40 px-6 py-14 text-center sm:px-12 sm:py-16">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("sectionLabel")}
              </p>
              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {t("title")}
              </h1>
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ ORG PLAQUES — numbered exhibit registers ════════ */}
      <section className="border-t border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/about"
            className="group mb-16 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {tCommon("backToAbout")}
          </Link>

          <div className="space-y-20">
            {orgStructure.map((group, gIdx) => (
              <motion.div
                key={gIdx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: gIdx * 0.05, ease }}
              >
                {/* level header — Roman numeral + gold hairline */}
                <div className="text-center">
                  <div
                    className="font-display text-4xl md:text-5xl text-primary/40 leading-none select-none"
                    aria-hidden
                  >
                    {ROMAN[gIdx]}
                  </div>
                  <div className="mx-auto mt-5 h-px w-16 bg-primary/50" />
                  <h2 className="mt-5 text-2xl md:text-3xl font-bold tracking-[0.08em]">
                    {group.level}
                  </h2>
                </div>

                {/* role plaques */}
                <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                  {group.roles.map((role, rIdx) => (
                    <div key={rIdx} className="bg-card p-7">
                      <h3 className="text-lg font-bold tracking-[0.05em] text-primary">
                        {role.title}
                      </h3>
                      <div className="mt-3 h-px w-10 bg-primary/40" />
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
