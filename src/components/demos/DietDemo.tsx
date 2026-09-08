"use client";

import { useDemoPlayback } from "./useDemoPlayback";

// 智能饮食管理平台：拍摄餐桌 → 扫描识别 → 逐步生成分析报告（评价/指标/排行）
export default function DietDemo() {
  const { ref, stateClass } = useDemoPlayback<HTMLDivElement>();
  return (
    <div ref={ref} className={`demo-anim dt-root ${stateClass}`} aria-hidden="true" style={{ backgroundColor: "#f2f8f4" }}>
      {/* 左：真实餐桌照 + 扫描线 + 识别 chips */}
      <div className="dt-photo">
        <img className="dt-table" src="/diet/table.webp" alt="" />
        <span className="dt-photo-label">拍摄餐盘</span>
        <div className="dt-scan" />
        <div className="dt-chips">
          <span className="dt-chip dt-chip1">米饭 · 218 kcal</span>
          <span className="dt-chip dt-chip2">南瓜 · 96 kcal</span>
          <span className="dt-chip dt-chip3">红烧肉 · 320 kcal</span>
        </div>
      </div>

      {/* 右：逐步分析产物 —— 由顶到底依次展示 */}
      <div className="dt-result">
        <div className="dt-step dt-step-eval">
          <img className="dt-step-img" src="/diet/step-eval.webp" alt="整体评价" />
        </div>
        <div className="dt-step dt-step-metrics">
          <img className="dt-step-img" src="/diet/step-metrics.webp" alt="营养指标" />
        </div>
        <div className="dt-step dt-step-ranking">
          <img className="dt-step-img" src="/diet/step-ranking.webp" alt="热量排行" />
        </div>
        <span className="dt-points">积分 +1</span>
      </div>
    </div>
  );
}
