"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BackButtonProps {
  hoverColor?: string;
}

export default function BackButton({ hoverColor }: BackButtonProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => router.push("/")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors mb-8 cursor-pointer"
      style={{
        color: isHovered ? (hoverColor || "var(--foreground)") : "var(--muted)",
      }}
    >
      <ArrowLeft size={16} />
      <span>返回首页</span>
    </button>
  );
}
