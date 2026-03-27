"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Heart, Target, Eye, Shield, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  const t = useTranslations("about");

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({}));
  }, []);

  const about = content.about || {};

  const values = [
    { icon: Heart, title: t("value1Title"), description: t("value1Desc") },
    { icon: Target, title: t("value2Title"), description: t("value2Desc") },
    { icon: Eye, title: t("value3Title"), description: t("value3Desc") },
    { icon: Shield, title: t("value4Title"), description: t("value4Desc") },
  ];

  const milestones = [
    { year: "1876", event: t("milestone1876") },
    { year: "1923", event: t("milestone1923") },
    { year: "1943", event: t("milestone1943") },
    { year: "1946", event: t("milestone1946") },
    { year: "1972", event: t("milestone1972") },
    { year: "1992", event: t("milestone1992") },
    { year: "2003", event: t("milestone2003") },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
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
              {about?.title || t("pageTitle")}
            </h1>
            <p className="mt-4 text-xl text-foreground/70">
              {about?.subtitle || t("defaultSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">{t("ourStory")}</h2>
              <div className="space-y-4 text-lg text-foreground/80">
                <p>
                  {about?.content || t("storyP1")}
                </p>
                <p>
                  {t("storyP2")}
                </p>
                <p>
                  {t("storyP3")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src="https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=900&q=80"
                  alt={t("altImage")}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {(
                  about?.stats || [
                    { value: t("stat1Value"), label: t("stat1Label") },
                    { value: t("stat2Value"), label: t("stat2Label") },
                    { value: t("stat3Value"), label: t("stat3Label") },
                  ]
                ).map((stat: { value: string; label: string }, index: number) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-foreground/5"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/60">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t("ourValues")}</h2>
            <p className="mt-4 text-foreground/70">
              {t("valuesSubtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to sub-pages */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/about/structure"
              className="group flex items-center justify-between p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">{t("structure")}</h3>
                <p className="text-sm text-foreground/60 mt-1">
                  {t("structureDesc")}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/about/board"
              className="group flex items-center justify-between p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">{t("board")}</h3>
                <p className="text-sm text-foreground/60 mt-1">
                  {t("boardDesc")}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Milestones */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t("milestones")}</h2>
          </div>
          <div className="space-y-4">
            {milestones.sort((a, b) => parseInt(a.year) - parseInt(b.year)).map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex gap-6 items-start p-4 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <span className="text-xl font-bold text-primary/70 w-16 shrink-0">{item.year}</span>
                <p className="text-foreground/80">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer data={content.site} />
    </main>
  );
}
