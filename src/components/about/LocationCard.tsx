"use client";

import { useEffect, useState } from "react";
import AboutModuleTitle from "./AboutModuleTitle";
import BentoCardShell from "./BentoCardShell";
import { ABOUT_COPY, ABOUT_MODULE_ICONS } from "@/constants/about";

function formatTime() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: ABOUT_COPY.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function LocationCard() {
  const Icon = ABOUT_MODULE_ICONS.location;
  // 初始用空串占位：避免 SSR 用服务器时间格式化，导致客户端 hydration 文本不一致（Hydration mismatch）
  // 挂载后再由 useEffect 设置真实时间，服务端与客户端首帧均为空串，可安全匹配。
  const [time, setTime] = useState("");

  useEffect(() => {
    // 挂载后立即刷新一次，避免首屏时钟为空（直到 1s 后才显示）
    setTime(formatTime());
    const timer = window.setInterval(() => {
      setTime(formatTime());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <BentoCardShell className="flex min-h-[180px] flex-col justify-between overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <AboutModuleTitle icon={Icon} label={ABOUT_COPY.locationLabel} />
        <div className="mt-1 animate-pulse text-[var(--theme-pardon)]" aria-hidden="true">
          {"\u25CF"}
        </div>
      </div>

      <div className="mt-auto">
        <p className="mb-1 text-3xl font-bold text-[var(--foreground)]">{ABOUT_COPY.location}</p>
        <p className="font-mono text-sm text-[var(--muted)]">
          {time} CST
        </p>
      </div>
    </BentoCardShell>
  );
}
