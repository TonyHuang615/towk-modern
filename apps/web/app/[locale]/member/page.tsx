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
} from "lucide-react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function MemberProfilePage() {
  const { data: session, status } = useSession();
  const t = useTranslations("member");

  if (status === "loading") {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <User className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <h1 className="text-2xl font-bold mb-2">{t("notLoggedIn")}</h1>
            <Link
              href="/member/login"
              className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              {t("goToLogin")}
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            {/* Avatar */}
            <div className="relative">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || ""}
                  className="w-24 h-24 rounded-full border-4 border-background shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold border-4 border-background shadow-lg">
                  {(session.user?.name?.[0] || "T").toUpperCase()}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* User info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold">{session.user?.name || "Member"}</h1>
              <p className="text-foreground/60 mt-1">{session.user?.email}</p>
              <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  <Shield className="w-3 h-3" />
                  {t("statusActive")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-foreground/5 transition-colors flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                {t("editProfile")}
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t("logout")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile sections */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {t("personalInfo")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-foreground/5">
                  <User className="w-4 h-4 text-foreground/40" />
                  <div>
                    <div className="text-xs text-foreground/40">{t("name")}</div>
                    <div className="text-sm font-medium">{session.user?.name || "-"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-foreground/5">
                  <Mail className="w-4 h-4 text-foreground/40" />
                  <div>
                    <div className="text-xs text-foreground/40">{t("email")}</div>
                    <div className="text-sm font-medium">{session.user?.email || "-"}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Membership Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-2xl p-6 shadow-card"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {t("membershipStatus")}
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{t("membershipStatus")}</span>
                    <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                      {t("statusActive")}
                    </span>
                  </div>
                  <div className="text-xs text-foreground/50">
                    {t("memberSince")} 2026
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-2xl p-6 shadow-card md:col-span-2"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {t("recentActivities")}
              </h2>
              <div className="text-center py-8 text-foreground/40">
                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">{t("noActivities")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
