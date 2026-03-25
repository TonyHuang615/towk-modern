"use client";

import { motion } from "framer-motion";
import { Music, Users, Briefcase, Sparkles, ArrowRight } from "lucide-react";

interface ActivitiesProps {
  data?: {
    title?: string;
    items?: Array<{
      icon: string;
      title: string;
      description: string;
      image: string;
    }>;
  };
}

const defaultActivities = [
  {
    icon: "Music",
    title: "粤剧组",
    description: "传承岭南戏曲文化，定期排练演出，弘扬传统艺术。",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
  },
  {
    icon: "Briefcase",
    title: "商务交流",
    description: "促进乡亲商业合作，组织商务考察与交流活动。",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
  {
    icon: "Users",
    title: "青年活动",
    description: "培养青年接班人，组织各类青年联谊与学习活动。",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  },
  {
    icon: "Sparkles",
    title: "会庆活动",
    description: "庆祝会庆及传统节日，凝聚乡情，共襄盛举。",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
  },
];

const iconMap: any = { Music, Users, Briefcase, Sparkles };

export default function Activities({ data }: ActivitiesProps) {
  const title = data?.title || "会馆活动";
  const items = data?.items || defaultActivities;

  return (
    <section id="activities" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase">
            Our Activities
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            东安会馆定期举办各类活动，丰富乡亲文化生活，传承中华文化。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((activity: any, index: number) => {
            const IconComponent = iconMap[activity.icon] || Music;
            return (
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
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{activity.title}</h3>
                  </div>
                  <p className="text-white/70 mb-4">
                    {activity.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                  >
                    了解更多 <ArrowRight className="w-4 h-4 text-accent" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
