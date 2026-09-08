'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import KoiPond from '@/components/KoiPond/KoiPond';
import RippleDistortion from '@/components/RippleDistortion';
import DuckCursor from '@/app/koi-demo/DuckCursor';

/**
 * KoiBackdrop — 锦鲤主题（koi）的全站背景层。
 *
 * 仅在 resolvedTheme === 'koi' 时在内部渲染鱼池/鸭子；其余主题 canvas 不挂载（卸载即释放 GPU/CPU）。
 * 背景统一铺在 zIndex:-1 且 pointerEvents:none 的 fixed 层：
 *  - KoiPond 的水彩鱼池 + RippleDistortion 的涟漪折射（二者都监听 window 全局事件，不依赖被覆盖）
 *  - DuckCursor 把系统光标换成鸭子（配合 globals.css 里 html.koi 的 cursor:none）
 *
 * 内容层（SideNav / MobileNav / 路由内容）均在此层之上，互不干扰。
 *
 * 兼容 SSR/水合：外层 fixed 容器始终渲染（SSR 与客户端结构一致），避免 next-themes 的
 * resolvedTheme（服务端为 undefined）导致的条件渲染引发 hydration mismatch；
 * 真实内容用 mounted 门控，等客户端挂载后再插入。
 */
export function KoiBackdrop() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isKoi = resolvedTheme === 'koi';
  const koiRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => setMounted(true), []);

  // 兜底：koi 时确保 html 挂上 .koi class（next-themes 已管理，这里保证 cursor:none 生效/清理）
  useEffect(() => {
    const el = document.documentElement;
    if (isKoi) {
      el.classList.add('koi');
    } else {
      el.classList.remove('koi');
    }
  }, [isKoi]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {mounted && isKoi && (
        <>
          <KoiPond
            canvasRef={koiRef}
            className="koi-backdrop-canvas"
            style={{ width: '100%', height: '100%' }}
          />
          <RippleDistortion
            sourceRef={koiRef}
            src=""
            brushSize={40}
            strength={0.01}
            swirl={0.65}
            rings={3}
            grayscale={false}
            spread={10}
            dispersion={0.2}
            glint={0.2}
            tint="#bbfffa"
            tintAmount={0.15}
            trigger="both"
            quality="high"
            style={{ position: 'absolute', inset: 0, zIndex: 2 }}
          />
          <DuckCursor />
        </>
      )}
    </div>
  );
}
