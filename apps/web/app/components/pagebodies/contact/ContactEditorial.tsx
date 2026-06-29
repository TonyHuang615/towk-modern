"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.35em] text-primary">
      {children}
    </span>
  );
}

function Rule() {
  return (
    <div className="mx-auto max-w-[720px] px-6">
      <div className="border-t border-border" />
    </div>
  );
}

// 编辑杂志 — Contact。延续 HomeEditorial/AboutEditorial：象牙底、衬线大标题 +
// 克制无衬线正文、Eyebrow/Rule 母题、居中窄栏 (max-w 720) 与杂志分栏。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContactEditorial({ content }: { content: Record<string, any> }) {
  void content;
  const t = useTranslations("contact");

  const MAP_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.825!2d103.8408!3d1.2795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a340000001%3A0x5398391ffbef7df6!2s21%20Bukit%20Pasoh%20Rd%2C%20Singapore%20089835!5e0!3m2!1sen!2ssg!4v1";

  const contactInfo = [
    { label: t("address"), value: t("addressValue") },
    { label: t("phone"), value: t("phoneValue") },
    { label: t("hours"), value: t("hoursValue") },
  ];

  const fieldClass =
    "mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-2 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-0 transition-colors";
  const labelClass =
    "block text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground";

  return (
    <>
      {/* ── HERO — centered masthead ── */}
      <section className="px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-7 text-balance text-[2.6rem] leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.5rem] lg:leading-[1.04]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      <Rule />

      {/* ── CONTACT + FORM — two-column magazine spread ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[980px] gap-x-16 gap-y-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info column — labelled rows divided by rules */}
          <motion.div {...fade}>
            <Eyebrow>{t("info")}</Eyebrow>
            <dl className="mt-8 divide-y divide-border border-t border-border">
              {contactInfo.map((item) => (
                <div key={item.label} className="py-5">
                  <dt className={labelClass}>{item.label}</dt>
                  <dd className="mt-2 font-display text-xl leading-snug tracking-tight text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <Eyebrow>{t("followUs")}</Eyebrow>
              <ul className="mt-4 space-y-1">
                {["Facebook", "Instagram", "WeChat"].map((social) => (
                  <li key={social}>
                    <a
                      href="#"
                      className="group inline-flex items-baseline gap-3 py-1 text-lg text-foreground transition-colors hover:text-primary"
                    >
                      <span className="font-display text-sm text-primary/60">
                        {social[0]}
                      </span>
                      <span className="border-b border-transparent group-hover:border-primary">
                        {social}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form column — underlined editorial fields */}
          <motion.div {...fade} transition={{ duration: 0.6, delay: 0.08 }}>
            <Eyebrow>{t("sendMessage")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("sendMessage")}
            </h2>
            <form className="mt-10 space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
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
                <textarea rows={4} className={`${fieldClass} resize-none`} placeholder={t("messagePlaceholder")} />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 border-b-2 border-primary pb-1 font-display text-lg tracking-tight text-foreground transition-colors hover:text-primary"
              >
                {t("send")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ── LOCATION — wide image strip ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{t("sectionLabel")}</Eyebrow>
          <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("location")}
          </h2>
        </div>
        <motion.div
          {...fade}
          className="mx-auto mt-14 aspect-[21/9] max-w-[1100px] overflow-hidden rounded-sm bg-muted"
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
            className="h-full w-full grayscale-[0.15]"
          />
        </motion.div>
      </section>
    </>
  );
}
