"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

// 活力社群 chrome — extracted from HomeVibrant. Rounded, friendly, pill CTA.

export function VibrantHeader() {
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
    { label: t("history"), href: "/history" },
    { label: t("news"), href: "/news" },
    { label: t("gallery"), href: "/gallery" },
    { label: t("conference"), href: "/conference" },
    { label: t("activities"), href: "/activities" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={lp("/")} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
            东安
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-foreground">东安会馆</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Tung On Wui Kun
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={lp(n.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={otherHref}
            className="hidden items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            {en ? (
              <>
                中<span className="text-border">/</span>
                <b className="text-foreground">EN</b>
              </>
            ) : (
              <>
                <b className="text-foreground">中</b>
                <span className="text-border">/</span>EN
              </>
            )}
          </Link>
          <Link
            href={lp("/member")}
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            {en ? "Join" : "会员注册"}
          </Link>
          <button
            type="button"
            aria-label={t("menu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-3 sm:px-6">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={lp(n.href)}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 px-3 pt-3">
              <Link
                href={otherHref}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                {en ? (
                  <>
                    中<span className="text-border">/</span>
                    <b className="text-foreground">EN</b>
                  </>
                ) : (
                  <>
                    <b className="text-foreground">中</b>
                    <span className="text-border">/</span>EN
                  </>
                )}
              </Link>
              <Link
                href={lp("/member")}
                onClick={() => setMenuOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                {en ? "Join" : "会员注册"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function VibrantFooter() {
  const locale = useLocale();
  const en = locale === "en";
  const lp = (href: string) =>
    en ? (href === "/" ? "/en" : "/en" + href) : href;

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={lp("/")} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
                东安
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-bold text-foreground">
                  东安会馆
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Tung On Wui Kun
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {en
                ? "A Singapore Chinese clan association of kin from Dongguan and Bao'an, Guangdong — founded in 1876."
                : "源自广东东莞、宝安两县的新加坡华人宗乡会馆，创立于 1876 年，承传莞宝乡情逾百载。"}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {en ? "Association" : "会馆"}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href={lp("/about")} className="transition-colors hover:text-primary">
                  {en ? "About" : "关于会馆"}
                </Link>
              </li>
              <li>
                <Link href={lp("/conference")} className="transition-colors hover:text-primary">
                  {en ? "Convention" : "世界恳亲大会"}
                </Link>
              </li>
              <li>
                <Link href={lp("/gallery")} className="transition-colors hover:text-primary">
                  {en ? "Gallery" : "影相库"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {en ? "Take part" : "参与"}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href={lp("/member")} className="transition-colors hover:text-primary">
                  {en ? "Membership" : "会员注册"}
                </Link>
              </li>
              <li>
                <Link href={lp("/activities")} className="transition-colors hover:text-primary">
                  {en ? "Activities" : "会馆活动"}
                </Link>
              </li>
              <li>
                <Link href={lp("/news")} className="transition-colors hover:text-primary">
                  {en ? "News" : "最新动态"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {en ? "Contact" : "联系"}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
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

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {en
              ? "© 2026 Tung On Wui Kun · Singapore"
              : "© 2026 新加坡东安会馆 Tung On Wui Kun"}
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">
              中文
            </Link>
            <Link href="/en" className="transition-colors hover:text-primary">
              English
            </Link>
            <Link href={lp("/contact")} className="transition-colors hover:text-primary">
              {en ? "Contact" : "联系"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
