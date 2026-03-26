"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const nextLocale = locale === "zh" ? "en" : "zh";

    // Remove current locale prefix if present
    let path = pathname;
    if (path.startsWith(`/${locale}`)) {
      path = path.slice(`/${locale}`.length) || "/";
    }

    // Navigate to the new locale path
    router.push(`/${nextLocale}${path === "/" ? "" : path}`);
  };

  return (
    <button
      onClick={switchLocale}
      className={`px-2 py-1 rounded-md text-xs font-medium border transition-colors hover:bg-foreground/10 ${className}`}
      aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}
