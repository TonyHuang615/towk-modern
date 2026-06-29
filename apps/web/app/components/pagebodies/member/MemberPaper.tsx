"use client";

import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { User, Mail, Shield, Calendar, LogOut, Edit3 } from "lucide-react";

// 宣纸书卷 — Member。延续 HomePaper/AboutPaper 的版式语言：印章、烫金细线、
// 衬线大标题、米色宣纸底。会员页呈现为一张衬线会员证（membership card），
// 渲染于 DesignShell 的 .towk-paper 容器内。保留 useSession/signOut 与 i18n。
export default function MemberPaper() {
  const { data: session, status } = useSession();
  const t = useTranslations("member");

  const Seal = () => (
    <span className="seal" style={{ width: 64, height: 64, fontSize: 24, borderRadius: 9 }}>
      <span>東</span>
      <span>安</span>
    </span>
  );

  if (status === "loading") {
    return (
      <section className="hero" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <div
            className="animate-spin"
            style={{
              width: 32,
              height: 32,
              margin: "0 auto",
              borderRadius: "50%",
              border: "2px solid var(--gold)",
              borderTopColor: "transparent",
            }}
          />
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="hero" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="wrap" style={{ maxWidth: 560, textAlign: "center" }}>
          <Seal />
          <p className="eyebrow" style={{ marginTop: 24 }}>
            {t("profile")}
          </p>
          <h1 style={{ fontSize: 38 }}>{t("notLoggedIn")}</h1>
          <p className="lede" style={{ margin: "16px auto 28px" }}>
            {t("loginSubtitle")}
          </p>
          <Link href="/member/login" className="btn btn-primary">
            {t("goToLogin")}
          </Link>
        </div>
      </section>
    );
  }

  const rows = [
    { icon: User, label: t("name"), value: session.user?.name || "-" },
    { icon: Mail, label: t("email"), value: session.user?.email || "-" },
  ];

  return (
    <>
      {/* MEMBERSHIP CARD — gold double-rule, seal, serif masthead */}
      <section className="hero" style={{ paddingTop: 96, paddingBottom: 40 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div
            className="card"
            style={{
              padding: 4,
              border: "1px solid var(--gold)",
              background: "var(--paper)",
            }}
          >
            <div
              style={{
                border: "1px solid var(--gold)",
                padding: "36px 38px",
                display: "flex",
                flexDirection: "column",
                gap: 26,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 18,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  {session.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt={session.user.name || ""}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 9,
                        objectFit: "cover",
                        border: "1px solid var(--gold)",
                      }}
                    />
                  ) : (
                    <Seal />
                  )}
                  <div>
                    <p className="eyebrow" style={{ margin: 0 }}>
                      {t("profile")}
                    </p>
                    <h1 style={{ fontSize: 34 }}>{session.user?.name || "Member"}</h1>
                  </div>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--sans)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--vermilion-deep)",
                    border: "1px solid var(--vermilion-deep)",
                    borderRadius: 999,
                    padding: "5px 14px",
                  }}
                >
                  <Shield className="w-3.5 h-3.5" />
                  {t("statusActive")}
                </span>
              </div>

              <div className="hero-divider" style={{ margin: 0 }}>
                <span className="ln" style={{ width: "100%", background: "var(--gold)" }} />
              </div>

              {/* Engraved register of details */}
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 0 }}>
                {rows.map((r) => (
                  <div
                    key={r.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "16px 4px",
                    }}
                  >
                    <span style={{ color: "var(--gold-ink)" }}>
                      <r.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--sans)",
                          fontSize: 11,
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                        }}
                      >
                        {r.label}
                      </div>
                      <div style={{ fontSize: 16, color: "var(--ink)" }}>{r.value}</div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 4px",
                  }}
                >
                  <span style={{ color: "var(--gold-ink)" }}>
                    <Calendar className="w-5 h-5" />
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: 11,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      {t("memberSince")}
                    </div>
                    <div style={{ fontSize: 16, color: "var(--ink)" }}>2026</div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Edit3 className="w-4 h-4" />
                  {t("editProfile")}
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="btn btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <LogOut className="w-4 h-4" />
                  {t("logout")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ACTIVITIES — ledger card */}
      <section className="events" style={{ paddingTop: 0, paddingBottom: 96 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="sec-head">
            <div>
              <p className="eyebrow">{t("profile")}</p>
              <h2>{t("recentActivities")}</h2>
            </div>
          </div>
          <div
            className="card"
            style={{ padding: "48px 28px", textAlign: "center", color: "var(--muted)" }}
          >
            <Calendar className="w-10 h-10" style={{ margin: "0 auto 10px", opacity: 0.4 }} />
            <p style={{ fontSize: 15 }}>{t("noActivities")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
