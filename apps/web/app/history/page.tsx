"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "1876",
    title: "会馆创立",
    description:
      "新加坡东安会馆正式成立，为来自广东东莞、宝安两县的乡亲提供互助平台，初期会员多为从事家务、建筑及橡胶业的劳工。",
  },
  {
    year: "1923",
    title: "创办东安义学",
    description:
      "创办东安义学，为会员子弟提供免费中文教育，传承母语文化，直至1964年因政府推行英语教育政策而停办。",
  },
  {
    year: "1943",
    title: "成立粤剧组",
    description:
      "东安会馆成立粤剧组，以传统粤剧粤曲凝聚乡情、慰藉在外乡亲。1947年正式成立「东安梨艺社」，并持续参与各类慈善义演。",
  },
  {
    year: "1946",
    title: "成立互助部",
    description:
      "为照顾年长乡亲的身后事宜，成立互助部，为会员提供殡葬互助服务，体现同乡之间的守望相助精神。",
  },
  {
    year: "1972",
    title: "设立奖学金",
    description:
      "设立奖学金制度，定期资助优秀会员子弟升学深造，持续至今，鼓励后代积极进取。",
  },
  {
    year: "1992",
    title: "第1届世界东安恳亲大会",
    description:
      "联合全球各地东安会馆，于马来西亚吉隆坡举办第1届世界东安恳亲大会，开创全球东安乡亲定期聚首的传统。",
  },
  {
    year: "2003",
    title: "创办新加坡东莞工商总会",
    description:
      "创办新加坡东莞工商总会，搭建新加坡与东莞之间的商贸桥梁，推动双边经贸往来与商业合作。",
  },
  {
    year: "2019",
    title: "主办第11届恳亲大会",
    description:
      "新加坡东安会馆主办第11届世界东安恳亲大会，以「五湖乡情连心，四海和谐聚缘」为主题，吸引来自全球东安乡亲齐聚狮城。",
  },
];

const eras = [
  {
    period: "1876–1920",
    title: "筚路蓝缕",
    description: "初创互助，安顿乡亲",
  },
  {
    period: "1920–1960",
    title: "兴学育才",
    description: "创校培才，文化传承",
  },
  {
    period: "1960–2000",
    title: "文化薪传",
    description: "粤剧传承，联谊发展",
  },
  {
    period: "2000–今",
    title: "迈向现代",
    description: "商贸拓展，数字转型",
  },
];

export default function HistoryPage() {
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
              Our Heritage
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
              历史传承
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
              自1876年创立以来，东安会馆见证了几代华人的奋斗历程，承载着深厚的历史记忆
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent hidden lg:block" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`relative flex items-start gap-8 mb-16 flex-col lg:gap-16 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                >
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary/20">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 text-xl md:text-2xl font-bold">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-foreground/70 max-w-md">
                    {milestone.description}
                  </p>
                </div>

                <div className="relative z-10 hidden lg:block">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eras */}
      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">历史时期</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eras.map((era, index) => (
              <motion.div
                key={era.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-background text-center shadow-card"
              >
                <span className="text-accent text-sm font-medium">
                  {era.period}
                </span>
                <h3 className="text-xl font-bold mt-2">{era.title}</h3>
                <p className="text-foreground/70 mt-2 text-sm">
                  {era.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
