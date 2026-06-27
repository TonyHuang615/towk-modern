import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return pageMetadata(params.locale, "gallery");
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
