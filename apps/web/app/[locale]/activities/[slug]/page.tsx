"use client";

import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getActivityBySlug } from "../../../../lib/activitiesData";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ActivityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const activity = getActivityBySlug(slug);
  const t = useTranslations("activities");

  if (!activity) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">{t("notFound")}</h1>
          <Link href="/activities" className="text-primary hover:underline">{t("backToActivities")}</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToActivities")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              {activity.subtitle}
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold">
              {activity.title}
            </h1>
            <p className="mt-4 text-xl text-foreground/70">
              {activity.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-card-hover"
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-4 text-foreground/80 leading-relaxed"
            >
              {activity.content.trim().split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 p-6 rounded-2xl bg-foreground/5 border border-border">
                <h3 className="font-bold text-lg mb-4">{t("highlights")}</h3>
                <ul className="space-y-3">
                  {activity.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    {t("contactMore")}
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("viewAll")}
            </Link>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
