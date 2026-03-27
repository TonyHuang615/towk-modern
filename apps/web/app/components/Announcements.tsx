"use client";

import { motion } from "framer-motion";
import { Megaphone, ArrowRight, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Announcements() {
  const t = useTranslations("announcements");

  const announcements = [
    { id: 1, date: "2026-03-20", text: t("item1"), urgent: true },
    { id: 2, date: "2026-03-10", text: t("item2"), urgent: false },
    { id: 3, date: "2026-02-15", text: t("item3"), urgent: false },
  ];

  return (
    <section className="py-4 md:py-10 bg-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: compact vertical list; Desktop: horizontal layout */}
        <div className="flex items-start gap-3 md:gap-4">
          <div className="flex-shrink-0 flex items-center gap-1.5 md:gap-2 pt-0.5">
            <Megaphone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-xs md:text-sm font-bold text-primary whitespace-nowrap">
              {t("title")}
            </span>
          </div>
          <div className="flex-1 overflow-hidden space-y-1.5 md:space-y-2">
            {announcements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm"
              >
                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground leading-snug">
                  {item.urgent && (
                    <span className="mr-1.5 md:mr-2 text-[10px] md:text-xs font-bold text-primary bg-primary/10 px-1 md:px-1.5 py-0.5 rounded">
                      {t("important")}
                    </span>
                  )}
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
          <a
            href="/announcements"
            className="flex-shrink-0 hidden md:flex items-center gap-1 text-xs text-primary hover:underline"
          >
            {t("more")} <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
