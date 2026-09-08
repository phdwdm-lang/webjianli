import type { Metadata } from "next";
import { THEME_STYLE_TEXT } from "@/constants/theme";
import { AppChrome } from "@/components/common/AppChrome";
import { ClientProviders } from "@/components/common/ClientProviders";
import "./globals.css";
import "./fonts/font-faces.css";

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
      <body className="antialiased">
        <ClientProviders>
          <AppChrome>{children}</AppChrome>
        </ClientProviders>
      </body>
    </html>
  );
}
