'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let ticking = false
    function update() {
      const el = ref.current
      if (!el) return
      const h = document.body.scrollHeight - window.innerHeight
      const pct = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0
      el.style.width = `${pct}%`
      ticking = false
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div ref={ref} className="motion-progress" aria-hidden="true" />
}
