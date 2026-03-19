import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Syne, Noto_Serif_SC } from "next/font/google";
import { THEME_STYLE_TEXT } from "@/constants/theme";
import { AppChrome } from "@/components/common/AppChrome";
import { ClientProviders } from "@/components/common/ClientProviders";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  axes: ["opsz"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSerif = Noto_Serif_SC({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Pardon乌冬面 | 个人品牌空间",
  description:
    "道阻且长，行则将至。AI产品经理的个人作品集与思想碎片。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <style
          id="theme-vars"
          dangerouslySetInnerHTML={{ __html: THEME_STYLE_TEXT }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${syne.variable} ${notoSerif.variable} antialiased`}
      >
        <ClientProviders>
          <AppChrome>{children}</AppChrome>
        </ClientProviders>
      </body>
    </html>
  );
}
