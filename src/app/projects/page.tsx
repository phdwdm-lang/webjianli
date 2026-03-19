import PageContainer from "@/components/PageContainer";
import { PROJECTS } from "@/constants/profile";
import { CSS_VARS } from "@/constants/theme";
import ProjectCard from "./ProjectCard";

export default function ProjectsPage() {
  return (
    <PageContainer
      title="项目经历"
      subtitle="AI 产品实战：猹杀 & BBQ翻译"
      themeColor={CSS_VARS.themeCreations}
      hideHeader
      pageClassName="overflow-x-hidden [background-image:radial-gradient(circle,color-mix(in_oklab,var(--foreground)_4%,transparent)_1px,transparent_1px)] [background-size:20px_20px]"
      contentClassName="mx-auto w-full max-w-[1320px] px-5 py-14 pb-24 md:px-8 md:py-16 md:pb-12 xl:px-12"
    >
      <section className="mb-16 text-center md:mb-[4.75rem]">
        <h1 className="text-4xl font-black tracking-tight text-[var(--foreground)] md:text-5xl">
          项目经历
        </h1>
        <p className="mt-3 text-base text-[var(--muted)] md:text-lg">
          AI 产品实战：猹杀 & BBQ翻译
        </p>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[var(--section-color)] opacity-80" />
      </section>

      <div className="space-y-14 md:space-y-16">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </PageContainer>
  );
}
