"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useLenisEverywhere(
  options?: ConstructorParameters<typeof Lenis>[0]
) {
  useEffect(() => {
    // collect all scrollable roots
    const roots: HTMLElement[] = [
      document.documentElement, // main page scroll
      ...Array.from(document.querySelectorAll("[data-lenis-root]")), // custom scroll containers
    ] as HTMLElement[];

    // store lenis instances
    const lenisInstances: Lenis[] = [];

    roots.forEach((root) => {
      const content =
        root === document.documentElement
          ? document.body
          : (root.querySelector("[data-lenis-content]") as HTMLElement) || root;

      const lenis = new Lenis({
        ...options,
        duration: 2.0, // ⬆️ increase duration for slower feel (default ~1.0)
        easing: (t: number) => 1 - Math.pow(2, -10 * t),
        smoothWheel: true,
        touchMultiplier: 0.5, // ⬇️ lower for gentler scroll on touch
        wheelMultiplier: 0.5,
        wrapper: root,
        content,
      });

      lenisInstances.push(lenis);

      let rafId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // cleanup for each root
      root.dataset.lenisId = String(lenisInstances.length);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });

    return () => {
      lenisInstances.forEach((l) => l.destroy());
    };
  }, [options]);
}
