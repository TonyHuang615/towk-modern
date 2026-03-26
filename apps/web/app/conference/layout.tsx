import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "世界东安恳亲大会",
  description:
    "世界东安恳亲大会是全球东莞宝安乡亲的盛会，自1992年创办以来已历11届。",
  openGraph: {
    title: "世界东安恳亲大会 | 新加坡东安会馆",
    description:
      "世界东安恳亲大会是全球东莞宝安乡亲的盛会，自1992年创办以来已历11届。",
  },
};

export default function ConferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
