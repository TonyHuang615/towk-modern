"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRegister } from "./useRegister";

// 宣纸书卷 / Paper — cream letterpress register card with 東安 seal, inset gold
// rule, serif labels. Relies on the `.towk-paper` scoped CSS (DesignShell wrap).
export default function RegisterPaper() {
  const t = useTranslations("member");
  const r = useRegister();

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
            {t("registerSubtitle")}
          </p>
          <h1 style={{ fontFamily: "var(--display)", fontSize: 40, color: "var(--ink)" }}>
            {t("registerTitle")}
          </h1>
        </div>

        {/* Letterpress card */}
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
            <form onSubmit={r.submit} style={{ display: "grid", gap: 18 }}>
              {r.error && (
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
                  {r.error}
                </div>
              )}

              <div>
                <label style={labelStyle}>{t("name")}</label>
                <input
                  type="text"
                  value={r.name}
                  onChange={(e) => r.setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t("email")}</label>
                <input
                  type="email"
                  value={r.email}
                  onChange={(e) => r.setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t("password")}</label>
                <input
                  type="password"
                  value={r.password}
                  onChange={(e) => r.setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  required
                  minLength={8}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t("confirmPassword")}</label>
                <input
                  type="password"
                  value={r.confirm}
                  onChange={(e) => r.setConfirm(e.target.value)}
                  placeholder={t("confirmPasswordPlaceholder")}
                  required
                  minLength={8}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={r.loading}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: 4, opacity: r.loading ? 0.6 : 1 }}
              >
                {r.loading ? "..." : t("createAccount")}
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
              {t("haveAccount")}{" "}
              <Link
                href="/member/login"
                style={{ color: "var(--vermilion-deep)", fontWeight: 600 }}
              >
                {t("backToLogin")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
