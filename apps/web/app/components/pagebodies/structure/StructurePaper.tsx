"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// 宣纸书卷 — Organization Structure。延续 HomePaper / AboutPaper 的版式语言：
// 衬线大标题、烫金细线、印章、米色宣纸底。组织层级渲染为一份「职衔录」——
// 每一层级为一段烫金分栏，左侧序号印章 + 层级名，右侧职衔逐行登记。
// 渲染于 DesignShell 的 .towk-paper 容器内，复用 globals.css 的 .towk-paper 作用域类。
export default function StructurePaper() {
  const t = useTranslations("structure");
  const tCommon = useTranslations("common");

  const orgStructure = [
    {
      level: t("level1"),
      roles: [
        { title: t("role_honoraryLifePresident"), description: t("role_honoraryLifePresidentDesc") },
        { title: t("role_honoraryPresident"), description: t("role_honoraryPresidentDesc") },
        { title: t("role_honoraryChairman"), description: t("role_honoraryChairmanDesc") },
      ],
    },
    {
      level: t("level2"),
      roles: [
        { title: t("role_president"), description: t("role_presidentDesc") },
        { title: t("role_vicePresident"), description: t("role_vicePresidentDesc") },
        { title: t("role_trustee"), description: t("role_trusteeDesc") },
      ],
    },
    {
      level: t("level3"),
      roles: [
        { title: t("role_secretary"), description: t("role_secretaryDesc") },
        { title: t("role_deputySecretary"), description: t("role_deputySecretaryDesc") },
        { title: t("role_treasurer"), description: t("role_treasurerDesc") },
        { title: t("role_deputyTreasurer"), description: t("role_deputyTreasurerDesc") },
        { title: t("role_auditor"), description: t("role_auditorDesc") },
      ],
    },
    {
      level: t("level4"),
      roles: [
        { title: t("role_socialCommittee"), description: t("role_socialCommitteeDesc") },
        { title: t("role_operaGroup"), description: t("role_operaGroupDesc") },
        { title: t("role_womenGroup"), description: t("role_womenGroupDesc") },
        { title: t("role_youthGroup"), description: t("role_youthGroupDesc") },
      ],
    },
    {
      level: t("level5"),
      roles: [
        { title: t("role_businessAdvisor"), description: t("role_businessAdvisorDesc") },
        { title: t("role_legalAdvisor"), description: t("role_legalAdvisorDesc") },
        { title: t("role_medicalAdvisor"), description: t("role_medicalAdvisorDesc") },
      ],
    },
  ];

  return (
    <>
      {/* HERO — serif masthead */}
      <section className="hero" style={{ paddingBottom: 32 }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 820 }}>
          <p className="eyebrow">{t("sectionLabel")}</p>
          <h1>{t("title")}</h1>
          <p className="sub-en" style={{ margin: "16px auto 0", maxWidth: 560 }}>
            {t("subtitle")}
          </p>
          <div className="hero-divider" style={{ justifyContent: "center" }}>
            <span className="ln" />
            東安
          </div>
        </div>
      </section>

      {/* ORG REGISTER — gold-ruled levels with seal chips */}
      <section className="events" style={{ paddingTop: 0, paddingBottom: 90 }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <Link
            href="/about"
            className="more"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 36 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {tCommon("backToAbout")}
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {orgStructure.map((group, gIdx) => (
              <div
                key={gIdx}
                className="events-card"
                style={{ padding: "30px 32px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    paddingBottom: 18,
                    borderBottom: "1px solid var(--gold)",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--display)",
                      fontSize: 20,
                      color: "var(--vermilion-deep)",
                      background: "var(--paper)",
                      border: "1px solid var(--gold)",
                    }}
                  >
                    {gIdx + 1}
                  </span>
                  <h2 style={{ fontFamily: "var(--display)", fontSize: 26, color: "var(--ink)" }}>
                    {group.level}
                  </h2>
                </div>

                {group.roles.map((role, rIdx) => (
                  <div
                    key={rIdx}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 18,
                      padding: "14px 0",
                      borderBottom:
                        rIdx === group.roles.length - 1 ? "none" : "1px solid var(--rule, rgba(0,0,0,0.08))",
                    }}
                  >
                    <h3
                      style={{
                        flex: "0 0 38%",
                        fontFamily: "var(--display)",
                        fontSize: 18,
                        color: "var(--ink)",
                      }}
                    >
                      {role.title}
                    </h3>
                    <p style={{ flex: 1, fontSize: "15px", color: "var(--body)", lineHeight: 1.6 }}>
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
