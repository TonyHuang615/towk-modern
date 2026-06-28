"use client";

import { useDesign } from "../DesignContext";
import Navigation from "../Navigation";
import Footer from "../Footer";
import HomeClassic from "./HomeClassic";
import HomePaper from "./HomePaper";
import HomeEditorial from "./HomeEditorial";
import HomeVibrant from "./HomeVibrant";
import HomeStately from "./HomeStately";

// 自带头/尾的完整页面设计（不套用共享导航/页脚）
const SELF_CONTAINED: Record<string, React.ComponentType<{ content: any }>> = {
  paper: HomePaper,
};

// 仅渲染主体的设计，由本组件套上共享的 Navigation + Footer
const BODIES: Record<string, React.ComponentType<{ content: any }>> = {
  classic: HomeClassic,
  editorial: HomeEditorial,
  vibrant: HomeVibrant,
  stately: HomeStately,
};

export default function DesignHome({ content }: { content: any }) {
  const { design } = useDesign();

  const Self = SELF_CONTAINED[design];
  if (Self) return <Self content={content} />;

  const Body = BODIES[design] || HomeClassic;
  return (
    <main className="min-h-screen">
      <Navigation />
      <Body content={content} />
      <Footer data={content.site} />
    </main>
  );
}
