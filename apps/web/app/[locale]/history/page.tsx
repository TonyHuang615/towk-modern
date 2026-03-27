"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HistoryPage() {
  const t = useTranslations("history");

  const milestones = [
    { year: "1876", title: t("milestone1876Title"), description: t("milestone1876Desc") },
    { year: "1923", title: t("milestone1923Title"), description: t("milestone1923Desc") },
    { year: "1943", title: t("milestone1943Title"), description: t("milestone1943Desc") },
    { year: "1946", title: t("milestone1946Title"), description: t("milestone1946Desc") },
    { year: "1972", title: t("milestone1972Title"), description: t("milestone1972Desc") },
    { year: "1992", title: t("milestone1992Title"), description: t("milestone1992Desc") },
    { year: "2003", title: t("milestone2003Title"), description: t("milestone2003Desc") },
    { year: "2019", title: t("milestone2019Title"), description: t("milestone2019Desc") },
  ];

  const eras = [
    { period: t("era1Period"), title: t("era1Title"), description: t("era1Desc") },
    { period: t("era2Period"), title: t("era2Title"), description: t("era2Desc") },
    { period: t("era3Period"), title: t("era3Title"), description: t("era3Desc") },
    { period: t("era4Period"), title: t("era4Title"), description: t("era4Desc") },
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
            <h1 className="mt-3 md:mt-4 text-3xl md:text-5xl lg:text-6xl font-bold">
              {t("title")}
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent hidden lg:block" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`relative flex items-start gap-8 mb-16 flex-col lg:gap-16 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                >
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary/20">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 text-xl md:text-2xl font-bold">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-foreground/70 max-w-md">
                    {milestone.description}
                  </p>
                </div>

                <div className="relative z-10 hidden lg:block">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eras */}
      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t("historicalPeriods")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eras.map((era, index) => (
              <motion.div
                key={era.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-background text-center shadow-card"
              >
                <span className="text-accent text-sm font-medium">
                  {era.period}
                </span>
                <h3 className="text-xl font-bold mt-2">{era.title}</h3>
                <p className="text-foreground/70 mt-2 text-sm">
                  {era.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
