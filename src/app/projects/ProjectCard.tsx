import {
  BookOpenText,
  CheckCircle2,
  ExternalLink,
  type LucideIcon,
  PlayCircle,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { BrandIcon } from "@/components/BrandIcon";
import { highlightData } from "@/utils/highlightData";

type ProjectImage = {
  src: string;
  alt: string;
};

type Project = {
  name: string;
  subtitle: string;
  team: string;
  period: string;
  description: string;
  role: string;
  github?: string;
  link?: string;
  resourceLink?: string;
  resourceLabel?: string;
  videoLink?: string;
  stats: readonly { label: string; value: string }[];
  highlights: readonly string[];
  techStack: readonly string[];
  images?: readonly ProjectImage[];
  coverImage?: ProjectImage;
};

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

type Action = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export default function ProjectCard({
  project,
  reverse = false,
}: ProjectCardProps) {
  const coverImage = project.coverImage ?? project.images?.[0];
  const highlights = project.highlights.slice(0, 2);
  const techStack = project.techStack.slice(0, 4);
  const stats = project.stats.slice(0, 4);
  const TeamIcon = project.team.includes("独立") ? User : Users;

  const primaryAction: Action | null = project.link
    ? {
        href: project.link,
        label: "在线体验",
        icon: ExternalLink,
      }
    : project.resourceLink
      ? {
          href: project.resourceLink,
          label: project.resourceLabel ?? "相关介绍",
          icon: BookOpenText,
        }
    : project.videoLink
      ? {
          href: project.videoLink,
          label: "演示视频",
          icon: PlayCircle,
        }
      : null;

  const githubAction: Action | null = project.github
    ? {
        href: project.github,
        label: "GitHub 代码",
        icon: ExternalLink,
      }
    : null;

  const badgePositionClass = reverse
    ? "left-4 md:left-auto md:right-4"
    : "left-4";
  const imageObjectPositionClass = project.name.includes("BBQ")
    ? "object-center md:object-[center_35%]"
    : "object-center";
  const imageSectionClass = [
    "relative min-h-[280px] overflow-hidden border-b border-[var(--card-border)] bg-[color-mix(in_oklab,var(--background)_92%,var(--foreground))] md:min-h-0 md:w-[44%] md:border-b-0 lg:w-[45%]",
    reverse
      ? "md:border-l md:border-l-[var(--card-border)]"
      : "md:border-r md:border-r-[var(--card-border)]",
  ].join(" ");

  return (
    <article
      className={[
        "group mx-auto flex w-full max-w-[1280px] flex-col overflow-hidden rounded-[30px] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[0_4px_6px_-1px_color-mix(in_oklab,var(--foreground)_5%,transparent),0_2px_4px_-1px_color-mix(in_oklab,var(--foreground)_3%,transparent)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--section-color)_30%,var(--card-border))] hover:shadow-[0_20px_25px_-5px_color-mix(in_oklab,var(--foreground)_5%,transparent),0_10px_30px_-10px_color-mix(in_oklab,var(--section-color)_18%,transparent)] md:min-h-[430px]",
        reverse ? "md:flex-row-reverse" : "md:flex-row",
      ].join(" ")}
    >
      <div className={imageSectionClass}>
        {coverImage ? (
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className={`object-cover ${imageObjectPositionClass} transition-transform duration-700 ease-out group-hover:scale-105`}
          />
        ) : (
          <div className="flex h-full min-h-[260px] items-center justify-center bg-[color-mix(in_oklab,var(--section-color)_6%,var(--background))] p-6 text-center text-sm text-[var(--muted)]">
            暂无封面图
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        <span
          className={`absolute top-4 ${badgePositionClass} rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-bold tracking-[0.01em] text-[var(--section-color)] shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[color-mix(in_oklab,var(--card-bg)_88%,transparent)]`}
        >
          {project.period}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-7 md:p-9 lg:p-10">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2.5 sm:flex-nowrap sm:gap-3">
            <h2 className="min-w-0 text-[2.05rem] font-bold leading-none tracking-tight text-[var(--foreground)]">
              {project.name}
            </h2>
            <div className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[var(--tag-bg)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
              <TeamIcon size={12} />
              <span>{project.team}</span>
            </div>
          </div>

          <p className="mb-4 text-sm font-medium text-[var(--section-color)] md:text-base">
            {project.subtitle}
          </p>

          <p className="mb-4 text-sm leading-relaxed text-[var(--foreground)]">
            {highlightData(project.description)}
          </p>

          <div className="mb-5 space-y-2">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-2 text-sm leading-relaxed text-[var(--muted)]"
              >
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--section-color)]"
                />
                <span className="min-w-0 flex-1">
                  {highlightData(highlight)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="my-5 grid grid-cols-2 gap-4 border-y border-[var(--card-border)] py-5 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-xl font-extrabold leading-tight text-[var(--section-color)]">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs text-[var(--muted)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-transparent bg-[color-mix(in_oklab,var(--section-color)_6%,transparent)] px-3 py-1.5 text-xs font-semibold tracking-[0.01em] text-[var(--section-color)] transition-all duration-300 hover:border-[color-mix(in_oklab,var(--section-color)_20%,transparent)] hover:bg-[color-mix(in_oklab,var(--section-color)_10%,transparent)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {(primaryAction || githubAction) && (
            <div className="flex flex-wrap items-center gap-3">
              {primaryAction && (
                <a
                  href={primaryAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-[var(--section-color)] bg-[var(--section-color)] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-[color-mix(in_oklab,var(--section-color)_85%,#000)] hover:bg-[color-mix(in_oklab,var(--section-color)_85%,#000)] hover:shadow-[0_4px_12px_color-mix(in_oklab,var(--section-color)_20%,transparent)]"
                >
                  <primaryAction.icon size={16} />
                  <span>{primaryAction.label}</span>
                </a>
              )}

              {githubAction && (
                <a
                  href={githubAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all duration-300 hover:border-[var(--section-color)] hover:bg-[color-mix(in_oklab,var(--section-color)_2%,var(--card-bg))] hover:text-[var(--section-color)] hover:shadow-[0_4px_12px_color-mix(in_oklab,var(--section-color)_8%,transparent)]"
                >
                  <BrandIcon name="Github" size={16} title="GitHub" />
                  <span>{githubAction.label}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
