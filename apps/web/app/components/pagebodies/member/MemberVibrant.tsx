"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  User,
  Mail,
  Shield,
  Calendar,
  LogOut,
  Edit3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// 活力鲜明 — Member。延续 HomeVibrant/AboutVibrant：明亮橙/青、大圆角卡片、
// 柔光色块、渐变 CTA、悬停上浮。会员页为彩色圆角资料看板（dashboard）。
export default function MemberVibrant() {
  const { data: session, status } = useSession();
  const t = useTranslations("member");

  if (status === "loading") {
    return (
      <div className="px-6 py-32 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <motion.div
          {...fade(0)}
          className="relative mx-auto max-w-xl rounded-[2rem] bg-gradient-to-br from-primary to-accent p-8 text-center text-primary-foreground shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:p-12"
        >
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/15">
            <User className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
            {t("notLoggedIn")}
          </h1>
          <p className="mt-3 text-primary-foreground/85">{t("loginSubtitle")}</p>
          <Link
            href="/member/login"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            {t("goToLogin")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1100px] px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-24">
        {/* ── Hero profile card — gradient ── */}
        <motion.section
          {...fade(0)}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-accent p-7 text-primary-foreground shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:p-10"
        >
          <span className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary-foreground/10" />
          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="relative">
              {session.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name || ""}
                  className="h-24 w-24 rounded-full border-4 border-primary-foreground/30 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground/20 text-3xl font-bold">
                  {(session.user?.name?.[0] || "T").toUpperCase()}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 ring-2 ring-primary">
                <CheckCircle className="h-4 w-4 text-white" />
              </span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold">{session.user?.name || "Member"}</h1>
              <p className="mt-1 text-primary-foreground/85">{session.user?.email}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
                <Shield className="h-3.5 w-3.5" />
                {t("statusActive")}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5">
                <Edit3 className="h-4 w-4" />
                {t("editProfile")}
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                <LogOut className="h-4 w-4" />
                {t("logout")}
              </button>
            </div>
          </div>
        </motion.section>

        {/* ── Info dashboard cards ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-12">
          <motion.section
            {...fade(0.05)}
            className="rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:p-7 lg:col-span-7"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {t("personalInfo")}
            </span>
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-primary/5 px-4 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">{t("name")}</div>
                  <div className="font-semibold">{session.user?.name || "-"}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-accent/10 px-4 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">{t("email")}</div>
                  <div className="font-semibold">{session.user?.email || "-"}</div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            {...fade(0.1)}
            className="flex flex-col justify-center rounded-[1.75rem] bg-primary p-6 text-primary-foreground sm:p-7 lg:col-span-5"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/70">
              {t("membershipStatus")}
            </span>
            <div className="mt-4 flex items-center gap-2 text-2xl font-bold">
              <Shield className="h-6 w-6" />
              {t("statusActive")}
            </div>
            <div className="mt-2 text-sm text-primary-foreground/80">
              {t("memberSince")} 2026
            </div>
          </motion.section>
        </div>

        {/* ── Recent activities card ── */}
        <motion.section
          {...fade(0.15)}
          className="mt-4 rounded-[2rem] bg-card p-6 text-card-foreground shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:mt-5 sm:p-8"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("recentActivities")}
          </span>
          <div className="mt-6 flex flex-col items-center py-8 text-center text-muted-foreground">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary/50">
              <Calendar className="h-7 w-7" />
            </span>
            <p className="mt-3 text-sm">{t("noActivities")}</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
