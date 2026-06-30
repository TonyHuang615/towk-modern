"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useGoogleEnabled } from "./useGoogleEnabled";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

// 活力鲜明 — Member login。延续 HomeVibrant：明亮橙/青、大圆角彩色卡片、柔光色块、
// 渐变 CTA 按钮。PROP-LESS，自取状态与处理器。
export default function LoginVibrant() {
  const t = useTranslations("member");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const googleEnabled = useGoogleEnabled();

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/member" });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/member";
    }
    setLoading(false);
  };

  const inputClass =
    "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition";

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
          <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">{t("login")}</h1>
          <p className="mt-2 text-muted-foreground">{t("loginSubtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] bg-card p-7 text-card-foreground shadow-[0_28px_70px_-32px_rgba(0,0,0,0.45)] sm:p-9"
        >
          {/* Google login — only when the provider is configured */}
          {googleEnabled && (
          <>
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t("loginWithGoogle")}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("orDivider")}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          </>
          )}

          {/* Email form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {error && (
              <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-semibold">{t("email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">{t("password")}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                required
                minLength={6}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent py-3.5 text-sm font-bold text-primary-foreground shadow-[0_16px_40px_-18px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "..." : t("signIn")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link href="/member/register" className="font-semibold text-primary hover:underline">
              {t("register")}
            </Link>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
