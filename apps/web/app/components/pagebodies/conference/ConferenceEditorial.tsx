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

// 编辑杂志 — Conference。延续 HomeEditorial：象牙底、衬线大标题 + 克制无衬线正文、
// Eyebrow/Rule 母题、居中窄栏 (max-w 720) 与杂志分栏；旗舰世界恳亲大会以大幅
// 图片条 + 编号特写呈现。所有文案双语 i18n，图片沿用 shared 的 Unsplash 图。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ConferenceEditorial({ content }: { content: Record<string, any> }) {
  const t = useTranslations("conference");
  const conference = content.conference || {};

  const heroImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80";

  const features = [
    { title: t("feature1Title"), description: t("feature1Desc") },
    { title: t("feature2Title"), description: t("feature2Desc") },
    { title: t("feature3Title"), description: t("feature3Desc") },
  ];

  const pastConferences = conference?.pastConferences || [
    { year: "2019", location: t("locSingapore"), theme: t("conf11") },
    { year: "2017", location: t("locHongKong"), theme: t("conf10") },
    { year: "2015", location: t("locMalaysia"), theme: t("conf9") },
    { year: "2012", location: t("locHongKong"), theme: t("conf8") },
    { year: "2008", location: t("locKuching"), theme: t("conf7") },
    { year: "2005", location: t("locSingapore"), theme: t("conf6") },
  ];

  return (
    <>
      {/* ── HERO — centered masthead + wide image strip ── */}
      <section className="px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
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
            {conference?.title || t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {conference?.description || t("description")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-[1100px] overflow-hidden rounded-sm bg-muted sm:mt-20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={t("altConference")}
            className="h-[34vh] w-full object-cover grayscale-[0.15] sm:h-[44vh] lg:h-[52vh]"
          />
        </motion.div>
      </section>

      <Rule />

      {/* ── ABOUT — narrow column ── */}
      <section className="px-6 py-20 sm:py-28">
        <motion.div {...fade} className="mx-auto max-w-[720px]">
          <Eyebrow>{t("sectionLabel")}</Eyebrow>
          <h2 className="font-display mt-6 text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("aboutTitle")}
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-[1.9] text-foreground/85">
            <p>{t("aboutP1")}</p>
            <p>{t("aboutP2")}</p>
            <p>{t("aboutP3")}</p>
          </div>
        </motion.div>
      </section>

      <Rule />

      {/* ── PILLARS — numbered magazine columns ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div {...fade}>
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("description")}
            </h2>
          </motion.div>

          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <dt className="flex items-baseline gap-3">
                  <span className="font-display text-sm tabular-nums text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl tracking-tight text-foreground">
                    {f.title}
                  </span>
                </dt>
                <dd className="mt-2 pl-8 leading-relaxed text-muted-foreground">
                  {f.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <Rule />

      {/* ── PAST CONVENTIONS — dated chronicle list ── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[720px]">
          <motion.div {...fade}>
            <Eyebrow>{t("sectionLabel")}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("pastConferences")}
            </h2>
          </motion.div>

          <ul className="mt-12 divide-y divide-border">
            {pastConferences.map((c: { year: string; location: string; theme: string }, i: number) => (
              <motion.li
                key={c.year}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid gap-2 py-6 sm:grid-cols-[5rem_1fr] sm:gap-8"
              >
                <span className="font-display text-2xl tabular-nums text-primary/70 sm:text-3xl">
                  {c.year}
                </span>
                <div>
                  <p className="font-display text-lg leading-snug tracking-tight text-foreground">
                    {c.theme}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    {c.location}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <Rule />

      {/* ── NEXT CONVENTION — quiet editorial colophon ── */}
      <section className="px-6 py-20 text-center sm:py-28">
        <motion.div {...fade} className="mx-auto max-w-[720px]">
          <Eyebrow>{t("nextConference")}</Eyebrow>
          <h2 className="font-display mt-6 text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("nextConferenceInfo")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("nextConferenceLocation")}</p>
          <button className="mt-10 border-b border-primary pb-1 font-display text-lg tracking-tight text-primary transition-colors hover:text-foreground">
            {t("getUpdates")}
          </button>
        </motion.div>
      </section>
    </>
  );
}
