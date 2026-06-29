"use client";

import { MapPin, Phone, Clock, Send } from "lucide-react";
import { useTranslations } from "next-intl";

// 宣纸书卷 — Contact。延续 HomePaper/AboutPaper 版式：印章、烫金细线、衬线大标题、
// 米色宣纸底。渲染于 DesignShell 的 .towk-paper 容器内，复用 globals.css 中
// .towk-paper 作用域类（.wrap / .eyebrow / .hero / .events-card / .card / .seal …）。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContactPaper({ content }: { content: Record<string, any> }) {
  void content;
  const t = useTranslations("contact");

  const MAP_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.825!2d103.8408!3d1.2795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a340000001%3A0x5398391ffbef7df6!2s21%20Bukit%20Pasoh%20Rd%2C%20Singapore%20089835!5e0!3m2!1sen!2ssg!4v1";

  const contactInfo = [
    { icon: MapPin, label: t("address"), value: t("addressValue") },
    { icon: Phone, label: t("phone"), value: t("phoneValue") },
    { icon: Clock, label: t("hours"), value: t("hoursValue") },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 15px",
    fontFamily: "var(--sans)",
    fontSize: "15.5px",
    color: "var(--ink)",
    background: "var(--paper)",
    border: "1px solid var(--hairline-strong)",
    borderRadius: 9,
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--display)",
    fontSize: 16,
    color: "var(--ink)",
    marginBottom: 7,
  };

  const Seal = () => (
    <span className="seal">
      <span>東</span>
      <span>安</span>
    </span>
  );

  return (
    <>
      {/* HERO — serif masthead */}
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 820 }}>
          <p className="eyebrow">{t("sectionLabel")}</p>
          <h1 style={{ letterSpacing: ".03em" }}>{t("title")}</h1>
          <p className="sub-en" style={{ marginInline: "auto" }}>{t("subtitle")}</p>
          <div className="hero-divider" style={{ justifyContent: "center" }}>
            <span className="ln" />
            {t("info")}
            <span className="ln" />
          </div>
        </div>
      </section>

      {/* CONTACT + LETTERPRESS FORM — gold-ruled register beside a serif form card */}
      <section className="about" style={{ paddingTop: 24 }}>
        <div className="wrap about-grid" style={{ gridTemplateColumns: ".9fr 1.1fr", alignItems: "start" }}>
          {/* Left — engraved contact register + seals */}
          <div>
            <p className="eyebrow">{t("info")}</p>
            <div className="events-card" style={{ marginTop: 6 }}>
              {contactInfo.map((item) => (
                <div className="event-row" key={item.label}>
                  <div
                    className="date-chip"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: "var(--vermilion-deep)" }} />
                  </div>
                  <div className="event-info">
                    <div
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: 12.5,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: "var(--gold-ink)",
                      }}
                    >
                      {item.label}
                    </div>
                    <h4 style={{ marginTop: 4 }}>{item.value}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 30 }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>{t("followUs")}</p>
              <div style={{ display: "flex", gap: 12 }}>
                {["Facebook", "Instagram", "WeChat"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={social}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 9,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--display)",
                      fontWeight: 700,
                      color: "var(--vermilion-deep)",
                      background: "var(--paper)",
                      border: "1px solid var(--gold)",
                    }}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — letterpress form card with seal + gold rules */}
          <div className="frame">
            <article className="card" style={{ padding: "40px 38px" }}>
              <p className="eyebrow">{t("sendMessage")}</p>
              <h2 style={{ fontSize: 30, marginBottom: 22 }}>{t("sendMessage")}</h2>
              <form style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>{t("name")}</label>
                    <input type="text" style={inputStyle} placeholder={t("namePlaceholder")} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t("email")}</label>
                    <input type="email" style={inputStyle} placeholder={t("emailPlaceholder")} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>{t("subject")}</label>
                  <input type="text" style={inputStyle} placeholder={t("subjectPlaceholder")} />
                </div>
                <div>
                  <label style={labelStyle}>{t("message")}</label>
                  <textarea rows={5} style={{ ...inputStyle, resize: "vertical" }} placeholder={t("messagePlaceholder")} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                  <Send className="w-4 h-4" />
                  {t("send")}
                </button>
              </form>
            </article>
            <Seal />
          </div>
        </div>
      </section>

      {/* MAP — framed plate with caption */}
      <section className="events" style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">{t("sectionLabel")}</p>
              <h2>{t("location")}</h2>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--hairline-strong)",
              boxShadow: "var(--shadow-card)",
              aspectRatio: "21 / 9",
            }}
          >
            <iframe
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapTitle")}
            />
          </div>
        </div>
      </section>
    </>
  );
}
