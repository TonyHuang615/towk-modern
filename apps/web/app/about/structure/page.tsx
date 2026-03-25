"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const orgStructure = [
  {
    level: "最高领导",
    roles: [
      { title: "永远名誉会长", description: "对会馆有卓越贡献的资深领袖" },
      { title: "名誉会长", description: "历任会长及对会馆有重大贡献者" },
      { title: "名誉主席", description: "历任主席" },
    ],
  },
  {
    level: "执行领导",
    roles: [
      { title: "会长", description: "会馆最高负责人，统筹全馆事务" },
      { title: "副会长", description: "协助会长处理日常事务" },
      { title: "信托人", description: "监督会馆财产及重大事项" },
    ],
  },
  {
    level: "行政管理",
    roles: [
      { title: "总务", description: "负责日常行政与会务运作" },
      { title: "副总务", description: "协助总务处理行政事务" },
      { title: "财政", description: "负责会馆财务管理" },
      { title: "副财政", description: "协助财政处理账务" },
      { title: "查账", description: "审计会馆财务报告" },
    ],
  },
  {
    level: "专责委员会",
    roles: [
      { title: "交际组", description: "负责对外联络、公共关系" },
      { title: "粤剧组", description: "统筹粤剧文化活动" },
      { title: "妇女组", description: "组织女性会员活动" },
      { title: "青年团", description: "凝聚青年会员，培养接班人" },
    ],
  },
  {
    level: "顾问",
    roles: [
      { title: "商务顾问", description: "提供商业发展建议" },
      { title: "法律顾问", description: "处理法律事务" },
      { title: "医药顾问", description: "提供健康与医疗咨询" },
    ],
  },
];

export default function StructurePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              Organization
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
              组织架构
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-2xl mx-auto">
              东安会馆组织架构清晰，分工明确，各委员会协同合作
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            返回关于会馆
          </Link>

          <div className="space-y-10">
            {orgStructure.map((group, gIdx) => (
              <motion.div
                key={group.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gIdx * 0.08 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {gIdx + 1}
                  </span>
                  {group.level}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.roles.map((role) => (
                    <div
                      key={role.title}
                      className="p-4 rounded-xl bg-foreground/5 hover:bg-foreground/8 transition-colors"
                    >
                      <h3 className="font-bold text-primary">{role.title}</h3>
                      <p className="text-sm text-foreground/60 mt-1">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
