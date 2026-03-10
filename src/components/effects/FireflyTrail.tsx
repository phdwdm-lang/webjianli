"use client";

import { useEffect, useRef } from "react";

const FIREFLY_COLORS = [
  { r: 255, g: 220, b: 50 },
  { r: 100, g: 255, b: 180 },
  { r: 80, g: 180, b: 255 },
  { r: 255, g: 140, b: 50 },
  { r: 200, g: 100, b: 255 },
];

const MAX_FIREFLIES = 60;
const ATTRACT_RADIUS = 200;
const ATTRACT_FORCE = 0.08;

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: { r: number; g: number; b: number };
  size: number;
  pulse: number;
  pulseSpeed: number;
  trail: { x: number; y: number; alpha: number }[];
  life: number;
  maxLife: number;
}

export function FireflyTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firefliesRef = useRef<Firefly[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animRef = useRef(0);
  const dprRef = useRef(1);

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

    const spawnFirefly = (nearX: number, nearY: number) => {
      if (firefliesRef.current.length >= MAX_FIREFLIES) return;
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 60;
      const c = FIREFLY_COLORS[Math.floor(Math.random() * FIREFLY_COLORS.length)];
      firefliesRef.current.push({
        x: nearX + Math.cos(angle) * dist,
        y: nearY + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: c,
        size: 2 + Math.random() * 3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.04 + Math.random() * 0.06,
        trail: [],
        life: 0,
        maxLife: 200 + Math.random() * 200,
      });
    };

    const onMove = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      mouseRef.current = { x, y, active: true };

      if (Math.random() > 0.6) {
        spawnFirefly(x, y);
      }
    };

    const onClick = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      for (let i = 0; i < 12; i++) {
        spawnFirefly(x, y);
      }
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);

    const animate = () => {
      const w = canvas.width / dprRef.current;
      const h = canvas.height / dprRef.current;
      ctx.clearRect(0, 0, w, h);

      const flies = firefliesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      for (let i = flies.length - 1; i >= 0; i--) {
        const f = flies[i];
        f.life++;
        f.pulse += f.pulseSpeed;

        if (f.life >= f.maxLife) {
          flies.splice(i, 1);
          continue;
        }

        if (mouseActive) {
          const dx = mx - f.x;
          const dy = my - f.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < ATTRACT_RADIUS && dist > 20) {
            const force = ATTRACT_FORCE * (1 - dist / ATTRACT_RADIUS);
            f.vx += (dx / dist) * force;
            f.vy += (dy / dist) * force;
          } else if (dist <= 20) {
            f.vx += (Math.random() - 0.5) * 0.5;
            f.vy += (Math.random() - 0.5) * 0.5;
          }
        }

        f.vx += (Math.random() - 0.5) * 0.15;
        f.vy += (Math.random() - 0.5) * 0.15;

        const speed = Math.sqrt(f.vx * f.vx + f.vy * f.vy);
        if (speed > 3) {
          f.vx = (f.vx / speed) * 3;
          f.vy = (f.vy / speed) * 3;
        }

        f.vx *= 0.97;
        f.vy *= 0.97;

        f.x += f.vx;
        f.y += f.vy;

        f.trail.push({ x: f.x, y: f.y, alpha: 1 });
        if (f.trail.length > 12) f.trail.shift();

        for (const t of f.trail) {
          t.alpha *= 0.88;
        }
      }

      ctx.globalCompositeOperation = "lighter";

      for (const f of flies) {
        const lifeProgress = f.life / f.maxLife;
        const fadeIn = Math.min(f.life / 20, 1);
        const fadeOut = lifeProgress > 0.8 ? (1 - lifeProgress) / 0.2 : 1;
        const lifeFade = fadeIn * fadeOut;
        const pulseAlpha = 0.5 + Math.sin(f.pulse) * 0.5;

        for (let t = 0; t < f.trail.length; t++) {
          const tp = f.trail[t];
          const trailAlpha = tp.alpha * lifeFade * 0.3;
          if (trailAlpha < 0.01) continue;
          const trailSize = f.size * 0.5 * (t / f.trail.length);

          ctx.beginPath();
          ctx.arc(tp.x, tp.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${f.color.r},${f.color.g},${f.color.b},${trailAlpha})`;
          ctx.fill();
        }

        const glowSize = f.size * (2 + pulseAlpha * 1.5) * lifeFade;
        const glowAlpha = lifeFade * pulseAlpha * 0.4;

        const glow = ctx.createRadialGradient(
          f.x, f.y, 0,
          f.x, f.y, glowSize
        );
        glow.addColorStop(0, `rgba(${f.color.r},${f.color.g},${f.color.b},${glowAlpha})`);
        glow.addColorStop(0.5, `rgba(${f.color.r},${f.color.g},${f.color.b},${glowAlpha * 0.3})`);
        glow.addColorStop(1, `rgba(${f.color.r},${f.color.g},${f.color.b},0)`);

        ctx.beginPath();
        ctx.arc(f.x, f.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        const coreAlpha = lifeFade * (0.7 + pulseAlpha * 0.3);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 0.4 * lifeFade, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${coreAlpha})`;
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
}
