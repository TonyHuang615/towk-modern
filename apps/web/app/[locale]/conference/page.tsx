"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Globe, Users, Calendar, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ConferencePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  const t = useTranslations("conference");

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({}));
  }, []);

  const conference = content.conference || {};

  const features = conference?.features || [
    { icon: Globe, title: t("feature1Title"), description: t("feature1Desc") },
    { icon: Users, title: t("feature2Title"), description: t("feature2Desc") },
    {
      icon: Calendar,
      title: t("feature3Title"),
      description: t("feature3Desc"),
    },
  ];

  const pastConferences = conference?.pastConferences || [
    { year: "2019", location: t("locSingapore"), theme: t("conf11") },
    { year: "2017", location: t("locHongKong"), theme: t("conf10") },
    { year: "2015", location: t("locMalaysia"), theme: t("conf9") },
    { year: "2012", location: t("locHongKong"), theme: t("conf8") },
    { year: "2008", location: t("locKuching"), theme: t("conf7") },
    { year: "2005", location: t("locSingapore"), theme: t("conf6") },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-20 pb-8 md:pt-32 md:pb-16 bg-gradient-to-b from-accent/10 to-transparent">
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
              {conference?.title || t("title")}
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
              {conference?.description || t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map(/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            (feature: any, index: number) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-foreground/5"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">{t("aboutTitle")}</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  {t("aboutP1")}
                </p>
                <p>
                  {t("aboutP2")}
                </p>
                <p>
                  {t("aboutP3")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
                alt={t("altConference")}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("pastConferences")}</h2>
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="space-y-4">
              {pastConferences.map((conf: { year: string; location: string; theme: string }, index: number) => (
                <motion.div
                  key={conf.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold text-primary/40 group-hover:text-primary transition-colors">
                      {conf.year}
                    </span>
                    <div>
                      <h4 className="font-medium">{conf.theme}</h4>
                      <p className="text-sm text-foreground/60">
                        {conf.location}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("nextConference")}</h2>
          <p className="text-xl opacity-90 mb-8">
            {t("nextConferenceInfo")}
          </p>
          <p className="mb-8 opacity-80">{t("nextConferenceLocation")}</p>
          <button className="px-8 py-3 bg-white text-primary rounded-full font-medium hover:bg-white/90 transition-colors">
            {t("getUpdates")}
          </button>
        </div>
      </section>

      <Footer data={content.site} />
    </main>
  );
}
