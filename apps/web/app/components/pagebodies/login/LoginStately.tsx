"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useGoogleEnabled } from "./useGoogleEnabled";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

// 庄重典藏 / Stately Archive — Member login。延续 HomeStately：暗色展厅、
// 烫金细线、双线框、展签式标签、镌刻标题。PROP-LESS，自取状态与处理器。
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LoginStately() {
  const locale = useLocale();
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
    "w-full border border-border bg-background/60 px-4 py-3 text-sm tracking-[0.04em] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors";

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
        transition={{ duration: 0.9, ease }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Double gold-hairline plaque */}
        <div className="border border-primary/50 p-2 sm:p-3">
          <div className="border border-accent/40 px-7 py-12 sm:px-10 sm:py-14">
            <div className="text-center">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("loginSubtitle")}
              </p>
              <p className="mt-4 text-xs tracking-[0.4em] text-muted-foreground">
                {locale === "en" ? "Members · 1876" : "会员 · 1876"}
              </p>
              <h1 className="mt-7 text-3xl font-bold tracking-[0.08em] sm:text-4xl">
                {t("login")}
              </h1>
              <div className="mx-auto mt-7 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60" />
              </div>
            </div>

            {/* Google login — only when the provider is configured */}
            {googleEnabled && (
            <>
            <button
              onClick={handleGoogleLogin}
              className="mt-9 flex w-full items-center justify-center gap-3 border border-primary/40 py-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-primary/10"
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

            {/* Gold hairline divider */}
            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-primary/30" />
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-accent">
                {t("orDivider")}
              </span>
              <span className="h-px flex-1 bg-primary/30" />
            </div>
            </>
            )}

            {/* Email form */}
            <form onSubmit={handleEmailLogin} className="space-y-5 text-left">
              {error && (
                <p className="border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm tracking-[0.04em] text-primary">
                  {error}
                </p>
              )}

              <div>
                <label className="block text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                  {t("email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div>
                <label className="block text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                  {t("password")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  required
                  minLength={6}
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "..." : t("signIn")}
              </button>
            </form>

            <p className="mt-7 text-center text-sm tracking-[0.04em] text-muted-foreground">
              {t("noAccount")}{" "}
              <Link href="/member/login" className="text-accent underline-offset-4 hover:underline">
                {t("register")}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
