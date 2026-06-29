"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// 活力鲜明 — Organization Structure。延续 HomeVibrant / AboutVibrant：明亮橙/青、
// 大圆角卡片、柔光色块、悬停上浮。组织层级呈现为彩色的「层级 bento」：
// 每层级一条横幅 + 该层级职衔铺成的圆角卡片网格，奇偶层级配色交替。

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function StructureVibrant() {
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
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-24">
        {/* ── HERO banner card ── */}
        <motion.section
          {...fade(0)}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:p-12"
        >
          <span className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/10" />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-background/15 px-4 py-1.5 text-xs font-semibold tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            {t("sectionLabel")}
          </span>
          <h1 className="relative mt-5 max-w-3xl text-3xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.section>

        {/* ── back link ── */}
        <motion.div {...fade(0.05)} className="mt-6">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            {tCommon("backToAbout")}
          </Link>
        </motion.div>

        {/* ── ORG TIERS — colorful rounded cards ── */}
        <div className="mt-8 space-y-8 sm:space-y-10">
          {orgStructure.map((group, gIdx) => {
            const accentTier = gIdx % 2 === 1;
            return (
              <motion.section key={gIdx} {...fade(gIdx * 0.05)}>
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${
                      accentTier ? "bg-accent/15 text-accent" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {gIdx + 1}
                  </span>
                  <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{group.level}</h2>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.roles.map((role, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex flex-col rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1"
                    >
                      <span
                        className={`inline-block h-1.5 w-10 rounded-full ${
                          accentTier ? "bg-accent" : "bg-primary"
                        }`}
                      />
                      <h3 className="mt-4 text-lg font-bold leading-tight">{role.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
