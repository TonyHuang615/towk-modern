"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

// 宣纸书卷 chrome — extracted from HomePaper. Relies on the `.towk-paper`
// scoped CSS now living in globals.css; DesignShell wraps every page in a
// `.towk-paper` root so this markup styles correctly site-wide.

function Seal({ className = "" }: { className?: string }) {
  return (
    <span className={`seal ${className}`}>
      <span>東</span>
      <span>安</span>
    </span>
  );
}

export function PaperHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const en = locale === "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav">
        <Link className="brand" href={lp("/")}>
          <Seal />
          <span className="brand-name">
            <span className="zh">东安会馆</span>
            <span className="en">Tung On Wui Kun</span>
          </span>
        </Link>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {nav.map((n) => (
            <Link
              key={n.href}
              href={lp(n.href)}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="lang" href={otherHref}>
            {en ? (
              <>
                中<span>/</span>
                <b>EN</b>
              </>
            ) : (
              <>
                <b>中</b>
                <span>/</span>EN
              </>
            )}
          </Link>
          <Link className="btn btn-primary nav-cta" href={lp("/member")}>
            {en ? "Join" : "会员注册"}
          </Link>
          <button
            className="menu-btn"
            aria-label={t("menu")}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export function PaperFooter() {
  const locale = useLocale();
  const en = locale === "en";
  const lp = (href: string) =>
    en ? (href === "/" ? "/en" : "/en" + href) : href;

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-top">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Seal />
            <div className="fb-zh">东安会馆</div>
            <div className="fb-en">Tung On Wui Kun · Singapore</div>
            <p>
              {en
                ? "A Singapore Chinese clan association of kin from Dongguan and Bao'an, Guangdong — founded in 1876, carrying our heritage forward for over a century."
                : "源自广东东莞、宝安两县的新加坡华人宗乡会馆，创立于 1876 年，承传莞宝乡情逾百载。"}
            </p>
          </div>
          <div className="footer-col">
            <h5>{en ? "Association" : "会馆"}</h5>
            <Link href={lp("/about")}>{en ? "About" : "关于会馆"}</Link>
            <Link href={lp("/about/structure")}>
              {en ? "Structure" : "组织架构"}
            </Link>
            <Link href={lp("/about/board")}>
              {en ? "Past boards" : "历届董事会"}
            </Link>
            <Link href={lp("/activities")}>{en ? "Activities" : "会馆活动"}</Link>
          </div>
          <div className="footer-col">
            <h5>{en ? "Take part" : "参与"}</h5>
            <Link href={lp("/member")}>{en ? "Membership" : "会员注册"}</Link>
            <Link href={lp("/conference")}>
              {en ? "Convention" : "世界恳亲大会"}
            </Link>
            <Link href={lp("/activities")}>
              {en ? "Cantonese opera" : "粤剧组"}
            </Link>
            <Link href={lp("/news")}>{en ? "News" : "最新动态"}</Link>
          </div>
          <div className="footer-col">
            <h5>{en ? "Contact" : "联系"}</h5>
            <p>{en ? "Singapore" : "新加坡 · 会馆地址"}</p>
            <p>+65 XXXX XXXX</p>
            <p>info@towk.sg</p>
          </div>
        </div>
      </div>
      <div className="footer-top footer-rule">
        <div className="wrap footer-bottom">
          <p>© 2026 新加坡东安会馆 Tung On Wui Kun</p>
          <div className="fb-links">
            <Link href="/">中文</Link>
            <Link href="/en">English</Link>
            <Link href={lp("/contact")}>{en ? "Contact" : "联系"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
