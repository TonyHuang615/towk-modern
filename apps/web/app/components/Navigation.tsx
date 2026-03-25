"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "首页", href: "/" },
  { name: "关于会馆", href: "/about" },
  { name: "最新动态", href: "/news" },
  { name: "影相库", href: "/gallery" },
  { name: "恳亲大会", href: "/conference" },
  { name: "会馆活动", href: "/activities" },
  { name: "联系我们", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">东</span>
            </div>
            <div className="hidden sm:block">
              <span
                className={`font-bold text-lg tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
              >
                新加坡东安会馆
              </span>
              <span
                className={`block text-xs -mt-1 transition-colors duration-300 ${isScrolled ? "text-muted-foreground" : "text-white/60"}`}
              >
                Tung On Wui Kun · 1876
              </span>
            </div>
          </Link>

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

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200"
              aria-label="管理后台"
            >
              <Settings className="w-5 h-5" />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200"
              aria-label="切换主题"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200"
              aria-label="菜单"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-primary bg-red-50"
                    : "text-foreground/80 hover:text-primary hover:bg-foreground/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
