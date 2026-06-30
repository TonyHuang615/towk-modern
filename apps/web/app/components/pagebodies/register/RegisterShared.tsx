"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRegister } from "./useRegister";

// 经典 / Classic — Member register。延续登录页的圆角卡片 + 品牌圆章。
export default function RegisterShared() {
  const t = useTranslations("member");
  const r = useRegister();

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-3xl font-bold">{t("registerTitle")}</h1>
          <p className="mt-2 text-foreground/60">{t("registerSubtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-2xl p-8 shadow-card"
        >
          <form onSubmit={r.submit} className="space-y-4">
            {r.error && (
              <div className="p-3 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 text-sm rounded-lg">
                {r.error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("name")}</label>
              <input
                type="text"
                value={r.name}
                onChange={(e) => r.setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("email")}</label>
              <input
                type="email"
                value={r.email}
                onChange={(e) => r.setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("password")}</label>
              <input
                type="password"
                value={r.password}
                onChange={(e) => r.setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">{t("confirmPassword")}</label>
              <input
                type="password"
                value={r.confirm}
                onChange={(e) => r.setConfirm(e.target.value)}
                placeholder={t("confirmPasswordPlaceholder")}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={r.loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {r.loading ? "..." : t("createAccount")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/60">
            {t("haveAccount")}{" "}
            <Link href="/member/login" className="text-primary font-medium hover:underline">
              {t("backToLogin")}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
