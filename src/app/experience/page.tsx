"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Building2, Circle, FolderKanban, X } from "lucide-react";
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

const highlightKeyNumbers = (text: string) => {
  const parts = text.split(NUMBER_HIGHLIGHT_PATTERN);

  return parts.map((part, index) =>
    // split 使用捕获组时，匹配内容会出现在奇数索引位置
    index % 2 === 1 ? (
      <span key={index} className="text-[var(--section-color)] font-semibold">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
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

  const openDrawer = (project: TimelineProject) => {
    setActiveProject(project);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

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

  return (
    <PageContainer
      title="学习与工作"
      subtitle="教育背景与工作经历时间线"
      themeColor={CSS_VARS.themeJourney}
      hideHeader
    >
      <div className="relative py-4">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            学习与工作
          </h1>
          <p className="mt-2 text-[var(--muted)] text-base">
            教育背景与工作经历时间线
          </p>
        </header>

        {/* Timeline Line — desktop & mobile positions will be refined in later phases */}
        <div
          className="absolute left-[24px] md:left-[190px] top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--section-color) 60%, var(--timeline-line)) 10%, color-mix(in oklab, var(--section-color) 60%, var(--timeline-line)) 90%, transparent 100%)",
            opacity: 0.3,
          }}
        />

        <div className="space-y-10">
          {TIMELINE_ITEMS.map((item, index) => (
            <div key={index} className="relative pl-[64px] md:pl-[270px] group py-4">
              {/* Desktop Date */}
              <div className="hidden md:flex absolute left-0 top-[2.75rem] -translate-y-1/2 w-[190px] pr-6 justify-end group-hover:-translate-x-1 transition-transform duration-300">
                <span className="text-[var(--muted)] font-mono text-sm font-semibold tracking-wide">
                  {item.period}
                </span>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-[24px] md:left-[190px] top-[2.75rem] -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="dot-glow w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--card-bg)] border-2 border-[var(--section-color)] flex items-center justify-center">
                  {item.type === "education" ? (
                    <GraduationCap
                      size={18}
                      className="text-[var(--section-color)]"
                    />
                  ) : (
                    <Building2 size={18} className="text-[var(--section-color)]" />
                  )}
                </div>
              </div>

              {/* Mobile Date */}
              <div className="md:hidden text-[var(--section-color)] font-mono text-xs font-bold mb-2">
                {item.period}
              </div>

              {/* Content Card */}
              <div className="glass-card rounded-2xl p-6 transition-all hover:border-[var(--section-color)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-sm text-[var(--section-color)] font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                  {/* 桌面端不再显示时间胶囊，避免与左侧时间重复 */}
                  <span
                    className="md:hidden text-xs text-[var(--muted)] px-3 py-1 rounded-full whitespace-nowrap self-start"
                    style={{
                      backgroundColor:
                        "color-mix(in oklab, var(--section-color) 10%, var(--tag-bg))",
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                {item.description && (
                  <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                    {highlightKeyNumbers(item.description)}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-2 text-sm text-[var(--foreground)] leading-relaxed"
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
                  <div className="border-t border-[var(--card-border)] pt-4 mt-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--section-color)] mb-3">
                      <FolderKanban size={16} />
                      <span>代表项目</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.projects.map((project) => (
                        <button
                          key={project.name}
                          type="button"
                          className="group/project inline-flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--tag-bg)] px-3 py-1.5 text-xs sm:text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--section-color)] hover:bg-[color-mix(in_oklab,var(--card-bg)_80%,var(--section-color)_20%)] transition-colors"
                          onClick={() => openDrawer(project)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[color-mix(in_oklab,var(--section-color)_40%,transparent)] group-hover/project:bg-[var(--section-color)]" />
                          <span className="truncate max-w-[12rem] sm:max-w-[16rem]">
                            {project.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Drawer */}
        {activeProject && (
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                isDrawerVisible ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeDrawer}
            />
            {/* Drawer Panel */}
            <aside
              className={`fixed inset-y-0 right-0 z-40 w-full max-w-md bg-[var(--card-bg)] border-l border-[var(--card-border)] shadow-xl flex flex-col transform transition-transform duration-300 ease-out ${
                isDrawerVisible ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-2">
                  <FolderKanban size={18} className="text-[var(--section-color)]" />
                  <span className="text-xs font-medium tracking-wide text-[var(--muted)]">
                    项目详情
                  </span>
                </div>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--tag-bg)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  onClick={closeDrawer}
                >
                  <X size={16} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-[var(--foreground)]">
                      {activeProject.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[var(--section-color)]">
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

                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {highlightKeyNumbers(activeProject.description)}
                </p>

                {activeProject.highlights.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[var(--muted)]">
                      核心贡献
                    </p>
                    <ul className="space-y-2">
                      {activeProject.highlights.map((highlight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-[var(--foreground)] leading-relaxed"
                        >
                          <Circle
                            size={5}
                            className="mt-2 shrink-0 fill-[var(--section-color)] text-[var(--section-color)]"
                          />
                          <span>{highlightKeyNumbers(highlight)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </>
        )}
      </div>
    </PageContainer>
  );
}
