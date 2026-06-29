"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { User, Mail, Shield, Calendar, LogOut, Edit3 } from "lucide-react";

/* 庄重典藏 / Stately Archive — Member。延续 HomeStately/AboutStately：暗色展厅、
   烫金细线、双线框、展签式说明、镌刻字体。会员页呈现为博物馆式会员铭牌（plaque）。 */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function MemberStately() {
  const { data: session, status } = useSession();
  const locale = useLocale();
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
      <section className="relative flex min-h-[80svh] items-center justify-center px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="relative z-10 w-full max-w-2xl"
        >
          <div className="border border-primary/50 p-2 sm:p-3">
            <div className="border border-accent/40 px-8 py-16 text-center sm:px-12">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("profile")}
              </p>
              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-5xl">
                {t("notLoggedIn")}
              </h1>
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
                {t("loginSubtitle")}
              </p>
              <Link
                href="/member/login"
                className="mt-9 inline-block border border-primary/50 px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary transition-colors duration-200 hover:bg-primary/10"
              >
                {t("goToLogin")}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  const details = [
    { icon: User, label: t("name"), value: session.user?.name || "-" },
    { icon: Mail, label: t("email"), value: session.user?.email || "-" },
    { icon: Shield, label: t("membershipStatus"), value: t("statusActive") },
    { icon: Calendar, label: t("memberSince"), value: "2026" },
  ];

  return (
    <>
      {/* MEMBER PLAQUE — double gold-hairline frame */}
      <section className="relative px-6 pt-24 pb-16 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="mx-auto w-full max-w-3xl"
        >
          <div className="border border-primary/50 p-2 sm:p-3">
            <div className="border border-accent/40 px-6 py-12 text-center sm:px-12 sm:py-16">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-primary">
                {t("profile")}
              </p>
              <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center">
                {session.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name || ""}
                    className="h-24 w-24 border border-primary/50 object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center border border-primary/50 font-display text-4xl font-bold text-primary">
                    {(session.user?.name?.[0] || "東").toUpperCase()}
                  </div>
                )}
              </div>
              <h1 className="mt-8 text-4xl font-bold leading-tight tracking-[0.06em] sm:text-5xl">
                {session.user?.name || "Member"}
              </h1>
              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                <span className="h-px w-12 bg-primary/60 sm:w-20" />
              </div>
              <p className="mt-7 text-sm tracking-[0.2em] text-accent">
                {session.user?.email}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                {locale === "en" ? "Active Member · 1876" : "在籍会员 · 1876"}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CREDENTIALS — engraved register */}
      <section className="border-t border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="border border-border bg-card"
          >
            <div className="divide-y divide-border">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between gap-6 px-7 py-6"
                >
                  <span className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <d.icon className="h-4 w-4 text-primary" />
                    {d.label}
                  </span>
                  <span className="text-right text-base tracking-[0.06em] text-foreground">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 border border-border px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-colors duration-200 hover:bg-primary/5">
              <Edit3 className="h-4 w-4" />
              {t("editProfile")}
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-2 border border-primary/50 px-7 py-3 text-xs uppercase tracking-[0.3em] text-primary transition-colors duration-200 hover:bg-primary/10"
            >
              <LogOut className="h-4 w-4" />
              {t("logout")}
            </button>
          </div>
        </div>
      </section>

      {/* RECENT ACTIVITIES — exhibit caption */}
      <section className="border-t border-border bg-card/40 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.42em] text-primary">
            {t("recentActivities")}
          </p>
          <Calendar className="mx-auto mt-8 h-10 w-10 text-primary/40" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("noActivities")}
          </p>
        </div>
      </section>
    </>
  );
}
