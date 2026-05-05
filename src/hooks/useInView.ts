"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Sets `inView` to true when the element enters the viewport (scroll into view).
 * Uses threshold 0 so the slightest intersection counts; light bottom rootMargin so it fires as the section comes in.
 */
export function useInView<T extends HTMLElement>(options?: {
  once?: boolean;
  threshold?: number | number[];
  rootMargin?: string;
}) {
  const once = options?.once ?? true;
  const threshold = options?.threshold ?? 0;
  const rootMargin = options?.rootMargin ?? "0px 0px -5% 0px";
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (once) {
          if (entry.isIntersecting) setInView(true);
        } else {
          setInView(entry.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
