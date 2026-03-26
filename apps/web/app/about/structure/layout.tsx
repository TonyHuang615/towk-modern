import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "组织架构",
  description:
    "新加坡东安会馆组织架构：从最高领导、执行领导到各专责委员会的完整组织设置。",
  openGraph: {
    title: "组织架构 | 新加坡东安会馆",
    description:
      "新加坡东安会馆组织架构：从最高领导、执行领导到各专责委员会的完整组织设置。",
  },
};

export default function StructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
