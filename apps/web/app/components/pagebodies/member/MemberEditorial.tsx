"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LogOut, Edit3, ArrowUpRight } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
} as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.35em] text-primary">
      {children}
    </span>
  );
}

// 编辑杂志 — Member。延续 HomeEditorial/AboutEditorial：象牙底、衬线大标题、
// Eyebrow/Rule 母题、居中窄栏 (max-w 720)。会员页呈现为简洁的杂志式名录页。
export default function MemberEditorial() {
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
      <section className="px-6 py-28 sm:py-36">
        <motion.div {...fade} className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{t("profile")}</Eyebrow>
          <h1 className="font-display mt-6 text-4xl leading-tight tracking-tight sm:text-5xl">
            {t("notLoggedIn")}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground">
            {t("loginSubtitle")}
          </p>
          <Link
            href="/member/login"
            className="group mt-10 inline-flex items-center gap-2 border-b border-foreground pb-1 font-display text-lg tracking-tight transition-colors hover:text-primary hover:border-primary"
          >
            {t("goToLogin")}
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </section>
    );
  }

  const details = [
    { label: t("name"), value: session.user?.name || "-" },
    { label: t("email"), value: session.user?.email || "-" },
    { label: t("membershipStatus"), value: t("statusActive") },
    { label: t("memberSince"), value: "2026" },
  ];

  return (
    <>
      {/* MASTHEAD — centered name over a hairline rule */}
      <section className="px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <motion.div {...fade} className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{t("profile")}</Eyebrow>
          <h1 className="font-display mt-7 text-balance text-[2.6rem] leading-[1.06] tracking-tight sm:text-6xl">
            {session.user?.name || "Member"}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{session.user?.email}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-primary">
            {t("statusActive")}
          </p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-[720px] px-6">
        <div className="border-t border-border" />
      </div>

      {/* PROFILE DETAILS — definition list with rules */}
      <section className="px-6 py-16 sm:py-24">
        <motion.div {...fade} className="mx-auto max-w-[720px]">
          <Eyebrow>{t("personalInfo")}</Eyebrow>
          <dl className="mt-10 divide-y divide-border">
            {details.map((d) => (
              <div
                key={d.label}
                className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8"
              >
                <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {d.label}
                </dt>
                <dd className="font-display text-lg tracking-tight text-foreground">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>

      <div className="mx-auto max-w-[720px] px-6">
        <div className="border-t border-border" />
      </div>

      {/* RECENT ACTIVITIES */}
      <section className="px-6 py-16 sm:py-24">
        <motion.div {...fade} className="mx-auto max-w-[720px]">
          <Eyebrow>{t("recentActivities")}</Eyebrow>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            {t("noActivities")}
          </p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-[720px] px-6">
        <div className="border-t border-border" />
      </div>

      {/* ACTIONS — understated editorial links */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-[720px] flex-wrap items-center gap-8">
          <button className="group inline-flex items-center gap-2 font-display text-lg tracking-tight transition-colors hover:text-primary">
            <Edit3 className="h-4 w-4" />
            {t("editProfile")}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group inline-flex items-center gap-2 font-display text-lg tracking-tight text-muted-foreground transition-colors hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </button>
        </div>
      </section>
    </>
  );
}
