import { GraduationCap, Building2, Circle } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { EDUCATION, WORK_EXPERIENCE } from "@/constants/profile";
import { CSS_VARS } from "@/constants/theme";

const TIMELINE_ITEMS = [
  ...WORK_EXPERIENCE.map((w) => ({
    type: "work" as const,
    title: w.company,
    subtitle: w.role,
    period: w.period,
    description: w.description,
    highlights: w.highlights,
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
  return (
    <PageContainer title="学习与工作" subtitle="教育背景与工作经历时间线" themeColor={CSS_VARS.themeJourney}>
      <div className="relative">
        {/* Timeline Line — blended with section color */}
        <div
          className="absolute left-[19px] top-2 bottom-2 w-px"
          style={{
            backgroundColor:
              "color-mix(in oklab, var(--section-color) 30%, var(--timeline-line))",
          }}
        />

        <div className="space-y-8">
          {TIMELINE_ITEMS.map((item, index) => (
            <div key={index} className="relative pl-12">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-1 z-10">
                <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] border-2 border-[var(--section-color)] flex items-center justify-center">
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

              {/* Content Card */}
              <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 transition-all hover:border-[var(--section-color)] hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-sm text-[var(--section-color)] font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                  <span
                    className="text-xs text-[var(--muted)] px-3 py-1 rounded-full whitespace-nowrap self-start"
                    style={{
                      backgroundColor:
                        "color-mix(in oklab, var(--section-color) 10%, var(--tag-bg))",
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                {item.description && (
                  <p className="text-sm text-[var(--muted)] mb-3">
                    {item.description}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {item.highlights.map((highlight, hIndex) => (
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
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
