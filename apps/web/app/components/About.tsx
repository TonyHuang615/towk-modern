"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Award, Heart } from "lucide-react";

interface AboutProps {
  data?: {
    title?: string;
    subtitle?: string;
    content?: string;
    stats?: Array<{ value: string; label: string }>;
  };
}

const defaultStats = [
  { value: "3000+", label: "注册会员" },
  { value: "150", label: "年历史" },
  { value: "11", label: "届恳亲大会" },
];

export default function About({ data }: AboutProps) {
  const title = data?.title || "新加坡东安会馆";
  const subtitle = data?.subtitle || "Tung On Wui Kun · 1876";
  const content =
    data?.content ||
    "新加坡东安会馆成立于1876年，是新加坡历史最悠久的华人宗乡社团之一。本会馆为祖籍中国广东东莞、宝安两县移民的地缘组织，致力于联络乡情、促进互助、传承文化。";
  const stats = data?.stats || defaultStats;

  return (
    <section id="about" className="py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              About Us
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {title}
            </h2>
            <p className="mt-2 text-xl text-foreground/70">{subtitle}</p>

            <div className="mt-8 space-y-4 text-foreground/80">
              <p>{content}</p>
              <p>
                一百多年来，东安会馆始终秉承"敦睦乡谊、弘扬文化、服务社群"的宗旨，
                为乡亲提供社交平台，为社区贡献力量，为中华文化在海外的传承做出积极贡献。
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-foreground/70">
                乡亲情谊 · 文化传承 · 社群服务
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src="https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=900&q=80"
                alt="东安会馆"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat: any, index: number) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-foreground/5"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
