"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypewriterText({
  texts,
  className,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1500,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const currentFullText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
          if (displayText.length === currentFullText.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, isInView, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span ref={ref} className={cn("inline-flex items-center", className)}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1.1em] bg-current ml-0.5"
      />
    </span>
  );
}
