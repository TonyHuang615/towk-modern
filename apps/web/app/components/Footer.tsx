"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

interface FooterProps {
  data?: {
    title?: string;
    subtitle?: string;
    description?: string;
  };
}

const contactInfo = [
  { icon: MapPin, label: "地址", value: "21 Bukit Pasoh Road, Singapore 089835" },
  { icon: Phone, label: "电话", value: "+65 6223 4416" },
];

const quickLinks = [
  { name: "关于会馆", href: "/about" },
  { name: "历史传承", href: "/history" },
  { name: "最新动态", href: "/news" },
  { name: "影相库", href: "/gallery" },
  { name: "恳亲大会", href: "/conference" },
  { name: "会馆活动", href: "/activities" },
  { name: "联系我们", href: "/contact" },
];

export default function Footer({ data }: FooterProps) {
  const siteTitle = data?.title || "新加坡东安会馆";
  const siteSubtitle = data?.subtitle || "Tung On Wui Kun";
  const siteDescription =
    data?.description ||
    "成立于1876年，新加坡历史最悠久的华人宗乡社团之一，致力于联络乡情、传承文化、服务社群。";

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-10 md:py-16 lg:py-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">东</span>
              </div>
              <div>
                <span className="font-bold text-lg">{siteTitle}</span>
                <span className="block text-xs text-background/60 -mt-1">
                  {siteSubtitle}
                </span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {siteDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold mb-3 md:mb-6 text-sm md:text-base">快速链接</h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 lg:col-span-2"
          >
            <h4 className="font-bold mb-3 md:mb-6 text-sm md:text-base">联系我们</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-background/60">
                      {item.label}
                    </div>
                    <div className="text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="py-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>© 2026 {siteTitle}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-background transition-colors">
              使用条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
