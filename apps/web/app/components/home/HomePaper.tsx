"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { getLocalizedNews } from "../../../lib/newsData";

// 宣纸书卷 — 忠实复刻 mockup（Notion 设计语言 + 东安会馆红金 + 印章）。
// 自带头/尾，使用 scoped CSS（.towk-paper）与真实数据/图片。
export default function HomePaper({ content }: { content: any }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = locale === "en";
  const otherHref = pathname.startsWith("/en")
    ? pathname.replace(/^\/en/, "") || "/"
    : "/en" + (pathname === "/" ? "" : pathname);

  const hero = content?.hero?.slides?.[0] || {};
  const hero2 = content?.hero?.slides?.[1] || hero;
  const about = content?.about || {};
  const conf = content?.conference || {};
  const items = (content?.activities?.items || []).slice(0, 3);
  const past = (conf.pastConferences || []) as any[];
  const news = getLocalizedNews(locale).slice(0, 3);

  const stats = [
    { num: "1876", lab: t ? "Founded" : "创立之年" },
    ...((about.stats || []).slice(0, 3) as any[]).map((s) => ({
      num: s.value,
      lab: s.label,
    })),
  ];

  const aboutParas: string[] = String(about.content || "")
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const pull = aboutParas[0] || about.content || "";
  const rest = aboutParas.slice(1);

  const nav = [
    { label: t ? "About" : "关于会馆", href: "/about" },
    { label: t ? "Convention" : "世界恳亲大会", href: "/conference" },
    { label: t ? "Activities" : "会馆活动", href: "/activities" },
    { label: t ? "Gallery" : "影相库", href: "/gallery" },
    { label: t ? "News" : "最新动态", href: "/news" },
    { label: t ? "Contact" : "联系我们", href: "/contact" },
  ];

  const Seal = ({ className = "" }: { className?: string }) => (
    <span className={`seal ${className}`}>
      <span>東</span>
      <span>安</span>
    </span>
  );

  return (
    <div className="towk-paper">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap nav">
          <Link className="brand" href="/">
            <Seal />
            <span className="brand-name">
              <span className="zh">东安会馆</span>
              <span className="en">Tung On Wui Kun</span>
            </span>
          </Link>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <Link className="lang" href={otherHref}>
              {t ? (
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
            <Link className="btn btn-primary nav-cta" href="/member">
              {t ? "Join" : "会员注册"}
            </Link>
            <button
              className="menu-btn"
              aria-label="菜单"
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

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                {t ? "Singapore Clan Association · Est. 1876" : "新加坡宗乡会馆 · 自 1876"}
              </p>
              <h1>{hero.title || about.title || "东安会馆"}</h1>
              <p className="sub-en">{hero.subtitle || about.subtitle}</p>
              <p className="lede">{hero.description || pull}</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/member">
                  {t ? "Become a member" : "成为会员"} <span className="arrow">→</span>
                </Link>
                <Link className="btn btn-ghost" href="/conference">
                  {t ? "The World Convention" : "了解世界恳亲大会"}
                </Link>
              </div>
              <div className="hero-divider">
                <span className="ln" />
                {t
                  ? "Kin from Dongguan & Bao'an, Guangdong"
                  : "源自广东东莞、宝安两县 · 莞 · 宝 · 惠 乡亲"}
              </div>
            </div>
            <div className="hero-visual">
              <div className="frame">
                <div className="photo">
                  {hero.image && (
                    <Image
                      src={hero.image}
                      alt={hero.title || "东安会馆"}
                      fill
                      sizes="(max-width:980px) 90vw, 460px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <div className="cap">
                    <span className="dot" />
                    {t ? "Tung On Wui Kun" : "图｜东安会馆会所与乡亲"}
                  </div>
                </div>
                <Seal />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div className="wrap stats-grid">
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="num">{s.num}</div>
                <div className="lab">{s.lab}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="about" id="about">
          <div className="wrap about-grid">
            <div>
              <p className="eyebrow">{t ? "About" : "关于会馆"}</p>
              <h2>{about.title || "百五十载\n莞宝乡情"}</h2>
              <p className="kicker-cn">{about.subtitle || "About Tung On Wui Kun"}</p>
            </div>
            <div>
              <p className="pull">{pull}</p>
              {rest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* REUNION (deep band) */}
        <section className="reunion" id="reunion">
          <div className="reunion-inner">
            <div className="wrap reunion-grid">
              <div>
                <p className="eyebrow">{t ? "Flagship Event" : "旗舰盛事"}</p>
                <h2>{conf.title || "世界东安恳亲大会"}</h2>
                <p className="r-lede">{conf.description}</p>
                <div className="places">
                  {(past.length
                    ? past.map((p) => p.location)
                    : ["新加坡", "香港", "东莞", "马来西亚", "澳洲"]
                  )
                    .filter(Boolean)
                    .map((c: string, i: number) => (
                      <span className="chip" key={i}>
                        {c}
                      </span>
                    ))}
                </div>
                <div className="r-actions">
                  <Link className="btn btn-gold" href="/conference">
                    {t ? "View details" : "查看大会详情"}{" "}
                    <span className="arrow">→</span>
                  </Link>
                  <Link className="btn btn-line-cream" href="/conference">
                    {t ? "Past conventions" : "历届回顾"}
                  </Link>
                </div>
              </div>
              <div>
                <div className="photo-dark">
                  {hero2.image && (
                    <Image
                      src={hero2.image}
                      alt={conf.title || "恳亲大会"}
                      fill
                      sizes="(max-width:980px) 90vw, 460px"
                      style={{ objectFit: "cover", opacity: 0.55 }}
                    />
                  )}
                  <div className="cap">
                    <span className="dot" />
                    {t ? "World Tung On Convention" : "图｜历届恳亲大会全球乡亲合影"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVITIES */}
        <section className="activities" id="activities">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow">{t ? "Activities" : "会馆活动"}</p>
                <h2>{t ? "Heritage & Connection" : "传承与连接"}</h2>
              </div>
              <p className="sub">
                {t
                  ? "Culture, youth and business — three threads of association life"
                  : "文化、青年与商务——会馆生活的三条主线"}
              </p>
            </div>
            <div className="cards">
              {items.map((it: any, i: number) => (
                <article className="card" key={i}>
                  <div className="card-photo">
                    {it.image && (
                      <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        sizes="(max-width:980px) 50vw, 360px"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    <span className="badge">
                      {i === 0 ? (t ? "Est. 1943" : "自 1943") : t ? "Heritage" : "传承"}
                    </span>
                  </div>
                  <div className="card-body">
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    <Link className="more" href="/activities">
                      {t ? "Learn more" : "了解更多"} <span className="arrow">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS / NEWS */}
        <section className="events">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow">{t ? "Latest" : "最新动态"}</p>
                <h2>{t ? "Updates" : "活动预告"}</h2>
              </div>
              <Link className="more" href="/news">
                {t ? "All news" : "全部动态"} <span className="arrow">→</span>
              </Link>
            </div>
            <div className="events-card">
              {news.map((a, i) => {
                const d = new Date(a.date);
                const day = String(d.getDate()).padStart(2, "0");
                const mon = d.toLocaleDateString("en-US", { month: "short" });
                return (
                  <Link className="event-row" href={`/news/${a.slug}`} key={i}>
                    <div className="date-chip">
                      <div className="d">{day}</div>
                      <div className="m">{mon}</div>
                    </div>
                    <div className="event-info">
                      <h4>{a.title}</h4>
                      <p className="meta">{a.excerpt}</p>
                    </div>
                    <span className="event-tag">{a.category}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* JOIN */}
        <section className="join" id="join">
          <div className="wrap">
            <div className="join-card">
              <Seal />
              <p className="eyebrow">{t ? "Membership" : "入会"}</p>
              <h2>{t ? "Join the Tung On family" : "加入东安大家庭"}</h2>
              <p className="j-lede">
                {t
                  ? "Register online to take part in our festivals, Cantonese opera troupe, youth wing and the World Tung On Convention."
                  : "在线注册成为会员，参与会馆节庆、粤剧组、青年团与世界恳亲大会，与莞宝乡亲同根同心。"}
              </p>
              <div className="join-actions">
                <Link className="btn btn-primary" href="/member">
                  {t ? "Register now" : "立即注册会员"}{" "}
                  <span className="arrow">→</span>
                </Link>
                <Link className="btn btn-ghost" href="/contact">
                  {t ? "Contact us" : "联系我们"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-top">
          <div className="wrap footer-grid">
            <div className="footer-brand">
              <Seal />
              <div className="fb-zh">东安会馆</div>
              <div className="fb-en">Tung On Wui Kun · Singapore</div>
              <p>
                {t
                  ? "A Singapore Chinese clan association of kin from Dongguan and Bao'an, Guangdong — founded in 1876, carrying our heritage forward for over a century."
                  : "源自广东东莞、宝安两县的新加坡华人宗乡会馆，创立于 1876 年，承传莞宝乡情逾百载。"}
              </p>
            </div>
            <div className="footer-col">
              <h5>{t ? "Association" : "会馆"}</h5>
              <Link href="/about">{t ? "About" : "关于会馆"}</Link>
              <Link href="/about/structure">{t ? "Structure" : "组织架构"}</Link>
              <Link href="/about/board">{t ? "Past boards" : "历届董事会"}</Link>
              <Link href="/activities">{t ? "Activities" : "会馆活动"}</Link>
            </div>
            <div className="footer-col">
              <h5>{t ? "Take part" : "参与"}</h5>
              <Link href="/member">{t ? "Membership" : "会员注册"}</Link>
              <Link href="/conference">{t ? "Convention" : "世界恳亲大会"}</Link>
              <Link href="/activities">{t ? "Cantonese opera" : "粤剧组"}</Link>
              <Link href="/news">{t ? "News" : "最新动态"}</Link>
            </div>
            <div className="footer-col">
              <h5>{t ? "Contact" : "联系"}</h5>
              <p>{t ? "Singapore" : "新加坡 · 会馆地址"}</p>
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
              <Link href="/contact">{t ? "Contact" : "联系"}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
.towk-paper{
  --rice:#F5F2EC; --paper:#FBF8F2; --white:#FFFFFF;
  --ink:#211D18; --body:#4A443C; --muted:#6F675C;
  --vermilion:#C0392B; --vermilion-deep:#9E2C20; --oxblood:#5A1A14;
  --gold:#D4A017; --gold-ink:#8A6D1F; --gold-soft:#E8C25A;
  --hairline:#E6E0D6; --hairline-strong:#D8D0C2;
  --display:var(--font-source-serif),var(--font-noto-serif-sc),Georgia,'Times New Roman',serif;
  --sans:var(--font-inter),var(--font-noto-sans-sc),-apple-system,'Segoe UI','Microsoft YaHei',sans-serif;
  --shadow-card:0 1px 2px rgba(33,29,24,.05), 0 10px 30px -12px rgba(33,29,24,.14);
  --shadow-soft:0 1px 2px rgba(33,29,24,.04), 0 6px 18px -10px rgba(33,29,24,.10);
  --maxw:1140px;
  background:var(--rice); color:var(--body);
  font-family:var(--sans); font-size:17px; line-height:1.65;
  -webkit-font-smoothing:antialiased;
}
.towk-paper h1,.towk-paper h2,.towk-paper h3,.towk-paper h4{font-family:var(--display); color:var(--ink); font-weight:600; line-height:1.18; margin:0; letter-spacing:.01em; white-space:pre-line;}
.towk-paper p{margin:0;}
.towk-paper a{color:inherit; text-decoration:none;}
.towk-paper .wrap{max-width:var(--maxw); margin:0 auto; padding:0 28px;}
.towk-paper .eyebrow{font-family:var(--sans); font-size:13px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; color:var(--gold-ink); margin:0 0 18px;}
.towk-paper .btn{display:inline-flex; align-items:center; gap:8px; font-family:var(--sans); font-size:15px; font-weight:600; padding:13px 24px; border-radius:9px; cursor:pointer; border:1.5px solid transparent; transition:transform .15s ease, background .2s ease, border-color .2s ease;}
.towk-paper .btn-primary{background:var(--vermilion); color:#fff; border-color:var(--vermilion);}
.towk-paper .btn-primary:hover{background:var(--vermilion-deep); border-color:var(--vermilion-deep);}
.towk-paper .btn-ghost{background:transparent; color:var(--ink); border-color:var(--hairline-strong);}
.towk-paper .btn-ghost:hover{border-color:var(--ink);}
.towk-paper .btn-gold{background:var(--gold); color:#3a2c06; border-color:var(--gold);}
.towk-paper .btn-gold:hover{background:var(--gold-soft);}
.towk-paper .btn-line-cream{background:transparent; color:#F6EFE3; border-color:rgba(246,239,227,.4);}
.towk-paper .btn-line-cream:hover{border-color:#F6EFE3;}
.towk-paper .arrow{transition:transform .15s ease;}
.towk-paper .btn:hover .arrow,.towk-paper .more:hover .arrow{transform:translateX(3px);}
.towk-paper .seal{display:inline-flex; flex-direction:column; align-items:center; justify-content:center; background:var(--vermilion); color:#fff; font-family:var(--display); font-weight:700; line-height:.98; border-radius:7px; box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.32); letter-spacing:.04em; width:40px; height:40px; font-size:15px;}
.towk-paper .seal span{display:block;}
.towk-paper .site-header{position:sticky; top:0; z-index:40; background:rgba(245,242,236,.86); backdrop-filter:saturate(140%) blur(8px); border-bottom:1px solid var(--hairline); transition:box-shadow .2s ease, background .2s ease;}
.towk-paper .site-header.scrolled{box-shadow:0 1px 0 var(--hairline), 0 8px 24px -18px rgba(33,29,24,.4); background:rgba(245,242,236,.95);}
.towk-paper .nav{display:flex; align-items:center; justify-content:space-between; height:72px;}
.towk-paper .brand{display:flex; align-items:center; gap:13px;}
.towk-paper .brand-name{display:flex; flex-direction:column; line-height:1.1;}
.towk-paper .brand-name .zh{font-family:var(--display); font-weight:600; font-size:19px; color:var(--ink); letter-spacing:.04em;}
.towk-paper .brand-name .en{font-family:var(--sans); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted);}
.towk-paper .nav-links{display:flex; align-items:center; gap:30px;}
.towk-paper .nav-links a{font-size:15px; color:var(--body); font-weight:500; position:relative; padding:6px 0;}
.towk-paper .nav-links a::after{content:""; position:absolute; left:0; right:0; bottom:0; height:2px; background:var(--gold); transform:scaleX(0); transform-origin:left; transition:transform .2s ease;}
.towk-paper .nav-links a:hover{color:var(--ink);}
.towk-paper .nav-links a:hover::after{transform:scaleX(1);}
.towk-paper .nav-actions{display:flex; align-items:center; gap:16px;}
.towk-paper .lang{font-size:13px; font-weight:600; color:var(--muted); letter-spacing:.04em; display:flex; gap:6px; align-items:center;}
.towk-paper .lang b{color:var(--ink);}
.towk-paper .lang span{color:var(--hairline-strong);}
.towk-paper .nav-cta{font-size:14px; padding:10px 20px;}
.towk-paper .menu-btn{display:none; background:none; border:none; cursor:pointer; padding:6px; color:var(--ink);}
.towk-paper .hero{padding:74px 0 64px;}
.towk-paper .hero-grid{display:grid; grid-template-columns:1.06fr .94fr; gap:56px; align-items:center;}
.towk-paper .hero h1{font-size:60px; letter-spacing:.03em;}
.towk-paper .hero .sub-en{font-family:var(--display); font-style:italic; font-size:22px; color:var(--vermilion-deep); margin:22px 0 18px; line-height:1.4;}
.towk-paper .hero .lede{font-size:18px; color:var(--body); max-width:30em;}
.towk-paper .hero-actions{display:flex; flex-wrap:wrap; gap:14px; margin-top:34px;}
.towk-paper .hero-divider{display:flex; align-items:center; gap:14px; margin:30px 0 0; color:var(--muted); font-size:13.5px; letter-spacing:.04em;}
.towk-paper .hero-divider .ln{height:1px; width:40px; background:var(--gold);}
.towk-paper .frame{position:relative;}
.towk-paper .photo{position:relative; border-radius:16px; aspect-ratio:4/4.6; width:100%; overflow:hidden; background:var(--paper); border:1px solid var(--hairline-strong); box-shadow:var(--shadow-card); display:flex; align-items:flex-end;}
.towk-paper .photo .cap{position:relative; z-index:2; padding:18px 20px; font-family:var(--sans); font-size:13px; color:#F6EFE3; letter-spacing:.03em; display:flex; align-items:center; gap:8px; width:100%; background:linear-gradient(to top, rgba(33,29,24,.62), rgba(33,29,24,0));}
.towk-paper .photo .cap .dot{width:7px; height:7px; border-radius:50%; background:var(--gold);}
.towk-paper .frame .seal{position:absolute; bottom:-22px; right:-16px; width:74px; height:74px; font-size:26px; transform:rotate(-4deg); box-shadow:0 8px 22px -8px rgba(90,26,20,.55), inset 0 0 0 2px rgba(255,255,255,.34); z-index:3;}
.towk-paper .stats{border-top:1px solid var(--hairline); border-bottom:1px solid var(--hairline); background:var(--paper);}
.towk-paper .stats-grid{display:grid; grid-template-columns:repeat(4,1fr);}
.towk-paper .stat{padding:30px 24px; text-align:center; border-right:1px solid var(--hairline);}
.towk-paper .stat:last-child{border-right:none;}
.towk-paper .stat .num{font-family:var(--display); font-size:34px; font-weight:600; color:var(--vermilion-deep); line-height:1;}
.towk-paper .stat .lab{font-family:var(--sans); font-size:13.5px; color:var(--muted); margin-top:9px; letter-spacing:.04em;}
.towk-paper .about{padding:84px 0;}
.towk-paper .about-grid{display:grid; grid-template-columns:.82fr 1.18fr; gap:54px;}
.towk-paper .about h2{font-size:38px;}
.towk-paper .about .kicker-cn{font-family:var(--display); font-size:20px; color:var(--gold-ink); margin-top:14px;}
.towk-paper .about p{font-size:17.5px; color:var(--body); margin-bottom:18px;}
.towk-paper .about p:last-child{margin-bottom:0;}
.towk-paper .about .pull{font-family:var(--display); font-size:21px; color:var(--ink); line-height:1.5; border-left:3px solid var(--gold); padding-left:20px; margin:6px 0 22px;}
.towk-paper .reunion{background:var(--oxblood); color:#EDE0CF; position:relative; overflow:hidden;}
.towk-paper .reunion::before{content:"東安"; position:absolute; right:-2%; top:-18%; font-family:var(--display); font-weight:700; font-size:280px; color:rgba(212,160,23,.07); letter-spacing:.1em; pointer-events:none; line-height:1;}
.towk-paper .reunion-inner{padding:82px 0; position:relative;}
.towk-paper .reunion-grid{display:grid; grid-template-columns:1.15fr .85fr; gap:54px; align-items:center;}
.towk-paper .reunion .eyebrow{color:var(--gold-soft);}
.towk-paper .reunion h2{color:#FBF3E6; font-size:42px;}
.towk-paper .reunion .r-lede{color:#E2D2BD; font-size:18px; margin:22px 0 16px; max-width:32em;}
.towk-paper .reunion .places{display:flex; flex-wrap:wrap; gap:10px; margin:22px 0 32px;}
.towk-paper .reunion .chip{font-family:var(--sans); font-size:13px; color:#F2E6D3; border:1px solid rgba(212,160,23,.4); border-radius:20px; padding:6px 15px; letter-spacing:.05em;}
.towk-paper .reunion .r-actions{display:flex; flex-wrap:wrap; gap:14px; align-items:center;}
.towk-paper .photo-dark{position:relative; overflow:hidden; border-radius:16px; aspect-ratio:5/4; width:100%; background:#4A130E; border:1px solid rgba(212,160,23,.28); display:flex; align-items:flex-end; box-shadow:0 24px 50px -24px rgba(0,0,0,.6);}
.towk-paper .photo-dark .cap{position:relative; z-index:2; padding:16px 18px; font-family:var(--sans); font-size:13px; color:#D9C9B4; display:flex; gap:8px; align-items:center;}
.towk-paper .photo-dark .cap .dot{width:7px; height:7px; border-radius:50%; background:var(--gold);}
.towk-paper .activities{padding:88px 0;}
.towk-paper .sec-head{display:flex; align-items:flex-end; justify-content:space-between; gap:20px; margin-bottom:42px; flex-wrap:wrap;}
.towk-paper .sec-head h2{font-size:36px;}
.towk-paper .sec-head .sub{font-size:16px; color:var(--muted); margin-top:10px;}
.towk-paper .cards{display:grid; grid-template-columns:repeat(3,1fr); gap:26px;}
.towk-paper .card{background:var(--white); border:1px solid var(--hairline); border-radius:16px; overflow:hidden; box-shadow:var(--shadow-soft); transition:transform .18s ease, box-shadow .18s ease; display:flex; flex-direction:column;}
.towk-paper .card:hover{transform:translateY(-4px); box-shadow:var(--shadow-card);}
.towk-paper .card-photo{position:relative; overflow:hidden; aspect-ratio:16/10; background:var(--paper); display:flex; align-items:center; justify-content:center; color:#BCB1A0; border-bottom:1px solid var(--hairline);}
.towk-paper .card-photo .badge{position:absolute; z-index:2; top:14px; left:14px; background:var(--vermilion); color:#fff; font-family:var(--sans); font-size:11.5px; font-weight:600; letter-spacing:.08em; padding:5px 11px; border-radius:6px;}
.towk-paper .card-body{padding:24px 24px 26px; display:flex; flex-direction:column; flex:1;}
.towk-paper .card h3{font-size:23px; margin-bottom:10px;}
.towk-paper .card p{font-size:15.5px; color:var(--body); flex:1;}
.towk-paper .more{display:inline-flex; align-items:center; gap:7px; font-family:var(--sans); font-size:14.5px; font-weight:600; color:var(--vermilion-deep); margin-top:18px;}
.towk-paper .events{padding:0 0 90px;}
.towk-paper .events-card{background:var(--white); border:1px solid var(--hairline); border-radius:18px; box-shadow:var(--shadow-soft); overflow:hidden;}
.towk-paper .event-row{display:flex; align-items:center; gap:26px; padding:24px 30px; border-bottom:1px solid var(--hairline); transition:background .15s ease;}
.towk-paper .event-row:last-child{border-bottom:none;}
.towk-paper .event-row:hover{background:var(--paper);}
.towk-paper .date-chip{flex-shrink:0; width:78px; text-align:center; border-right:1px solid var(--hairline); padding-right:24px;}
.towk-paper .date-chip .d{font-family:var(--display); font-size:30px; font-weight:600; color:var(--vermilion-deep); line-height:1;}
.towk-paper .date-chip .m{font-family:var(--sans); font-size:12.5px; color:var(--muted); letter-spacing:.1em; text-transform:uppercase; margin-top:5px;}
.towk-paper .event-info{flex:1; min-width:0;}
.towk-paper .event-info h4{font-family:var(--display); font-size:21px; color:var(--ink); margin-bottom:5px;}
.towk-paper .event-info .meta{font-family:var(--sans); font-size:14px; color:var(--muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
.towk-paper .event-tag{flex-shrink:0; font-family:var(--sans); font-size:12.5px; font-weight:600; letter-spacing:.04em; color:var(--gold-ink); border:1px solid var(--hairline-strong); border-radius:20px; padding:6px 14px;}
.towk-paper .join{padding:0 0 96px;}
.towk-paper .join-card{position:relative; background:var(--paper); border:1px solid var(--hairline-strong); border-radius:22px; padding:62px 56px; overflow:hidden; text-align:center;}
.towk-paper .join-card .seal{position:absolute; top:-24px; left:50%; transform:translateX(-50%) rotate(-3deg); width:64px; height:64px; font-size:22px;}
.towk-paper .join h2{font-size:40px; margin:14px 0 0;}
.towk-paper .join .j-lede{font-size:18px; color:var(--body); max-width:34em; margin:20px auto 0;}
.towk-paper .join-actions{display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:34px;}
.towk-paper .site-footer{background:var(--oxblood); color:#D9C9B4;}
.towk-paper .footer-top{border-top:3px solid var(--gold);}
.towk-paper .footer-rule{border-top:1px solid rgba(212,160,23,.22);}
.towk-paper .footer-grid{display:grid; grid-template-columns:1.5fr 1fr 1fr 1fr; gap:40px; padding:64px 0 48px;}
.towk-paper .footer-brand .seal{width:46px; height:46px; font-size:17px; margin-bottom:18px;}
.towk-paper .footer-brand .fb-zh{font-family:var(--display); font-size:22px; color:#FBF3E6; letter-spacing:.04em;}
.towk-paper .footer-brand .fb-en{font-family:var(--sans); font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:#B79C7E; margin-top:5px;}
.towk-paper .footer-brand p{font-size:14.5px; color:#C2AD92; margin-top:18px; max-width:26em; line-height:1.6;}
.towk-paper .footer-col h5{font-family:var(--sans); font-size:12.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--gold-soft); margin:0 0 18px;}
.towk-paper .footer-col a,.towk-paper .footer-col p{display:block; font-size:14.5px; color:#D9C9B4; margin-bottom:11px; line-height:1.5;}
.towk-paper .footer-col a:hover{color:#FBF3E6;}
.towk-paper .footer-bottom{padding:22px 0; display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap;}
.towk-paper .footer-bottom p{font-size:13px; color:#B79C7E; letter-spacing:.03em;}
.towk-paper .footer-bottom .fb-links{display:flex; gap:22px;}
.towk-paper .footer-bottom .fb-links a{font-size:13px; color:#B79C7E;}
.towk-paper .footer-bottom .fb-links a:hover{color:#FBF3E6;}
@media (max-width:980px){
  .towk-paper .hero h1{font-size:48px;}
  .towk-paper .hero-grid,.towk-paper .about-grid,.towk-paper .reunion-grid{grid-template-columns:1fr; gap:40px;}
  .towk-paper .frame{max-width:420px;}
  .towk-paper .cards{grid-template-columns:1fr 1fr;}
  .towk-paper .footer-grid{grid-template-columns:1fr 1fr;}
  .towk-paper .footer-brand{grid-column:1 / -1;}
}
@media (max-width:760px){
  .towk-paper .nav-links{display:none;}
  .towk-paper .menu-btn{display:block;}
  .towk-paper .nav-cta{display:none;}
  .towk-paper .nav-links.open{display:flex; position:absolute; top:72px; left:0; right:0; flex-direction:column; gap:0; background:var(--rice); border-bottom:1px solid var(--hairline); padding:8px 28px 18px;}
  .towk-paper .nav-links.open a{padding:13px 0; border-bottom:1px solid var(--hairline); width:100%;}
  .towk-paper .hero{padding:40px 0 36px;}
  .towk-paper .hero h1{font-size:38px;}
  .towk-paper .stats-grid{grid-template-columns:1fr 1fr;}
  .towk-paper .cards{grid-template-columns:1fr;}
  .towk-paper .about,.towk-paper .activities{padding:56px 0;}
  .towk-paper .reunion-inner{padding:56px 0;}
  .towk-paper .join-card{padding:46px 24px;}
  .towk-paper .join h2,.towk-paper .reunion h2,.towk-paper .about h2{font-size:30px;}
  .towk-paper .event-row{flex-wrap:wrap; gap:14px 20px;}
  .towk-paper .footer-grid{grid-template-columns:1fr; gap:34px; padding:48px 0 36px;}
}
`;
