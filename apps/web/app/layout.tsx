import type { Metadata } from "next";
import {
  Inter,
  Noto_Serif_SC,
  Noto_Sans_SC,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import MobileNav from "./components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "新加坡东安会馆 | Tung On Wui Kun",
    template: "%s | 新加坡东安会馆",
  },
  description:
    "成立于1876年，新加坡历史最悠久的华人宗乡社团之一。东莞宝安同乡的精神家园，世界东安恳亲大会主办机构。",
  keywords: "东安会馆, 新加坡, 宗乡会馆, 东莞, 宝安, 恳亲大会, 华人社团",
  openGraph: {
    title: "新加坡东安会馆 | Tung On Wui Kun",
    description:
      "成立于1876年，新加坡历史最悠久的华人宗乡社团之一。",
    locale: "zh_SG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`scroll-smooth ${inter.variable} ${notoSerifSC.variable} ${notoSansSC.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased font-sans">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
