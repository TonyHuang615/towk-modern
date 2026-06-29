"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getArticleBySlug, formatDate } from "../../../../lib/newsData";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import ShareButtons from "../../ShareButtons";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

// 编辑杂志 — News article。延续 HomeEditorial/NewsEditorial：象牙底、衬线大标题、
// Eyebrow/Rule 母题，单一居中窄阅读栏 (max-w 680) 的杂志长文。
// 自取数据：useParams + getArticleBySlug + i18n。
export default function NewsArticleEditorial() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const article = getArticleBySlug(slug, locale);
  const t = useTranslations("news");

  if (!article) {
    return (
      <section className="px-6 py-28 text-center">
        <p className="font-display text-3xl text-foreground">{t("notFound")}</p>
        <Link
          href="/news"
          className="mt-5 inline-block text-sm text-primary underline underline-offset-4"
        >
          {t("backToNews")}
        </Link>
      </section>
    );
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <article className="px-6 pt-16 pb-24 sm:pt-24">
      <div className="mx-auto max-w-[680px]">
        {/* back link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToNews")}
        </Link>

        {/* eyebrow · headline */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <span className="block text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary sm:text-xs">
            {article.category}
          </span>
          <h1 className="font-display mt-5 text-balance text-[2.2rem] leading-[1.1] tracking-tight sm:text-5xl sm:leading-[1.06]">
            {article.title}
          </h1>
          <p className="mt-6 font-display text-sm tabular-nums text-primary/70">
            {formatDate(article.date, locale)}
          </p>
        </motion.header>

        {/* rule */}
        <div className="mt-8 border-t border-border" />

        {/* wide image strip */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 overflow-hidden rounded-sm bg-muted"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.title}
            className="h-[34vh] w-full object-cover grayscale-[0.15] sm:h-[42vh]"
          />
        </motion.div>

        {/* reading column */}
        <motion.div
          {...fade}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 space-y-7 text-lg leading-[1.95] text-foreground/85 [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-6xl [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-primary"
        >
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        {/* rule */}
        <div className="mt-14 border-t border-border" />

        {/* footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <Link
            href="/news"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            {t("viewMore")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <ShareButtons title={article.title} />
        </div>
      </div>
    </article>
  );
}
