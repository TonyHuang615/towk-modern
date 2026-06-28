import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { locales } from "../../i18n/config";
import MobileNav from "../components/MobileNav";
import AuthProvider from "../components/AuthProvider";
import FeedbackWidget from "../components/FeedbackWidget";
import DesignSwitcher from "../components/DesignSwitcher";
import { DesignProvider } from "../components/DesignContext";
import { DESIGN_STORAGE_KEY } from "../../lib/designs";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const initialDesign = cookies().get(DESIGN_STORAGE_KEY)?.value;

  return (
    <NextIntlClientProvider messages={messages}>
      <DesignProvider initialDesign={initialDesign}>
        <AuthProvider>
          {children}
          <MobileNav />
          <FeedbackWidget />
          <DesignSwitcher />
        </AuthProvider>
      </DesignProvider>
    </NextIntlClientProvider>
  );
}
