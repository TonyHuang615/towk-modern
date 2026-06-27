"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { allNews } from "../../lib/newsData";
import { activities as activitiesData } from "../../lib/activitiesData";

interface SearchResult {
  type: "news" | "activity" | "page";
  title: string;
  excerpt: string;
  href: string;
}

const staticPageDefs: { key: string; href: string }[] = [
  { key: "about", href: "/about" },
  { key: "history", href: "/history" },
  { key: "conference", href: "/conference" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
  { key: "structure", href: "/about/structure" },
  { key: "board", href: "/about/board" },
];

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("search");
  const staticPages = useMemo<SearchResult[]>(
    () =>
      staticPageDefs.map((p) => ({
        type: "page" as const,
        title: t(`pages.${p.key}.title`),
        excerpt: t(`pages.${p.key}.excerpt`),
        href: p.href,
      })),
    [t],
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matched: SearchResult[] = [];

    // Search news
    for (const article of allNews) {
      if (
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q)
      ) {
        matched.push({
          type: "news",
          title: article.title,
          excerpt: article.excerpt,
          href: `/news/${article.slug}`,
        });
      }
    }

    // Search activities
    for (const activity of activitiesData) {
      if (
        activity.title.toLowerCase().includes(q) ||
        activity.description.toLowerCase().includes(q)
      ) {
        matched.push({
          type: "activity",
          title: activity.title,
          excerpt: activity.description,
          href: `/activities/${activity.slug}`,
        });
      }
    }

    // Search static pages
    for (const page of staticPages) {
      if (
        page.title.toLowerCase().includes(q) ||
        page.excerpt.toLowerCase().includes(q)
      ) {
        matched.push(page);
      }
    }

    setResults(matched.slice(0, 8));
  }, [query, staticPages]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const typeLabels = {
    news: t("typeNews"),
    activity: t("typeActivity"),
    page: t("typePage"),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg px-4"
          >
            <div className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search className="w-5 h-5 text-foreground/40 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("placeholder")}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-foreground/10"
                >
                  <X className="w-4 h-4 text-foreground/40" />
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="max-h-[50vh] overflow-y-auto p-2">
                  {results.map((result, i) => (
                    <Link
                      key={i}
                      href={result.href}
                      onClick={onClose}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-colors group"
                    >
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                        {typeLabels[result.type]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {result.title}
                        </div>
                        <div className="text-xs text-foreground/50 truncate mt-0.5">
                          {result.excerpt}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-foreground/20 group-hover:text-primary shrink-0 mt-1 transition-colors" />
                    </Link>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="p-8 text-center text-foreground/40 text-sm">
                  {t("noResults")}
                </div>
              )}

              {!query && (
                <div className="p-4 text-center text-foreground/30 text-xs">
                  {t("hint")}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
