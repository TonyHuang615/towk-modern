"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRegister } from "./useRegister";

// 庄重典藏 / Stately — dark museum plaque, double gold/accent hairline frame,
// engraved title with diamond rule, bordered inputs.
export default function RegisterStately() {
  const t = useTranslations("member");
  const locale = useLocale();
  const r = useRegister();

  const inputClass =
    "w-full border border-border bg-background/60 px-4 py-3 text-sm tracking-[0.04em] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors";
  const labelClass =
    "block text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground";

  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="border border-primary/50 p-2 sm:p-3">
          <div className="border border-accent/40 px-7 py-12 sm:px-10 sm:py-14">
            <div className="text-center">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("registerSubtitle")}
              </p>
              <p className="mt-4 text-xs tracking-[0.4em] text-muted-foreground">
                {locale === "en" ? "Members · 1876" : "会员 · 1876"}
              </p>
              <h1 className="mt-7 text-3xl font-bold tracking-[0.08em] sm:text-4xl">
                {t("registerTitle")}
              </h1>
              <div className="mx-auto mt-7 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60" />
              </div>
            </div>

            <form onSubmit={r.submit} className="mt-9 space-y-5 text-left">
              {r.error && (
                <p className="border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm tracking-[0.04em] text-primary">
                  {r.error}
                </p>
              )}

              <div>
                <label className={labelClass}>{t("name")}</label>
                <input
                  type="text"
                  value={r.name}
                  onChange={(e) => r.setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div>
                <label className={labelClass}>{t("email")}</label>
                <input
                  type="email"
                  value={r.email}
                  onChange={(e) => r.setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div>
                <label className={labelClass}>{t("password")}</label>
                <input
                  type="password"
                  value={r.password}
                  onChange={(e) => r.setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  required
                  minLength={8}
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div>
                <label className={labelClass}>{t("confirmPassword")}</label>
                <input
                  type="password"
                  value={r.confirm}
                  onChange={(e) => r.setConfirm(e.target.value)}
                  placeholder={t("confirmPasswordPlaceholder")}
                  required
                  minLength={8}
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <button
                type="submit"
                disabled={r.loading}
                className="w-full bg-primary py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {r.loading ? "..." : t("createAccount")}
              </button>
            </form>

            <p className="mt-7 text-center text-sm tracking-[0.04em] text-muted-foreground">
              {t("haveAccount")}{" "}
              <Link href="/member/login" className="text-accent underline-offset-4 hover:underline">
                {t("backToLogin")}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
