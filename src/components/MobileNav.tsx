"use client";

import { motion } from "framer-motion";
import { Home, User, Rocket, Clock, Pen, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { NAV_STYLES } from "@/constants/theme";

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

export function MobileNav() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3 backdrop-blur-2xl border-t"
      style={{
        backgroundColor: NAV_STYLES.glassBackground,
        borderColor: NAV_STYLES.glassBorder,
        boxShadow: NAV_STYLES.shadow,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.isToggle ? (isDark ? Moon : Sun) : item.icon;
        const isActive = item.href === pathname;

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
          <Link key={item.label} href={item.href}>
            {iconElement}
          </Link>
        ) : (
          <div key={item.label}>{iconElement}</div>
        );
      })}
    </motion.nav>
  );
}
