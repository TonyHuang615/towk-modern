"use client";

import { motion } from "framer-motion";
import { Music, Users, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

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

const iconMap: any = { Music, Users, Briefcase, Sparkles };

export default function Activities({ data }: ActivitiesProps) {
  const t = useTranslations("activities");

  const defaultActivities = [
    {
      icon: "Music",
      title: t("act1Title"),
      description: t("act1Desc"),
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    },
    {
      icon: "Briefcase",
      title: t("act2Title"),
      description: t("act2Desc"),
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    },
    {
      icon: "Users",
      title: t("act3Title"),
      description: t("act3Desc"),
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    },
    {
      icon: "Sparkles",
      title: t("act4Title"),
      description: t("act4Desc"),
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    },
  ];

  const title = data?.title || t("title");
  const items = data?.items || defaultActivities;

  return (
    <section id="activities" className="py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase">
            {t("sectionLabel")}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll; Desktop: grid */}
        <div className="md:grid md:grid-cols-2 md:gap-8 max-md:flex max-md:gap-4 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-4 max-md:px-4 max-md:pb-4 scrollbar-hide">
          {items.map((activity: any, index: number) => {
            const IconComponent = iconMap[activity.icon] || Music;
            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300 max-md:min-w-[280px] max-md:w-[85vw] max-md:flex-shrink-0 max-md:snap-start"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white">{activity.title}</h3>
                  </div>
                  <p className="text-white/70 mb-3 md:mb-4 text-sm md:text-base line-clamp-2">
                    {activity.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                  >
                    {t("learnMore")} <ArrowRight className="w-4 h-4 text-accent" />
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
