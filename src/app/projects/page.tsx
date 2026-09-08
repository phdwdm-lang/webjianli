"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { PROJECTS } from "@/constants/profile";
import { SKILLS } from "@/constants/skills";
import { CSS_VARS } from "@/constants/theme";
import ProjectCard from "./ProjectCard";
import SkillCard from "./SkillCard";

type TabId = "products" | "skills";

const TABS: readonly { id: TabId; label: string }[] = [
  { id: "products", label: "产品" },
  { id: "skills", label: "Skill" },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("products");
  const [swipeDir, setSwipeDir] = useState<"left" | "right">("right");
  const [hasSwitched, setHasSwitched] = useState(false);

  // 挂载后再读取 URL，避免服务端/客户端初始状态不一致导致 hydration 警告
  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "skills") setActiveTab("skills");
  }, []);

  const switchTab = (tab: TabId) => {
    if (tab === activeTab) return;
    const order: Record<TabId, number> = { products: 0, skills: 1 };
    setSwipeDir(order[tab] > order[activeTab] ? "right" : "left");
    setHasSwitched(true);
    setActiveTab(tab);
    const url = new URL(window.location.href);
    if (tab === "skills") url.searchParams.set("tab", "skills");
    else url.searchParams.delete("tab");
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <PageContainer
      title="项目经历"
      subtitle="AI 产品与效率工具：我的实战交付"
      themeColor={CSS_VARS.themeCreations}
      hideHeader
      pageClassName="overflow-x-clip [background-image:radial-gradient(circle,color-mix(in_oklab,var(--foreground)_4%,transparent)_1px,transparent_1px)] [background-size:20px_20px]"
      contentClassName="mx-auto w-full max-w-[1180px] px-5 py-14 pb-24 md:px-7 md:py-16 md:pb-12 xl:px-8"
    >
      <div className="sticky top-0 z-30 mb-10 flex justify-center py-3">
        <div className="relative grid grid-cols-2 items-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-[color-mix(in_oklab,var(--card-bg)_35%,transparent)] p-1.5 backdrop-blur-[28px] backdrop-saturate-[1.8] shadow-[0_10px_40px_0_color-mix(in_oklab,var(--foreground)_12%,transparent),inset_0_1px_0_0_color-mix(in_oklab,#ffffff_45%,transparent)]">
          <span
            className="absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-6px)] rounded-full bg-[var(--section-color)] shadow-[0_4px_12px_color-mix(in_oklab,var(--section-color)_25%,transparent)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: activeTab === "products" ? "translateX(0)" : "translateX(100%)" }}
          />
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => switchTab(tab.id)}
                aria-pressed={isActive}
                className={[
                  "relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-300",
                  isActive ? "text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={activeTab}
        className={
          hasSwitched
            ? swipeDir === "right"
              ? "animate-tab-in-right"
              : "animate-tab-in-left"
            : ""
        }
      >
        {activeTab === "products" ? (
          <div className="space-y-14 md:space-y-16">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {SKILLS.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
