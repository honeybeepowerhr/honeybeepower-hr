'use client'

import { useEffect, useRef } from 'react'

/** Pulls an element slightly toward the cursor on hover. Desktop pointer only. */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    function onMove(e: MouseEvent) {
      const r = el!.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.35
      const y = (e.clientY - r.top - r.height / 2) * 0.45
      el!.style.transform = `translate(${x}px, ${y}px)`
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
  }, [])

  return ref
}
