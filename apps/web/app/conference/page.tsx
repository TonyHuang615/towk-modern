"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Globe, Users, Calendar, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function ConferencePage() {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({}));
  }, []);

  const conference = content.conference || {};

  const features = conference?.features || [
    { icon: Globe, title: "全球联结", description: "联结世界各地东莞宝安乡亲" },
    { icon: Users, title: "千人盛会", description: "每届吸引逾千名乡亲参与" },
    {
      icon: Calendar,
      title: "定期举办",
      description: "定期举办，传承至今",
    },
  ];

  const pastConferences = conference?.pastConferences || [
    { year: "2019", location: "新加坡", theme: "第11届世界东安恳亲大会" },
    { year: "2017", location: "香港", theme: "第10届世界东安恳亲大会" },
    { year: "2015", location: "马来西亚", theme: "第9届世界东安恳亲大会" },
    { year: "2012", location: "香港", theme: "第8届世界东安恳亲大会" },
    { year: "2008", location: "马来西亚古晋", theme: "第7届世界东安恳亲大会" },
    { year: "2005", location: "新加坡", theme: "第6届世界东安恳亲大会" },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 bg-gradient-to-b from-accent/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              Global Gathering
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
              {conference?.title || "世界东安恳亲大会"}
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
              {conference?.description ||
                "世界东安恳亲大会是东安会馆主办的国际性盛会"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature: any, index: number) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-foreground/5"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">关于恳亲大会</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  世界东安恳亲大会是东安会馆主办的国际性盛会，定期举办，
                  联结全球东莞宝安乡亲，共叙乡情，共谋发展。
                </p>
                <p>
                  恳亲大会自1992年第1届起举办，至今已届11届。
                  每届大会吸引来自世界各地的东安乡亲齐聚一堂，进行文化交流、商务洽谈和联谊活动。
                </p>
                <p>
                  大会期间举办各类活动，包括：开幕典礼、文化表演、商务论坛、青年交流、
                  敬老晚宴等，是东安会馆最重要的年度盛事之一。
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
                alt="恳亲大会"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">历届大会</h2>
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="space-y-4">
              {pastConferences.map((conf: any, index: number) => (
                <motion.div
                  key={conf.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold text-primary/40 group-hover:text-primary transition-colors">
                      {conf.year}
                    </span>
                    <div>
                      <h4 className="font-medium">{conf.theme}</h4>
                      <p className="text-sm text-foreground/60">
                        {conf.location}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">下一届恳亲大会</h2>
          <p className="text-xl opacity-90 mb-8">
            第12届世界东安恳亲大会 · 2026
          </p>
          <p className="mb-8 opacity-80">地点待定 | 敬请期待</p>
          <button className="px-8 py-3 bg-white text-primary rounded-full font-medium hover:bg-white/90 transition-colors">
            获取最新信息
          </button>
        </div>
      </section>

      <Footer data={content.site} />
    </main>
  );
}
