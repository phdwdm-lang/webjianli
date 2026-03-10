"use client";

import { useEffect, useRef, useCallback } from "react";

const STAR_COLORS = [
  { r: 255, g: 184, b: 0 },
  { r: 72, g: 0, b: 255 },
  { r: 16, g: 185, b: 129 },
  { r: 56, g: 189, b: 248 },
  { r: 255, g: 100, b: 200 },
];

const MAX_CONNECT_DIST = 120;
const MAX_NODES = 80;

interface StarNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: { r: number; g: number; b: number };
  life: number;
  maxLife: number;
  pulse: number;
  pulseSpeed: number;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: { r: number; g: number; b: number };
  size: number;
}

export function ConstellationTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<StarNode[]>([]);
  const dustRef = useRef<DustParticle[]>([]);
  const prevRef = useRef({ x: 0, y: 0, init: false });
  const animRef = useRef(0);
  const dprRef = useRef(1);

  const addNode = useCallback((x: number, y: number) => {
    if (nodesRef.current.length >= MAX_NODES) {
      nodesRef.current.shift();
    }
    const c = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    nodesRef.current.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 2 + Math.random() * 2.5,
      color: c,
      life: 0,
      maxLife: 120 + Math.random() * 80,
      pulse: 0,
      pulseSpeed: 0.05 + Math.random() * 0.05,
    });
  }, []);

  const spawnDust = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      const c = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      dustRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 25 + Math.random() * 20,
        color: c,
        size: 1 + Math.random() * 2,
      });
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
      if (dist > 20) {
        addNode(x, y);
        prevRef.current = { x, y, init: true };
      }
    };

    const onClick = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      spawnDust(x, y, 30);
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5;
        const r = 15 + Math.random() * 20;
        addNode(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      }
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

      const nodes = nodesRef.current;

      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        n.life++;
        n.pulse += n.pulseSpeed;
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.995;
        n.vy *= 0.995;

        if (n.life >= n.maxLife) {
          nodes.splice(i, 1);
          continue;
        }
      }

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECT_DIST) {
            const alphaA = 1 - a.life / a.maxLife;
            const alphaB = 1 - b.life / b.maxLife;
            const distFade = 1 - dist / MAX_CONNECT_DIST;
            const alpha = alphaA * alphaB * distFade * 0.2;

            const mr = Math.round((a.color.r + b.color.r) / 2);
            const mg = Math.round((a.color.g + b.color.g) / 2);
            const mb = Math.round((a.color.b + b.color.b) / 2);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${mr},${mg},${mb},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const progress = n.life / n.maxLife;
        const fadeOut = 1 - progress * progress;
        const pulseScale = 1 + Math.sin(n.pulse) * 0.3;
        const r = n.radius * pulseScale * fadeOut;
        const alpha = fadeOut * 0.8;

        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
        glow.addColorStop(
          0,
          `rgba(${n.color.r},${n.color.g},${n.color.b},${alpha})`
        );
        glow.addColorStop(
          0.4,
          `rgba(${n.color.r},${n.color.g},${n.color.b},${alpha * 0.3})`
        );
        glow.addColorStop(
          1,
          `rgba(${n.color.r},${n.color.g},${n.color.b},0)`
        );

        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      const dust = dustRef.current;
      for (let i = dust.length - 1; i >= 0; i--) {
        const d = dust[i];
        d.life++;
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.96;
        d.vy *= 0.96;

        if (d.life >= d.maxLife) {
          dust.splice(i, 1);
          continue;
        }

        const prog = d.life / d.maxLife;
        const alpha = (1 - prog * prog) * 0.7;
        const sz = d.size * (1 - prog * 0.5);

        ctx.beginPath();
        ctx.arc(d.x, d.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color.r},${d.color.g},${d.color.b},${alpha})`;
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
  }, [addNode, spawnDust]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
}
