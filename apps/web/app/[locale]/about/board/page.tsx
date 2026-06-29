"use client";

import DesignShell from "../../../components/DesignShell";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface BoardMember {
  key: string;
  names: string[];
}

interface BoardTerm {
  termNo: number;
  years: string;
  president: string;
  members: BoardMember[];
}

// 职衔走 i18n（board.positions.*）；人名为专有名词，两种语言均保留中文。
const boardTerms: BoardTerm[] = [
  {
    termNo: 139,
    years: "2017–2019",
    president: "洪广方",
    members: [
      { key: "honoraryPresidentForLife", names: ["刘荫稳博士"] },
      { key: "honoraryPresident", names: ["刘锦纬", "陈华昌", "何国才"] },
      { key: "honoraryChairman", names: ["刘瑞星", "何宝葵", "洪广方", "李俊雄"] },
      { key: "president", names: ["洪广方"] },
      { key: "vicePresident", names: ["尹绍初", "何开叶", "张鸿强"] },
      { key: "trustee", names: ["陈华昌", "洪广发"] },
      { key: "generalAffairs", names: ["刘瑞星", "王锦顺", "郭丽明"] },
      { key: "deputyGeneralAffairs", names: ["刘炳源", "刘丽萍", "郑贵全"] },
      { key: "treasurer", names: ["尹绍初", "李俊雄", "刘积田", "刘泽森"] },
      { key: "deputyTreasurer", names: ["陈坚求", "王照明", "刘锦纬", "叶飞飞"] },
      { key: "liaison", names: ["何开业", "张鸿强"] },
      { key: "cantoneseOpera", names: ["刘玉枝", "郭丽明"] },
      { key: "women", names: ["洪秋云", "刘丽萍"] },
      { key: "youth", names: ["叶飞飞", "王锦顺"] },
      { key: "auditor", names: ["刘亚金", "洪顺有"] },
      {
        key: "businessAdvisor",
        names: ["刘荫稳", "何汉章", "刘伟燊", "江新明", "卢权培"],
      },
      { key: "medicalAdvisor", names: ["江新明"] },
      { key: "legalAdvisor", names: ["叶树贤"] },
    ],
  },
  {
    termNo: 138,
    years: "2015–2016",
    president: "何宝葵",
    members: [
      { key: "honoraryPresidentForLife", names: ["刘荫稳博士"] },
      { key: "honoraryPresident", names: ["何汉章", "何国才", "刘积田"] },
      { key: "president", names: ["何宝葵"] },
      {
        key: "vicePresident",
        names: ["尹绍初", "陈华昌", "洪顺有", "叶海通", "何国才", "刘积田"],
      },
      { key: "generalAffairs", names: ["陈丽贤"] },
      { key: "deputyGeneralAffairs", names: ["刘瑞星"] },
      { key: "treasurer", names: ["何国才", "王锦顺"] },
      { key: "deputyTreasurer", names: ["刘泽森", "陈丽贤"] },
      { key: "auditor", names: ["刘丽萍"] },
      { key: "cantoneseOpera", names: ["刘玉枝", "刘锡昌"] },
      { key: "women", names: ["刘素霞", "郭彩英"] },
      { key: "legalAdvisor", names: ["叶树贤 PBM"] },
      { key: "medicalAdvisor", names: ["江新明医生"] },
    ],
  },
];

function BoardTermCard({ term }: { term: BoardTerm }) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("board");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-foreground/5 transition-colors text-left"
      >
        <div>
          <h3 className="text-xl font-bold">
            {t("termLabel", { no: term.termNo })}
          </h3>
          <p className="text-sm text-foreground/60 mt-1">
            {term.years} · {t("president")}：{term.president}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-foreground/40 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-border pt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {term.members.map((group) => (
              <div key={group.key} className="p-3 rounded-lg bg-foreground/5">
                <div className="text-xs font-medium text-primary mb-1">
                  {t(`positions.${group.key}`)}
                </div>
                <div className="text-sm text-foreground/80">
                  {group.names.join("、")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function BoardPage() {
  const t = useTranslations("board");
  const tCommon = useTranslations("common");

  return (
    <DesignShell>

      <section className="pt-20 pb-8 md:pt-32 md:pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              {t("sectionLabel")}
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
              {t("title")}
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {tCommon("backToAbout")}
          </Link>

          <div className="space-y-4">
            {boardTerms.map((term) => (
              <BoardTermCard key={term.termNo} term={term} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-foreground/50">
            {t("note")}
          </p>
        </div>
      </section>

    </DesignShell>
  );
}
