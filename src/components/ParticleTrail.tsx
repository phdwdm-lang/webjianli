"use client";

import { useEffect, useRef, useCallback } from "react";
import { EFFECT_COLORS } from "@/constants/theme";
import { cn } from "@/lib/utils";

const THEME_COLORS_LIGHT = EFFECT_COLORS.particleTrail;

type ParticleTrailScope = "parent" | "viewport";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleTrailProps {
  scope?: ParticleTrailScope;
  className?: string;
}

export default function ParticleTrail({
  scope = "parent",
  className,
}: ParticleTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const prevMouseRef = useRef({ x: 0, y: 0, initialized: false });
  const animFrameRef = useRef<number>(0);
  const dprRef = useRef(1);

  const spawnTrailParticles = useCallback((x: number, y: number) => {
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const colorIndex = Math.floor(Math.random() * THEME_COLORS_LIGHT.length);
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.8;
      const maxLife = 40 + Math.random() * 30;
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.2,
        radius: 2 + Math.random() * 4,
        opacity: 0.6 + Math.random() * 0.3,
        color: THEME_COLORS_LIGHT[colorIndex],
        life: 0,
        maxLife,
      });
    }
  }, []);

  const spawnRipple = useCallback((x: number, y: number) => {
    const count = 12 + Math.floor(Math.random() * 8);
    for (let i = 0; i < count; i++) {
      const colorIndex = Math.floor(Math.random() * THEME_COLORS_LIGHT.length);
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      const maxLife = 30 + Math.random() * 25;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 3,
        opacity: 0.7 + Math.random() * 0.3,
        color: THEME_COLORS_LIGHT[colorIndex],
        life: 0,
        maxLife,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = scope === "parent" ? canvas.parentElement : null;
    if (scope === "parent" && !parent) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const width =
        scope === "viewport"
          ? window.innerWidth
          : (parent?.getBoundingClientRect().width ?? 0);
      const height =
        scope === "viewport"
          ? window.innerHeight
          : (parent?.getBoundingClientRect().height ?? 0);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    const resizeObserver =
      scope === "parent" && parent ? new ResizeObserver(resizeCanvas) : null;

    if (parent && resizeObserver) {
      resizeObserver.observe(parent);
    }

    window.addEventListener("resize", resizeCanvas);

    const getCanvasCoords = (e: MouseEvent) => {
      if (scope === "viewport") {
        return { x: e.clientX, y: e.clientY };
      }

      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getCanvasCoords(e);

      if (!prevMouseRef.current.initialized) {
        prevMouseRef.current = { x, y, initialized: true };
        return;
      }

      const dx = x - prevMouseRef.current.x;
      const dy = y - prevMouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 4) {
        spawnTrailParticles(x, y);
        prevMouseRef.current = { x, y, initialized: true };
      }
    };

    const handleClick = (e: MouseEvent) => {
      const { x, y } = getCanvasCoords(e);
      spawnRipple(x, y);
    };

    const handleMouseLeave = () => {
      prevMouseRef.current.initialized = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const w = canvas.width / dprRef.current;
      const h = canvas.height / dprRef.current;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        if (p.life >= p.maxLife) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01;
        p.vx *= 0.99;
        p.vy *= 0.99;

        const progress = p.life / p.maxLife;
        const easedProgress = progress * progress;
        const currentOpacity = p.opacity * (1 - easedProgress);
        const currentRadius = p.radius * (1 - easedProgress * 0.5);

        if (currentOpacity < 0.01) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(
          /[\d.]+\)$/,
          `${currentOpacity})`
        );
        ctx.fill();

        return true;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [scope, spawnTrailParticles, spawnRipple]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none z-[1]",
        scope === "viewport" ? "fixed inset-0" : "absolute inset-0",
        className
      )}
    />
  );
}
