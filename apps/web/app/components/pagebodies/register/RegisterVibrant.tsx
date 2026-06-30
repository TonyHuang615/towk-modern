"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRegister } from "./useRegister";

// 活力社群 / Vibrant — blur blobs, big rounded card, gradient badge + button.
export default function RegisterVibrant() {
  const t = useTranslations("member");
  const r = useRegister();

  const inputClass =
    "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition";
  const labelClass = "mb-1.5 block text-sm font-semibold";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <section className="relative mx-auto flex min-h-[80vh] max-w-[480px] flex-col justify-center px-5 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 text-center"
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-[0_18px_44px_-18px_rgba(0,0,0,0.5)]">
            T
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
            {t("registerTitle")}
          </h1>
          <p className="mt-2 text-muted-foreground">{t("registerSubtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] bg-card p-7 text-card-foreground shadow-[0_28px_70px_-32px_rgba(0,0,0,0.45)] sm:p-9"
        >
          <form onSubmit={r.submit} className="space-y-4">
            {r.error && (
              <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                {r.error}
              </div>
            )}

            <div>
              <label className={labelClass}>{t("name")}</label>
              <input
                type="text"
                value={r.name}
                onChange={(e) => r.setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className={inputClass}
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
                className={inputClass}
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
                className={inputClass}
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
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={r.loading}
              className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent py-3.5 text-sm font-bold text-primary-foreground shadow-[0_16px_40px_-18px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {r.loading ? "..." : t("createAccount")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("haveAccount")}{" "}
            <Link href="/member/login" className="font-semibold text-primary hover:underline">
              {t("backToLogin")}
            </Link>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
