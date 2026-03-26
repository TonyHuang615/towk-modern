import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "新闻资讯",
  description:
    "新加坡东安会馆最新新闻与公告，了解会馆动态与社区资讯。",
  openGraph: {
    title: "新闻资讯 | 新加坡东安会馆",
    description:
      "新加坡东安会馆最新新闻与公告，了解会馆动态与社区资讯。",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
