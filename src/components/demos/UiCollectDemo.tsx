"use client";

import { useDemoPlayback } from "./useDemoPlayback";

// Muse Folio：三幕循环微演示 —— ①浏览器框选截图 → ②画布来源与一键跳转 → ③AI反向推理生成提示词
// 时间轴：5-30% 框选截图 · 32-58% 画布来源 · 60-92% AI提示词
export default function UiCollectDemo() {
  const { ref, stateClass } = useDemoPlayback<HTMLDivElement>();
  return (
    <div ref={ref} className={`demo-anim uc-root ${stateClass}`} aria-hidden="true">
      <div className="uc-app">
        {/* ============ 场景A · 浏览器框选截图 ============ */}
        <div className="uc-scene uc-scene-snip">
          <div className="uc-browser">
            <div className="uc-browser-bar">
              <span className="uc-brw-dot" />
              <span className="uc-brw-dot" />
              <span className="uc-brw-dot" />
              <span className="uc-brw-url">
                <i>🔒</i> muse-folio.com/explore
              </span>
            </div>
            <div className="uc-web">
              <div className="uc-web-count">发现页 · 今日灵感</div>
              <div className="uc-web-grid">
                <div className="uc-web-tile uc-web-tile-a">🐔</div>
                <div className="uc-web-tile uc-web-tile-b">🦝</div>
                <div className="uc-web-tile uc-web-tile-c">🔥</div>
                <div className="uc-web-tile uc-web-tile-d">🎨</div>
              </div>
              {/* 框选遮罩：选区外盖住，选区可见 */}
              <div className="uc-web-snip">
                <span className="uc-snip-c uc-snip-c1" />
                <span className="uc-snip-c uc-snip-c2" />
                <span className="uc-snip-c uc-snip-c3" />
                <span className="uc-snip-c uc-snip-c4" />
                <b>🐔</b>
              </div>
              <div className="uc-web-toolbar">
                <span className="uc-tb-ico">✎</span>
                <span className="uc-tb-ico">⧉</span>
                <span className="uc-tb-ico">⬒</span>
                <span className="uc-tb-ico uc-tb-add">＋</span>
              </div>
              <div className="uc-web-hint">框选网页元素 · 一键加入画布</div>
              <div className="uc-web-cursor" />
            </div>
          </div>
        </div>

        {/* ============ 场景B · 画布来源展示 + 一键跳转 ============ */}
        <div className="uc-scene uc-scene-board">
          <div className="uc-canvas">
            <div className="uc-canvas-grid" />
            <div className="uc-piece">
              <span className="uc-piece-tag">#3 · 2026-08-29 10:55</span>
              <div className="uc-piece-img">🐔</div>
              <span className="uc-piece-s uc-piece-s1" />
              <span className="uc-piece-s uc-piece-s2" />
              <span className="uc-piece-s uc-piece-s3" />
              <span className="uc-piece-s uc-piece-s4" />
            </div>
            <div className="uc-piece-toolbar">
              <span className="uc-pt-ico">⧉</span>
              <span className="uc-pt-ico">✎</span>
              <span className="uc-pt-ico uc-pt-del">🗑</span>
            </div>
          </div>
          <div className="uc-panel">
            <div className="uc-panel-top">
              <span className="uc-panel-prev">原图</span>
              <span className="uc-panel-trans">透明背景</span>
            </div>
            <div className="uc-panel-sec">
              <div className="uc-panel-label">平台与来源</div>
              <div className="uc-row">
                <span className="uc-row-k">平台</span>
                <span className="uc-row-v">小红书</span>
              </div>
              <div className="uc-row">
                <span className="uc-row-k">来源URL</span>
                <span className="uc-row-v">xiaohongshu.com/explore/6a8bbc65</span>
              </div>
            </div>
            <div className="uc-panel-go">跳转到来源 <i>↗</i></div>
          </div>
        </div>

        {/* ============ 场景C · AI反向推理：标题/标签/提示词 ============ */}
        <div className="uc-scene uc-scene-prompt">
          <div className="uc-canvas">
            <div className="uc-canvas-grid" />
            <div className="uc-piece">
              <span className="uc-piece-tag">#3</span>
              <div className="uc-piece-img uc-piece-img-big">🏙</div>
              <span className="uc-piece-s uc-piece-s1" />
              <span className="uc-piece-s uc-piece-s2" />
              <span className="uc-piece-s uc-piece-s3" />
              <span className="uc-piece-s uc-piece-s4" />
            </div>
          </div>
          <div className="uc-panel">
            <div className="uc-panel-label">风格信息</div>
            <div className="uc-panel-head">风格标题</div>
            <div className="uc-panel-title">都市午后淡彩拼贴</div>
            <div className="uc-panel-label">标签</div>
            <div className="uc-panel-tags">
              <span className="uc-chip-tag">清新淡彩</span>
              <span className="uc-chip-tag">都市风景</span>
              <span className="uc-chip-tag">扁平插画</span>
              <span className="uc-chip-tag">低饱和</span>
              <span className="uc-chip-tag uc-chip-add">＋</span>
            </div>
            <div className="uc-panel-label">提示词 <i>AI 反向推理</i></div>
            <div className="uc-panel-prompt">以「清新、低饱和」的淡彩插画风格为核心，结合真实摄影与扁平矢量插画的拼贴感。画面以明亮日光与天蓝色天空为基调，都市建筑与自然绿植交织，形成由近及远的层次感。整体配色轻柔，以浅蓝、米白、淡绿及红色点缀构成视觉焦点。</div>
            <div className="uc-prompt-actions">
              <span className="uc-pa-btn"><i>⧉</i> 复制提示词</span>
              <span className="uc-pa-edit">编辑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
