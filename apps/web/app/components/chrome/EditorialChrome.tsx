"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

// 暖陶编辑 chrome — extracted from HomeEditorial. Uses semantic Tailwind
// tokens so it works on any page.

export function EditorialHeader() {
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-[68px] max-w-[1100px] items-center justify-between gap-6 px-6">
        <Link href={lp("/")} className="flex flex-col leading-tight">
          <span className="font-display text-lg tracking-tight text-foreground">
            东安会馆
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
            Tung On Wui Kun
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={lp(n.href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={otherHref}
            className="flex items-center gap-1 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
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
            className="hidden rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
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
        <nav className="border-t border-border bg-background px-6 py-2 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={lp(n.href)}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-3 text-sm text-muted-foreground transition-colors last:border-b-0 hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href={lp("/member")}
            onClick={() => setMenuOpen(false)}
            className="mt-3 mb-2 inline-block rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {en ? "Join" : "会员注册"}
          </Link>
        </nav>
      )}
    </header>
  );
}

export function EditorialFooter() {
  const locale = useLocale();
  const en = locale === "en";
  const lp = (href: string) =>
    en ? (href === "/" ? "/en" : "/en" + href) : href;

  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="font-display text-lg tracking-tight text-foreground">
              东安会馆
            </div>
            <div className="mt-1 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
              Tung On Wui Kun · Singapore
            </div>
            <p className="mt-5 max-w-[24rem] text-sm leading-relaxed text-muted-foreground">
              {en
                ? "A Singapore Chinese clan association of kin from Dongguan and Bao'an, Guangdong — founded in 1876."
                : "源自广东东莞、宝安两县的新加坡华人宗乡会馆，创立于 1876 年，承传莞宝乡情逾百载。"}
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary">
              {en ? "Association" : "会馆"}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href={lp("/about")}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {en ? "About" : "关于会馆"}
                </Link>
              </li>
              <li>
                <Link
                  href={lp("/conference")}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {en ? "Convention" : "世界恳亲大会"}
                </Link>
              </li>
              <li>
                <Link
                  href={lp("/activities")}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {en ? "Activities" : "会馆活动"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary">
              {en ? "Take part" : "参与"}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href={lp("/member")}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {en ? "Membership" : "会员注册"}
                </Link>
              </li>
              <li>
                <Link
                  href={lp("/gallery")}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {en ? "Gallery" : "影相库"}
                </Link>
              </li>
              <li>
                <Link
                  href={lp("/news")}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {en ? "News" : "最新动态"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary">
              {en ? "Contact" : "联系"}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>{en ? "Singapore" : "新加坡 · 会馆地址"}</li>
              <li>+65 XXXX XXXX</li>
              <li>
                <Link
                  href={lp("/contact")}
                  className="transition-colors hover:text-foreground"
                >
                  info@towk.sg
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 新加坡东安会馆 Tung On Wui Kun
          </p>
          <div className="flex gap-5 text-xs">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              中文
            </Link>
            <Link
              href="/en"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
