'use client'

import { useEffect, useRef } from 'react'

/** Attaches a subtle 3D tilt-toward-cursor effect. Desktop pointer only. */
export function useTilt<T extends HTMLElement>(strength = 1) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    function onMove(e: MouseEvent) {
      const r = el!.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el!.style.transform = `rotateX(${py * -12 * strength}deg) rotateY(${px * 15 * strength}deg) translateY(-6px)`
    }
    function onLeave() {
      el!.style.transform = ''
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
