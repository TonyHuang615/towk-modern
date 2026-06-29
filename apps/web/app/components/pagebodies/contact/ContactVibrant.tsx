"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { useTranslations } from "next-intl";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — Contact。延续 HomeVibrant/AboutVibrant：明亮橙/青、大圆角 bento 卡片、
// 柔光色块、渐变 CTA、悬停上浮。所有文案双语 i18n。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContactVibrant({ content }: { content: Record<string, any> }) {
  void content;
  const t = useTranslations("contact");

  const MAP_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.825!2d103.8408!3d1.2795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a340000001%3A0x5398391ffbef7df6!2s21%20Bukit%20Pasoh%20Rd%2C%20Singapore%20089835!5e0!3m2!1sen!2ssg!4v1";

  const contactInfo = [
    { icon: MapPin, label: t("address"), value: t("addressValue") },
    { icon: Phone, label: t("phone"), value: t("phoneValue") },
    { icon: Clock, label: t("hours"), value: t("hoursValue") },
  ];

  const fieldClass =
    "w-full rounded-2xl border-0 bg-background/70 px-5 py-3.5 text-foreground placeholder:text-muted-foreground/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition";
  const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-14 pb-16 sm:pb-24">
        {/* ── BAND 1 · Hero ── */}
        <motion.section {...fade(0)} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            {t("sectionLabel")}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-6xl">{t("title")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.section>

        {/* ── BAND 2 · Contact info color cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-3 lg:mt-14">
          {contactInfo.map((item, i) => {
            const tone =
              i === 0
                ? "bg-primary text-primary-foreground"
                : i === 1
                  ? "bg-accent/15 text-foreground"
                  : "bg-card text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)]";
            return (
              <motion.div
                key={item.label}
                {...fade(i * 0.06)}
                className={`flex flex-col gap-4 rounded-[1.75rem] p-7 transition-transform duration-200 hover:-translate-y-1 ${tone}`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    i === 0 ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                </span>
                <div>
                  <div
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                      i === 0 ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </div>
                  <div className="mt-1 text-lg font-bold leading-snug">{item.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── BAND 3 · Big rounded form card + map/social side ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12 lg:mt-5">
          {/* Form card */}
          <motion.section
            {...fade(0)}
            className="col-span-1 rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:p-9 lg:col-span-7"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {t("sendMessage")}
            </span>
            <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{t("sendMessage")}</h2>
            <form className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>{t("name")}</label>
                  <input type="text" className={fieldClass} placeholder={t("namePlaceholder")} />
                </div>
                <div>
                  <label className={labelClass}>{t("email")}</label>
                  <input type="email" className={fieldClass} placeholder={t("emailPlaceholder")} />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t("subject")}</label>
                <input type="text" className={fieldClass} placeholder={t("subjectPlaceholder")} />
              </div>
              <div>
                <label className={labelClass}>{t("message")}</label>
                <textarea rows={5} className={`${fieldClass} resize-none`} placeholder={t("messagePlaceholder")} />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                {t("send")}
              </button>
            </form>
          </motion.section>

          {/* Side column · map card + follow card */}
          <div className="col-span-1 flex flex-col gap-4 sm:gap-5 lg:col-span-5">
            <motion.div
              {...fade(0.08)}
              className="relative min-h-[16rem] flex-1 overflow-hidden rounded-[2rem] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)]"
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
            </motion.div>

            <motion.div
              {...fade(0.12)}
              className="rounded-[2rem] bg-gradient-to-br from-primary to-accent p-7 text-primary-foreground"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
                {t("followUs")}
              </span>
              <div className="mt-4 flex gap-3">
                {["Facebook", "Instagram", "WeChat"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={social}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-lg font-bold text-foreground transition-transform duration-200 hover:-translate-y-1"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BAND 4 · Location label ── */}
        <motion.div {...fade(0)} className="mt-10 text-center sm:mt-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("location")}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
