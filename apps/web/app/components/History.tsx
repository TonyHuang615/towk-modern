"use client";

import { motion } from "framer-motion";

interface HistoryProps {
  data?: {
    title?: string;
    milestones?: Array<{ year: string; title: string; description: string }>;
  };
}

const defaultMilestones = [
  {
    year: "1876",
    title: "会馆创立",
    description: "新加坡东安会馆正式成立，为来自广东东莞、宝安两县的乡亲提供互助平台。",
  },
  {
    year: "1923",
    title: "兴学育才",
    description: "创办东安义学，为会员子弟提供免费中文教育，传承母语文化。",
  },
  {
    year: "1943",
    title: "粤剧传承",
    description: "成立粤剧组，1947年正式成立「东安梨艺社」，传承岭南文化至今。",
  },
  {
    year: "1992",
    title: "恳亲大会",
    description: "联合全球各地东安会馆，于吉隆坡举办第1届世界东安恳亲大会。",
  },
  {
    year: "2003",
    title: "商贸拓展",
    description: "创办新加坡东莞工商总会，搭建新加坡与东莞之间的商贸桥梁。",
  },
];

export default function History({ data }: HistoryProps) {
  const title = data?.title || "历史传承";
  const milestones = data?.milestones || defaultMilestones;

  return (
    <section id="history" className="py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase">
            Our Heritage
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            自1876年创立以来，东安会馆见证了几代华人的奋斗历程，承载着深厚的历史记忆。
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />

          <div className="space-y-16 lg:space-y-24">
            {milestones.map((milestone: any, index: number) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex-col lg:gap-16`}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"} text-center`}
                >
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary/20">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 text-xl md:text-2xl font-bold">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-foreground/70 max-w-md mx-auto lg:mx-0">
                    {milestone.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
