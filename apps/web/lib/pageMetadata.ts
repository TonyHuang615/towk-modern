import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// 按 locale 生成页面 SEO 元数据（标题/描述/OG），文案来自 messages 的 meta 段。
export async function pageMetadata(
  locale: string,
  key: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const full = `${title} | ${t("siteName")}`;
  return {
    title: { absolute: full },
    description,
    openGraph: { title: full, description },
  };
}
