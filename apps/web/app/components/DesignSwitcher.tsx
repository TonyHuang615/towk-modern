"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { DESIGNS } from "../../lib/designs";
import { useDesign } from "./DesignContext";

const STRINGS = {
  zh: {
    label: "设计演示",
    close: "关闭",
    subtitle: "同一套内容，切换不同前端设计风格 · 选择后浏览全站均保持",
  },
  en: {
    label: "Design Demo",
    close: "Close",
    subtitle:
      "Same content, different frontend designs · your choice persists across the whole site",
  },
} as const;

export default function DesignSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const { design: active, setDesign } = useDesign();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // 后台 / 登录页不显示
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  const isEn = locale === "en";
  const t = isEn ? STRINGS.en : STRINGS.zh;

  const shown =
    DESIGNS.find((d) => d.id === (hovered ?? active)) ?? DESIGNS[0];

  return (
    <div data-feedback-ignore="true">
      {/* 浮窗按钮 */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            aria-label={t.label}
            className="fixed bottom-24 left-4 z-[9970] flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-background shadow-lg lg:bottom-6 lg:left-6"
          >
            <Palette className="h-5 w-5" />
            <span className="hidden text-sm font-medium sm:inline">{t.label}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 面板 */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9971] bg-black/20"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="fixed bottom-24 left-4 z-[9972] w-[20rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl lg:bottom-6 lg:left-6"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">{t.label}</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.close}
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="px-4 pt-3 text-xs text-muted-foreground">
                {t.subtitle}
              </p>

              <div
                className="space-y-1 p-2"
                onMouseLeave={() => setHovered(null)}
              >
                {DESIGNS.map((d) => {
                  const isActive = active === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDesign(d.id)}
                      onMouseEnter={() => setHovered(d.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-primary/10 ring-1 ring-primary/30"
                          : "hover:bg-foreground/5"
                      }`}
                    >
                      <span className="flex shrink-0 -space-x-1">
                        {d.swatch.map((c, i) => (
                          <span
                            key={i}
                            className="h-5 w-5 rounded-full border-2 border-card"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {isEn ? d.nameEn : d.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {isEn ? d.name : d.nameEn}
                        </span>
                      </span>
                      {isActive && (
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* hover / 选中风格的设计说明 */}
              <div className="border-t border-border bg-muted/40 px-4 py-3">
                <p className="mb-1 text-xs font-semibold text-foreground">
                  {isEn ? shown.nameEn : shown.name} ·{" "}
                  {isEn ? shown.name : shown.nameEn}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {isEn ? shown.descriptionEn : shown.description}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
