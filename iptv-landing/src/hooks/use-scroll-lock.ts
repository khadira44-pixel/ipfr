"use client";

import { useEffect } from "react";

/**
 * Module-level lock counter so overlapping overlays (mobile menu + checkout
 * dialog) cannot accidentally unlock scrolling for each other.
 */
let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;

    if (lockCount === 0) {
      previousOverflow = body.style.overflow;
      previousPaddingRight = body.style.paddingRight;

      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [locked]);
}
