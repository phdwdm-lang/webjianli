"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Home, User, Rocket, Clock, Pen, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_STYLES } from "@/constants/theme";
import { useRouteTransitionNavigation } from "@/components/common/RouteTransitionShell";

interface NavItem {
  icon: React.ElementType;
  href?: string;
  label: string;
  color: string;
  isToggle?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Home, href: "/", label: "主页", color: NAV_STYLES.colors.home },
  {
    icon: User,
    href: "/about",
    label: "个人信息",
    color: NAV_STYLES.colors.about,
  },
  {
    icon: Rocket,
    href: "/projects",
    label: "灵感造物",
    color: NAV_STYLES.colors.projects,
  },
  {
    icon: Clock,
    href: "/experience",
    label: "时光足迹",
    color: NAV_STYLES.colors.experience,
  },
  {
    icon: Pen,
    href: "/thoughts",
    label: "思想碎片",
    color: NAV_STYLES.colors.thoughts,
  },
  {
    icon: Sun,
    label: "切换主题",
    color: NAV_STYLES.colors.themeToggle,
    isToggle: true,
  },
];

function MobileNavComponent() {
  const { resolvedTheme, setTheme } = useTheme();
  const { activePathname, navigateWithTransition, prefetchRoute } =
    useRouteTransitionNavigation();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={false}
      className="route-transition-live-nav md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3 backdrop-blur-2xl border-t"
      style={{
        backgroundColor: NAV_STYLES.glassBackground,
        borderColor: NAV_STYLES.glassBorder,
        boxShadow: NAV_STYLES.shadow,
        viewTransitionName: "mobile-nav",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.isToggle ? (isDark ? Moon : Sun) : item.icon;
        const isActive = item.href === activePathname;

        const iconElement = (
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer py-2 px-3"
            onClick={item.isToggle ? toggleTheme : undefined}
          >
            <motion.div
              animate={{
                color: isActive ? item.color : NAV_STYLES.iconDefault,
                ...(item.isToggle ? { rotate: isDark ? 180 : 0 } : {}),
              }}
              transition={{
                color: { duration: 0.15 },
                rotate: { type: "spring", stiffness: 200, damping: 15 },
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
            </motion.div>
          </motion.div>
        );

        return item.href ? (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => navigateWithTransition(item.href!)}
            onTouchStart={() => prefetchRoute(item.href!)}
            onMouseEnter={() => prefetchRoute(item.href!)}
          >
            {iconElement}
          </button>
        ) : (
          <div key={item.label}>{iconElement}</div>
        );
      })}
    </motion.nav>
  );
}

export const MobileNav = memo(MobileNavComponent);
