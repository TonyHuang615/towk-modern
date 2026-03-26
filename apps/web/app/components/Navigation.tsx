"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("news"), href: "/news" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("conference"), href: "/conference" },
    { name: t("activities"), href: "/activities" },
    { name: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-lg">
                东
              </span>
            </div>
            <div>
              <span
                className={`font-bold text-sm lg:text-lg tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
              >
                新加坡东安会馆
              </span>
              <span
                className={`hidden sm:block text-xs -mt-1 transition-colors duration-300 ${isScrolled ? "text-muted-foreground" : "text-white/60"}`}
              >
                Tung On Wui Kun · 1876
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-accent"
                    : isScrolled
                      ? "text-foreground/80 hover:text-primary"
                      : "text-white/90 hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Link
              href="/admin"
              className={`p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200 ${
                isScrolled
                  ? "text-foreground/60"
                  : "text-white/70"
              }`}
              aria-label="管理后台"
            >
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </Link>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200 ${
                isScrolled
                  ? "text-foreground/60"
                  : "text-white/70"
              }`}
              aria-label={t("toggleTheme")}
            >
              {isDark ? (
                <Sun className="w-4 h-4 lg:w-5 lg:h-5" />
              ) : (
                <Moon className="w-4 h-4 lg:w-5 lg:h-5" />
              )}
            </button>

            <LanguageSwitcher
              className={
                isScrolled
                  ? "border-border text-foreground/60"
                  : "border-white/30 text-white/70"
              }
            />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
