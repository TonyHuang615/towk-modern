"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Info,
  Newspaper,
  Camera,
  MoreHorizontal,
  X,
  Calendar,
  MapPin,
  History,
  Users,
} from "lucide-react";

const mainTabs = [
  { name: "首页", href: "/", icon: Home },
  { name: "关于", href: "/about", icon: Info },
  { name: "动态", href: "/news", icon: Newspaper },
  { name: "影相", href: "/gallery", icon: Camera },
  { name: "更多", href: "#more", icon: MoreHorizontal },
];

const moreLinks = [
  { name: "会馆活动", href: "/activities", icon: Calendar },
  { name: "恳亲大会", href: "/conference", icon: Users },
  { name: "历史传承", href: "/history", icon: History },
  { name: "联系我们", href: "/contact", icon: MapPin },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Check if current page is in "more" section
  const isMoreActive = moreLinks.some((link) => isActive(link.href));

  // Hide on admin/login pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <>
      {/* More menu overlay */}
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99] lg:hidden"
              onClick={() => setShowMore(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 right-0 z-[100] lg:hidden px-4 pb-2"
            >
              <div className="bg-background rounded-2xl shadow-xl border border-border overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                  <span className="text-sm font-medium text-foreground/60">
                    更多页面
                  </span>
                  <button
                    onClick={() => setShowMore(false)}
                    className="p-1 rounded-full hover:bg-foreground/10"
                  >
                    <X className="w-4 h-4 text-foreground/40" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1 p-3">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setShowMore(false)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-colors ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/60 active:bg-foreground/5"
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-[98] lg:hidden">
        <div className="bg-background/95 backdrop-blur-md border-t border-border">
          <div
            className="flex items-center justify-around"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            {mainTabs.map((tab) => {
              const active =
                tab.href === "#more" ? isMoreActive || showMore : isActive(tab.href);

              if (tab.href === "#more") {
                return (
                  <button
                    key={tab.name}
                    onClick={() => setShowMore(!showMore)}
                    className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[4rem] transition-colors ${
                      active ? "text-primary" : "text-foreground/40"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium">{tab.name}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setShowMore(false)}
                  className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[4rem] transition-colors ${
                    active ? "text-primary" : "text-foreground/40"
                  }`}
                >
                  <div className="relative">
                    <tab.icon className="w-5 h-5" />
                    {active && (
                      <motion.div
                        layoutId="mobile-tab-indicator"
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-medium">{tab.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
