"use client";

import { useState, useEffect, useRef } from "react";
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

const staticPages: SearchResult[] = [
  { type: "page", title: "关于会馆", excerpt: "新加坡东安会馆简介与历史", href: "/about" },
  { type: "page", title: "历史传承", excerpt: "自1876年以来的发展历程", href: "/history" },
  { type: "page", title: "世界东安恳亲大会", excerpt: "联结全球东莞宝安乡亲", href: "/conference" },
  { type: "page", title: "影相库", excerpt: "会馆活动照片集锦", href: "/gallery" },
  { type: "page", title: "联系我们", excerpt: "会馆地址与联系方式", href: "/contact" },
  { type: "page", title: "组织架构", excerpt: "会馆组织结构与委员会", href: "/about/structure" },
  { type: "page", title: "历届董事会", excerpt: "各届董事会领导名单", href: "/about/board" },
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
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const typeLabels = {
    news: "动态",
    activity: "活动",
    page: "页面",
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
                  placeholder="搜索页面、动态、活动..."
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
                  未找到相关内容
                </div>
              )}

              {!query && (
                <div className="p-4 text-center text-foreground/30 text-xs">
                  输入关键词搜索
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
