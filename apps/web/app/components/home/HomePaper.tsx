"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedNews } from "../../../lib/newsData";

// 宣纸书卷 — 忠实复刻 mockup（Notion 设计语言 + 东安会馆红金 + 印章）。
// 仅渲染主体；页头/页脚由 DesignShell（PaperChrome）提供，scoped CSS
// (.towk-paper) 已移至 globals.css，DesignShell 在外层套上 .towk-paper。
export default function HomePaper({ content }: { content: any }) {
  const locale = useLocale();

  const t = locale === "en";
  // 文案取自双语 i18n messages；图片取自 content.json（可后台编辑）
  const tHero = useTranslations("hero");
  const tAbout = useTranslations("about");
  const tConf = useTranslations("conference");
  const tAct = useTranslations("activities");

  const heroImg = content?.hero?.slides?.[0]?.image;
  const reunionImg = content?.hero?.slides?.[1]?.image || heroImg;
  const actImages: string[] = (content?.activities?.items || []).map(
    (i: any) => i?.image,
  );
  const news = getLocalizedNews(locale).slice(0, 3);

  const stats = [
    { num: "1876", lab: t ? "Founded" : "创立之年" },
    { num: tAbout("stat1Value"), lab: tAbout("stat1Label") },
    { num: tAbout("stat2Value"), lab: tAbout("stat2Label") },
    { num: tAbout("stat3Value"), lab: tAbout("stat3Label") },
  ];

  const chips = [
    tConf("locSingapore"),
    tConf("locHongKong"),
    tConf("locDongguan"),
    tConf("locMalaysia"),
    tConf("locKuching"),
  ];

  const acts = [0, 1, 2].map((i) => ({
    title: tAct(`act${i + 1}Title`),
    desc: tAct(`act${i + 1}Desc`),
    image: actImages[i],
  }));

  const Seal = ({ className = "" }: { className?: string }) => (
    <span className={`seal ${className}`}>
      <span>東</span>
      <span>安</span>
    </span>
  );

  return (
    <>
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                {t ? "Singapore Clan Association · Est. 1876" : "新加坡宗乡会馆 · 自 1876"}
              </p>
              <h1>{tHero("slide1Title")}</h1>
              <p className="sub-en">{tHero("slide1Subtitle")}</p>
              <p className="lede">{tHero("slide1Desc")}</p>
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
                  {heroImg && (
                    <Image
                      src={heroImg}
                      alt="东安会馆"
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
              <h2>{tAbout("defaultTitle")}</h2>
              <p className="kicker-cn">{tAbout("defaultSubtitle")}</p>
            </div>
            <div>
              <p className="pull">{tAbout("defaultContent")}</p>
              <p>{tAbout("story")}</p>
            </div>
          </div>
        </section>

        {/* REUNION (deep band) */}
        <section className="reunion" id="reunion">
          <div className="reunion-inner">
            <div className="wrap reunion-grid">
              <div>
                <p className="eyebrow">{t ? "Flagship Event" : "旗舰盛事"}</p>
                <h2>{tConf("title")}</h2>
                <p className="r-lede">{tConf("description")}</p>
                <div className="places">
                  {chips.map((c, i) => (
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
                  {reunionImg && (
                    <Image
                      src={reunionImg}
                      alt="恳亲大会"
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
              {acts.map((it, i) => (
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
                    <p>{it.desc}</p>
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
    </>
  );
}
