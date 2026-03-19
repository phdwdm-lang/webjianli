"use client";

import type { ReactNode } from "react";
import { MobileNav } from "@/components/MobileNav";
import { SideNav } from "@/components/SideNav";
import {
  RouteTransitionProvider,
  RouteTransitionShell,
} from "./RouteTransitionShell";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <RouteTransitionProvider>
      <div className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 md:block">
        <SideNav />
      </div>
      <RouteTransitionShell>{children}</RouteTransitionShell>
      <MobileNav />
    </RouteTransitionProvider>
  );
}
