"use client";

import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { getArticleBySlug, formatDate } from "../../../../lib/newsData";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ShareButtons from "../../../components/ShareButtons";

export default function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);
  const t = useTranslations("news");

  if (!article) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">{t("notFound")}</h1>
          <Link href="/news" className="text-primary hover:underline">{t("backToNews")}</Link>
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
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToNews")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {article.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-card-hover"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-4"
          >
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4"
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("viewMore")}
            </Link>
            <ShareButtons title={article.title} />
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
