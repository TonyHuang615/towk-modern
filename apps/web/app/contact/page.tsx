"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({}));
  }, []);

  const contactInfo = [
    { icon: MapPin, label: "地址", value: "21 Bukit Pasoh Road, Singapore 089835" },
    { icon: Phone, label: "电话", value: "+65 6223 4416" },
    { icon: Clock, label: "开放时间", value: "以会馆通知为准" },
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
              Contact Us
            </span>
            <h1 className="mt-3 md:mt-4 text-3xl md:text-5xl lg:text-6xl font-bold">
              联系我们
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
              欢迎乡亲们与我们联系，我们期待听到您的声音
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8">联系信息</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60">
                        {item.label}
                      </div>
                      <div className="text-lg font-medium">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-foreground/5">
                <h3 className="text-xl font-bold mb-4">关注我们</h3>
                <div className="flex gap-4">
                  {["Facebook", "Instagram", "WeChat"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <span className="text-sm font-bold">{social[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8">发送消息</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">
                      姓名
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      placeholder="您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">
                      邮箱
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      placeholder="您的邮箱"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    主题
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="消息主题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    消息内容
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="请输入您的消息..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  发送消息
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">会馆位置</h2>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.825!2d103.8408!3d1.2795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a340000001%3A0x5398391ffbef7df6!2s21%20Bukit%20Pasoh%20Rd%2C%20Singapore%20089835!5e0!3m2!1sen!2ssg!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="东安会馆位置 - 21 Bukit Pasoh Road, Singapore 089835"
            />
          </div>
        </div>
      </section>

      <Footer data={content.site} />
    </main>
  );
}
