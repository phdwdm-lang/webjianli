"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  GraduationCap,
  Building2,
  Circle,
  FolderKanban,
  X,
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { EDUCATION, WORK_EXPERIENCE } from "@/constants/profile";
import { CSS_VARS } from "@/constants/theme";

type TimelineProject = {
  name: string;
  role: string;
  period: string;
  description: string;
  highlights: readonly string[];
};

type TimelineItem = {
  type: "work" | "education";
  title: string;
  subtitle: string;
  period: string;
  description: string | null;
  highlights?: readonly string[];
  projects?: readonly TimelineProject[];
  sortKey: string;
};

const NUMBER_HIGHLIGHT_PATTERN =
  /(\d+[\d,]*\+?(?:万|亿)?(?:份|次|个|人|%|项|家|年|月|周|天)?)/g;

const highlightKeyNumbers = (text: string, fontWeight: 600 | 700 = 600) => {
  const matches = Array.from(text.matchAll(NUMBER_HIGHLIGHT_PATTERN));

  if (matches.length === 0) {
    return text;
  }

  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    const value = match[0];
    const start = match.index ?? 0;
    const end = start + value.length;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    nodes.push(
      <span
        key={`${value}-${index}-${start}`}
        style={{
          color: "var(--section-color)",
          fontWeight,
        }}
      >
        {value}
      </span>
    );

    lastIndex = end;
  });

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

const TIMELINE_ITEMS: TimelineItem[] = [
  ...WORK_EXPERIENCE.map((w) => ({
    type: "work" as const,
    title: w.company,
    subtitle: w.role,
    period: w.period,
    description: w.description,
    highlights: "highlights" in w ? (w.highlights as readonly string[]) : undefined,
    projects: "projects" in w ? (w.projects as readonly TimelineProject[]) : undefined,
    sortKey: w.period.split(" - ")[0].replace(".", ""),
  })),
  ...EDUCATION.map((e) => ({
    type: "education" as const,
    title: e.school,
    subtitle: `${e.major} · ${e.degree}`,
    period: e.period,
    description: null,
    highlights: e.honors,
    sortKey: e.period.split(" - ")[0].replace(".", ""),
  })),
].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

export default function ExperiencePage() {
  const [activeProject, setActiveProject] = useState<TimelineProject | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const drawerScrollRef = useRef<HTMLDivElement | null>(null);
  const openAnimationFrameRef = useRef<number | null>(null);

  const openDrawer = (project: TimelineProject) => {
    if (openAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(openAnimationFrameRef.current);
      openAnimationFrameRef.current = null;
    }

    setActiveProject(project);
    setIsDrawerVisible(false);

    // 先挂载，再在下一帧触发可见状态，保证 CSS transition 能真正生效
    openAnimationFrameRef.current = window.requestAnimationFrame(() => {
      setIsDrawerVisible(true);
      openAnimationFrameRef.current = null;
    });
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  useEffect(() => {
    setHasMounted(true);

    return () => {
      if (openAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(openAnimationFrameRef.current);
      }
    };
  }, []);

  // ESC 关闭 + 打开时禁止背景滚动
  useEffect(() => {
    if (!isDrawerVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDrawerVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isDrawerVisible]);

  // 抽屉关闭后等待动画结束再卸载内容
  useEffect(() => {
    if (!activeProject || isDrawerVisible) return;

    const timeoutId = window.setTimeout(() => {
      setActiveProject(null);
    }, 260);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isDrawerVisible, activeProject]);

  // 每次打开新项目时将抽屉内容滚动重置到顶部，避免复用上一次滚动位置
  useEffect(() => {
    if (!activeProject) return;
    drawerScrollRef.current?.scrollTo(0, 0);
  }, [activeProject]);

  return (
      <PageContainer
        title="个人经历"
        subtitle="教育与工作背景"
        themeColor={CSS_VARS.themeJourney}
        hideHeader
        contentClassName="mx-auto w-full max-w-[1180px] px-5 py-14 pb-24 md:px-7 md:py-16 md:pb-12 xl:px-8"
      >
      <div className="relative py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[26%] top-[10%] h-[58rem] w-[58rem] rounded-full opacity-90 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--section-color) 18%, transparent) 0%, color-mix(in oklab, var(--section-color) 10%, transparent) 32%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] bottom-[6%] h-40 w-40 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--section-color) 10%, transparent) 0%, transparent 72%)",
          }}
        />

        <header className="mb-16 text-center md:mb-[4.75rem]">
          <h1 className="text-4xl font-black tracking-tight text-[var(--foreground)] md:text-5xl">
            个人经历
          </h1>
          <p className="mt-3 text-base text-[var(--muted)] md:text-lg">
            教育与工作背景
          </p>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[var(--section-color)] opacity-80" />
        </header>

        {/* Timeline Line — desktop & mobile positions will be refined in later phases */}
        <div
          className="absolute left-[24px] md:left-[232px] top-[8rem] bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--section-color) 60%, var(--timeline-line)) 10%, color-mix(in oklab, var(--section-color) 60%, var(--timeline-line)) 90%, transparent 100%)",
            opacity: 0.3,
          }}
        />

        <div className="space-y-14">
          {TIMELINE_ITEMS.map((item, index) => (
            <div key={index} className="relative pl-[64px] md:pl-[340px] group py-4">
              {/* Desktop Date */}
              <div className="hidden md:flex absolute left-0 top-[2.75rem] -translate-y-1/2 w-[232px] pr-9 justify-end group-hover:-translate-x-1 transition-transform duration-300">
                <span className="text-[var(--muted)] font-ui text-[1rem] font-semibold tracking-[0.055em]">
                  {item.period}
                </span>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-[24px] md:left-[232px] top-[2.75rem] -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="dot-glow w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--card-bg)] border-2 border-[var(--section-color)] flex items-center justify-center">
                  {item.type === "education" ? (
                    <GraduationCap
                      size={17}
                      className="text-[var(--section-color)]"
                    />
                  ) : (
                    <Building2 size={17} className="text-[var(--section-color)]" />
                  )}
                </div>
              </div>

              {/* Mobile Date */}
              <div className="md:hidden text-[var(--section-color)] font-ui text-sm font-bold mb-3">
                {item.period}
              </div>

              {/* Content Card */}
              <div className="glass-card rounded-[1.7rem] px-6 py-5 md:px-7 md:py-6 transition-all hover:border-[var(--section-color)]">
                <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-[1.55rem] font-bold tracking-tight text-[var(--foreground)] md:text-[1.72rem]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.84rem] font-medium text-[var(--section-color)] border"
                      style={{
                        backgroundColor:
                          "color-mix(in oklab, var(--section-color) 8%, var(--card-bg))",
                        borderColor:
                          "color-mix(in oklab, var(--section-color) 18%, var(--card-border))",
                      }}
                    >
                      {item.type === "education" ? (
                        <GraduationCap size={14} />
                      ) : (
                        <BriefcaseBusiness size={14} />
                      )}
                      <span>{item.subtitle}</span>
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-[0.92rem] text-[var(--muted)] mb-4.5 leading-[1.62]">
                    {highlightKeyNumbers(item.description)}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-2 mb-4.5">
                    {item.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-2.5 text-[0.89rem] text-[var(--foreground)] leading-[1.55]"
                      >
                        <Circle
                          size={5}
                          className="mt-2 shrink-0 fill-[var(--section-color)] text-[var(--section-color)]"
                        />
                        <span>{highlightKeyNumbers(highlight)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.type === "work" && item.projects && item.projects.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                      {item.projects.map((project) => (
                        <button
                          key={project.name}
                          type="button"
                          className="group/project inline-flex items-center gap-2.5 rounded-[1rem] border px-3.5 py-2 text-[0.85rem] text-[var(--muted)] transition-all duration-300 hover:text-[var(--foreground)]"
                          style={{
                            backgroundColor:
                              "color-mix(in oklab, var(--card-bg) 92%, var(--section-color) 8%)",
                            borderColor:
                              "color-mix(in oklab, var(--section-color) 12%, var(--card-border))",
                          }}
                          onClick={() => openDrawer(project)}
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color-mix(in_oklab,var(--section-color)_40%,transparent)] group-hover/project:bg-[var(--section-color)] transition-colors" />
                          <span className="truncate max-w-[12rem] sm:max-w-[15rem]">
                            {project.name}
                          </span>
                          <ChevronRight
                            size={14}
                            className="shrink-0 text-[var(--muted)] group-hover/project:translate-x-0.5 group-hover/project:text-[var(--section-color)] transition-all"
                          />
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Drawer */}
        {hasMounted &&
          activeProject &&
          createPortal(
            <>
              {/* Backdrop */}
              <div
                className={`fixed inset-0 z-[70] bg-black/16 backdrop-blur-[5px] transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isDrawerVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={closeDrawer}
              />
              {/* Drawer Panel */}
              <aside
                className={`fixed inset-y-0 right-0 z-[80] w-full max-w-[34rem] bg-[var(--card-bg)] border-l border-[var(--card-border)] shadow-[0_20px_60px_-20px_rgba(15,23,42,0.28)] flex flex-col will-change-transform transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isDrawerVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-[12%] opacity-0 pointer-events-none"
                }`}
              >
                <header className="flex items-center justify-between px-5 py-4 border-b border-[var(--card-border)]">
                  <div className="flex items-center gap-2">
                    <FolderKanban size={18} className="text-[var(--section-color)]" />
                    <span className="text-xs font-medium tracking-wide text-[var(--muted)]">
                      项目详情
                    </span>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--tag-bg)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    onClick={closeDrawer}
                  >
                    <X size={16} />
                  </button>
                </header>

                <div
                  ref={drawerScrollRef}
                  className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[1.35rem] font-semibold text-[var(--foreground)]">
                        {activeProject.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[var(--section-color)]">
                        {activeProject.role}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span
                        className="px-3 py-1 rounded-full text-[var(--muted)]"
                        style={{
                          backgroundColor:
                            "color-mix(in oklab, var(--section-color) 10%, var(--tag-bg))",
                        }}
                      >
                        {activeProject.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-[0.98rem] leading-[1.7] text-[var(--muted)]">
                    {highlightKeyNumbers(activeProject.description, 700)}
                  </p>

                  {activeProject.highlights.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-[var(--muted)]">
                        核心贡献
                      </p>
                      <ul className="space-y-2.5">
                        {activeProject.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2.5 text-[0.95rem] text-[var(--foreground)] leading-[1.65]"
                          >
                            <Circle
                              size={5}
                              className="mt-2 shrink-0 fill-[var(--section-color)] text-[var(--section-color)]"
                            />
                            <span>
                              {highlightKeyNumbers(highlight, 700)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>
            </>,
            document.body
          )}
      </div>
    </PageContainer>
  );
}
