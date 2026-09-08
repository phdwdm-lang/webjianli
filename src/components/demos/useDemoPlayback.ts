"use client";

import { useEffect, useRef, useState } from "react";

type DemoState = "idle" | "playing" | "reduced";

// 视口内播放、离屏暂停；prefers-reduced-motion 时冻结在故事中段作为静态海报
export function useDemoPlayback<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<DemoState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("reduced");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setState(entry.isIntersecting ? "playing" : "idle"),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stateClass =
    state === "playing" ? "is-playing" : state === "reduced" ? "is-reduced" : "";
  return { ref, stateClass };
}
