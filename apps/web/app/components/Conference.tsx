"use client";

import { motion } from "framer-motion";
import { Globe, Users, Calendar, ArrowRight } from "lucide-react";

interface ConferenceProps {
  data?: {
    title?: string;
    description?: string;
    features?: Array<{ icon: string; title: string; description: string }>;
    pastConferences?: Array<{ year: string; location: string; theme: string }>;
  };
}

const defaultFeatures = [
  { icon: "Globe", title: "全球联结", description: "联结世界各地东莞宝安乡亲" },
  { icon: "Users", title: "千人盛会", description: "每届吸引逾千名乡亲参与" },
  {
    icon: "Calendar",
    title: "定期举办",
    description: "每两年举办一届，传承至今",
  },
];

const defaultPastConferences = [
  { year: "2019", location: "新加坡", theme: "第11届世界东安恳亲大会" },
  { year: "2017", location: "香港", theme: "第10届世界东安恳亲大会" },
  { year: "2015", location: "东莞", theme: "第9届世界东安恳亲大会" },
];

const iconMap: any = { Globe, Users, Calendar };

export default function Conference({ data }: ConferenceProps) {
  const title = data?.title || "世界东安恳亲大会";
  const description =
    data?.description ||
    "世界东安恳亲大会是东安会馆主办的国际性盛会，每两年举办一届，联结全球东莞宝安乡亲，共叙乡情，共谋发展。";
  const features = data?.features || defaultFeatures;
  const pastConferences = data?.pastConferences || defaultPastConferences;

  return (
    <section id="conference" className="py-24 lg:py-32 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase">
            Global Gathering
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon] || Globe;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-background/50 backdrop-blur-sm"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-background rounded-2xl p-8 lg:p-12"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">历届大会</h3>
          <div className="space-y-4">
            {pastConferences.map((conf: any, index: number) => (
              <motion.div
                key={conf.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-foreground/5 transition-colors duration-200 cursor-pointer group"
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
          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              查看全部历届大会
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
