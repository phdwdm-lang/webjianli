import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { highlightData } from "@/utils/highlightData";
import type { Skill } from "@/constants/skills";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const hasCover = Boolean(skill.coverImage);
  const cardClassName = [
    "group relative isolate flex flex-col rounded-[30px] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[0_4px_6px_-1px_color-mix(in_oklab,var(--foreground)_5%,transparent)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--section-color)_30%,var(--card-border))] hover:shadow-[0_20px_25px_-5px_color-mix(in_oklab,var(--foreground)_5%,transparent),0_10px_30px_-10px_color-mix(in_oklab,var(--section-color)_18%,transparent)]",
    hasCover ? "overflow-hidden" : "p-7 md:p-8",
    skill.github ? "cursor-pointer no-underline" : "",
  ].join(" ");

  // 整卡氛围光晕：铺满卡片，置于内容之下，营造被主题色点亮的整体氛围
  const ambientGlow = (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* 从卡片底部向两边弥散的主题色柔光，覆盖整张卡片 */}
      <div className="absolute inset-x-0 bottom-0 h-[85%] bg-[radial-gradient(120%_85%_at_50%_100%,color-mix(in_oklab,var(--section-color)_12%,transparent),transparent_72%)]" />
      {/* 左上淡光斑，增加层次、打破纯白 */}
      <div className="absolute -left-1/4 -top-1/3 h-2/3 w-3/4 rotate-12 bg-[radial-gradient(60%_60%_at_45%_45%,color-mix(in_oklab,var(--section-color)_6%,transparent),transparent_70%)]" />
    </div>
  );

  const content = (
    <>
      {hasCover ? (
        <>
          <div className="flex items-start justify-between gap-4 px-6 pb-1 pt-6 md:px-7 md:pt-7">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-[var(--foreground)]">
                {skill.name}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">
                {skill.tagline}
              </p>
            </div>
          </div>

          {skill.coverImage && (
            <div className="relative z-10 mt-4 aspect-[1.55] w-full">
              <Image
                src={skill.coverImage.src}
                alt={skill.coverImage.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="relative z-10 mb-3 flex flex-wrap items-center gap-2.5">
            <h2 className="text-2xl font-bold leading-none tracking-tight text-[var(--foreground)]">
              {skill.name}
            </h2>
            <span className="inline-flex items-center rounded-md bg-[var(--tag-bg)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
              {skill.tagline}
            </span>
          </div>

          <p className="relative z-10 mb-4 text-sm leading-relaxed text-[var(--foreground)]">
            {highlightData(skill.description)}
          </p>

          <div className="relative z-10 mb-5 space-y-2">
            {skill.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-2 text-sm leading-relaxed text-[var(--muted)]"
              >
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--section-color)]"
                />
                <span className="min-w-0 flex-1">{highlightData(highlight)}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-auto">
            <div className="mb-4 flex flex-wrap gap-2 border-t border-[var(--card-border)] pt-5">
              {skill.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-transparent bg-[color-mix(in_oklab,var(--section-color)_6%,transparent)] px-3 py-1.5 text-xs font-semibold tracking-[0.01em] text-[var(--section-color)] transition-all duration-300 hover:border-[color-mix(in_oklab,var(--section-color)_20%,transparent)] hover:bg-[color-mix(in_oklab,var(--section-color)_10%,transparent)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {skill.scenarios.map((scenario) => (
                  <span
                    key={scenario}
                    className="rounded-full border border-[var(--card-border)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
                  >
                    {scenario}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

  if (skill.github) {
    return (
      <a
        href={skill.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={"在 GitHub 查看 " + skill.name}
        className={cardClassName}
      >
        {ambientGlow}
        {content}
      </a>
    );
  }

  return (
    <article className={cardClassName}>
      {ambientGlow}
      {content}
    </article>
  );
}
