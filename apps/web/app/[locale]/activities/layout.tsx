import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "活动中心",
  description:
    "新加坡东安会馆活动预告与回顾，包括文化庆典、社区服务及会员联谊等精彩活动。",
  openGraph: {
    title: "活动中心 | 新加坡东安会馆",
    description:
      "新加坡东安会馆活动预告与回顾，包括文化庆典、社区服务及会员联谊等精彩活动。",
  },
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
