"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";
import { getActivityBySlug } from "../../../../lib/activitiesData";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

/* 庄重典藏 / Stately Archive — Activity detail。延续 HomeStately：暗色展厅、
   罗马数字展陈编号、烫金细线、双线框、展签式说明、镌刻编号。 */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ"];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ExhibitHeader({
  numeral,
  eyebrow,
  title,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
      className="mx-auto max-w-3xl text-center"
    >
      <div
        className="font-display text-5xl md:text-6xl text-primary/40 leading-none select-none"
        aria-hidden
      >
        {numeral}
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-primary/50" />
      <p className="mt-6 text-[0.7rem] uppercase tracking-[0.42em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.08em]">
        {title}
      </h2>
    </motion.div>
  );
}

export default function ActivityDetailStately() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const activity = getActivityBySlug(slug, locale);
  const t = useTranslations("activities");

  if (!activity) {
    return (
      <section className="px-6 py-32 text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
          {t("sectionLabel")}
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-[0.06em]">{t("notFound")}</h1>
        <Link
          href="/activities"
          className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary"
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
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="relative z-10 w-full max-w-4xl"
        >
          <div className="border border-primary/50 p-2 sm:p-3">
            <div className="border border-accent/40 px-6 py-14 text-center sm:px-12 sm:py-20">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {activity.subtitle}
              </p>
              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {activity.title}
              </h1>
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {activity.description}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ Dignified wide plate with caption ════════ */}
      <section className="px-6 pb-20">
        <motion.figure
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="relative mx-auto aspect-[21/9] max-w-6xl overflow-hidden border border-border"
        >
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-10">
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-accent">
              {locale === "en" ? "Collection · Exhibit" : "典藏 · 展品"}
            </span>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-bold tracking-[0.08em] text-white sm:text-2xl">
              {activity.title}
            </p>
          </figcaption>
        </motion.figure>
      </section>

      {/* ════════ Ⅰ — 沿革述要 / The Account ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader numeral={ROMAN[0]} eyebrow={t("sectionLabel")} title={activity.title} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-16 space-y-6 text-base leading-loose text-muted-foreground md:columns-2 md:gap-12 [&>p]:break-inside-avoid"
          >
            {paras.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ Ⅱ — 活动亮点 / Highlights (engraved register) ════════ */}
      <section className="border-t border-border bg-card/40 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader numeral={ROMAN[1]} eyebrow={t("sectionLabel")} title={t("highlights")} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-16 border border-border bg-card"
          >
            <ul className="divide-y divide-border">
              {activity.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-5 px-7 py-6">
                  <span className="font-display text-lg font-bold tabular-nums text-primary/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ════════ Ⅲ — 延伸 / Enquire (engraved register) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <ExhibitHeader numeral={ROMAN[2]} eyebrow={t("sectionLabel")} title={t("contactMore")} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-16 border border-border bg-card"
          >
            <div className="divide-y divide-border">
              <Link
                href="/contact"
                className="group flex items-center justify-between gap-6 px-7 py-7 transition-colors duration-200 hover:bg-primary/5"
              >
                <h4 className="text-lg font-bold tracking-[0.05em] transition-colors duration-200 group-hover:text-primary">
                  {t("contactMore")}
                </h4>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
              </Link>
              <Link
                href="/activities"
                className="group flex items-center justify-between gap-6 px-7 py-7 transition-colors duration-200 hover:bg-primary/5"
              >
                <h4 className="text-lg font-bold tracking-[0.05em] transition-colors duration-200 group-hover:text-primary">
                  {t("viewAll")}
                </h4>
                <ArrowLeft className="h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
