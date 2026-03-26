"use client";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import {
  Music,
  Briefcase,
  Users,
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ActivitiesPage() {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({}));
  }, []);

  const activities = content.activities || {};

  const defaultActivities = [
    {
      icon: Music,
      slug: "cantonese-opera",
      title: "粤剧组",
      description: "传承岭南戏曲文化，东安梨艺社成立于1947年，定期公演弘扬传统艺术。",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    },
    {
      icon: Briefcase,
      slug: "business",
      title: "商务交流",
      description: "促进乡亲商业合作，联结新加坡与东莞之间的贸易纽带。",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    },
    {
      icon: Users,
      slug: "youth",
      title: "青年活动",
      description: "培养青年接班人，组织祖籍地交流考察，传承东安精神。",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    },
    {
      icon: Sparkles,
      slug: "traditions",
      title: "传统节庆",
      description: "庆祝春节、中秋等传统节日与会馆周年庆典，凝聚乡情。",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    },
  ];

  const items = activities?.items || defaultActivities;

  const upcomingEvents = [
    { title: "春节联欢晚会", date: "2026年1月25日", location: "会馆礼堂" },
    { title: "粤剧表演", date: "2026年2月15日", location: "牛车水剧场" },
    { title: "青年团契", date: "每月第一个周六", location: "会馆活动室" },
    { title: "商务交流会", date: "每季度举办", location: "会馆会议室" },
  ];

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
              Our Activities
            </span>
            <h1 className="mt-3 md:mt-4 text-3xl md:text-5xl lg:text-6xl font-bold">
              {activities?.title || "会馆活动"}
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
              东安会馆定期举办各类活动，丰富乡亲文化生活，传承中华文化
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((activity: any, index: number) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{activity.title}</h3>
                  </div>
                  <p className="text-white/75 mb-4">
                    {activity.description}
                  </p>
                  <Link
                    href={`/activities/${activity.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                  >
                    了解更多 <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">即将举办的活动</h2>
            <p className="mt-4 text-foreground/70">欢迎乡亲踊跃参与</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-background text-center"
              >
                <Calendar className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">{event.title}</h3>
                <p className="text-sm text-foreground/60 mb-1">{event.date}</p>
                <p className="text-sm text-foreground/60 flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" /> {event.location}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">加入我们的活动</h2>
          <p className="text-foreground/70 mb-8">
            东安会馆定期举办各类文化、社交和商业活动，欢迎乡亲们积极参与。
            通过这些活动，我们不仅能传承中华文化，还能增进乡情，拓展人脉。
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors">
            查看活动日历
          </button>
        </div>
      </section>

      <Footer data={content.site} />
    </main>
  );
}
