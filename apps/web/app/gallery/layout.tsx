import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "影相库",
  description:
    "新加坡东安会馆活动照片与历史影像，记录会馆百年风采。",
  openGraph: {
    title: "影相库 | 新加坡东安会馆",
    description:
      "新加坡东安会馆活动照片与历史影像，记录会馆百年风采。",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
