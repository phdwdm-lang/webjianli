import type { CSSProperties } from "react";
import {
  Caveat,
  Long_Cang,
  Ma_Shan_Zheng,
  ZCOOL_XiaoWei,
  Zhi_Mang_Xing,
} from "next/font/google";
import { ThoughtsCanvas } from "@/app/thoughts/components/ThoughtsCanvas";
import { CSS_VARS } from "@/constants/theme";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const xiaowei = ZCOOL_XiaoWei({
  variable: "--font-xiaowei",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const longCang = Long_Cang({
  variable: "--font-longcang",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const zhiMangXing = Zhi_Mang_Xing({
  variable: "--font-zhimang",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

export default function ThoughtsPage() {
  return (
    <div
      className={`section-page ${caveat.variable} ${maShanZheng.variable} ${xiaowei.variable} ${longCang.variable} ${zhiMangXing.variable}`}
      style={
        {
          "--section-color": CSS_VARS.themeThoughts,
        } as CSSProperties
      }
    >
      <ThoughtsCanvas />
    </div>
  );
}
