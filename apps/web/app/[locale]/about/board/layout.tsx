import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "历届董事会",
  description:
    "新加坡东安会馆历届董事会领导名单，感谢历任会长及董事对会馆的奉献与付出。",
  openGraph: {
    title: "历届董事会 | 新加坡东安会馆",
    description:
      "新加坡东安会馆历届董事会领导名单，感谢历任会长及董事对会馆的奉献与付出。",
  },
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
