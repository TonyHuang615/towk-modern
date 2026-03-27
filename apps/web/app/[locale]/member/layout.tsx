import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会员中心",
  description: "新加坡东安会馆会员个人中心",
};

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
