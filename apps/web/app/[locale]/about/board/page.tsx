"use client";

import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface BoardTerm {
  term: string;
  years: string;
  president: string;
  members: { title: string; names: string[] }[];
}

const boardTerms: BoardTerm[] = [
  {
    term: "第139届",
    years: "2017–2019",
    president: "洪广方",
    members: [
      { title: "永远名誉会长", names: ["刘荫稳博士"] },
      { title: "名誉会长", names: ["刘锦纬", "陈华昌", "何国才"] },
      { title: "名誉主席", names: ["刘瑞星", "何宝葵", "洪广方", "李俊雄"] },
      { title: "会长", names: ["洪广方"] },
      { title: "副会长", names: ["尹绍初", "何开叶", "张鸿强"] },
      { title: "信托人", names: ["陈华昌", "洪广发"] },
      { title: "总务", names: ["刘瑞星", "王锦顺", "郭丽明"] },
      { title: "副总务", names: ["刘炳源", "刘丽萍", "郑贵全"] },
      { title: "财政", names: ["尹绍初", "李俊雄", "刘积田", "刘泽森"] },
      { title: "副财政", names: ["陈坚求", "王照明", "刘锦纬", "叶飞飞"] },
      { title: "交际组正副主任", names: ["何开业", "张鸿强"] },
      { title: "粤剧组正副主任", names: ["刘玉枝", "郭丽明"] },
      { title: "妇女组正副主任", names: ["洪秋云", "刘丽萍"] },
      { title: "青年团", names: ["叶飞飞", "王锦顺"] },
      { title: "查账", names: ["刘亚金", "洪顺有"] },
      { title: "商务顾问", names: ["刘荫稳", "何汉章", "刘伟燊", "江新明", "卢权培"] },
      { title: "医药顾问", names: ["江新明"] },
      { title: "法律顾问", names: ["叶树贤"] },
    ],
  },
  {
    term: "第138届",
    years: "2015–2016",
    president: "何宝葵",
    members: [
      { title: "永远名誉会长", names: ["刘荫稳博士"] },
      { title: "名誉会长", names: ["何汉章", "何国才", "刘积田"] },
      { title: "会长", names: ["何宝葵"] },
      { title: "副会长", names: ["尹绍初", "陈华昌", "洪顺有", "叶海通", "何国才", "刘积田"] },
      { title: "总务", names: ["陈丽贤"] },
      { title: "副总务", names: ["刘瑞星"] },
      { title: "财政", names: ["何国才", "王锦顺"] },
      { title: "副财政", names: ["刘泽森", "陈丽贤"] },
      { title: "查账", names: ["刘丽萍"] },
      { title: "粤剧组正副主任", names: ["刘玉枝", "刘锡昌"] },
      { title: "妇女组正副主任", names: ["刘素霞", "郭彩英"] },
      { title: "法律顾问", names: ["叶树贤 PBM"] },
      { title: "医药顾问", names: ["江新明医生"] },
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
          <h3 className="text-xl font-bold">{term.term}{t("boardSuffix")}</h3>
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
              <div key={group.title} className="p-3 rounded-lg bg-foreground/5">
                <div className="text-xs font-medium text-primary mb-1">
                  {group.title}
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
    <main className="min-h-screen">
      <Navigation />

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
              <BoardTermCard key={term.term} term={term} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-foreground/50">
            {t("note")}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
