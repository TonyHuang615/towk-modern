"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import {
  Music,
  Briefcase,
  Users,
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ActivitiesPage() {
  const t = useTranslations("activities");
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({}));
  }, []);

  const activities = content.activities || {};

  const defaultActivities = [
    {
      icon: Music,
      slug: "cantonese-opera",
      title: t("act1Title"),
      description: t("pageAct1Desc"),
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    },
    {
      icon: Briefcase,
      slug: "business",
      title: t("act2Title"),
      description: t("pageAct2Desc"),
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    },
    {
      icon: Users,
      slug: "youth",
      title: t("act3Title"),
      description: t("pageAct3Desc"),
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    },
    {
      icon: Sparkles,
      slug: "traditions",
      title: t("pageAct4Title"),
      description: t("pageAct4Desc"),
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    },
  ];

  const items = activities?.items || defaultActivities;

  const upcomingEvents = [
    { title: t("event1Title"), date: t("event1Date"), location: t("event1Location") },
    { title: t("event2Title"), date: t("event2Date"), location: t("event2Location") },
    { title: t("event3Title"), date: t("event3Date"), location: t("event3Location") },
    { title: t("event4Title"), date: t("event4Date"), location: t("event4Location") },
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
              {activities?.title || t("title")}
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((activity: any, index: number) => (
              <motion.div
                key={activity.slug || activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{activity.title}</h3>
                  </div>
                  <p className="text-white/75 mb-4">
                    {activity.description}
                  </p>
                  <Link
                    href={`/activities/${activity.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                  >
                    {t("learnMore")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t("upcomingEvents")}</h2>
            <p className="mt-4 text-foreground/70">{t("upcomingSubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-background text-center"
              >
                <Calendar className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">{event.title}</h3>
                <p className="text-sm text-foreground/60 mb-1">{event.date}</p>
                <p className="text-sm text-foreground/60 flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" /> {event.location}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("joinTitle")}</h2>
          <p className="text-foreground/70 mb-8">
            {t("joinDesc")}
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors">
            {t("viewCalendar")}
          </button>
        </div>
      </section>

      <Footer data={content.site} />
    </main>
  );
}
