import type { Metadata } from "next";
import {
  Inter,
  Noto_Serif_SC,
  Noto_Sans_SC,
  Playfair_Display,
  Source_Serif_4,
} from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Analytics from "./components/Analytics";
import { DESIGN_STORAGE_KEY, DEFAULT_DESIGN } from "../lib/designs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
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
  // SSR the chosen design from the cookie so the design theme (CSS variables
  // keyed on html[data-design]) is correct from first paint, independent of
  // localStorage. The inline script below reconciles with localStorage.
  const design = cookies().get(DESIGN_STORAGE_KEY)?.value || DEFAULT_DESIGN;
  return (
    <html
      lang="zh-CN"
      data-design={design}
      className={`scroll-smooth ${inter.variable} ${notoSerifSC.variable} ${notoSansSC.variable} ${playfairDisplay.variable} ${sourceSerif.variable}`}
    >
      <body className="antialiased font-sans">
        {/* 演示模式：在首屏渲染前套用已选设计，避免闪烁（localStorage 优先，回退 cookie） */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var m=document.cookie.match(/(?:^|; )towk-design=([^;]+)/);var d=localStorage.getItem('towk-design')||(m&&m[1]);if(d)document.documentElement.dataset.design=d}catch(e){}",
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
