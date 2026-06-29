"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

/* 庄重典藏 / Stately Archive — Contact。延续 HomeStately/AboutStately：暗色展厅、
   罗马数字展陈编号、烫金细线、双线框、展签式说明、镌刻数字。 */

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ"];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ExhibitHeader({
  numeral,
  eyebrow,
  title,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
      className="mx-auto max-w-3xl text-center"
    >
      <div
        className="font-display text-5xl md:text-6xl text-primary/40 leading-none select-none"
        aria-hidden
      >
        {numeral}
      </div>
      <div className="mx-auto mt-6 h-px w-16 bg-primary/50" />
      <p className="mt-6 text-[0.7rem] uppercase tracking-[0.42em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.08em]">{title}</h2>
    </motion.div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContactStately({ content }: { content: Record<string, any> }) {
  void content;
  const locale = useLocale();
  const t = useTranslations("contact");

  const MAP_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.825!2d103.8408!3d1.2795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a340000001%3A0x5398391ffbef7df6!2s21%20Bukit%20Pasoh%20Rd%2C%20Singapore%20089835!5e0!3m2!1sen!2ssg!4v1";

  const contactInfo = [
    { icon: MapPin, label: t("address"), value: t("addressValue") },
    { icon: Phone, label: t("phone"), value: t("phoneValue") },
    { icon: Clock, label: t("hours"), value: t("hoursValue") },
  ];

  const fieldClass =
    "mt-2 w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors";
  const labelClass = "text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground";

  return (
    <>
      {/* ════════ HERO — double gold-hairline frame ════════ */}
      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="relative z-10 w-full max-w-4xl"
        >
          <div className="border border-primary/50 p-2 sm:p-3">
            <div className="border border-accent/40 px-6 py-14 text-center sm:px-12 sm:py-20">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("sectionLabel")}
              </p>
              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-6xl lg:text-7xl">
                {t("title")}
              </h1>
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mx-auto mt-7 max-w-xl text-base tracking-[0.12em] text-accent sm:text-lg">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ Ⅰ — 联系信息 / Contact Info (engraved plaque) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <ExhibitHeader numeral={ROMAN[0]} eyebrow={t("sectionLabel")} title={t("info")} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-16 divide-y divide-border border border-border bg-card"
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-center gap-6 px-7 py-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary/30 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-lg font-bold tracking-[0.04em] text-foreground">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-10 flex flex-col items-center gap-5"
          >
            <p className={labelClass}>{t("followUs")}</p>
            <div className="flex gap-4">
              {["Facebook", "Instagram", "WeChat"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-12 w-12 items-center justify-center border border-primary/30 font-display text-lg font-bold text-primary transition-colors duration-200 hover:bg-primary/10"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ Ⅱ — 发送消息 / Send a Message (bordered form) ════════ */}
      <section className="border-t border-border bg-card/40 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <ExhibitHeader numeral={ROMAN[1]} eyebrow={t("sectionLabel")} title={t("sendMessage")} />

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-16 border border-border bg-card p-8 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass}>{t("name")}</label>
                <input type="text" className={fieldClass} placeholder={t("namePlaceholder")} />
              </div>
              <div>
                <label className={labelClass}>{t("email")}</label>
                <input type="email" className={fieldClass} placeholder={t("emailPlaceholder")} />
              </div>
            </div>
            <div className="mt-6">
              <label className={labelClass}>{t("subject")}</label>
              <input type="text" className={fieldClass} placeholder={t("subjectPlaceholder")} />
            </div>
            <div className="mt-6">
              <label className={labelClass}>{t("message")}</label>
              <textarea rows={5} className={`${fieldClass} resize-none`} placeholder={t("messagePlaceholder")} />
            </div>
            <button
              type="submit"
              className="mt-8 w-full border border-primary bg-primary/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              {t("send")}
            </button>
          </motion.form>
        </div>
      </section>

      {/* ════════ Ⅲ — 会馆位置 / Location (framed plate) ════════ */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ExhibitHeader numeral={ROMAN[2]} eyebrow={t("sectionLabel")} title={t("location")} />

          <motion.figure
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="relative mx-auto mt-16 aspect-[21/9] overflow-hidden border border-border"
          >
            <iframe
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapTitle")}
              className="absolute inset-0 h-full w-full"
            />
          </motion.figure>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {locale === "en" ? "21 Bukit Pasoh Road · Singapore" : "21 Bukit Pasoh Road · 新加坡"}
          </p>
        </div>
      </section>
    </>
  );
}
