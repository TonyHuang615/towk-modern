"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const defaultNews = [
  {
    id: 1,
    date: "2026-03-15",
    category: "会馆公告",
    title: "新加坡东安会馆2026年春茗晚宴圆满举行",
    excerpt:
      "2026年春茗晚宴于本月圆满举行，逾三百名乡亲出席，共叙乡情，展望新一年的发展蓝图。",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80",
    href: "/news/spring-banquet-2026",
  },
  {
    id: 2,
    date: "2026-02-28",
    category: "文化活动",
    title: "粤剧组新春贺岁演出获得热烈反响",
    excerpt:
      "会馆粤剧组于农历新年期间在牛车水文化广场呈献精彩粤剧折子戏，吸引大批观众，广受好评。",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
    href: "/news/cantonese-opera-cny-2026",
  },
  {
    id: 3,
    date: "2026-01-20",
    category: "青年活动",
    title: "青年团赴广东东莞交流考察活动顺利完成",
    excerpt:
      "会馆青年团一行二十人赴祖籍地广东东莞进行文化交流考察，深入了解家乡发展，增强归属感与认同感。",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    href: "/news/youth-dongguan-visit-2026",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function News() {
  return (
    <section id="news" className="py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              Latest News
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">
              最新动态
            </h2>
          </div>
          <a
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all self-start md:self-auto"
          >
            查看全部动态 <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Mobile: horizontal scroll; Desktop: grid */}
        <div className="md:grid md:grid-cols-3 md:gap-8 max-md:flex max-md:gap-4 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-4 max-md:px-4 max-md:pb-4 scrollbar-hide">
          {defaultNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 max-md:min-w-[280px] max-md:w-[80vw] max-md:flex-shrink-0 max-md:snap-start"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.date)}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                  {article.excerpt}
                </p>
                <a
                  href={article.href}
                  className="mt-3 md:mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                >
                  阅读全文 <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
