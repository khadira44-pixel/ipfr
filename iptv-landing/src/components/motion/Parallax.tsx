"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total travel in pixels across the full viewport pass. */
  offset?: number;
}

/**
 * Subtle scroll parallax with rAF throttling, passive listeners, and an
 * IntersectionObserver so off-screen cards never do work. Completely disabled
 * for reduced-motion users.
 */
export function Parallax({ children, className, offset = 36 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let isVisible = false;

    const update = () => {
      frame = 0;
      if (!isVisible) return;

      const rect = element.getBoundingClientRect();
      const total = window.innerHeight + rect.height;
      const progress = (window.innerHeight - rect.top) / total;
      const clamped = Math.min(1, Math.max(0, progress));
      const translate = (clamped - 0.5) * -offset;

      element.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) onScroll();
      },
      { rootMargin: "150px 0px" },
    );

    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      element.style.transform = "";
    };
  }, [offset]);

  return (
    <div ref={ref} className={cn("transform-gpu", className)}>
      {children}
    </div>
  );
}
