import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "历史传承",
  description:
    "新加坡东安会馆自1876年创立以来的历史里程碑，见证几代华人的奋斗历程。",
  openGraph: {
    title: "历史传承 | 新加坡东安会馆",
    description:
      "新加坡东安会馆自1876年创立以来的历史里程碑，见证几代华人的奋斗历程。",
  },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
