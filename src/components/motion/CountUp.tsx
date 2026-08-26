'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  suffix?: string
  durationMs?: number
  className?: string
}

export function CountUp({ to, suffix = '', durationMs = 1100, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setValue(to)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          function step(ts: number) {
            const p = Math.min((ts - start) / durationMs, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.round(eased * to))
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, durationMs])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
