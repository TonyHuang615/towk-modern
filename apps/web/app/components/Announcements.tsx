"use client";

import { motion } from "framer-motion";
import { Megaphone, ArrowRight, ChevronRight } from "lucide-react";

const announcements = [
  {
    id: 1,
    date: "2026-03-20",
    text: "第12届世界东安恳亲大会将于2026年下半年在新加坡举行，详情敬请关注。",
    urgent: true,
  },
  {
    id: 2,
    date: "2026-03-10",
    text: "2026年度会员注册及续会工作现已开始，请各会员踊跃登记。",
    urgent: false,
  },
  {
    id: 3,
    date: "2026-02-15",
    text: "会馆图书馆开放时间调整：逢周三、六、日上午10时至下午5时开放。",
    urgent: false,
  },
];

export default function Announcements() {
  return (
    <section className="py-10 bg-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 flex items-center gap-2 pt-0.5">
            <Megaphone className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary whitespace-nowrap">
              会馆公告
            </span>
          </div>
          <div className="flex-1 overflow-hidden space-y-2">
            {announcements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  {item.urgent && (
                    <span className="mr-2 text-xs font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      重要
                    </span>
                  )}
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
          <a
            href="/announcements"
            className="flex-shrink-0 hidden md:flex items-center gap-1 text-xs text-primary hover:underline"
          >
            更多 <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
