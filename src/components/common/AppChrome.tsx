"use client";

import type { ReactNode } from "react";
import { MobileNav } from "@/components/MobileNav";
import { SideNav } from "@/components/SideNav";
import { KoiBackdrop } from "./KoiBackdrop";
import {
  RouteTransitionProvider,
  RouteTransitionShell,
} from "./RouteTransitionShell";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <RouteTransitionProvider>
      {/* 锦鲤主题背景层：仅 koi 时渲染，全站铺底、层级最低，不阻塞内容 */}
      <KoiBackdrop />
      <div className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 md:block">
        <SideNav />
      </div>
      <RouteTransitionShell>{children}</RouteTransitionShell>
      <MobileNav />
    </RouteTransitionProvider>
  );
}
