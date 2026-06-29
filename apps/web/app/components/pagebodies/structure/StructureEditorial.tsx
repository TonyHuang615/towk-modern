"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// 编辑杂志 — Organization Structure。延续 HomeEditorial / AboutEditorial：象牙底、
// 衬线大标题、Eyebrow/Rule 母题、居中窄栏 (max-w 720)。组织层级呈现为编号的
// 杂志式名册：每层级 ⅠⅠ 编号 + 标题，职衔以 definition list 分栏铺陈，规则线分隔。

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

export default function StructureEditorial() {
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
      {/* ── HERO — centered masthead ── */}
      <section className="px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
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
            className="font-display mt-7 text-balance text-[2.4rem] leading-[1.06] tracking-tight sm:text-6xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      <Rule />

      {/* ── ORG ROSTER — numbered magazine hierarchy ── */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/about"
            className="group mb-14 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {tCommon("backToAbout")}
          </Link>

          <div className="space-y-16">
            {orgStructure.map((group, gIdx) => (
              <motion.div key={gIdx} {...fade} transition={{ duration: 0.5, delay: gIdx * 0.06 }}>
                <div className="flex items-baseline gap-4 border-b border-border pb-5">
                  <span className="font-display text-2xl tabular-nums text-primary/50 sm:text-3xl">
                    {String(gIdx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
                    {group.level}
                  </h2>
                </div>

                <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  {group.roles.map((role, rIdx) => (
                    <div key={rIdx}>
                      <dt className="font-display text-lg tracking-tight text-foreground">
                        {role.title}
                      </dt>
                      <dd className="mt-1.5 leading-relaxed text-muted-foreground">
                        {role.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
