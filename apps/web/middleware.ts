import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  // Don't add locale prefix for default locale (zh)
  // So /about stays as /about (not /zh/about)
  localePrefix: "as-needed",
});

export const config = {
  // Match all pathnames except API routes, static files, etc.
  matcher: ["/((?!api|_next|_vercel|admin|login|.*\\..*).*)"],
};
