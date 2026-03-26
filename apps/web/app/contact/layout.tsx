import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联络我们",
  description:
    "联系新加坡东安会馆，获取地址、电话及开放时间等信息。欢迎来访或在线留言。",
  openGraph: {
    title: "联络我们 | 新加坡东安会馆",
    description:
      "联系新加坡东安会馆，获取地址、电话及开放时间等信息。",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
