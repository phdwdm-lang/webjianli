"use client";

import { useDemoPlayback } from "./useDemoPlayback";

// BBQ Translator：三段式产品流程动画 —— 漫画页 → 配置弹窗自动翻译 → 编辑器微调
// 时间轴：0-4% 封面 · 6-22% 漫画页 · 24-40% 配置弹窗 · 42-58% 自动翻译 · 62-92% 编辑器 · 94-100% 收尾
export default function BbqDemo() {
  const { ref, stateClass } = useDemoPlayback<HTMLDivElement>();
  return (
    <div ref={ref} className={`demo-anim bq-root ${stateClass}`} aria-hidden="true">
      {/* 模拟应用窗口 */}
      <div className="bq-app">
        {/* ============ 场景A · 未翻译漫画页 ============ */}
        <div className="bq-scene bq-scene-comic">
          <div className="bq-comic-title">日文[Knoe][]哆啦A梦大全集]第03卷[1]</div>
          <div className="bq-comic-img">
            <img src="/BBQ-translator/comic.webp" alt="" className="bq-comic-img-el" />
          </div>
          <div className="bq-comic-badge">未翻译 · 1 页</div>
        </div>

        {/* ============ 场景B · 配置弹窗 ============ */}
        <div className="bq-scene bq-scene-config">
          <div className="bq-modal">
            <div className="bq-modal-head">
              <span className="bq-modal-title">开始翻译</span>
              <span className="bq-modal-x">×</span>
            </div>
            <div className="bq-modal-body">
              <div className="bq-modal-sec-label">已选文件</div>
              <div className="bq-file-row">
                <span className="bq-file-ico">画</span>
                <span className="bq-file-info">
                  <b>日文[Knoe][]哆啦A梦大全集]第03卷[1]</b>
                  <i>310 张图片</i>
                </span>
              </div>
              <div className="bq-lang-row">
                <div className="bq-lang">
                  <span className="bq-lang-label">源语言</span>
                  <span className="bq-lang-val">自动检测 <i>⌄</i></span>
                </div>
                <div className="bq-lang">
                  <span className="bq-lang-label">目标语言</span>
                  <span className="bq-lang-val">简体中文 <i>⌄</i></span>
                </div>
              </div>
              <div className="bq-adv">
                <div className="bq-adv-head"><span className="bq-adv-ico">⚙</span> 高级选项 <i>⌄</i></div>
                <div className="bq-adv-grid">
                  <div className="bq-opt"><span>检测分辨率</span><b>1536 ⌄</b></div>
                  <div className="bq-opt"><span>修复尺寸</span><b>2048 ⌄</b></div>
                  <div className="bq-opt"><span>文本检测器</span><b>default ⌄</b></div>
                  <div className="bq-opt"><span>翻译器</span><b>deepseek ⌄</b></div>
                  <div className="bq-opt"><span>修复器</span><b>lama_mpe ⌄</b></div>
                  <div className="bq-opt"><span>OCR</span><b>Auto (推荐) ⌄</b></div>
                </div>
              </div>
            </div>
            <div className="bq-modal-actions">
              <button className="bq-btn bq-btn-primary">自动翻译 <i>直接生成结果</i></button>
              <button className="bq-btn bq-btn-ghost">我自己来 <i>进入编辑器微调</i></button>
            </div>
          </div>
        </div>

        {/* ============ 场景C · 翻译编辑器 ============ */}
        <div className="bq-scene bq-scene-editor">
          <div className="bq-editor-left">
            <div className="bq-editor-toolbar">
              <span className="bq-tool bq-tool-active">✂</span>
              <span className="bq-tool">🖌</span>
              <span className="bq-tool">🔍</span>
              <span className="bq-tool">＋</span>
              <span className="bq-tool">−</span>
              <span className="bq-tool">１/１</span>
            </div>
            <div className="bq-editor-canvas">
              <img src="/BBQ-translator/comic.webp" alt="" className="bq-editor-canvas-el" />
              <div className="bq-txt bq-txt1"><span className="bq-num">文本框1</span><span className="bq-zh">今晚我要刀 4 号</span></div>
              <div className="bq-txt bq-txt2"><span className="bq-num">文本框2</span><span className="bq-zh">啊咧， 是你……？</span></div>
              <div className="bq-txt bq-txt3"><span className="bq-num">文本框3</span><span className="bq-zh">太好了， 我想起来了</span></div>
              <div className="bq-txt bq-txt4"><span className="bq-num">文本框4</span><span className="bq-zh">呜哇你这混蛋， 搞什么偷袭</span></div>
              <div className="bq-txt bq-txt5"><span className="bq-num">文本框5</span><span className="bq-zh">姐姐我， 也很忙哦？</span></div>
              <div className="bq-txt bq-txt6"><span className="bq-num">文本框6</span><span className="bq-zh">我…… 我会努力的！( ? )</span></div>
            </div>
          </div>
          <div className="bq-editor-right">
            <div className="bq-edit-panels">
              <span className="bq-edit-tab bq-edit-tab-active">文本编辑</span>
              <span className="bq-edit-tab">全局设置</span>
            </div>
            <div className="bq-edit-box">
              <div className="bq-edit-box-title"><span className="bq-edit-box-tag">文本框 6</span></div>
              <div className="bq-edit-field">
                <span className="bq-edit-label">原文 <i>重新识别</i></span>
                <span className="bq-edit-val bq-edit-src">えっ……、いや今の…… 努力します！( ? )</span>
              </div>
              <div className="bq-edit-field">
                <span className="bq-edit-label">译文 <i>重新翻译</i></span>
                <span className="bq-edit-val bq-edit-dst">我…… 我会努力的！( ? )</span>
              </div>
              <div className="bq-edit-style">
                <span className="bq-edit-style-head">样式设置 <i>重置样式</i></span>
                <div className="bq-style-row"><span className="bq-style-label">字体</span><span className="bq-style-val">无衬线 <i>25</i> <i>-</i></span></div>
                <div className="bq-style-row"><span className="bq-style-label">文字颜色</span><span className="bq-color-swatches"><i className="sw sw1" /><i className="sw sw2" /><i className="sw sw3" /><i className="sw sw4" /><i className="sw sw5" /></span></div>
                <div className="bq-style-row"><span className="bq-style-label">描边效果</span><span className="bq-style-val">描边色 <i>2</i> 粗 <i>px</i></span></div>
                <div className="bq-style-row"><span className="bq-style-label">文字方向</span><span className="bq-style-pills"><i className="bq-dir">⇄ 横排</i><i className="bq-dir bq-dir-active">⇅ 竖排</i></span></div>
                <div className="bq-style-row"><span className="bq-style-label">行距</span><span className="bq-slider"><i className="bq-sl" /><b>1.0</b></span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 封面过渡层 */}
        <div className="bq-scene bq-scene-cover">
          <img src="/BBQ-translator/cover.webp" alt="" className="bq-cover-logo" />
        </div>
      </div>

      {/* 右侧 pipeline 步骤条 */}
      <div className="bq-rail">
        {["导入", "检测", "翻译", "修复", "编辑"].map((step, i) => (
          <div key={step} className={`bq-step bq-step${i + 1}`}>
            <i />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
