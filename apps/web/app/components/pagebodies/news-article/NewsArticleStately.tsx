"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug, formatDate } from "../../../../lib/newsData";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import ShareButtons from "../../ShareButtons";

/* 庄重典藏 / Stately Archive — News article。延续 HomeStately/NewsStately：
   暗色展厅、烫金细线、双线框报头、展签式说明、衬线长读。
   自取数据：useParams + getArticleBySlug + i18n。 */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function NewsArticleStately() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const article = getArticleBySlug(slug, locale);
  const t = useTranslations("news");

  if (!article) {
    return (
      <section className="flex min-h-[60svh] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-3xl font-bold tracking-[0.06em]">{t("notFound")}</p>
        <Link
          href="/news"
          className="mt-6 text-xs uppercase tracking-[0.3em] text-primary"
        >
          {t("backToNews")}
        </Link>
      </section>
    );
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <>
      {/* ════════ HERO — double gold-hairline gazette header ════════ */}
      <section className="relative overflow-hidden px-6 pt-24 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <div className="mx-auto max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToNews")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="mt-10 text-center"
          >
            <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
              {article.category}
            </p>
            <h1 className="mt-7 text-3xl font-bold leading-tight tracking-[0.06em] sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-primary/60 sm:w-20" />
              <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
              <span className="h-px w-12 bg-primary/60 sm:w-20" />
            </div>
            <p className="mt-6 text-sm tracking-[0.3em] text-accent">
              {formatDate(article.date, locale)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════ Dignified wide plate with caption ════════ */}
      <section className="px-6 pb-16">
        <motion.figure
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden border border-border"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-accent">
              {article.category} · {formatDate(article.date, locale)}
            </span>
          </figcaption>
        </motion.figure>
      </section>

      {/* ════════ Long-read body — serif, gold-ruled columns ════════ */}
      <section className="border-t border-border px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-3xl"
        >
          <div className="mx-auto mb-12 h-px w-16 bg-primary/50" />
          <div className="space-y-7 text-base leading-loose text-muted-foreground md:text-lg [&>p:first-child]:text-foreground [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-6xl [&>p:first-child]:first-letter:font-bold [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-primary">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* gold-ruled colophon */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("viewMore")}
            </Link>
            <ShareButtons title={article.title} />
          </div>
        </motion.div>
      </section>
    </>
  );
}
