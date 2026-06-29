"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getArticleBySlug, formatDate } from "../../../../lib/newsData";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import ShareButtons from "../../ShareButtons";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — News article。延续 HomeVibrant/NewsVibrant：明亮橙/青、大圆角、
// 柔光色块、彩色标签胶囊、友好正文卡。自取数据：useParams + getArticleBySlug。
export default function NewsArticleVibrant() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const article = getArticleBySlug(slug, locale);
  const t = useTranslations("news");

  if (!article) {
    return (
      <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-card p-16 text-center text-muted-foreground">
          <p className="text-2xl font-bold text-foreground">{t("notFound")}</p>
          <Link
            href="/news"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToNews")}
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-24">
        {/* back pill */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToNews")}
        </Link>

        {/* rounded hero image card with overlaid title */}
        <motion.div
          {...fade(0)}
          className="group relative mt-6 min-h-[22rem] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:min-h-[26rem]"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Calendar className="h-3 w-3" />
                {formatDate(article.date, locale)}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl text-2xl font-bold leading-[1.15] text-white sm:text-4xl">
              {article.title}
            </h1>
          </div>
        </motion.div>

        {/* friendly body card */}
        <motion.div
          {...fade(0.08)}
          className="mt-6 rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-10"
        >
          <p className="text-base leading-loose text-foreground/90 sm:text-lg">
            {paragraphs[0]}
          </p>
          {paragraphs.slice(1).map((para, i) => (
            <p key={i} className="mt-5 text-base leading-loose text-muted-foreground sm:text-lg">
              {para}
            </p>
          ))}
        </motion.div>

        {/* footer actions */}
        <motion.div
          {...fade(0.12)}
          className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-[0_14px_44px_-32px_rgba(0,0,0,0.4)]"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("viewMore")}
          </Link>
          <ShareButtons title={article.title} />
        </motion.div>
      </div>
    </div>
  );
}
