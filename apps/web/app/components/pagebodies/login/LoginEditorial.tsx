"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useGoogleEnabled } from "./useGoogleEnabled";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

// 编辑杂志 — Member login。延续 HomeEditorial：象牙底、衬线大标题、Eyebrow/Rule
// 母题、居中窄栏、下划线式输入框。PROP-LESS，自取状态与处理器。
export default function LoginEditorial() {
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
    "w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors";

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
            {t("loginSubtitle")}
          </span>
          <h1 className="font-display mt-6 text-4xl leading-tight tracking-tight sm:text-5xl">
            {t("login")}
          </h1>
        </motion.div>

        <div className="mx-auto mt-10 max-w-[320px] border-t border-border" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10"
        >
          {/* Google login — only when the provider is configured */}
          {googleEnabled && (
          <>
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 border border-foreground/20 py-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-foreground/5"
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

          {/* Divider with rules */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 border-t border-border" />
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
              {t("orDivider")}
            </span>
            <div className="flex-1 border-t border-border" />
          </div>
          </>
          )}

          {/* Email form — underline inputs */}
          <form onSubmit={handleEmailLogin} className="space-y-7">
            {error && (
              <p className="border-l-2 border-primary pl-3 text-sm text-primary">{error}</p>
            )}

            <div>
              <label className="block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
                {t("email")}
              </label>
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
              <label className="block text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
                {t("password")}
              </label>
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
              className="w-full bg-foreground py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "..." : t("signIn")}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link href="/member/login" className="text-foreground underline underline-offset-4 hover:text-primary">
              {t("register")}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
