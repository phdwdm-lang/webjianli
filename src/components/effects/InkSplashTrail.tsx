"use client";

import { useEffect, useRef, useCallback } from "react";

const INK_COLORS = [
  { r: 255, g: 184, b: 0 },
  { r: 72, g: 0, b: 255 },
  { r: 16, g: 185, b: 129 },
  { r: 56, g: 189, b: 248 },
  { r: 220, g: 50, b: 120 },
];

interface InkDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: { r: number; g: number; b: number };
  life: number;
  maxLife: number;
  type: "drop" | "splash";
  angle?: number;
  speed?: number;
}

export function InkSplashTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<InkDrop[]>([]);
  const prevRef = useRef({ x: 0, y: 0, init: false });
  const animRef = useRef(0);
  const dprRef = useRef(1);
  const colorIndexRef = useRef(0);

  const addDrop = useCallback((x: number, y: number, isSplash: boolean) => {
    if (isSplash) {
      const count = 15 + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        const c = INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)];
        dropsRef.current.push({
          x,
          y,
          radius: 0,
          maxRadius: 3 + Math.random() * 5,
          color: c,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          type: "splash",
          angle,
          speed,
        });
      }
      const c = INK_COLORS[colorIndexRef.current % INK_COLORS.length];
      dropsRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 60 + Math.random() * 40,
        color: c,
        life: 0,
        maxLife: 80 + Math.random() * 40,
        type: "drop",
      });
      colorIndexRef.current++;
    } else {
      const c = INK_COLORS[colorIndexRef.current % INK_COLORS.length];
      dropsRef.current.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        radius: 0,
        maxRadius: 15 + Math.random() * 20,
        color: c,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        type: "drop",
      });
      colorIndexRef.current++;
    }
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

    const onMove = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      if (!prevRef.current.init) {
        prevRef.current = { x, y, init: true };
        return;
      }
      const dx = x - prevRef.current.x;
      const dy = y - prevRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 12) {
        addDrop(x, y, false);
        prevRef.current = { x, y, init: true };
      }
    };

    const onClick = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      addDrop(x, y, true);
    };

    const onLeave = () => {
      prevRef.current.init = false;
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);

    const animate = () => {
      const w = canvas.width / dprRef.current;
      const h = canvas.height / dprRef.current;
      ctx.clearRect(0, 0, w, h);

      const drops = dropsRef.current;

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.life++;

        if (d.life >= d.maxLife) {
          drops.splice(i, 1);
          continue;
        }

        const progress = d.life / d.maxLife;

        if (d.type === "splash" && d.angle !== undefined && d.speed !== undefined) {
          d.x += Math.cos(d.angle) * d.speed;
          d.y += Math.sin(d.angle) * d.speed;
          d.speed *= 0.94;

          const fadeOut = 1 - progress * progress;
          const alpha = fadeOut * 0.6;
          const sz = d.maxRadius * (1 - progress * 0.3);

          ctx.beginPath();
          ctx.arc(d.x, d.y, sz, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${d.color.r},${d.color.g},${d.color.b},${alpha})`;
          ctx.fill();
        } else {
          const expandProgress = Math.min(d.life / 15, 1);
          const easeOut = 1 - Math.pow(1 - expandProgress, 3);
          d.radius = d.maxRadius * easeOut;

          const fadeOut = 1 - progress * progress;
          const alpha = fadeOut * 0.25;

          const gradient = ctx.createRadialGradient(
            d.x, d.y, 0,
            d.x, d.y, d.radius
          );
          gradient.addColorStop(0, `rgba(${d.color.r},${d.color.g},${d.color.b},${alpha * 1.5})`);
          gradient.addColorStop(0.3, `rgba(${d.color.r},${d.color.g},${d.color.b},${alpha})`);
          gradient.addColorStop(0.7, `rgba(${d.color.r},${d.color.g},${d.color.b},${alpha * 0.5})`);
          gradient.addColorStop(1, `rgba(${d.color.r},${d.color.g},${d.color.b},0)`);

          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          if (expandProgress < 1) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${d.color.r},${d.color.g},${d.color.b},${alpha * 2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [addDrop]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
}
