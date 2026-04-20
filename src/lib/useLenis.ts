import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    // Initialize Lenis only once
    if (!lenis) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })

      function raf(time: number) {
        lenis!.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    return () => {
      // Cleanup on unmount (optional - you may want to keep Lenis alive)
    }
  }, [])

  return lenis
}
