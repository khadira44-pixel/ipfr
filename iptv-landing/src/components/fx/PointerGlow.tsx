"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener powers the spotlight on every
 * `[data-spotlight]` element, so cards stay Server Components.
 */
export function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let target: HTMLElement | null = null;
    let clientX = 0;
    let clientY = 0;

    const apply = () => {
      frame = 0;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spotlight-x", `${clientX - rect.left}px`);
      target.style.setProperty("--spotlight-y", `${clientY - rect.top}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!element) return;

      target = element;
      clientX = event.clientX;
      clientY = event.clientY;

      if (frame === 0) frame = window.requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
