"use client";

import Hero from "../Hero";
import Announcements from "../Announcements";
import About from "../About";
import News from "../News";
import History from "../History";
import Conference from "../Conference";
import Activities from "../Activities";

// 经典传承：沿用现有版式（全幅轮播 + 交替分栏 + 时间轴）
export default function HomeClassic({ content }: { content: any }) {
  return (
    <>
      <Hero data={content.hero} />
      <Announcements />
      <About data={content.about} />
      <News />
      <History data={content.history} />
      <Conference data={content.conference} />
      <Activities data={content.activities} />
    </>
  );
}
