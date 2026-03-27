"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface FooterProps {
  data?: {
    title?: string;
    subtitle?: string;
    description?: string;
  };
}

export default function Footer({ data }: FooterProps) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const contactInfo = [
    { icon: MapPin, label: t("address"), value: "21 Bukit Pasoh Road, Singapore 089835" },
    { icon: Phone, label: t("phone"), value: "+65 6223 4416" },
  ];

  const quickLinks = [
    { name: tNav("about"), href: "/about" },
    { name: tNav("history"), href: "/history" },
    { name: tNav("news"), href: "/news" },
    { name: tNav("gallery"), href: "/gallery" },
    { name: tNav("conference"), href: "/conference" },
    { name: tNav("activities"), href: "/activities" },
    { name: tNav("contact"), href: "/contact" },
  ];

  const siteTitle = data?.title || t("siteName");
  const siteSubtitle = data?.subtitle || t("siteNameEn");
  const siteDescription = data?.description || t("siteDesc");

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
                <span className="text-white font-bold text-lg md:text-xl">{t("logoChar")}</span>
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
            <h4 className="font-bold mb-3 md:mb-6 text-sm md:text-base">{t("quickLinks")}</h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
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
            <h4 className="font-bold mb-3 md:mb-6 text-sm md:text-base">{t("contactUs")}</h4>
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
              {t("privacy")}
            </a>
            <a href="#" className="hover:text-background transition-colors">
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
