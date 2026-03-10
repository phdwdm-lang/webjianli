"use client";

import {
  motion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { Home, User, Rocket, Clock, Pen, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_STYLES } from "@/constants/theme";
import { useDockIconMotion } from "@/hooks/useDockIconMotion";
import { useSideNavState } from "@/hooks/useSideNavState";

interface NavItem {
  icon: React.ElementType;
  href?: string;
  label: string;
  color: string;
  tooltipBg?: string;
  isToggle?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Home, href: "/", label: "主页", color: NAV_STYLES.colors.home, tooltipBg: NAV_STYLES.tooltipBg.home },
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

const BASE_SIZE = 48;
const MAX_SIZE = 72;
const MAGNIFICATION_RANGE = 150;

export function SideNav() {
  const pathname = usePathname();
  const {
    mouseY,
    isDark,
    hoveredIndex,
    handleMouseMove,
    handleMouseLeave,
    handleHoverStart,
    handleHoverEnd,
    toggleTheme,
  } = useSideNavState();

  return (
    <motion.nav
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex flex-col items-center p-2 rounded-[28px] backdrop-blur-2xl border"
      style={{
        backgroundColor: NAV_STYLES.glassBackground,
        borderColor: NAV_STYLES.glassBorder,
        boxShadow: NAV_STYLES.shadow,
      }}
    >
      {NAV_ITEMS.map((item, index) => (
        <DockIcon
          key={item.label}
          item={item}
          mouseY={mouseY}
          isHovered={hoveredIndex === index}
          isActive={item.href === pathname}
          onHoverStart={() => handleHoverStart(index)}
          onHoverEnd={handleHoverEnd}
          isDark={isDark}
          onToggle={item.isToggle ? toggleTheme : undefined}
        />
      ))}
    </motion.nav>
  );
}

interface DockIconProps {
  item: NavItem;
  mouseY: MotionValue<number>;
  isHovered: boolean;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isDark: boolean;
  onToggle?: () => void;
}

function DockIcon({
  item,
  mouseY,
  isHovered,
  isActive,
  onHoverStart,
  onHoverEnd,
  isDark,
  onToggle,
}: DockIconProps) {
  const Icon = item.isToggle ? (isDark ? Moon : Sun) : item.icon;
  const { ref, size, iconScale } = useDockIconMotion({
    mouseY,
    baseSize: BASE_SIZE,
    maxSize: MAX_SIZE,
    magnificationRange: MAGNIFICATION_RANGE,
  });

  const iconElement = (
    <motion.div
      ref={ref}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      style={{
        width: BASE_SIZE,
        height: size,
      }}
      onClick={onToggle}
      className="flex items-center justify-center cursor-pointer"
    >
      <motion.div style={{ scale: iconScale }}>
        <motion.div
          animate={{
            color: isActive || isHovered ? item.color : NAV_STYLES.iconDefault,
            ...(item.isToggle ? { rotate: isDark ? 180 : 0 } : {}),
          }}
          transition={{
            color: { duration: 0.15 },
            rotate: { type: "spring", stiffness: 200, damping: 15 },
          }}
        >
          <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative flex items-center justify-center">
      {item.href ? <Link href={item.href}>{iconElement}</Link> : iconElement}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -6, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap pointer-events-none z-50 shadow-lg"
            style={{
              backgroundColor: item.tooltipBg ?? item.color,
              color: NAV_STYLES.tooltipText,
            }}
          >
            {item.label}
            <div
              className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-r-[5px] border-transparent"
              style={{ borderRightColor: item.tooltipBg ?? item.color }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
