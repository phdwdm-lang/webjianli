import {
  ExternalLink,
  Github,
  Video,
  Circle,
  Users,
  Calendar,
} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { PROJECTS } from "@/constants/profile";
import { CSS_VARS } from "@/constants/theme";

export default function ProjectsPage() {
  return (
    <PageContainer title="项目经历" subtitle="AI 产品实战：猹杀 & BBQ翻译" themeColor={CSS_VARS.themeCreations}>
      <div className="space-y-8">
        {PROJECTS.map((project, index) => (
          <article
            key={index}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden transition-all hover:border-[var(--section-color)] hover:-translate-y-1"
          >
            {/* Project Header */}
            <div className="p-6 pb-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[var(--section-color)] shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p className="text-sm text-[var(--section-color)] font-medium">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--section-color)] transition-colors"
                    >
                      <Github size={14} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {"link" in project && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:text-[var(--section-color)] transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>在线体验</span>
                    </a>
                  )}
                  {"videoLink" in project && project.videoLink && (
                    <a
                      href={project.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--section-color)] transition-colors"
                    >
                      <Video size={14} />
                      <span>演示视频</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)] mt-2 mb-4">
                <span className="inline-flex items-center gap-1">
                  <Users size={12} />
                  {project.team}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} />
                  {project.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Role */}
              <div className="mb-4">
                <span className="text-xs font-medium text-[var(--muted)]">
                  我的角色：
                </span>
                <span className="text-xs text-[var(--foreground)] ml-1">
                  {project.role}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[var(--card-border)]">
              {project.stats.map((stat, sIndex) => (
                <div
                  key={sIndex}
                  className="p-4 text-center border-r border-b border-[var(--card-border)] last:border-r-0 sm:[&:nth-child(4)]:border-r-0 sm:border-b-0"
                >
                  <div className="text-lg font-bold text-[var(--section-color)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="p-6 pt-4 border-t border-[var(--card-border)]">
              <h3 className="text-sm font-semibold mb-3">核心成果</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, hIndex) => (
                  <li
                    key={hIndex}
                    className="flex items-start gap-2 text-sm text-[var(--foreground)] leading-relaxed"
                  >
                    <Circle
                      size={5}
                      className="mt-2 shrink-0 fill-[var(--section-color)] text-[var(--section-color)]"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="px-6 pb-6">
              <h3 className="text-sm font-semibold mb-3">技术栈</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-[var(--tag-bg)] text-xs text-[var(--muted)] rounded-md border border-transparent hover:border-[var(--section-color)] hover:text-[var(--section-color)] transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
