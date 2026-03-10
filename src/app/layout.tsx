import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import { THEME_STYLE_TEXT } from "@/constants/theme";
import { ClientProviders } from "@/components/common/ClientProviders";
import { MobileNav } from "@/components/MobileNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} antialiased`}
      >
        <ClientProviders>
          {children}
          <MobileNav />
        </ClientProviders>
      </body>
    </html>
  );
}
