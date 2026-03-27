"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Settings, User, Search, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export default function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <>
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
                {t("logoChar")}
              </span>
            </div>
            <div>
              <span
                className={`font-bold text-sm lg:text-lg tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
              >
                {t("siteName")}
              </span>
              <span
                className={`hidden sm:block text-xs -mt-1 transition-colors duration-300 ${isScrolled ? "text-muted-foreground" : "text-white/60"}`}
              >
                {t("siteNameEn")}
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
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200 ${
                isScrolled
                  ? "text-foreground/60"
                  : "text-white/70"
              }`}
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>

            <Link
              href="/member"
              className={`p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200 ${
                isScrolled
                  ? "text-foreground/60"
                  : "text-white/70"
              }`}
            >
              {session?.user?.image ? (
                <Image src={session.user.image} alt="" width={24} height={24} className="w-5 h-5 lg:w-6 lg:h-6 rounded-full" />
              ) : (
                <User className="w-4 h-4 lg:w-5 lg:h-5" />
              )}
            </Link>

            <Link
              href="/admin"
              className={`p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200 hidden lg:block ${
                isScrolled
                  ? "text-foreground/60"
                  : "text-white/70"
              }`}
              aria-label={t("admin")}
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

            {/* Mobile hamburger menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200 ${
                isScrolled
                  ? "text-foreground/60"
                  : "text-white/70"
              }`}
              aria-label="菜单"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </motion.header>

    {/* Mobile menu panel */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-40 lg:hidden">
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-0 right-0 bottom-0 w-64 bg-background shadow-xl pt-20 px-6"
        >
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-foreground/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    )}

    <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
