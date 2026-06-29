"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

// 庄重典藏 chrome — a dark museum / 典藏展厅 header + footer. Colour comes
// from the global semantic tokens (deep ink-blue background, understated
// gold = --primary) which the `[data-design="stately"]` theme defines.

export function StatelyHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const en = locale === "en";

  const lp = (href: string) =>
    en ? (href === "/" ? "/en" : "/en" + href) : href;

  const otherHref = pathname.startsWith("/en")
    ? pathname.replace(/^\/en/, "") || "/"
    : "/en" + (pathname === "/" ? "" : pathname);

  const nav = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("news"), href: "/news" },
    { label: t("gallery"), href: "/gallery" },
    { label: t("conference"), href: "/conference" },
    { label: t("activities"), href: "/activities" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-primary/25 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <Link href={lp("/")} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-primary/60 font-display text-sm font-bold tracking-[0.04em] text-primary">
            東安
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-[0.12em] text-foreground">
              东安会馆
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-primary/80">
              Tung On Wui Kun
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={lp(n.href)}
              className="text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={otherHref}
            className="flex items-center gap-1 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            {en ? (
              <>
                中<span className="text-primary/40">/</span>
                <b className="text-foreground">EN</b>
              </>
            ) : (
              <>
                <b className="text-foreground">中</b>
                <span className="text-primary/40">/</span>EN
              </>
            )}
          </Link>
          <Link
            href={lp("/member")}
            className="hidden border border-primary/60 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-block"
          >
            {en ? "Join" : "会员注册"}
          </Link>
          <button
            type="button"
            aria-label={t("menu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="text-foreground lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-primary/25 bg-background px-6 py-2 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={lp(n.href)}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-3 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors last:border-b-0 hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href={lp("/member")}
            onClick={() => setMenuOpen(false)}
            className="mt-3 mb-2 inline-block border border-primary/60 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary"
          >
            {en ? "Join" : "会员注册"}
          </Link>
        </nav>
      )}
    </header>
  );
}

export function StatelyFooter() {
  const locale = useLocale();
  const en = locale === "en";
  const lp = (href: string) =>
    en ? (href === "/" ? "/en" : "/en" + href) : href;

  return (
    <footer className="border-t border-primary/30 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-primary/60 font-display text-sm font-bold tracking-[0.04em] text-primary">
                東安
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold tracking-[0.12em] text-foreground">
                  东安会馆
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-primary/80">
                  Tung On Wui Kun · Singapore
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-[24rem] text-sm leading-relaxed text-muted-foreground">
              {en
                ? "A Singapore Chinese clan association of kin from Dongguan and Bao'an, Guangdong — founded in 1876."
                : "源自广东东莞、宝安两县的新加坡华人宗乡会馆，创立于 1876 年，承传莞宝乡情逾百载。"}
            </p>
          </div>

          <div>
            <h3 className="text-[0.65rem] uppercase tracking-[0.32em] text-primary">
              {en ? "Association" : "会馆"}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href={lp("/about")} className="text-muted-foreground transition-colors hover:text-primary">
                  {en ? "About" : "关于会馆"}
                </Link>
              </li>
              <li>
                <Link href={lp("/conference")} className="text-muted-foreground transition-colors hover:text-primary">
                  {en ? "Convention" : "世界恳亲大会"}
                </Link>
              </li>
              <li>
                <Link href={lp("/activities")} className="text-muted-foreground transition-colors hover:text-primary">
                  {en ? "Activities" : "会馆活动"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] uppercase tracking-[0.32em] text-primary">
              {en ? "Take part" : "参与"}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href={lp("/member")} className="text-muted-foreground transition-colors hover:text-primary">
                  {en ? "Membership" : "会员注册"}
                </Link>
              </li>
              <li>
                <Link href={lp("/gallery")} className="text-muted-foreground transition-colors hover:text-primary">
                  {en ? "Gallery" : "影相库"}
                </Link>
              </li>
              <li>
                <Link href={lp("/news")} className="text-muted-foreground transition-colors hover:text-primary">
                  {en ? "News" : "最新动态"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] uppercase tracking-[0.32em] text-primary">
              {en ? "Contact" : "联系"}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>{en ? "Singapore" : "新加坡 · 会馆地址"}</li>
              <li>+65 XXXX XXXX</li>
              <li>
                <Link href={lp("/contact")} className="transition-colors hover:text-primary">
                  info@towk.sg
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-primary/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-[0.04em] text-muted-foreground">
            © 2026 新加坡东安会馆 Tung On Wui Kun
          </p>
          <div className="flex gap-5 text-xs">
            <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
              中文
            </Link>
            <Link href="/en" className="text-muted-foreground transition-colors hover:text-primary">
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
