"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useGoogleEnabled } from "./useGoogleEnabled";
import { useTranslations } from "next-intl";
import Link from "next/link";

// 宣纸书卷 — Member login。延续 HomePaper 版式语言：米色宣纸底、烫金细线、
// 衬线标签、朱红印章。渲染于 DesignShell 的 .towk-paper 容器内，复用其 CSS
// 变量 (--paper / --gold / --ink / --vermilion …)。PROP-LESS，自取状态与处理器。
export default function LoginPaper() {
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

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--display)",
    fontSize: 14,
    letterSpacing: ".04em",
    color: "var(--ink)",
    marginBottom: 8,
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    background: "var(--white)",
    border: "1px solid var(--hairline-strong)",
    borderRadius: 8,
    color: "var(--ink)",
    fontFamily: "var(--sans)",
    fontSize: 15,
    outline: "none",
  };

  return (
    <section className="hero" style={{ paddingTop: 96, paddingBottom: 110 }}>
      <div className="wrap" style={{ maxWidth: 540 }}>
        {/* Masthead with seal */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <span
            className="seal"
            style={{ width: 64, height: 64, fontSize: 22, margin: "0 auto 20px" }}
          >
            <span>東</span>
            <span>安</span>
          </span>
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            {t("loginSubtitle")}
          </p>
          <h1 style={{ fontFamily: "var(--display)", fontSize: 40, color: "var(--ink)" }}>
            {t("login")}
          </h1>
        </div>

        {/* Letterpress sign-in card */}
        <div
          style={{
            position: "relative",
            background: "var(--paper)",
            border: "1px solid var(--hairline-strong)",
            borderRadius: 12,
            padding: "40px 38px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 6,
              border: "1px solid var(--gold)",
              borderRadius: 8,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            {/* Google login — only when the provider is configured */}
            {googleEnabled && (
            <>
            <button
              onClick={handleGoogleLogin}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "13px 18px",
                background: "var(--white)",
                border: "1px solid var(--hairline-strong)",
                borderRadius: 8,
                fontFamily: "var(--sans)",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--ink)",
                cursor: "pointer",
                marginBottom: 26,
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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

            {/* Gold-rule divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
              <span style={{ flex: 1, height: 1, background: "var(--gold)" }} />
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 12,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: "var(--gold-ink)",
                }}
              >
                {t("orDivider")}
              </span>
              <span style={{ flex: 1, height: 1, background: "var(--gold)" }} />
            </div>
            </>
            )}

            {/* Email form */}
            <form onSubmit={handleEmailLogin} style={{ display: "grid", gap: 18 }}>
              {error && (
                <div
                  style={{
                    padding: "11px 14px",
                    background: "rgba(192,57,43,.08)",
                    border: "1px solid var(--vermilion)",
                    borderRadius: 8,
                    color: "var(--vermilion-deep)",
                    fontSize: 14,
                  }}
                >
                  {error}
                </div>
              )}

              <div>
                <label style={labelStyle}>{t("email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t("password")}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  required
                  minLength={6}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: 4, opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "..." : t("signIn")}
              </button>
            </form>

            <p
              style={{
                marginTop: 26,
                textAlign: "center",
                fontSize: 14.5,
                color: "var(--muted)",
              }}
            >
              {t("noAccount")}{" "}
              <Link
                href="/member/register"
                style={{ color: "var(--vermilion-deep)", fontWeight: 600 }}
              >
                {t("register")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
