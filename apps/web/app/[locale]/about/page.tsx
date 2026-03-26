"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Heart, Target, Eye, Shield, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({}));
  }, []);

  const about = content.about || {};

  const values = [
    { icon: Heart, title: "乡亲情谊", description: "联络乡情，增进友谊" },
    { icon: Target, title: "互助合作", description: "促进乡亲商业合作" },
    { icon: Eye, title: "文化传承", description: "弘扬中华文化传统" },
    { icon: Shield, title: "社群服务", description: "服务社区，回馈社会" },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-8 md:pt-32 md:pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              About Us
            </span>
            <h1 className="mt-3 md:mt-4 text-3xl md:text-5xl lg:text-6xl font-bold">
              {about?.title || "关于会馆"}
            </h1>
            <p className="mt-4 text-xl text-foreground/70">
              {about?.subtitle || "Tung On Wui Kun · 1876"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">我们的故事</h2>
              <div className="space-y-4 text-lg text-foreground/80">
                <p>
                  {about?.content ||
                    "新加坡东安会馆成立于1876年，是新加坡历史最悠久的华人宗乡社团之一。"}
                </p>
                <p>
                  一百多年来，东安会馆始终秉承"敦睦乡谊、弘扬文化、服务社群"的宗旨，
                  为乡亲提供社交平台，为社区贡献力量，为中华文化在海外的传承做出积极贡献。
                </p>
                <p>
                  东安会馆不仅是东莞宝安同乡的精神家园，更是新加坡华人宗乡会馆的重要组成部分。
                  我们致力于团结乡亲，促进交流，传承文化，服务社会。
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src="https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=900&q=80"
                  alt="东安会馆"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {(
                  about?.stats || [
                    { value: "3000+", label: "注册会员" },
                    { value: "150", label: "年历史" },
                    { value: "11", label: "届恳亲大会" },
                  ]
                ).map((stat: any, index: number) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-foreground/5"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/60">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">我们的价值观</h2>
            <p className="mt-4 text-foreground/70">
              传承百年精神，凝聚同乡情谊
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to sub-pages */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/about/structure"
              className="group flex items-center justify-between p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">组织架构</h3>
                <p className="text-sm text-foreground/60 mt-1">
                  了解会馆的组织架构与委员会设置
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/about/board"
              className="group flex items-center justify-between p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">历届董事会</h3>
                <p className="text-sm text-foreground/60 mt-1">
                  查看各届董事会领导名单
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Milestones */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">历史里程碑</h2>
          </div>
          <div className="space-y-4">
            {[
              { year: "1876", event: "东安会馆于新加坡正式创立，为来自广东东莞、宝安两县的乡亲提供互助平台" },
              { year: "1923", event: "创办东安义学，为会员子弟提供免费中文教育" },
              { year: "1943", event: "成立粤剧组，传承粤剧文化" },
              { year: "1946", event: "成立互助部，协助处理年长乡亲的身后事宜" },
              { year: "1972", event: "设立奖学金制度，资助会员子弟升学" },
              { year: "2003", event: "创办新加坡东莞工商总会，促进新加坡与东莞之间的贸易往来" },
              { year: "1992", event: "联合各地东安会馆创办「世界东安恳亲大会」，至今已历11届" },
            ].sort((a, b) => parseInt(a.year) - parseInt(b.year)).map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex gap-6 items-start p-4 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <span className="text-xl font-bold text-primary/70 w-16 shrink-0">{item.year}</span>
                <p className="text-foreground/80">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer data={content.site} />
    </main>
  );
}
