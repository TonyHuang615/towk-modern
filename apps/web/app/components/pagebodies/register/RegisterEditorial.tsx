"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRegister } from "./useRegister";

// 暖陶编辑 / Editorial — ivory magazine register: eyebrow + serif title,
// hairline rule, underline-style inputs, uppercase-tracked solid button.
export default function RegisterEditorial() {
  const t = useTranslations("member");
  const r = useRegister();

  const inputClass =
    "w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors";
  const labelClass =
    "block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground";

  return (
    <section className="px-6 pt-24 pb-28 sm:pt-32">
      <div className="mx-auto max-w-[440px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="block text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
            {t("registerSubtitle")}
          </span>
          <h1 className="font-display mt-6 text-4xl leading-tight tracking-tight sm:text-5xl">
            {t("registerTitle")}
          </h1>
        </motion.div>

        <div className="mx-auto mt-10 max-w-[320px] border-t border-border" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10"
        >
          <form onSubmit={r.submit} className="space-y-7">
            {r.error && (
              <p className="border-l-2 border-primary pl-3 text-sm text-primary">{r.error}</p>
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
              className="w-full bg-foreground py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {r.loading ? "..." : t("createAccount")}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("haveAccount")}{" "}
            <Link
              href="/member/login"
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              {t("backToLogin")}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
