import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于会馆",
  description:
    "新加坡东安会馆成立于1876年，是新加坡历史最悠久的华人宗乡社团之一。了解我们的历史、价值观与组织架构。",
  openGraph: {
    title: "关于会馆 | 新加坡东安会馆",
    description:
      "新加坡东安会馆成立于1876年，是新加坡历史最悠久的华人宗乡社团之一。了解我们的历史、价值观与组织架构。",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
