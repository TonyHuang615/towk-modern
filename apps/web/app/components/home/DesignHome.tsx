"use client";

import { useDesign } from "../DesignContext";
import DesignShell from "../DesignShell";
import HomeClassic from "./HomeClassic";
import HomePaper from "./HomePaper";
import HomeEditorial from "./HomeEditorial";
import HomeVibrant from "./HomeVibrant";
import HomeStately from "./HomeStately";

// 所有设计统一只渲染主体，由 DesignShell 套上各自的页头/页脚（与全站一致）。
const BODIES: Record<string, React.ComponentType<{ content: any }>> = {
  classic: HomeClassic,
  paper: HomePaper,
  editorial: HomeEditorial,
  vibrant: HomeVibrant,
  stately: HomeStately,
};

export default function DesignHome({ content }: { content: any }) {
  const { design } = useDesign();
  const Body = BODIES[design] || HomeClassic;

  return (
    <DesignShell>
      <Body content={content} />
    </DesignShell>
  );
}
