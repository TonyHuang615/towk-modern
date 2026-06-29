"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";
import { getActivityBySlug } from "../../../../lib/activitiesData";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

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
    <div className="mx-auto max-w-[760px] px-6">
      <div className="border-t border-border" />
    </div>
  );
}

// 编辑杂志 — Activity detail. 延续 HomeEditorial：象牙底、衬线大标题 + 克制无衬线
// 正文、Eyebrow/Rule 母题、居中窄栏、宽幅图片条、亮点以编号清单分栏呈现。
export default function ActivityDetailEditorial() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const activity = getActivityBySlug(slug, locale);
  const t = useTranslations("activities");

  if (!activity) {
    return (
      <section className="px-6 py-32 text-center">
        <Eyebrow>{t("sectionLabel")}</Eyebrow>
        <h1 className="font-display mt-6 text-4xl tracking-tight">{t("notFound")}</h1>
        <Link
          href="/activities"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToActivities")}
        </Link>
      </section>
    );
  }

  const paras = activity.content.trim().split("\n\n");

  return (
    <article>
      {/* ── HERO — eyebrow + serif masthead ── */}
      <section className="px-6 pt-20 pb-12 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToActivities")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Eyebrow>{activity.subtitle}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-balance text-[2.4rem] leading-[1.07] tracking-tight sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]"
          >
            {activity.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-7 max-w-[40rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {activity.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-[1100px] overflow-hidden rounded-sm bg-muted sm:mt-16"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activity.image}
            alt={activity.title}
            className="h-[34vh] w-full object-cover grayscale-[0.15] sm:h-[44vh] lg:h-[50vh]"
          />
        </motion.div>
      </section>

      <Rule />

      {/* ── STORY — narrow magazine column ── */}
      <section className="px-6 py-20 sm:py-24">
        <motion.div {...fade} className="mx-auto max-w-[760px]">
          <Eyebrow>{t("sectionLabel")}</Eyebrow>
          <div className="mt-8 space-y-6 text-lg leading-[1.9] text-foreground/85">
            {paras.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <Rule />

      {/* ── HIGHLIGHTS — numbered checklist columns ── */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[760px]">
          <motion.div {...fade}>
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("highlights")}
            </h2>
          </motion.div>

          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {activity.highlights.map((item, i) => (
              <motion.div
                key={i}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span className="leading-relaxed text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </dl>

          <motion.div {...fade} className="mt-12">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary"
            >
              {t("contactMore")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ── FOOT — back link ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/activities"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {t("viewAll")}
          </Link>
        </div>
      </section>
    </article>
  );
}
