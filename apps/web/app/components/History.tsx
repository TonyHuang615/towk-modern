"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface HistoryProps {
  data?: {
    title?: string;
    milestones?: Array<{ year: string; title: string; description: string }>;
  };
}

export default function History({ data }: HistoryProps) {
  const t = useTranslations("history");

  const defaultMilestones = [
    {
      year: "1876",
      title: t("compMilestone1Title"),
      description: t("compMilestone1Desc"),
    },
    {
      year: "1923",
      title: t("compMilestone2Title"),
      description: t("compMilestone2Desc"),
    },
    {
      year: "1943",
      title: t("compMilestone3Title"),
      description: t("compMilestone3Desc"),
    },
    {
      year: "1992",
      title: t("compMilestone4Title"),
      description: t("compMilestone4Desc"),
    },
    {
      year: "2003",
      title: t("compMilestone5Title"),
      description: t("compMilestone5Desc"),
    },
  ];

  const title = data?.title || t("title");
  const milestones = data?.milestones || defaultMilestones;

  return (
    <section id="history" className="py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase">
            {t("sectionLabel")}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />

          <div className="space-y-16 lg:space-y-24">
            {milestones.map((milestone: any, index: number) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex-col lg:gap-16`}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"} text-center`}
                >
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary/20">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 text-xl md:text-2xl font-bold">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-foreground/70 max-w-md mx-auto lg:mx-0">
                    {milestone.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
