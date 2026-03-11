"use client";

import { useEffect, useRef } from "react";

// ─── 类型 ───────────────────────────────────────────────────────────────────
interface Vec2 { x: number; y: number; }

interface TrailPoint {
  x: number;
  y: number;
  /** 0-1，越旧越小 */
  alpha: number;
}

interface PlaneState {
  p0: Vec2;
  p1: Vec2;
  p2: Vec2;
  p3: Vec2;
  /** 进度 0→1 */
  t: number;
  /** 飞行速度（每帧 t 增量） */
  speed: number;
  /** 当前位置 */
  pos: Vec2;
  /** 当前朝向角（rad） */
  angle: number;
  /** 缩放 */
  scale: number;
  /** 轨迹点列表 */
  trail: TrailPoint[];
  /** 透明度（淡入淡出） */
  alpha: number;
  /** flying = 正在飞行, fading = 飞机到终点但轨迹仍在消失, done = 完全结束 */
  state: "flying" | "fading" | "done";
}

// ─── 工具函数 ────────────────────────────────────────────────────────────────

/** 三次贝塞尔求点 */
function cubicBezier(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

/** 三次贝塞尔切线方向 */
function cubicBezierTangent(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
  const mt = 1 - t;
  return {
    x: 3 * mt ** 2 * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t ** 2 * (p3.x - p2.x),
    y: 3 * mt ** 2 * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t ** 2 * (p3.y - p2.y),
  };
}

/** 生成一架新飞机 */
function spawnPlane(w: number, h: number): PlaneState {
  const goRight = Math.random() > 0.5;

  const p0: Vec2 = {
    x: goRight ? -30 : w + 30,
    y: h * (0.1 + Math.random() * 0.8),
  };
  const p3: Vec2 = {
    x: goRight ? w + 30 : -30,
    y: h * (0.1 + Math.random() * 0.8),
  };

  const xSpan = Math.abs(p3.x - p0.x);
  const p1: Vec2 = {
    x: p0.x + (goRight ? 1 : -1) * xSpan * (0.2 + Math.random() * 0.15),
    y: p0.y + (Math.random() - 0.5) * h * 0.7,
  };
  const p2: Vec2 = {
    x: p3.x + (goRight ? -1 : 1) * xSpan * (0.2 + Math.random() * 0.15),
    y: p3.y + (Math.random() - 0.5) * h * 0.7,
  };

  const initialPos = cubicBezier(p0, p1, p2, p3, 0);
  const initialTan = cubicBezierTangent(p0, p1, p2, p3, 0);

  return {
    p0, p1, p2, p3,
    t: 0,
    speed: 0.00013 + Math.random() * 0.00009,
    pos: initialPos,
    angle: Math.atan2(initialTan.y, initialTan.x),
    scale: 0.7 + Math.random() * 0.5,
    trail: [],
    alpha: 0,
    state: "flying",
  };
}

// ─── 绘制纸飞机 ──────────────────────────────────────────────────────────────
function drawPlane(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  scale: number,
  alpha: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(-scale, scale);
  ctx.globalAlpha = alpha;

  // 机翼主体
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(16, -9);
  ctx.lineTo(8, 0);
  ctx.lineTo(16, 9);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fill();

  // 机身折叠高亮
  ctx.beginPath();
  ctx.moveTo(8, 0);
  ctx.lineTo(16, -9);
  ctx.lineTo(2, 4);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fill();

  // 中缝折线
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(2, 4);
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

// ─── 绘制虚线轨迹（整段曲线一次性绘制，带渐隐） ────────────────────────────
function drawTrail(ctx: CanvasRenderingContext2D, trail: TrailPoint[]) {
  if (trail.length < 2) return;

  // 过滤掉 alpha 为 0 的点
  const visible = trail.filter(p => p.alpha > 0);
  if (visible.length < 2) return;

  // 分段绘制，每段用该段中间的 alpha，实现从头部到尾部的渐隐
  ctx.save();
  ctx.lineWidth = 1.2;
  ctx.setLineDash([6, 5]);

  for (let i = 1; i < visible.length; i++) {
    const a = visible[i - 1];
    const b = visible[i];
    const segAlpha = (a.alpha + b.alpha) / 2;
    if (segAlpha <= 0.01) continue;

    ctx.globalAlpha = segAlpha * 0.65;
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────
interface PaperPlaneTrailProps {
  /** 同时活跃的最大飞机数，默认 2 */
  count?: number;
  /** 是否激活（鼠标悬浮时为 true） */
  active?: boolean;
}

export default function PaperPlaneTrail({ count = 2, active = false }: PaperPlaneTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    planes: PlaneState[];
    rafId: number;
    lastSpawn: number;
    active: boolean;
  }>({
    planes: [],
    rafId: 0,
    lastSpawn: 0,
    active: false,
  });

  // 同步 active 到 ref，不触发重渲染
  useEffect(() => {
    stateRef.current.active = active;
    if (active && stateRef.current.planes.filter(p => p.state === "flying").length === 0) {
      const canvas = canvasRef.current;
      if (canvas) {
        stateRef.current.planes.push(spawnPlane(canvas.width, canvas.height));
        stateRef.current.planes.push(spawnPlane(canvas.width, canvas.height));
        stateRef.current.lastSpawn = performance.now();
      }
    }
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // 轨迹保留更多点，衰减极慢，让尾迹很长
    const TRAIL_MAX = 220;
    const TRAIL_DECAY = 0.003;
    const TRAIL_DECAY_FADING = 0.008; // fading 阶段加速消失
    const FADE_SPEED = 0.04;
    const SPAWN_INTERVAL = 800;

    const state = stateRef.current;

    // 立即生成两架
    state.planes.push(spawnPlane(canvas.width, canvas.height));
    state.planes.push(spawnPlane(canvas.width, canvas.height));
    state.lastSpawn = performance.now();

    let lastTime = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // 仅在 active 时补充新飞机
      if (state.active) {
        const activePlanes = state.planes.filter(p => p.state === "flying");
        if (activePlanes.length < count && now - state.lastSpawn > SPAWN_INTERVAL) {
          state.planes.push(spawnPlane(w, h));
          state.lastSpawn = now;
        }
      }

      // 清理完全消失的飞机
      state.planes = state.planes.filter(p => p.state !== "done");

      for (const plane of state.planes) {
        if (plane.state === "flying") {
          // 更新进度
          plane.t = Math.min(plane.t + plane.speed * dt, 1);

          // 淡入淡出
          if (plane.t < 0.06) {
            plane.alpha = Math.min(plane.alpha + FADE_SPEED, plane.t / 0.06);
          } else if (plane.t > 0.90) {
            plane.alpha = Math.max(0, (1 - plane.t) / 0.10);
          } else {
            plane.alpha = Math.min(plane.alpha + FADE_SPEED, 1);
          }

          // 位置 & 朝向
          const pos = cubicBezier(plane.p0, plane.p1, plane.p2, plane.p3, plane.t);
          const tan = cubicBezierTangent(plane.p0, plane.p1, plane.p2, plane.p3, plane.t);
          plane.pos = pos;
          plane.angle = Math.atan2(tan.y, tan.x);

          // 记录轨迹点
          plane.trail.push({ x: pos.x, y: pos.y, alpha: plane.alpha });
          if (plane.trail.length > TRAIL_MAX) plane.trail.shift();

          // 衰减旧轨迹点 alpha
          for (let i = 0; i < plane.trail.length - 1; i++) {
            plane.trail[i].alpha = Math.max(0, plane.trail[i].alpha - TRAIL_DECAY);
          }

          // 绘制
          drawTrail(ctx, plane.trail);
          drawPlane(ctx, pos.x, pos.y, plane.angle, plane.scale, plane.alpha);

          // 飞机到终点 → 进入 fading，轨迹继续渐消
          if (plane.t >= 1 && plane.alpha <= 0.01) {
            plane.state = "fading";
          }
        } else if (plane.state === "fading") {
          // 不再移动飞机，只衰减轨迹
          for (const pt of plane.trail) {
            pt.alpha = Math.max(0, pt.alpha - TRAIL_DECAY_FADING);
          }
          drawTrail(ctx, plane.trail);
          // 所有轨迹点消失后标记 done
          if (plane.trail.every(pt => pt.alpha <= 0.005)) {
            plane.state = "done";
          }
        }
      }

      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.rafId);
      ro.disconnect();
      state.planes = [];
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
      aria-hidden="true"
    />
  );
}
