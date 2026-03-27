"use client";

import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StructurePage() {
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
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-20 pb-8 md:pt-32 md:pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              {t("sectionLabel")}
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
              {t("title")}
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {tCommon("backToAbout")}
          </Link>

          <div className="space-y-10">
            {orgStructure.map((group, gIdx) => (
              <motion.div
                key={gIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gIdx * 0.08 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {gIdx + 1}
                  </span>
                  {group.level}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.roles.map((role, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 rounded-xl bg-foreground/5 hover:bg-foreground/8 transition-colors"
                    >
                      <h3 className="font-bold text-primary">{role.title}</h3>
                      <p className="text-sm text-foreground/60 mt-1">
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

      <Footer />
    </main>
  );
}
