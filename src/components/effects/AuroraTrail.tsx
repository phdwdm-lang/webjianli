"use client";

import { useEffect, useRef, useCallback } from "react";

const AURORA_COLORS = [
  { r: 255, g: 184, b: 0 },
  { r: 72, g: 0, b: 255 },
  { r: 16, g: 185, b: 129 },
  { r: 56, g: 189, b: 248 },
  { r: 255, g: 100, b: 50 },
];

interface AuroraPoint {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  colorIndex: number;
  width: number;
}

export function AuroraTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<AuroraPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animRef = useRef(0);
  const dprRef = useRef(1);
  const timeRef = useRef(0);

  const addPoint = useCallback((x: number, y: number) => {
    const colorIndex = Math.floor(
      (timeRef.current * 0.3) % AURORA_COLORS.length
    );
    pointsRef.current.push({
      x,
      y,
      age: 0,
      maxAge: 80 + Math.random() * 40,
      colorIndex,
      width: 20 + Math.random() * 30,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const getCoords = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      mouseRef.current = { x, y, active: true };

      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        const steps = Math.min(Math.floor(dist / 3), 8);
        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          addPoint(lastX + dx * t, lastY + dy * t);
        }
        lastX = x;
        lastY = y;
      }
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const onClick = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30;
        const r = 10 + Math.random() * 30;
        addPoint(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("click", onClick);

    const animate = () => {
      timeRef.current++;
      const w = canvas.width / dprRef.current;
      const h = canvas.height / dprRef.current;
      ctx.clearRect(0, 0, w, h);

      const pts = pointsRef.current;

      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.age++;
        if (p.age >= p.maxAge) {
          pts.splice(i, 1);
          continue;
        }

        const progress = p.age / p.maxAge;
        const fadeIn = Math.min(p.age / 8, 1);
        const fadeOut = 1 - progress * progress;
        const alpha = fadeIn * fadeOut * 0.4;

        if (alpha < 0.005) continue;

        const c1 = AURORA_COLORS[p.colorIndex % AURORA_COLORS.length];
        const c2 = AURORA_COLORS[(p.colorIndex + 1) % AURORA_COLORS.length];
        const mix = (progress * 2) % 1;
        const r = Math.round(c1.r + (c2.r - c1.r) * mix);
        const g = Math.round(c1.g + (c2.g - c1.g) * mix);
        const b = Math.round(c1.b + (c2.b - c1.b) * mix);

        const currentWidth = p.width * (1 - progress * 0.6);

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentWidth
        );
        gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        gradient.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentWidth, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      if (pts.length > 1) {
        ctx.globalCompositeOperation = "lighter";
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          if (a.age > a.maxAge * 0.8 || b.age > b.maxAge * 0.8) continue;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 60) continue;

          const alphaA = (1 - a.age / a.maxAge) * 0.15;
          const alphaB = (1 - b.age / b.maxAge) * 0.15;
          const lineAlpha = Math.min(alphaA, alphaB);

          const c = AURORA_COLORS[a.colorIndex % AURORA_COLORS.length];

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${lineAlpha})`;
          ctx.lineWidth = 2 + (1 - a.age / a.maxAge) * 4;
          ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("click", onClick);
    };
  }, [addPoint]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
}
