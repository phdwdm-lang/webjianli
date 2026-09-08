import {
  BookOpenText,
  ExternalLink,
  type LucideIcon,
  PlayCircle,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { BrandIcon } from "@/components/BrandIcon";
import { useState, type ComponentType } from "react";
import DietDemo from "@/components/demos/DietDemo";
import WolfchaDemo from "@/components/demos/WolfchaDemo";
import BbqDemo from "@/components/demos/BbqDemo";
import UiCollectDemo from "@/components/demos/UiCollectDemo";

const PROJECT_DEMOS: Record<string, ComponentType> = {
  咣吃不胖: DietDemo,
  "猹杀 Wolfcha": WolfchaDemo,
  "BBQ Translator": BbqDemo,
  "Muse Folio": UiCollectDemo,
};

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
  logo?: string;
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
  const stats = project.stats.slice(0, 4);
  const Demo = PROJECT_DEMOS[project.name];
  const [logoHovered, setLogoHovered] = useState(false);

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
        label: "GitHub",
        icon: ExternalLink,
      }
    : null;

  const imageObjectPositionClass = project.name.includes("BBQ")
    ? "object-center md:object-[center_35%]"
    : "object-center";
  const imageSectionClass = [
    "relative min-h-[280px] overflow-hidden border-b border-[var(--card-border)] bg-[color-mix(in_oklab,var(--background)_92%,var(--foreground))] md:min-h-0 md:w-[55%] md:border-b-0 lg:w-[55%]",
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
        {Demo ? (
          <Demo />
        ) : coverImage ? (
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
      </div>

      <div
        className="card-right flex flex-1 flex-col justify-center gap-6 p-7 md:p-9 lg:p-10"
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2.5 sm:flex-nowrap sm:gap-3">
            {project.logo && (
              <img
                src={project.logo}
                alt=""
                className={`card-logo h-[70px] w-[70px] shrink-0 rounded-2xl ${project.name.includes("BBQ") ? "object-contain" : "object-cover"}`}
                style={{
                  transformOrigin: "center",
                  transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                  transform: logoHovered
                    ? "rotate(-6deg) scale(1.05)"
                    : "rotate(0deg) scale(1)",
                }}
              />
            )}
            <div className="relative inline-block">
              <span
                aria-hidden="true"
                className="card-title-bar pointer-events-none absolute inset-0 -z-10 rounded-lg bg-[color-mix(in_oklab,var(--section-color)_16%,transparent)]"
                style={{
                  transformOrigin: "left",
                  transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                  transform: logoHovered ? "scaleX(1)" : "scaleX(0)",
                }}
              />
              <h2 className="min-w-0 text-[53px] font-bold leading-none tracking-tight text-[var(--foreground)]">
                {project.name}
              </h2>
            </div>
          </div>

          <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--section-color)] md:mt-3 md:text-base">
            {project.subtitle}
          </p>

        </div>

        <div>
          <div className="my-4 grid grid-cols-2 gap-4 border-y border-[var(--card-border)] py-4 sm:grid-cols-4">
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
