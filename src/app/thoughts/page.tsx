import { Tag } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PaperPlaneTrail from "@/components/effects/PaperPlaneTrail";
import { THOUGHTS } from "@/constants/profile";
import { CSS_VARS } from "@/constants/theme";

export default function ThoughtsPage() {
  return (
    <PageContainer
      title="日常分享与思考"
      subtitle="产品思考、职业成长与复盘"
      themeColor={CSS_VARS.themeThoughts}
    >
      <div className="space-y-5">
        {THOUGHTS.map((thought, index) => (
          <article
            key={index}
            className="relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 transition-all hover:border-[var(--section-color)] hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs text-[var(--muted)] px-3 py-1 rounded-full"
                style={{
                  backgroundColor:
                    "color-mix(in oklab, var(--section-color) 10%, var(--tag-bg))",
                }}
              >
                {thought.date}
              </span>
            </div>
            <h2 className="text-base font-semibold mb-2">{thought.title}</h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
              {thought.summary}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {thought.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[var(--section-color)] rounded-md border border-transparent hover:border-[var(--section-color)] transition-colors"
                  style={{
                    backgroundColor:
                      "color-mix(in oklab, var(--section-color) 8%, var(--tag-bg))",
                  }}
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}

        {/* Placeholder */}
        <div className="text-center py-8 text-sm text-[var(--muted-light)]">
          更多内容持续更新中...
        </div>
      </div>
    </PageContainer>
  );
}
